#!/bin/bash
# Audio Transcription Skill - Universal Audio Handler
# Version: 2.0 - Auto-mode support
#
# Usage:
#   transcribe.sh <audio-file>              # One-shot transcription
#   transcribe.sh --auto <media-dir>        # Watch mode for incoming files
#   transcribe.sh --check <file>            # Check if file is audio (exit 0/1)
#   transcribe.sh --install                 # Install dependencies check

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WHISPER_DIR="${WHISPER_DIR:-$HOME/whisper.cpp}"
MODEL="${WHISPER_MODEL:-$WHISPER_DIR/models/ggml-base.bin}"
TMP_DIR="${TMP_DIR:-/tmp/audio-transcribe}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[TRANSCRIBE]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Check dependencies
check_deps() {
    local missing=()
    
    if [[ ! -f "$WHISPER_DIR/build/bin/whisper-cli" ]]; then
        missing+=("whisper.cpp")
    fi
    
    if ! command -v ffmpeg &>/dev/null; then
        missing+=("ffmpeg")
    fi
    
    if [[ ! -f "$MODEL" ]]; then
        missing+=("whisper-model: $MODEL")
    fi
    
    if [[ ${#missing[@]} -gt 0 ]]; then
        error "Missing dependencies: ${missing[*]}"
        exit 1
    fi
    
    log "All dependencies OK"
}

# Detect if file is audio (by extension and ffprobe)
is_audio() {
    local file="$1"
    local ext="${file##*.}"
    
    # Known audio extensions
    case "${ext,,}" in
        ogg|mp3|wav|flac|m4a|aac|wma|opus|oga|spx)
            return 0
            ;;
    esac
    
    # Double-check with ffprobe if available
    if command -v ffprobe &>/dev/null; then
        if ffprobe -v quiet -show_format -show_streams "$file" 2>/dev/null | grep -q "audio"; then
            return 0
        fi
    fi
    
    return 1
}

# Convert any audio to WAV format (whisper.cpp requirement)
convert_to_wav() {
    local input="$1"
    local output="$2"
    
    mkdir -p "$(dirname "$output")"
    
    ffmpeg -i "$input" \
        -ar 16000 \
        -ac 1 \
        -c:a pcm_s16le \
        -y \
        -loglevel error \
        "$output" 2>&1 || {
        error "Failed to convert $input"
        return 1
    }
    
    return 0
}

# Remove duplicate sentences/phrases from transcription
deduplicate() {
    local text="$1"
    
    # Remove all newlines and normalize whitespace
    text="$(echo -n "$text" | tr -s '[:space:]' ' ' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    
    local len=${#text}
    
    # Strategy 1: Check for exact duplication with flexible whitespace
    # Try to find the largest prefix that repeats
    for ((i=len/2; i>=20; i--)); do
        local prefix="${text:0:i}"
        local rest="${text:i}"
        # Normalize rest for comparison (remove leading whitespace)
        rest="$(echo -n "$rest" | sed 's/^[[:space:]]*//')"
        
        if [[ "$prefix" == "$rest" ]]; then
            echo -n "$prefix"
            return 0
        fi
        
        # Also check if prefix matches start of rest (with some tolerance)
        if [[ "${rest:0:${#prefix}}" == "$prefix" ]]; then
            echo -n "$prefix"
            return 0
        fi
    done
    
    # Strategy 2: Find repeated sentence/phrase patterns
    # Look for the largest substring that appears at least twice
    local min_repeat_len=30
    for ((i=len-min_repeat_len; i>=min_repeat_len; i--)); do
        local candidate="${text:i}"
        local before="${text:0:i}"
        
        # Check if this suffix appears earlier in the text
        if [[ "$before" == *"$candidate"* ]]; then
            # Found a repeating suffix, return text up to first occurrence
            # Find where it first appears
            local temp="$before"
            local first_pos=-1
            local pos=0
            while [[ "$temp" == *"$candidate"* ]]; do
                local remainder="${temp#*"$candidate"}"
                local consumed=$(( ${#temp} - ${#remainder} - ${#candidate} ))
                if [[ $first_pos -eq -1 ]]; then
                    first_pos=$pos
                    break
                fi
                pos=$((pos + consumed + ${#candidate}))
                temp="$remainder"
            done
            
            if [[ $first_pos -ge 0 ]]; then
                echo -n "${text:0:first_pos}" | sed 's/[[:space:]]*$//'
                return 0
            fi
        fi
    done
    
    # No duplication found
    echo -n "$text"
}

# Main transcription function
transcribe() {
    local input_file="$1"
    local output_file="${2:-/tmp/transcription.txt}"
    
    if [[ ! -f "$input_file" ]]; then
        error "File not found: $input_file"
        return 1
    fi
    
    # Check if it's audio
    if ! is_audio "$input_file"; then
        warn "File doesn't appear to be audio: $input_file"
        # Try anyway, might be misidentified
    fi
    
    # Setup temp directory
    mkdir -p "$TMP_DIR"
    local temp_wav="$TMP_DIR/$$_$(basename "$input_file" .ogg).wav"
    local temp_out="$TMP_DIR/$$_transcription"
    
    # Cleanup on exit
    trap "rm -f '$temp_wav' '${temp_out}.txt'" EXIT
    
    # Convert
    log "Converting $(basename "$input_file")..."
    if ! convert_to_wav "$input_file" "$temp_wav"; then
        return 1
    fi
    
    # Transcribe
    log "Transcribing with whisper.cpp..."
    "$WHISPER_DIR/build/bin/whisper-cli" \
        -m "$MODEL" \
        -f "$temp_wav" \
        --output-txt \
        -of "$temp_out" \
        -l auto \
        --no-timestamps \
        > /dev/null \
        2>/dev/null || {
        error "Transcription failed"
        return 1
    }
    
    # Output result (with deduplication)
    if [[ -f "${temp_out}.txt" ]]; then
        local raw_text
        raw_text=$(cat "${temp_out}.txt")
        local deduped_text
        deduped_text=$(deduplicate "$raw_text")
        
        echo -n "$deduped_text"
        
        # Also copy to output file if specified
        if [[ "$output_file" != "/tmp/transcription.txt" ]]; then
            echo -n "$deduped_text" > "$output_file"
            log "Saved to: $output_file"
        fi
    else
        error "No output generated"
        return 1
    fi
}

# Install/check mode
install_mode() {
    log "Checking installation..."
    
    # Check whisper.cpp
    if [[ -d "$WHISPER_DIR" ]]; then
        log "✓ whisper.cpp found at $WHISPER_DIR"
    else
        error "✗ whisper.cpp not found. Install with:"
        echo "  git clone https://github.com/ggerganov/whisper.cpp ~/whisper.cpp"
        echo "  cd ~/whisper.cpp && make"
    fi
    
    # Check model
    if [[ -f "$MODEL" ]]; then
        log "✓ Model found: $(basename $MODEL)"
    else
        error "✗ Model not found: $MODEL"
        echo "  Download with: bash ~/whisper.cpp/models/download-ggml-model.sh base"
    fi
    
    # Check ffmpeg
    if command -v ffmpeg &>/dev/null; then
        log "✓ ffmpeg found: $(ffmpeg -version | head -1)"
    else
        error "✗ ffmpeg not found. Install with: sudo apt install ffmpeg"
    fi
}

# Usage
usage() {
    cat <<EOF
Audio Transcription Skill v2.0

Usage: $(basename $0) [OPTIONS] <file-or-dir>

Options:
    <file.ogg>           Transcribe single audio file
    --check <file>       Check if file is audio (exit code 0/1)
    --install            Check dependencies and installation
    --help               Show this help

Environment Variables:
    WHISPER_DIR         Path to whisper.cpp (default: ~/whisper.cpp)
    WHISPER_MODEL       Model to use (default: ggml-base.bin)

Examples:
    $(basename $0) voice.ogg
    $(basename $0) --check recording.mp3
    $(basename $0) --install

For OpenClaw Agents:
    When receiving a file with .ogg extension from Telegram:
    1. Check if MIME type is wrong (text/* instead of audio/*)
    2. Call: $(basename $0) <filepath>
    3. Use output as message content

EOF
}

# Main
case "${1:-}" in
    --help|-h)
        usage
        exit 0
        ;;
    --install|-i)
        install_mode
        exit 0
        ;;
    --check|-c)
        if [[ -z "${2:-}" ]]; then
            error "Usage: $0 --check <file>"
            exit 1
        fi
        if is_audio "$2"; then
            log "File IS audio"
            exit 0
        else
            log "File is NOT audio"
            exit 1
        fi
        ;;
    "")
        usage
        exit 1
        ;;
    *)
        check_deps
        transcribe "$1" "${2:-}"
        ;;
esac

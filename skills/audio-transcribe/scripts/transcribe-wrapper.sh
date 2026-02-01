#!/bin/bash
# Wrapper script to transcribe audio files with automatic format conversion
# Usage: transcribe-wrapper.sh <audio-file>

AUDIO_FILE="$1"
WHISPER_DIR="$HOME/whisper.cpp"
MODEL_PATH="$WHISPER_DIR/models/ggml-base.bin"
TEMP_WAV="/tmp/whisper_temp_$$.wav"

if [ -z "$AUDIO_FILE" ]; then
    echo "Usage: $0 <audio-file>" >&2
    exit 1
fi

if [ ! -f "$AUDIO_FILE" ]; then
    echo "Error: File not found: $AUDIO_FILE" >&2
    exit 1
fi

# Convert to WAV format (16kHz, mono, 16-bit) - required by whisper.cpp
ffmpeg -i "$AUDIO_FILE" -ar 16000 -ac 1 -c:a pcm_s16le "$TEMP_WAV" -y 2>/dev/null

if [ ! -f "$TEMP_WAV" ]; then
    echo "Error: Failed to convert audio file" >&2
    exit 1
fi

# Transcribe
"$WHISPER_DIR/build/bin/whisper-cli" \
    -m "$MODEL_PATH" \
    -f "$TEMP_WAV" \
    --no-timestamps \
    --no-prints \
    -otxt \
    -of /tmp/whisper_out_$$ \
    2>/dev/null

# Output the transcription
if [ -f "/tmp/whisper_out_$$.txt" ]; then
    cat "/tmp/whisper_out_$$.txt"
    rm -f "/tmp/whisper_out_$$.txt"
else
    echo "(transcription failed)"
fi

# Cleanup
rm -f "$TEMP_WAV"
rm -f "/tmp/whisper_out_$$.wav" 2>/dev/null
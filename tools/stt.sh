#!/bin/bash
# STT Tool - Whisper.cpp Wrapper mit Format-Konvertierung
# Nutzung: ./stt.sh <audio_file> [sprache]

AUDIO_FILE="$1"
LANG="${2:-de}"
MODEL="$HOME/.local/share/whisper/ggml-base.bin"
WHISPER="$HOME/.local/bin/whisper-cli"

if [ -z "$AUDIO_FILE" ]; then
    echo "Usage: stt.sh <audio_file> [language]"
    echo "Example: stt.sh /path/to/audio.ogg de"
    exit 1
fi

if [ ! -f "$AUDIO_FILE" ]; then
    echo "Error: File not found: $AUDIO_FILE"
    exit 1
fi

# Temporäre WAV-Datei erstellen (whisper.cpp braucht WAV)
TMP_WAV=$(mktemp /tmp/stt_XXXXXX.wav)
trap "rm -f $TMP_WAV" EXIT

# Konvertiere zu 16kHz Mono WAV (whisper.cpp optimal)
ffmpeg -i "$AUDIO_FILE" -ar 16000 -ac 1 -c:a pcm_s16le "$TMP_WAV" -y -loglevel error 2>&1

if [ ! -f "$TMP_WAV" ]; then
    echo "Error: Failed to convert audio"
    exit 1
fi

# Transkribiere
"$WHISPER" -m "$MODEL" -f "$TMP_WAV" -l "$LANG" --no-timestamps 2>&1 | \
    grep -v "whisper_" | grep -v "^$" | grep -v "system_info" | grep -v "main:" | tail -1

#!/bin/bash
# whisper-transcribe.sh - Transkribiert Audio-Dateien mit whisper.cpp

AUDIO_FILE="$1"
MODEL="${2:-/home/jpe-studio/whisper.cpp/models/ggml-base.bin}"

if [ -z "$AUDIO_FILE" ]; then
    echo "Usage: $0 <audio-file> [model-path]"
    exit 1
fi

if [ ! -f "$AUDIO_FILE" ]; then
    echo "Error: File not found: $AUDIO_FILE"
    exit 1
fi

# Konvertiere zu WAV falls nötig (whisper.cpp bevorzugt 16kHz mono WAV)
TMP_WAV="/tmp/whisper_$(basename "$AUDIO_FILE").wav"

# Prüfe ob ffmpeg verfügbar ist
if command -v ffmpeg &> /dev/null; then
    ffmpeg -i "$AUDIO_FILE" -ar 16000 -ac 1 -c:a pcm_s16le "$TMP_WAV" -y -loglevel error 2>/dev/null
    AUDIO_INPUT="$TMP_WAV"
else
    AUDIO_INPUT="$AUDIO_FILE"
fi

# Transkribiere
/home/jpe-studio/whisper.cpp/build/bin/whisper-cli \
    -m "$MODEL" \
    -f "$AUDIO_INPUT" \
    --language auto \
    --output-txt \
    -of /tmp/whisper_output 2>/dev/null

# Ausgabe
if [ -f "/tmp/whisper_output.txt" ]; then
    cat /tmp/whisper_output.txt"
    rm -f "/tmp/whisper_output.txt"
else
    echo "Transkription fehlgeschlagen"
    exit 1
fi

# Cleanup
rm -f "$TMP_WAV"

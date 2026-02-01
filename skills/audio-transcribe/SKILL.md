---
name: audio-transcribe
description: Automatically transcribe Telegram voice messages and audio files using whisper.cpp. Works around OpenClaw MIME-type detection bugs by auto-detecting audio files by extension.
---

# Audio Transcription Skill

Robust, hands-off transcription of voice messages and audio files. Designed to handle OpenClaw's MIME-type detection issues with Telegram voice messages.

## Quick Start (For Agents)

**When you receive a file ending in `.ogg` from Telegram:**
1. **Ignore the MIME type** (it will incorrectly show as `text/tab-separated-values`)
2. **Run the transcription script:**
   ```bash
   ~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh <filepath>
   ```
3. **Return the output** as the transcribed message

## For Users

This skill **automatically handles** Telegram voice messages. You don't need to do anything special — just send voice messages as usual. The agent will detect and transcribe them.

### Supported Formats

| Format | Extension | Auto-Detect | Notes |
|--------|-----------|-------------|-------|
| **OGG Opus** | `.ogg` | ✅ Yes | Telegram voice messages |
| MP3 | `.mp3` | ✅ Yes | Standard audio |
| WAV | `.wav` | ✅ Yes | Native format (no conversion) |
| M4A | `.m4a` | ✅ Yes | iPhone voice memos |
| FLAC | `.flac` | ✅ Yes | Lossless audio |
| AAC | `.aac` | ✅ Yes | Various sources |

## Technical Details

### The Problem

OpenClaw's Telegram plugin incorrectly identifies OGG/Opus voice messages as `text/tab-separated-values`. This causes:
- Binary data being sent as text (appears as "Chinese characters")
- No automatic audio transcription
- Broken voice message handling

### The Solution

This skill provides a **detection-by-extension** fallback:
1. Check file extension (`.ogg`, `.mp3`, etc.)
2. Convert to WAV using `ffmpeg` if needed
3. Transcribe using `whisper.cpp`
4. Return clean text

### Script Features

**File:** `scripts/transcribe.sh`

Features:
- ✅ Automatic format detection by extension
- ✅ Converts any format to WAV (whisper.cpp requirement)
- ✅ Auto-detects language (German, English, etc.)
- ✅ No timestamps in output (clean text)
- ✅ **Automatic duplicate removal** — detects and removes repeated sentences/phrases from whisper.cpp output
- ✅ Error handling and dependency checking
- ✅ Cleanup of temp files

### Usage

```bash
# Transcribe a file
~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh recording.ogg

# Check if file is audio (by extension)
~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh --check file.ogg

# Check installation
~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh --install
```

## Prerequisites

### Required

1. **whisper.cpp** installed at `~/whisper.cpp/`
   ```bash
   git clone https://github.com/ggerganov/whisper.cpp ~/whisper.cpp
   cd ~/whisper.cpp && make
   ```

2. **Model file** (auto-downloaded or manual):
   ```bash
   bash ~/whisper.cpp/models/download-ggml-model.sh base
   ```

3. **ffmpeg**:
   ```bash
   sudo apt install ffmpeg
   ```

### Verify Installation

```bash
~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh --install
```

## Agent Behavior

**IMPORTANT:** As an agent, when receiving media attachments:

### Auto-Detection Rule

```
IF message contains media attachment:
  AND filename ends with .ogg, .mp3, .wav, .m4a, .flac:
    → Automatically run transcription script
    → Reply with transcribed text
    → Mention it was transcribed from audio
```

### Example Workflow

```bash
# Incoming: file_123.ogg (shown as text/tab-separated-values)
# Agent automatically:

OUTPUT=$(~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh \
         "/home/jpe-studio/.openclaw/media/inbound/file_123.ogg")

# Reply with:
# "🎙️ Transcription: '$OUTPUT'"
```

## Model Options

Set via environment variable:

```bash
# Default (good balance)
export WHISPER_MODEL="$HOME/whisper.cpp/models/ggml-base.bin"

# Faster, less accurate
export WHISPER_MODEL="$HOME/whisper.cpp/models/ggml-tiny.bin"

# Slower, more accurate
export WHISPER_MODEL="$HOME/whisper.cpp/models/ggml-small.bin"

# Best quality, slowest
export WHISPER_MODEL="$HOME/whisper.cpp/models/ggml-large-v3.bin"
```

## Troubleshooting

### "failed to read audio data"
The file might be corrupted or in an unsupported codec. Try converting manually:
```bash
ffmpeg -i input.ogg -ar 16000 -ac 1 output.wav
~/whisper.cpp/build/bin/whisper-cli -m ~/whisper.cpp/models/ggml-base.bin \
  -f output.wav --output-txt -of /tmp/out
```

### "whisper-cli: command not found"
whisper.cpp not compiled. Run:
```bash
cd ~/whisper.cpp && make
```

### Model not found
Download the base model:
```bash
bash ~/whisper.cpp/models/download-ggml-model.sh base
```

## Architecture

```
┌─────────────────┐     ┌─────────────┐     ┌─────────────────┐
│ Telegram Voice  │────▶│ OpenClaw    │────▶│ Agent receives    │
│ Message (.ogg)  │     │ (wrong MIME)│     │ "text" with       │
└─────────────────┘     └─────────────┘     │ weird characters  │
                                            └────────┬────────┘
                                                     │
                         ┌───────────────────────────┘
                         ▼
              ┌──────────────────────┐
              │ Agent detects .ogg   │
              │ extension            │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ transcribe.sh        │
              │ - Convert to WAV     │
              │ - Run whisper.cpp    │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ Return clean text    │
              └──────────────────────┘
```

## Files

```
skills/audio-transcribe/
├── SKILL.md                 # This file
├── scripts/
│   └── transcribe.sh        # Main transcription script
└── docs/
    └── telegram-audio-bug.md # Bug documentation
```

## Future Improvements

- [ ] Native OpenClaw audio detection fix (upstream)
- [ ] Real-time transcription streaming
- [ ] Speaker diarization (who said what)
- [ ] Language auto-detection confidence scores

## References

- [whisper.cpp](https://github.com/ggerganov/whisper.cpp)
- [Bug Documentation](./docs/telegram-audio-bug.md)
- OpenClaw Issue: Telegram OGG MIME-type detection

---

**Last Updated:** 2026-02-01  
**Status:** Production Ready  
**Version:** 2.0

---
name: qwen3-tts
description: Text-to-speech synthesis using Qwen3-TTS models. Use when generating audio from text, voice cloning, voice design, or creating speech with natural language voice control. Supports 10 languages (Chinese, English, Japanese, Korean, German, French, Russian, Portuguese, Spanish, Italian) with high-quality, expressive speech generation.
---

# Qwen3-TTS

Text-to-speech synthesis using Alibaba's Qwen3-TTS models. Supports standard TTS, voice cloning, voice design, and natural language voice control.

## Installation

Install the required Python package:

```bash
pip install qwen-tts torch torchaudio
```

## Usage

### Basic Text-to-Speech

Generate speech from text:

```bash
python3 scripts/qwen3-tts.py "Hello, this is a test." -o output.wav
```

### Voice Design

Design a custom voice using natural language description:

```bash
python3 scripts/qwen3-tts.py "Hello world" \
    --voice "A young female with warm and friendly tone" \
    -o output.wav
```

### Voice Cloning

Clone a voice from reference audio:

```bash
python3 scripts/qwen3-tts.py "Hello world" \
    --reference /path/to/reference.wav \
    -o output.wav
```

### Voice Control with Instructions

Control speaking style with natural language:

```bash
python3 scripts/qwen3-tts.py "Hello world" \
    --instruction "Speak slowly and calmly" \
    -o output.wav
```

### Available Models

- `Qwen/Qwen3-TTS-0.6B` (default, faster)
- `Qwen/Qwen3-TTS-1.7B` (higher quality)

Specify model with:

```bash
python3 scripts/qwen3-tts.py "Hello" -m Qwen/Qwen3-TTS-1.7B -o output.wav
```

### Supported Languages

Qwen3-TTS supports 10 major languages:
- Chinese (中文)
- English
- Japanese (日本語)
- Korean (한국어)
- German (Deutsch)
- French (Français)
- Russian (Русский)
- Portuguese (Português)
- Spanish (Español)
- Italian (Italiano)

## Options

- `text` (required): Text to synthesize
- `-o, --output`: Output audio file (default: output.wav)
- `-m, --model`: Model name (default: Qwen/Qwen3-TTS-0.6B)
- `--voice`: Voice description for voice design
- `--reference`: Path to reference audio for voice cloning
- `--instruction`: Natural language instruction for voice control
- `--device`: Device to use - auto, cpu, cuda (default: auto)
- `--streaming`: Enable streaming generation (lower latency)

## Examples

### German Voice

```bash
python3 scripts/qwen3-tts.py "Guten Tag, wie geht es Ihnen?" -o german.wav
```

### Expressive Reading

```bash
python3 scripts/qwen3-tts.py "Once upon a time..." \
    --instruction "Read like a storyteller with emotion and variation" \
    -o story.wav
```

### Professional Tone

```bash
python3 scripts/qwen3-tts.py "Welcome to the presentation." \
    --voice "A professional male voice with clear articulation" \
    --instruction "Speak clearly and professionally" \
    -o presentation.wav
```

## Notes

- First run downloads the model (0.6B ~ 1.2GB, 1.7B ~ 3.4GB)
- Audio output is 24kHz mono WAV
- GPU recommended for real-time generation
- CPU generation works but is slower

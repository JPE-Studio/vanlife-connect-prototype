# Bug: Telegram Sprachnachrichten werden als Text interpretiert

## Problem

Telegram Sprachnachrichten (OGG/Opus) werden von OpenClaw nicht als Audio erkannt, sondern als `text/tab-separated-values` interpretiert. Das führt dazu, dass die binären Daten der Audiodatei als Text an das LLM übergeben werden (erscheint als "chinesische Schriftzeichen" / kryptische Unicode-Zeichen).

## Symptome

- Sprachnachrichten in Telegram werden als lange Zeichenketten mit kryptischen Symbolen dargestellt
- MIME-Type der empfangenen Datei: `text/tab-separated-values` (statt `audio/ogg`)
- Dateiendung: `.ogg` ist vorhanden, aber der Inhalt wird nicht als Audio erkannt

## Beispiel

Empfangene Nachricht sieht so aus:
```
<file name="file_23---9a71b323-c222-42a1-9570-af69103bdca4.ogg" 
      mime="text/tab-separated-values">
杏卧Ȁꯩ䭎... [tausende kryptische Zeichen]
</file>
```

## Ursache

Das OpenClaw Gateway oder das Telegram-Channel-Plugin erkennt den MIME-Type der OGG/Opus-Dateien nicht korrekt. Statt `audio/ogg` oder `audio/opus` wird fälschlicherweise `text/tab-separated-values` zurückgegeben.

Das liegt wahrscheinlich an:
1. Einem Bug in der MIME-Type-Erkennung des Telegram-Plugins
2. Oder einem Problem bei der Weitergabe der Datei-Metadaten vom Gateway

## Workaround

Ein Script wurde erstellt, das die Transkription trotzdem ermöglicht:

**Script:** `~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh`

Das Script:
1. Erkennt die Datei anhand der Endung (`.ogg`)
2. Konvertiert OGG/Opus zu WAV mittels `ffmpeg`
3. Führt die Transkription mit `whisper.cpp` durch
4. Gibt den Text zurück

**Verwendung:**
```bash
~/.openclaw/workspace/skills/audio-transcribe/scripts/transcribe.sh <audio-file>
```

## Manuelle Transkription (aktueller Workflow)

Da das Audio nicht automatisch als solches erkannt wird:

1. Audio-Datei wird im Media-Verzeichnis gespeichert:
   `/home/jpe-studio/.openclaw/media/inbound/`

2. Manuelle Konvertierung:
   ```bash
   ffmpeg -i input.ogg -ar 16000 -ac 1 -c:a pcm_s16le output.wav -y
   ```

3. Transkription mit whisper.cpp:
   ```bash
   ~/whisper.cpp/build/bin/whisper-cli \
     -m ~/whisper.cpp/models/ggml-base.bin \
     -f output.wav \
     --output-txt -of /tmp/transcription
   ```

4. Ergebnis lesen:
   ```bash
   cat /tmp/transcription.txt
   ```

## Permanent Fix (TODO)

- [ ] OpenClaw Gateway auf neueste Version updaten
- [ ] Telegram-Channel Plugin Konfiguration prüfen
- [ ] MIME-Type Mapping im Gateway überprüfen
- [ ] Alternativ: Pre-processing Hook einrichten, der .ogg-Dateien automatisch erkennt und transkribiert

## Betroffene Systeme

- **Hostname:** jpe-studio-OptiPlex-7050
- **OpenClaw Version:** (zu prüfen)
- **Telegram Channel Plugin:** (zu prüfen)
- **Datum:** 2026-02-01

## Referenzen

- Whisper.cpp: https://github.com/ggerganov/whisper.cpp
- OpenClaw Docs: /home/jpe-studio/.npm-global/lib/node_modules/openclaw/docs
- Skill Location: /home/jpe-studio/.openclaw/workspace/skills/audio-transcribe/

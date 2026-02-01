#!/usr/bin/env python3
"""
Qwen3-TTS Text-to-Speech Generator
Generates audio from text using Qwen3-TTS models.
"""

import argparse
import sys
import os
import torch
import torchaudio
from qwen_tts import Qwen3TTSModel


def main():
    parser = argparse.ArgumentParser(description="Qwen3-TTS Text-to-Speech")
    parser.add_argument("text", help="Text to synthesize")
    parser.add_argument("-o", "--output", default="output.wav", help="Output audio file")
    parser.add_argument("-m", "--model", default="Qwen/Qwen3-TTS-12Hz-0.6B-Base", 
                        help="Model name (default: Qwen/Qwen3-TTS-12Hz-0.6B-Base)")
    parser.add_argument("--voice", default=None, 
                        help="Voice description for voice design (e.g., 'A young female with warm tone')")
    parser.add_argument("--reference", default=None,
                        help="Path to reference audio for voice cloning")
    parser.add_argument("--instruction", default=None,
                        help="Natural language instruction for voice control")
    parser.add_argument("--device", default="auto", 
                        help="Device to use (auto, cpu, cuda)")
    
    args = parser.parse_args()
    
    # Determine device
    if args.device == "auto":
        device = "cuda" if torch.cuda.is_available() else "cpu"
    else:
        device = args.device
    
    try:
        # Initialize model
        print(f"Loading Qwen3-TTS model: {args.model}", file=sys.stderr)
        model = Qwen3TTSModel.from_pretrained(args.model, device=device)
        
        # Generate audio based on mode
        if args.reference:
            # Voice clone mode
            print(f"Cloning voice from: {args.reference}", file=sys.stderr)
            audio = model.clone(
                text=args.text,
                reference_audio=args.reference,
                instruction=args.instruction
            )
        elif args.voice:
            # Voice design mode
            print(f"Designing voice: {args.voice}", file=sys.stderr)
            audio = model.design(
                text=args.text,
                voice_description=args.voice,
                instruction=args.instruction
            )
        else:
            # Default TTS mode
            audio = model.generate(
                text=args.text,
                instruction=args.instruction
            )
        
        # Save audio
        torchaudio.save(args.output, audio.unsqueeze(0), sample_rate=24000)
        print(f"Audio saved to: {args.output}", file=sys.stderr)
        print(args.output)  # Output path for piping
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

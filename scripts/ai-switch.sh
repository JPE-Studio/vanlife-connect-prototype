#!/bin/bash
# Schnellwechsel zwischen AI-Modellen für OpenClaw

case "$1" in
  kimi|k)
    openclaw sessions send --session main --message "/model kimi"
    echo "→ Wechsle zu Kimi Code"
    ;;
  glm|g)
    openclaw sessions send --session main --message "/model glm"
    echo "→ Wechsle zu GLM 4.7"
    ;;
  default|d)
    openclaw sessions send --session main --message "/model default"
    echo "→ Wechsle zu Standardmodell"
    ;;
  *)
    echo "Verwendung: ai <kimi|glm|default>"
    echo "  ai kimi  oder ai k  → Kimi Code"
    echo "  ai glm   oder ai g  → GLM 4.7"
    echo "  ai default oder ai d → Standard"
    ;;
esac

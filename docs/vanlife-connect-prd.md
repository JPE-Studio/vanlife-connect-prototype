# PRD: Vanlife Connect

## 1. Übersicht

**Produktname:** Vanlife Connect (Arbeitstitel)  
**Vision:** Eine lokale Social-Plattform für Vanlife-Enthusiasten, die sich am GPS-Standort orientiert  
**Kernmechanik:** Location-basierter Feed (5km Radius) — zeigt Posts aus der Umgebung

---

## 2. Core Features (MVP)

### 2.1 Feed
- **Geolocation:** Automatischer 5km Radius um aktuelle GPS-Position
- **Content-Typ:** Zunächst nur Text-Posts
- **Sortierung:** Chronologisch (später: algorithmisch/engagement-basiert)
- **Leere-Status:** Fallback-Content wenn keine Posts in der Region

### 2.2 Interaktionen
- **Like-Funktion:** Einfacher Like-Button pro Post
- **Reaktionen:** Emoji-Reaktionen (❤️ 👍 😂 🔥 etc.)
- **Reply/Quote:** Auf spezifische Kommentare antworten (Threading)

### 2.3 Kommentar-System (Chat-Style)
- **Darstellung:** Chat-Bubbles (wie WhatsApp/Messenger)
- **Öffnen:** Tap auf Post öffnet Kommentar-View
- **Visual:** Sender rechts (eigene Nachrichten), andere links
- **Features:**
  - Zeitstempel
  - "Schreibt..."-Indikator
  - Zitieren von Nachrichten
  - Reaktionen auf einzelne Kommentare

---

## 3. User Stories

### Als Vanlife-Reisender möchte ich...
1. ...sehen, wer gerade in meiner Nähe campiert
2. ...Tipps zu Spots in der Umgebung bekommen
3. ...mit anderen Reisenden in Kontakt treten
4. ...meinen eigenen Spot/Setup teilen

### Als Neuling möchte ich...
1. ...Community-Wissen entdecken
2. ...Fragen zu Stellplätzen stellen
3. ...andere Vanlifer in der Nähe finden

---

## 4. Technische Requirements

### Backend
- **GPS-Handling:** Präzise Standortbestimmung mit Privacy-Controls
- **Radius-Berechnung:** Geospatial Queries (MongoDB/PostgreSQL PostGIS)
- **Real-time:** WebSockets für Live-Kommentare
- **Moderation:** Content-Flagging, Auto-Moderation

### Frontend
- **Mobile-First:** React Native oder PWA
- **Karte:** Integrierte Map-Ansicht (OpenStreetMap/Google Maps)
- **Offline-Support:** Cache letzte Posts für schlechte Verbindung

### Privacy & Safety
- **Standort:** Exakter Standort nie öffentlich, nur Radius-Anzeige
- **Blocking/Reporting:** User blockieren, Inhalte melden
- **Optional:** Anonymer Modus (nur lesen, nicht posten)

---

## 5. UX-Flows

### Flow 1: Feed erkunden
1. App öffnen → GPS-Permission anfragen
2. Feed lädt Posts im 5km Radius
3. Scrollen durch lokale Posts
4. Tap auf Post → Chat-View mit Kommentaren

### Flow 2: Post erstellen
1. "+" Button
2. Text eingeben (max 500 Zeichen)
3. Optional: Standort-Präzisierung ("Beim See X")
4. Posten → erscheint im lokalen Feed

### Flow 3: Kommentieren
1. Auf Post tippen
2. Chat-View öffnet sich
3. Nachricht eingeben
4. Senden → erscheint als Bubble
5. Long-Press auf Nachricht → Reagieren/Zitieren

---

## 6. Success Metrics

- **DAU/MAU Ratio:** Ziel: 30%+ (tägliche Nutzung)
- **Posts per User:** Ziel: 2+ pro Woche
- **Kommentar-Rate:** Ziel: 20%+ der Posts mit Kommentaren
- **Session-Dauer:** Ziel: 5+ Minuten

---

## 7. Roadmap

### Phase 1: MVP (4-6 Wochen)
- [ ] Text-Only Feed
- [ ] GPS-Radius (5km)
- [ ] Like-Funktion
- [ ] Chat-Style Kommentare
- [ ] Basis-Auth (Login/Registrierung)

### Phase 2: Engagement (2-3 Monate)
- [ ] Emoji-Reaktionen
- [ ] Reply/Quote
- [ ] Push-Notifications
- [ ] Spot-Speichern (Favoriten)

### Phase 3: Erweiterung (3-6 Monate)
- [ ] Bilder in Posts
- [ ] 1:1 Chat zwischen Usern
- [ ] Gruppen-Chat
- [ ] "Traveling Mode" (Feed an Zielort statt aktuellem Standort)

### Phase 4: Monetarisierung (6+ Monate)
- [ ] Premium-Features (größerer Radius, etc.)
- [ ] Partner-Integrationen (Stellplätze, Werkstätten)

---

## 8. Open Questions

1. **Content-Moderation:** Automatisch oder manuell?
2. **Monetarisierung:** Werbung, Premium, oder beides?
3. **Platform:** iOS-first, Android-first, oder beide gleichzeitig?
4. **Backend:** Firebase, Supabase, oder eigenes?

---

## 9. Tech Stack Empfehlung

**Option A: Schnell & Einfach (MVP)**
- Frontend: Flutter oder React Native
- Backend: Firebase (Firestore, Auth, Functions)
- Hosting: Firebase Hosting

**Option B: Skalierbar & Kontrolliert**
- Frontend: React Native
- Backend: Node.js + Express
- Database: PostgreSQL (PostGIS)
- Hosting: DigitalOcean/Vercel

---

*Letzte Aktualisierung: 2026-02-01*

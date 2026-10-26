# Swiss-Ski Video-Lab

Video-Analyse für Coaches: Ski-Videos lokal öffnen, verlangsamen, Bild für Bild durchgehen, einzeichnen und messen, Läufe vergleichen und mit GPS-Daten verknüpfen.

**Link:** https://video-tool.github.io/vtool/

Videos werden nur im Browser geöffnet und **nie hochgeladen**. Alles steckt in einer Datei (`index.html`), ohne externe Bibliotheken.

## Modi

- **Einzelvideo:** Zeitlupe, Bild für Bild, Zeitleiste mit Vorschaubildern, Loop-Bereich, Marker, Zeichnen & Winkel messen, Standbild (PNG).
- **Vergleich:** A und B nebeneinander oder überlagert, an einem Moment synchronisieren und gemeinsam abspielen.
  - **Ghost:** Zwei Läufe vom gleichen Kamerastandort in einem Bild. Die Kamerabewegung von B wird auf A umgerechnet (lokal im Browser), B erscheint als Geist, mit Zeitabstand live, Grafik «wo gewonnen/verloren» und MP4-Export.
- **GPS:** GPS-Daten eines Laufs mit dem Video verknüpfen. Im Bild: Tempo & Beschleunigung, Fahrlinie (gefärbt nach Tempo, Beschleunigung oder Δ zur Referenz), Laufzeit und Differenz. Darunter das Profil über die Distanz.

## GPS-Datenformat

CSV (Trennzeichen `,` `;` oder Tab), GPX oder JSON. Spaltennamen werden automatisch erkannt:

| Feld | Namen | Pflicht |
|------|-------|---------|
| Zeit | `t`, `time`, `timestamp` – Sekunden, Millisekunden oder ISO-Zeit | ja |
| Breite | `lat`, `latitude` | ja |
| Länge | `lon`, `lng`, `longitude` | ja |
| Höhe | `alt`, `ele`, `elevation` | nein |
| Tempo | `speed` (m/s) oder `speed_kmh` | nein (wird sonst aus den Positionen berechnet) |

JSON-Beispiel:

```json
{ "athlete": "Name", "run": "Lauf 1", "samples": [ { "t": 1793050000.00, "lat": 46.0952, "lon": 7.7512, "alt": 2410 } ] }
```

### Schnittstelle für den automatischen Datenfluss

```js
VideoLab.loadGps(data, { clipName: "Datei.mp4", offset: 1.25 }) // data: Objekt, Array oder CSV/GPX-Text
VideoLab.tracks()
VideoLab.link(trackId, "Datei.mp4", offset)
// oder per postMessage: { type: "vlab:gps", payload: data, options: { clipName } }
```

`offset` = GPS-Zeit (Sekunden ab erstem Punkt) beim Video-Zeitpunkt 0.

Tastenkürzel: in der App unter **?**.

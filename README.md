# Swiss-Ski Video-Lab

Video-Analyse für Coaches: Ski-Videos lokal öffnen, verlangsamen, Bild für Bild durchgehen, einzeichnen und messen, Läufe vergleichen und mit GPS-Daten verknüpfen.

**Link:** https://video-tool.github.io/vtool/

Videos werden nur im Browser geöffnet und **nie hochgeladen**. Alles steckt in einer Datei (`index.html`), ohne externe Bibliotheken.

## Beispiel-Videos

Beim Öffnen des Links sind Beispiel-Läufe geladen: Sölden (26.10.2025, Riesenslalom Herren, Kamera auf der Piste: Meillard, Gratz, Braathen) Courchevel (11.03.2026, Abfahrtstraining, Gegenhang: Boisset, Kriechmayr, Allègre) und Hafjell (Weltcup März 2026, Gegenhang: Riesenslalom Moltzan, Rast; Slalom Holdener, Shiffrin). Sie liegen im Ordner `demo/` (720p) und werden direkt von GitHub Pages abgespielt. Eigene Videos bleiben weiterhin nur auf dem Gerät.

## Modi

- **Einzelvideo:** Zeitlupe, Bild für Bild, Zeitleiste mit Vorschaubildern, Loop-Bereich, Marker, Zeichnen & Winkel messen, Standbild (PNG).
- **Vergleich:** A und B als **Side by Side** oder **Overlay**, an einem Moment synchronisieren und gemeinsam abspielen. «Anleitung» führt direkt im Tool mit den Beispiel-Läufen Schritt für Schritt durch Side by Side bzw. Overlay.
  - **Overlay** in 3 Schritten: (1) beide Videos zum gleichen Moment schieben (z. B. erstes gemeinsames Tor) → «Gemeinsamer Punkt», optional Start/Ende des Ausschnitts setzen; danach springen beim Vorklicken beide mit (Vorsprung sehen). (2) Je 2 feste Referenzpunkte in A und B antippen. (3) «Overlay erstellen» – B wird auf A gelegt und folgt dem Kameraschwenk.
  - **Ghost:** Zwei Läufe vom gleichen Kamerastandort in einem Bild. Die Kamerabewegung von B wird auf A umgerechnet (lokal im Browser), B erscheint als Geist, mit Zeitabstand live (nur dort gemessen, wo die Kamera der Fahrer:in folgt), Grafik «wo gewonnen/verloren» und MP4-Export.
- **GPS:** GPS-Daten eines Laufs mit dem Video verknüpfen. Im Bild: Tempo & Beschleunigung, Fahrlinie (gefärbt nach Tempo, Beschleunigung oder Δ zur Referenz), Laufzeit und Differenz. Darunter das Profil über die Distanz.

## Bedienung

- **Links: «Dateien».** «Ordner wählen» verbindet einen Video-Ordner deines Geräts (Chrome/Edge). Du siehst die Ordnerstruktur, öffnest Videos per Klick, benennst sie um und verschiebst sie per Ziehen. **Brave:** Ohne Einstellung kann der Ordner angesehen und Videos geöffnet werden. Zum Umbenennen/Verschieben einmalig `brave://flags/#file-system-access-api` aktivieren und Brave neu starten. Unter «In Arbeit» stehen die aktuell geladenen Videos – nur diese stehen für A, B und GPS zur Wahl.
- **Unter dem Video:** links In / Out / Loop, in der Mitte Abspielen und Bild-für-Bild, daneben **ein Tempo-Knopf**: jeder Klick wechselt 1× → ½× → ¼× → 0,1× → 1×.
- **Werkzeuge** (Zeichnen, Messen, Bildanpassung) öffnen sich per Klick auf den Stift neben dem Video und sind sonst eingeklappt.
- **fps** stehen oben in der Kopfzeile und werden beim Laden gemessen; Klick darauf, um sie von Hand zu ändern.

## Arbeitsablauf

- **Dateinamen** im Format `Athlet_Ort_JJMMTT_Disziplin_Geschlecht_Lauf.mp4` (z. B. `Meillard_Adelboden_270110_GS_M_L1.mp4`) werden erkannt: Athlet, Ort, Datum, Disziplin und Lauf erscheinen in der Liste und sind durchsuchbar. `T1`/`TR1` = Training 1. Auch die Reihenfolge `athlet_vgh_dh_tr1_ort_JJMMTT` wird erkannt (`vgh`/`camGH` = Kamera Gegenhang, `wc` = Weltcup).
- **Videos bleiben nach Neuladen** in der Liste (Chrome/Edge). Nach einem Neustart des Browsers genügt ein Klick auf «Öffnen».
- **Marker mit Notizen** (`m`), Sprung zum vorherigen/nächsten Marker mit `,` / `.`. Notizen erscheinen im Bild, in der Zeitleiste und im Export.
- **Clip-Export** (`e`): Loop-Bereich, ab aktuellem Bild oder ganzes Video, in 1× bis 0,1× Zeitlupe, mit Zeichnungen, Info-Leiste und Notizen. Im Vergleich A | B nebeneinander, im GPS-Modus mit GPS-Anzeigen. MP4, direkt teilbar.
- **Hilfsraster** (`g`) für Körperwinkel und Lot.
- **Bildanpassung** (Halbkreis-Symbol): Helligkeit, Kontrast, Sättigung, Preset «Schnee» für flaches Licht, Spiegeln (Links-/Rechtsschwung vergleichen). Gilt auch für Export und Standbild.
- **Stroboskop**: mehrere Positionen eines Schwungs in einem Bild (Loop-Bereich). Kameraschwenk und Zoom werden ausgeglichen, das Bild wird bei Bedarf zum Panorama. Voraussetzung: Kamera vom festen Standort.
- **Abschnittszeiten im Vergleich**: Tore in A (`m`) und B (`n`) markieren → Zeit und Δ pro Tor und Abschnitt. Klick auf ein Tor = beide Läufe springen dorthin und werden dort synchronisiert. `Alt`+`←`/`→` bewegt nur B.

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

Nach jedem Push erscheint in offenen Fenstern der Hinweis «Neue Version verfügbar»; «Aktualisieren» lädt die neue Version ohne Cache (`version.json` gehört zum Push dazu).

- **fps** werden direkt aus der Datei gelesen (MP4/MOV), auch am Handy exakt.
- **«In Arbeit»** (geladene Videos): kompakte Liste nach Rennen gruppiert, Umschalter auf «nur Dateinamen».
- **Overlay exportieren**: Clip-Export und Standbild speichern im Overlay das ausgerichtete Bild.

Tastenkürzel: in der App unter **?**.

# BORÜMIR · Version 2

**Board für Organisation, Reihenfolge, Überblick, Meilensteine, Intervalle und Routinen**

Eine kleine persönliche Projektverwaltung, auf Deutsch, für PC und Handy. HTML, CSS und JavaScript; keine Datenbank, keine Anmeldung und keine externen Bibliotheken. Alle App-Dateien sind im Ordner enthalten. Kein Build und kein npm nötig.

## Neu in Version 2

- Gewähltes Logo „Gefährte“ (Schild, Horn und Blatt) in der Titelleiste und als App-Symbol.
- Vollständige Bedeutung von BORÜMIR in der Titelleiste; „Deine Projekte“ ohne Punkt.
- Neuer Reiter **Zeitstrahl** mit Monats-, Dreimonats- und Jahresansicht, Vor/Zurück und Heute.
- Zusätzliches optionales Feldpaar **Übergreifender Projektzeitraum** unter Projekt bearbeiten. Start und Ende gemeinsam setzen oder leer lassen. Bestehende Bearbeitungszeiträume und Deadlines bleiben separat erhalten.
- Der Projektzeitraum bildet einen hellen Hintergrund über Projekt, Aufgaben und Unteraufgaben. Bearbeitung ist blau, Deadlines sind orange Rauten, heute ist eine senkrechte Linie.
- Unteraufgaben erscheinen eingerückt mit ihrem Erledigungsstatus. Sie übernehmen die Zeitangaben der Aufgabe; dies steht an jeder Unteraufgabe und wird mit gestrichelten Balken gekennzeichnet. Keine zusätzlichen Termin-Eingabefelder für Unteraufgaben.
- Ein Klick auf einen Namen im Zeitstrahl öffnet das zugehörige Projekt-/Aufgabenformular. Zeilen ohne Termin und Termine außerhalb des Ausschnitts sind beschriftet. Auf dem Handy ist der Zeitstrahl horizontal scrollbar.

## Update von Version 1 auf GitHub Pages

1. In der bisherigen App **Sicherung exportieren** anklicken.
2. ZIP entpacken. Den gesamten **Inhalt** des Ordners `boruemir` in dasselbe Repository hochladen, vorhandene Dateien ersetzen und die neuen Dateien ebenfalls hinzufügen. `index.html` bleibt auf der obersten Ebene. Das Repository muss nicht gelöscht werden.
3. Veröffentlichung abwarten. App über ihre bisherige Adresse einmal öffnen, damit der neue Service Worker geladen wird.
4. Alle BORÜMIR-Tabs und App-Fenster schließen; anschließend erneut öffnen. Falls noch Version 1 erscheint, den Ablauf wiederholen. Browserdaten nicht löschen.
5. Die Daten bleiben bei gleicher Webadresse und gleichem Browserprofil erhalten. Auch Sicherungen aus Version 1 lassen sich importieren. Der Speicherschlüssel und das kompatibel ergänzte Datenformat bleiben unverändert.
6. Unter Projekt bearbeiten den neuen Projektzeitraum ergänzen und im Reiter Zeitstrahl ansehen.

Bereits installierte App-Symbole werden abhängig vom Betriebssystem eventuell erst später aktualisiert. Der lokale Starter funktioniert unverändert.

## Lokal starten

1. ZIP vollständig entpacken.
2. Python 3 muss installiert sein. Unter Windows anschließend `start-windows.bat` doppelklicken. Ein Terminalfenster bleibt geöffnet; der Browser öffnet sich automatisch.
3. Alternativ ein Terminal im entpackten Ordner `boruemir` öffnen und ausführen:

   ```sh
   python start.py
   ```

   Auf macOS / Linux heißt der Befehl meist `python3 start.py`; unter Windows funktioniert auch `py start.py`.
4. Falls sich der Browser nicht öffnet: `http://localhost:8000` eingeben.
5. Zum Beenden im Terminal Strg+C drücken.

Nicht `index.html` doppelklicken: Für Service Worker und Installation braucht die App einen Webserver. Der beigefügte Starter ist ausschließlich unter localhost erreichbar und macht den PC nicht zum öffentlichen Server.

## In fünf Minuten ausprobieren

1. Mit **+ Projekt** ein Projekt erstellen, etwa Nummer P-001, Name „Wohnung“, Ansprechpartner „Alex“. Projektpriorität Hoch wählen und anpinnen.
2. **+ Aufgabe** → vorhandenes Projekt wählen → Titel „Material bestellen“. Bearbeitung als Kalenderwoche oder Von–bis auswählen; optional eine Deadline setzen.
3. Unteraufgaben zeilenweise eintragen und speichern. Die Unteraufgaben einzeln abhaken; der Fortschritt im Projekt steigt.
4. Mit dem großen Kästchen neben dem Aufgabentitel die ganze Aufgabe abschließen. Sie erscheint unter „Erledigte Aufgaben“. Alle Unteraufgaben werden dabei ebenfalls erledigt.
5. Seite neu laden: Daten bleiben erhalten. Eine Sicherung exportieren und zum Testen wieder importieren.
6. Für Wiederholungen eine Aufgabe auf „Wöchentlich“ setzen und abschließen: Ein neues offenes Vorkommen entsteht; das abgeschlossene bleibt im Verlauf.

## Installation und Offline-Modus

In unterstützten Browsern erscheint **App installieren**, sobald der Browser die Installation anbietet. Nach erfolgreicher Installation sowie beim Start als installierte App ist der Button ausgeblendet. Die Erkennung einer bereits installierten App aus einem normalen Browser-Tab ist browserabhängig; es gibt dafür keine universell verfügbare Erkennung.

Auf iPhone / iPad bietet die Hilfe den Weg über Safari → Teilen → Zum Home-Bildschirm. Die Browser entscheiden selbst, wann eine Installation verfügbar ist.

Die App muss einmal erfolgreich geladen werden, damit ihre Dateien für offline gespeichert sind. Danach alle App-Tabs schließen und erneut öffnen. Zum lokalen Offline-Test kann der Starter danach beendet werden; die App sollte unter derselben Adresse aus dem Cache laden. Änderungen bleiben lokal speicherbar.

Für die Installation auf dem Handy den Ordner bei einem statischen **HTTPS-Webhost** bereitstellen. Eine unverschlüsselte PC-Adresse im WLAN genügt dafür nicht. Daten vom lokalen PC-Test werden nicht automatisch auf das Handy oder eine andere Adresse übertragen; dafür Export / Import verwenden.

## GitHub und Upload

Der Inhalt dieses Ordners kann direkt in das Stammverzeichnis eines GitHub-Repositories. Das Hochladen in ein Repository allein veröffentlicht keine Website. Beim statischen Webhost muss `index.html` in dessen öffentlichem Stammverzeichnis liegen. Alle relativen Pfade funktionieren auch in einem Unterordner, beispielsweise bei GitHub Pages.

Nicht mit hochladen: persönliche Sicherungsdateien. Die `.gitignore` schließt den Standardnamen aus. Die persönlichen Daten selbst liegen im Browserspeicher und sind kein Bestandteil dieses Projektordners.

## Funktionen und Regeln

- Projekte mit festen Feldern **Projektnummer, Name, Ansprechpartner**; nur Name ist Pflicht. Freie Notizen für weitere Angaben.
- Prioliste als Startansicht; separate komplette Projektübersicht mit aufklappbaren Aufgaben.
- Angepinnte Projekte in beiden Ansichten sichtbar; projektübergreifende Fortschrittsanzeige.
- Sortierung: Projektpriorität → Aufgabenpriorität → früheste Deadline → Titel. Aufgaben ohne Deadline folgen innerhalb gleicher Priorität am Ende. Überfälligkeit ist zusätzlich rot gekennzeichnet, hebt aber eine niedrigere Projektpriorität nicht auf.
- Unabhängige, optionale Bearbeitungszeiträume und Deadlines für Projekte und Aufgaben. Projekttermine werden nicht automatisch auf Aufgaben übertragen.
- Datum, Von–bis, ISO-Kalenderwoche (Montag–Sonntag) und ganzer Monat. Deadline bei Woche / Monat bedeutet letzter Tag. Ohne „Bis“ gilt bei Bearbeitung ein einzelner Tag.
- Datumsfelder verwenden die Kalenderauswahl des Browsers. Bei Browsern ohne Wochen-/Monatsauswahl den Wert als `2026-W35` bzw. `2026-09` eingeben.
- Unteraufgaben abhaken, ganze Aufgaben abschließen oder wieder öffnen. Alle Unteraufgaben abzuhaken schließt die ganze Aufgabe nicht automatisch ab.
- Fortschritt zählt Unteraufgaben; eine Aufgabe ohne Unteraufgaben zählt als ein Schritt. Erledigte Vorkommen wiederkehrender Aufgaben bleiben enthalten.
- Wiederholung täglich, wöchentlich oder monatlich: entsteht beim Abschließen, nicht durch einen Hintergrunddienst. Deadline und Bearbeitung werden jeweils um ein Intervall verschoben. Ohne Deadline bekommt das nächste Vorkommen eine Deadline ab Abschlusstag. Versäumte Intervalle werden nicht übersprungen.
- Bei Monaten wird auf den letzten vorhandenen Tag begrenzt: 31. Januar → 28./29. Februar → 28./29. März. Keine feste „letzter Monatstag“-Regel in dieser Version.
- Wiederöffnen und erneutes Abschließen desselben Vorkommens erzeugt keine zweite Folgeaufgabe. Eine bereits angelegte Folgeaufgabe bleibt erhalten. Das Löschen eines Vorkommens löscht nicht die gesamte Serie.
- Laufende Aufgaben haben keine automatische Wiederholung; sie können ohne Termin offen bleiben.
- Erledigte Aufgaben mit Abschlussdatum als einfacher Verlauf. Kein vollständiges Änderungsprotokoll.
- Export / Import einer JSON-Sicherung mit Validierung; Import ersetzt den aktuellen Bestand nach Rückfrage.

## Daten und Grenzen

Die App speichert unter `boruemir.v1` in localStorage. Daten gehören zur jeweiligen Browser-/Adresskombination (einschließlich Port). Immer dieselbe Adresse und dasselbe Browserprofil verwenden. Beim Löschen von Website-Daten können sie verloren gehen. Sicherungen regelmäßig separat aufbewahren. Keine Synchronisation, Benutzerkonten, Push-Erinnerungen, Suche oder vollständige Kalenderübersicht in dieser Version.

Speicherfehler werden angezeigt; unlesbare vorhandene Daten werden nicht still überschrieben. Die Importdatei ist auf 5 MB begrenzt. Mehrere offene Tabs aktualisieren sich bei Speicheränderungen; ein offenes Formular wird dabei geschlossen, um veraltete Änderungen zu verhindern. Gleichzeitiges Bearbeiten in mehreren Tabs vermeiden.

## Dateien

```text
boruemir/
├── index.html
├── manifest.webmanifest
├── sw.js
├── start.py
├── start-windows.bat
├── README.md
├── LICENSE
├── .gitignore
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── core.js
│   │   ├── timeline.js
│   │   ├── app.js
│   │   └── install.js
│   └── icons/
│       ├── logo.png
│       ├── favicon.svg
│       ├── icon-192.png
│       ├── icon-512.png
│       ├── icon-maskable-512.png
│       └── apple-touch-icon.png
└── docs/
    └── pruefung.md
```

Die Funktionen sind für diese kleine erste Version in vier verständlichen JavaScript-Dateien gebündelt. Bei späteren Updates die Cache-Versionsnummer in `sw.js` erhöhen und alle App-Tabs schließen, damit die neue Version aktiv wird. Nutzerdaten liegen getrennt vom Datei-Cache.

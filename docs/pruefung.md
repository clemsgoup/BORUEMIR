# Prüfung der ersten Version

Stand: 8. September 2026.

Automatisch geprüft:

- JavaScript-Syntax aller drei Module und des Service Workers.
- Python-Syntax des lokalen Starters.
- Alle im HTML, Manifest und Service Worker referenzierten lokalen Dateien vorhanden.
- ISO-Kalenderwoche 35/2026 sowie Kalenderwoche 1 über den Jahreswechsel.
- Februar im Schaltjahr und ungültige Datums-/Wochenwerte.
- Monatliche Verschiebung am Monatsende und wöchentliche Verschiebung über den Jahreswechsel.
- Wiederholte Aufgaben erhalten einen neuen Termin und offene Unteraufgaben; das vorherige Vorkommen bleibt erhalten.
- Importvalidierung für gültige Daten, unbekannte Projektverweise, doppelte IDs und umgekehrte Zeiträume.
- Projektpriorität hat bei der Sortierung Vorrang vor der Deadline.

Nicht in einem echten Browser oder auf einem Mobilgerät geprüft: Bedienung, responsive Darstellung, tatsächlicher Installationsdialog und Offline-Lebenszyklus. Die Installationsmöglichkeit hängt von Browser, Betriebssystem und Bereitstellung ab.

Die Schritt-für-Schritt-Probe in README.md dient als lokaler Funktionstest. Anschließend zusätzlich eine Sicherung exportieren, Seite neu laden und einen Wiederholungsfall abschließen. Installation und Offline-Modus auf dem eigenen Zielgerät ausprobieren.

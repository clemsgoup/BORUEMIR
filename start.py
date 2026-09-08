"""Startet BORÜMIR ausschließlich auf diesem PC. Keine Zusatzpakete nötig."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
import webbrowser

root = Path(__file__).resolve().parent
try:
    with ThreadingHTTPServer(('localhost', 8000), partial(SimpleHTTPRequestHandler, directory=str(root))) as server:
        print('BORÜMIR läuft unter http://localhost:8000')
        print('Zum Beenden: Strg+C. Dieses Fenster während der Nutzung geöffnet lassen.')
        webbrowser.open('http://localhost:8000')
        server.serve_forever()
except KeyboardInterrupt:
    print('\nBORÜMIR beendet.')
except OSError as error:
    print(f'Start fehlgeschlagen: {error}')
    print('Ist BORÜMIR bereits gestartet? Öffne http://localhost:8000 im Browser.')

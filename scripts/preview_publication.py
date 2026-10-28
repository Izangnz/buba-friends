#!/usr/bin/env python3
"""Serve only a snapshot of docs/, under a repository-like subpath."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import mimetypes
from pathlib import Path
import shutil
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=4175)
    args = parser.parse_args()
    if not (ROOT / 'docs/index.html').is_file():
        raise SystemExit('Primero ejecuta python3 scripts/prepare_publication.py')
    mimetypes.add_type('application/manifest+json', '.webmanifest')
    with tempfile.TemporaryDirectory(prefix='buba-preview-') as temporary:
        shutil.copytree(ROOT / 'docs', Path(temporary) / 'buba-friends')
        handler = partial(SimpleHTTPRequestHandler, directory=temporary)
        with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
            print(f'Buba Friends: http://127.0.0.1:{args.port}/buba-friends/', flush=True)
            print('Vista aislada de docs/. Tras regenerarla, reinicia esta vista previa. Ctrl+C para salir.', flush=True)
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                pass


if __name__ == '__main__':
    main()

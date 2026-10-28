#!/usr/bin/env python3
"""Verify the isolated static bundle over real HTTP at / and /buba-friends/. No browser."""
from functools import partial
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import mimetypes
from pathlib import Path
import shutil
import struct
import tempfile
from threading import Thread
from urllib.parse import urljoin, urlsplit
from urllib.request import urlopen

from prepare_publication import ROOT, runtime_files


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for name in ('src', 'href'):
            if name in attrs:
                self.urls.append(attrs[name])


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def main():
    bundle = ROOT / 'docs'
    expected = set(runtime_files()) | {'.nojekyll'}
    actual = {str(p.relative_to(bundle)) for p in bundle.rglob('*') if p.is_file()}
    assert actual == expected, (actual - expected, expected - actual)
    for name in expected - {'.nojekyll'}:
        assert (ROOT / name).read_bytes() == (bundle / name).read_bytes(), name
    for name, size in [('apple-touch-icon.png', 180), ('favicon-32.png', 32), ('icon-192.png', 192), ('icon-512.png', 512)]:
        data = (bundle / 'codificacion/assets' / name).read_bytes()
        assert data[:8] == b'\x89PNG\r\n\x1a\n'
        assert struct.unpack('>II', data[16:24]) == (size, size)
    for name in ['index.html', 'codificacion/app.js', 'codificacion/styles.css', 'codificacion/stories.js', 'codificacion/stories-ui.js', 'manifest.webmanifest']:
        contents = (bundle / name).read_text()
        assert 'localhost' not in contents and '127.0.0.1' not in contents
        assert 'serviceWorker' not in contents
    links = Links()
    links.feed((bundle / 'index.html').read_text())
    manifest = json.loads((bundle / 'manifest.webmanifest').read_text())
    assert manifest['name'] == 'Buba Friends'
    assert manifest['start_url'] == manifest['scope'] == manifest['id'] == './'
    mimetypes.add_type('application/manifest+json', '.webmanifest')
    for subpath in ('', 'buba-friends/'):
        with tempfile.TemporaryDirectory(prefix='buba-check-') as temporary:
            isolated = Path(temporary) / subpath
            isolated.mkdir(parents=True, exist_ok=True)
            shutil.copytree(bundle, isolated, dirs_exist_ok=True)
            handler = partial(QuietHandler, directory=temporary)
            with ThreadingHTTPServer(('127.0.0.1', 0), handler) as server:
                worker = Thread(target=server.serve_forever, daemon=True)
                worker.start()
                origin = f'http://127.0.0.1:{server.server_port}/{subpath}'
                for link in links.urls + [i['src'] for i in manifest['icons']]:
                    assert not urlsplit(link).scheme and not link.startswith('/'), link
                    assert urljoin(origin, link).startswith(origin), link
                for name in sorted(expected):
                    with urlopen(urljoin(origin, name)) as response:
                        assert response.status == 200, name
                        assert response.read() == (isolated / name).read_bytes(), name
                        if name == 'manifest.webmanifest':
                            assert response.headers.get_content_type() == 'application/manifest+json'
                # The start URL resolves to the bundle's own index, never the server root.
                with urlopen(urljoin(origin, manifest['start_url'])) as response:
                    assert response.read() == (isolated / 'index.html').read_bytes()
                server.shutdown()
                worker.join()
            print(f'HTTP real en /{subpath}: {len(expected)} archivos correctos, aislamiento y manifest relativo verificados.')
    print('Iconos PNG 32/180/192/512 correctos. Sin localhost obligatorio ni service worker. Sin revisión visual.')


if __name__ == '__main__':
    main()

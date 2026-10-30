#!/usr/bin/env python3
"""Create the static Pages candidate from an explicit, reviewed runtime allowlist."""
import json
from pathlib import Path
import shutil
import tempfile

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'docs'


def runtime_files():
    source = (ROOT / 'codificacion/app.js').read_text()
    catalog = json.loads(source.split('const profiles = ', 1)[1].split(';\nconst fresh', 1)[0])
    assert len(catalog) == len({p['id'] for p in catalog}) == 30
    files = [
        'index.html', 'manifest.webmanifest',
        'codificacion/app.js', 'codificacion/styles.css', 'codificacion/discovery.js',
        'codificacion/stories.js', 'codificacion/stories-ui.js', 'codificacion/profile-photo.js', 'codificacion/collections-ui.js', 'codificacion/collection-cover.js', 'codificacion/conversation-swipe.js',
        *['codificacion/assets/stories/' + name for name in ('gallery.svg', 'trail.svg', 'music.svg')],
        *['codificacion/assets/' + name for name in (
            'logo-horizontal.svg', 'logo-heart.svg', 'favicon-32.png',
            'apple-touch-icon.png', 'icon-192.png', 'icon-512.png',
            'welcome-date.jpg',
        )],
    ]
    for profile in catalog:
        files.extend([f"codificacion/assets/portraits/{profile['id']}.jpg", profile['thumbnail']])
        for image in profile.get('images', []):
            files.append(image if isinstance(image, str) else image['src'])
    for name in files:
        path = ROOT / name
        assert path.is_file() and not path.is_symlink(), name
        assert path.resolve().is_relative_to(ROOT), name
    return sorted(set(files))


def main():
    files = runtime_files()
    # Never replace unrelated/unrecognized files silently.
    if OUTPUT.exists():
        existing = {str(p.relative_to(OUTPUT)) for p in OUTPUT.rglob('*') if p.is_file()}
        unknown = existing - set(files) - {'.nojekyll'}
        if unknown:
            raise SystemExit('Archivos ajenos en docs; revisar antes de regenerar: ' + ', '.join(sorted(unknown)))
    with tempfile.TemporaryDirectory(prefix='buba-pages-') as temporary:
        staging = Path(temporary) / 'docs'
        staging.mkdir()
        for name in files:
            target = staging / name
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(ROOT / name, target)
        (staging / '.nojekyll').touch()
        OUTPUT.mkdir(exist_ok=True)
        shutil.copytree(staging, OUTPUT, dirs_exist_ok=True)
    print(f'docs/ preparada: {len(files) + 1} archivos de ejecución; sin pruebas, ZIP ni materiales de trabajo.')


if __name__ == '__main__':
    main()

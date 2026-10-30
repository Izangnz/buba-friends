# Buba Friends

Demo para la presentación del viernes 30 de octubre de 2026.

**Web publicada · versión 20261031-2:** https://izangnz.github.io/buba-friends/?v=20261031-2

**Repositorio:** https://github.com/Izangnz/buba-friends

```sh
python3 scripts/prepare_publication.py
python3 scripts/preview_publication.py --port 4175
```

Vista aislada: **http://127.0.0.1:4175/buba-friends/**. Pages publica `main` → `/docs`.

[Guía, recorrido de tres minutos, pruebas y pendientes en iPhone](codificacion/README.md).


Incluye Historias locales con imágenes en IndexedDB, caducidad de 24 horas, destacadas y respuestas al chat. Las coincidencias y contenidos de ejemplo son simulados. No hay envíos a personas reales.

Publicación confirmada mediante GitHub CLI con la cuenta Izangnz, HTTPS y despliegue correcto. Entrada HTTP 200 y todos los archivos de ejecución comparados con `docs/`. Los datos del puerto local no se transfieren al dominio publicado. La revisión visual y táctil en iPhone sigue pendiente.

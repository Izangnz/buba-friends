# Candidata de conversaciones · 30/10/2026

Base: candidata/perfil-personal-20261030, commit 82e0ac2, árbol limpio. Nueva rama: candidata/conversaciones-20261030. Recuperación inicial: recuperacion-antes-conversaciones-20261030. No publicar, no integrar en main, no tocar Hábitos ni datos del navegador.

- [x] Identificar/conservar la candidata anterior y crear recuperación/rama.
- [x] Modelo compatible: mensajes con ID/fecha/referencia, borradores y archivo.
- [ ] Conexiones: búsqueda, nuevas/conversaciones/archivadas, actividad y vacíos.
- [ ] Chat: composición, respuesta/copia/borrado, controles y scroll/foco.
- [ ] Historias: referencias, caducidad y guardado sin duplicados.
- [ ] Pruebas/regresiones, intento visual, paquete, vista previa y guía.

Prueba de modelo completada mediante DOM/almacenamiento aislados: IDs estables sin escribir al arrancar, conservación de campos antiguos y ausencia de fechas inventadas; borradores separados, archivo/recuperación, actividad, eliminación/vaciado y rollback ante error. Regresiones de interacción existentes incluidas al cargar el harness.

Siguiente paso exacto: integrar listado con búsqueda y compositor de chat con referencias, acciones y restauración de scroll.

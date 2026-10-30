# Candidata de conversaciones · 30/10/2026

Base: candidata/perfil-personal-20261030, commit 82e0ac2, árbol limpio. Nueva rama: candidata/conversaciones-20261030. Recuperación inicial: recuperacion-antes-conversaciones-20261030. No publicar, no integrar en main, no tocar Hábitos ni datos del navegador.

- [x] Identificar/conservar la candidata anterior y crear recuperación/rama.
- [x] Modelo compatible: mensajes con ID/fecha/referencia, borradores y archivo.
- [x] Conexiones: búsqueda, nuevas/conversaciones/archivadas, actividad y vacíos.
- [x] Chat: composición, respuesta/copia/borrado, controles y scroll/foco.
- [x] Historias: referencias, caducidad y guardado sin duplicados.
- [ ] Pruebas/regresiones, intento visual, paquete, vista previa y guía.

Prueba de modelo completada mediante DOM/almacenamiento aislados: IDs estables sin escribir al arrancar, conservación de campos antiguos y ausencia de fechas inventadas; borradores separados, archivo/recuperación, actividad, eliminación/vaciado y rollback ante error. Regresiones de interacción existentes incluidas al cargar el harness.

Implementado: listado con nuevas conexiones hasta abrirlas, búsqueda insensible a acentos, conversaciones por última fecha conocida y archivadas visibles. Chat con textarea de hasta 1000 caracteres/136 px, fechas conocidas y grupo sin fecha para mensajes antiguos; respuestas navegables/cancelables, copiar con alternativa manual y eliminar propio con confirmación. Menú de archivo/recuperación, vaciado y eliminar conexión con rollback si falla el guardado. Eliminar conexión conserva decisiones, perfil/fotos, otras conversaciones y biblioteca de Historias.

Pruebas adicionales: ocho baterías PASS (interacción, conversaciones, perfil personal, Historias, música, galería/foto, disposición de Descubrir y colecciones). Recorridos UI simulados de búsqueda/apertura, dos borradores, envío y formulario antiguo sin duplicados, citas/cancelación/borrado con referencia neutra, navegación a original, perfil y restauración de scroll/foco, menú con cancelar/confirmar, archivo/recuperación/vaciado/eliminar, recarga y fallos. Historias: doble envío, mensaje con ID/fecha/referencia sin imagen, rollback y reintento si falla localStorage, rechazo tras caducar y limpieza de imagen sin borrar texto del chat. Fixtures del viewport visual, sin comprobar píxeles ni teclado real.

Revisión visual intentada: inventario de herramientas sin navegadores, error «The browser access host is unavailable». No se afirma diseño móvil verificado. Pendientes manuales: 375/390 px, escritorio, Safari/iPhone con teclado, tacto, scroll, Tab y foco, portapapeles real.

Siguiente paso exacto: revisar conservación del catálogo y controladores de Descubrir, guardar el commit de interfaz/Historias y regenerar/verificar el paquete publicable.

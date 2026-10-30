# Candidata de conversaciones · 30/10/2026

Base: candidata/perfil-personal-20261030, commit 82e0ac2, árbol limpio. Nueva rama: candidata/conversaciones-20261030. Recuperación inicial: recuperacion-antes-conversaciones-20261030. No publicar, no integrar en main, no tocar Hábitos ni datos del navegador.

- [x] Identificar/conservar la candidata anterior y crear recuperación/rama.
- [x] Modelo compatible: mensajes con ID/fecha/referencia, borradores y archivo.
- [x] Conexiones: búsqueda, nuevas/conversaciones/archivadas, actividad y vacíos.
- [x] Chat: composición, respuesta/copia/borrado, controles y scroll/foco.
- [x] Historias: referencias, caducidad y guardado sin duplicados.
- [x] Ocho baterías de lógica/regresiones, intento de acceso a navegador y paquete HTTP verificado.
- [x] Vista previa y guía conjunta de cinco minutos.
- [ ] Revisión visual/manual real de móvil, escritorio e iPhone (herramienta indisponible).

Prueba de modelo completada mediante DOM/almacenamiento aislados: IDs estables sin escribir al arrancar, conservación de campos antiguos y ausencia de fechas inventadas; borradores separados, archivo/recuperación, actividad, eliminación/vaciado y rollback ante error. Regresiones de interacción existentes incluidas al cargar el harness.

Implementado: listado con nuevas conexiones hasta abrirlas, búsqueda insensible a acentos, conversaciones por última fecha conocida y archivadas visibles. Chat con textarea de hasta 1000 caracteres/136 px, fechas conocidas y grupo sin fecha para mensajes antiguos; respuestas navegables/cancelables, copiar con alternativa manual y eliminar propio con confirmación. Menú de archivo/recuperación, vaciado y eliminar conexión con rollback si falla el guardado. Eliminar conexión conserva decisiones, perfil/fotos, otras conversaciones y biblioteca de Historias.

Pruebas adicionales: ocho baterías PASS (interacción, conversaciones, perfil personal, Historias, música, galería/foto, disposición de Descubrir y colecciones). Recorridos UI simulados de búsqueda/apertura, dos borradores, envío y formulario antiguo sin duplicados, citas/cancelación/borrado con referencia neutra, navegación a original, perfil y restauración de scroll/foco, menú con cancelar/confirmar, archivo/recuperación/vaciado/eliminar, recarga y fallos. Historias: doble envío, mensaje con ID/fecha/referencia sin imagen, rollback y reintento si falla localStorage, rechazo tras caducar y limpieza de imagen sin borrar texto del chat. Fixtures del viewport visual, sin comprobar píxeles ni teclado real.

Revisión visual intentada: inventario de herramientas sin navegadores, error «The browser access host is unavailable». No se afirma diseño móvil verificado. Pendientes manuales: 375/390 px, escritorio, Safari/iPhone con teclado, tacto, scroll, Tab y foco, portapapeles real.

Conservación verificada byte a byte: catálogo, controlador de gestos/disposición de Descubrir, profile-photo.js y reglas CSS anteriores. Commits de etapa: 9f4ec7f y fa83717. Paquete 20261030-5 regenerado con 79 archivos: HTTP real correcto en raíz y /buba-friends/, fuentes/copias idénticas.

Acabado final del compositor: no se recorta el contenedor de envío; textarea ajustada a la altura útil, citas limitadas a dos líneas y textos secundarios compactados por debajo de 460 px de viewport. Comprobado solo con lógica/fixtures; sigue pendiente teclado real.

Vista previa arrancada: http://127.0.0.1:4177/buba-friends/. Guía completa y recorrido de cinco minutos en codificacion/README.md. Ninguna conversación de prueba se inyectó en el guardado del usuario. Las destacadas ajenas no existen en el catálogo actual; las propias siguen sin permitir respuesta.

Siguiente paso exacto: abrir la vista conjunta a 375/390 px y escritorio, recorrer la guía con datos de ensayo y revisar Safari/iPhone con teclado, orientación, áreas seguras, scroll interno, Tab/foco y portapapeles. Corregir hallazgos visuales antes de aprobar cualquier publicación. No hay funciones disponibles del alcance aplazadas; queda la validación manual indicada.

## Publicación autorizada · 31/10/2026

El usuario revisó la candidata y autorizó expresamente integrarla y publicarla para probar en móvil. Se verificó árbol limpio, origin/main actualizado y ascendencia de la candidata completa (incluye 82e0ac2 y ambas etapas de perfil). Recuperación pública anterior: recuperacion-publica-antes-conversaciones-20261030, sobre 86f2f0203525748405d092e74b374326df765931. Integración en main mediante fast-forward, sin perder historial ni trabajo pendiente.

Candidata funcional c89fb772b6302f1e377b2ee013ccd174db40c7c6 enviada al repositorio existente Izangnz/buba-friends. Se repitieron ocho baterías simuladas y sintaxis, regeneración de docs/ y HTTP real de 79 archivos en raíz y subruta. No se leyó, reinició ni borró almacenamiento del navegador. Compatibilidad de perfiles anteriores, migración de foto, Historias/colecciones y mensajes/borradores comprobada con almacenamiento aislado; Safari/iPhone real sigue pendiente.

Versión pública: 20261030-5. Se comprobará el despliegue del commit final y la igualdad byte a byte de los recursos servidos con docs/ antes de entregar. Siguiente paso exacto: confirmar Pages completado con éxito y todos los recursos públicos; después realizar el recorrido de iPhone documentado, sin reiniciar datos existentes.

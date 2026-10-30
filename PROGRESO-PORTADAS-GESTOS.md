# Portadas visuales y archivo por gesto · 31/10/2026

Base main b5fe745 (versión publicada completa). Árbol inicial limpio. Rama candidata/portadas-gestos-20261031. Recuperación inicial recuperacion-antes-portadas-gestos-20261031. Sin publicación ni acceso al almacenamiento del navegador.

- [x] Inspección, recuperación y rama.
- [x] Portada visual, encuadre/subida, guardado atómico y conservación.
- [x] Gesto de filas independiente, acción y alternativas accesibles.
- [x] Diez baterías de lógica/regresiones y sintaxis PASS; intento visual bloqueado por herramientas.
- [x] Paquete docs/ de 81 archivos comprobado por HTTP real en raíz y subruta.
- [ ] Revisión visual/táctil real en móvil/escritorio/iPhone.
- [x] Commit de implementación fbc832e, vista previa aislada y guía de cinco minutos.

Implementado: miniaturas de imágenes seleccionadas en creación/edición, portada circular, subida opcional y borrador de encuadre/zoom mediante BubaPhoto.drawCrop. La portada independiente se guarda como JPEG en coverImage/coverKey del registro de colección en meta (misma base/version), fuera de storyIds y del almacén de historias. Cancelar no escribe. Lectura antigua por coverId intacta; una portada recortada es una copia independiente y puede seguir usándose aunque se quite su imagen de origen del recorrido. Borrar una colección libera solo sus metadatos/portada, sin tocar imágenes de otras colecciones. URLs temporales liberadas al cerrar/cancelar; URLs guardadas invalidadas por coverKey al sustituir.

Gesto exclusivo de filas: izquierda revela Archivar/Desarchivar, umbral 56 px, desplazamiento máximo 112 px, scroll vertical nativo, captura/cancelación segura, clic posterior bloqueado, solo una fila abierta, cierre fuera/Escape/blur. El menú del chat conserva las acciones. No se añade eliminar al gesto. Limpieza de controladores al reconstruir/cambiar de lista.

Pruebas: diez baterías PASS mediante runtime Node de herramientas (interacción, conversaciones, perfil, Historias, música, fotos, disposición de Descubrir, colecciones, editor de portada y gesto de filas). Nuevas pruebas cubren selección/subida/encuadre/cancelar/cerrar durante carga, creación/recarga, límites/fallos/GC compartido; gesto corto/vertical/horizontal/cancelación/pérdida de captura/clic/una fila/fuera/Escape/archivo/desarchivo y borrador intacto. Son DOM/canvas/IndexedDB simulados, no revisión visual. Comparación exacta del catálogo, gesto/disposición de Descubrir, galería y visor de Historias; foto y CSS anteriores conservados.

Revisión visual intentada: inventario sin navegadores, error «The browser access host is unavailable». Pendiente verificar círculos, miniaturas, scroll táctil y selector del dispositivo en móvil/escritorio/iPhone reales.

Comprobaciones adicionales completadas: portada al crear colección en una sola transacción, selección de miniatura al editar, cancelar, error de cuota conservando diálogo y portada, Blob en meta con confirmación/aborto del repositorio IndexedDB simulado, foto de perfil independiente intacta. Ajustar portada actual disponible también para portadas subidas previamente.

Vista previa: http://127.0.0.1:4178/buba-friends/ · versión 20261031-1. Guía de prueba en codificacion/README.md.

Siguiente paso exacto: revisar el recorrido descrito a 375/390 px y escritorio y en iPhone real, prestando atención al círculo, selección de archivo/encuadre/recarga y gesto horizontal frente al scroll vertical. Corregir los hallazgos antes de aprobar publicación. No se ha publicado, hecho push ni integrado en main.

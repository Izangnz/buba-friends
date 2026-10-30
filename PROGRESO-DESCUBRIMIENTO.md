# Descubrimiento personalizado · 31/10/2026

Base main c01ed5a, estado inicial limpio. Rama mejora/descubrimiento-20261031. Recuperación inicial recuperacion-antes-descubrimiento-20261031. Publicación directa autorizada; sin acceso al almacenamiento personal ni cambios a Hábitos.

- [x] Inspección y recuperación.
- [x] Modelo puro compatible: filtros por categorías, intereses OR, intención conservadora, normalización y orden estable.
- [x] Tarjetas/Explorar persistentes, Guardados privados, detalle con acciones, estados e impedimento de intereses repetidos.
- [x] Once baterías/sintaxis PASS, intento visual bloqueado, paquete HTTP de 82 archivos y guía de cinco minutos.
- [ ] Revisión visual y táctil real en iPhone/escritorio, a realizar después de publicar.
- [x] Integrado y publicado en main; Pages exitoso y 81 recursos HTTPS iguales a docs/.

Implementación: discovery.js contiene reglas locales sin red. Se preserva el catálogo exacto. Solo «relación estable/algo estable» y la frase explícita de dejar que pase lo que tenga que pasar se clasifican desde las descripciones existentes; las frases ambiguas no se asignan. Opciones propias exactas reconocidas. No hay artistas en el catálogo actual: no se han fabricado. Coincidencias por nombres sin acentos/mayúsculas cuando no hay dos IDs conocidos; con dos IDs se exige mismo proveedor e ID. Un punto por cada interés/artista único y por misma intención explícita; empates mantienen orden de catálogo, cero puntos conserva orden habitual.

Datos nuevos en la misma clave buba-friends-v1: discoveryView, discoveryOrder, savedProfiles y likes. Filtro antiguo interest migra a interests sin escribir al arrancar; se mantiene el campo de compatibilidad. Las decisiones antiguas sin distinción de interés/pasar se muestran como revisión anterior, sin inventar su tipo. Guardados no altera decisiones/matches/mensajes y permanece tras Volver a ver perfiles. Likes conocidos/conexiones impiden repetir interés. Guardados incluye perfiles ya revisados fuera del conjunto pendiente y al margen de filtros, indicado en pantalla.

Once baterías PASS con DOM/almacenamiento/viewport simulados: las diez anteriores más discovery.test.cjs. Comprobados OR/AND, IDs musicales (incluidos distintos ID con mismo nombre), intención desconocida, orden estable/fallback, cambio de vistas, filtro provisional/cancelar/aplicar/quitar, recarga de guardados/vista, perfiles pasados/ya interesados/conectados, ausencia de duplicados, edición real del formulario y cancelación del arrastre antes de cambiar orden. Errores de localStorage revierten filtros, vista y guardados. Comparación byte a byte del catálogo, gesto/disposición de Descubrir, galería y módulos de fotos/Historias/portadas/gesto de conversación.

Navegador: inventario sin host («The browser access host is unavailable»). Pendiente revisión visual y táctil en móvil/escritorio/iPhone; no bloquea publicar según autorización permanente.

Commit de implementación 9faf357. Paquete regenerado: 82 archivos HTTP correctos en raíz y /buba-friends/, con igualdad de fuentes y copias. Guía, regla de afinidad y clasificación conservadora de intención documentadas en codificacion/README.md.

Publicación funcional verificada: commit c5b0fde377418b07a18031b3869b8c86d115424e. Pages https://github.com/Izangnz/buba-friends/actions/runs/41145642336 completado con success. Los 81 recursos públicos de ejecución coinciden byte a byte con docs/ (el archivo 82 es .nojekyll). Recuperación pública anterior recuperacion-publica-antes-descubrimiento-20261031 sobre c01ed5a. Estado local conservado, sin leer/borrar datos del navegador.

Enlace público: https://izangnz.github.io/buba-friends/?v=20261031-2.

Siguiente paso exacto: realizar el recorrido de cinco minutos en iPhone del README: editar intereses/intención, alternar Tarjetas/Explorar, aplicar/quitar/cancelar filtros, cambiar orden, guardar un perfil, decidir y comprobarlo en Guardados tras recarga. Revisar apariencia, scroll, teclado, foco y tacto; informar de fallos para corregir y republicar. El commit posterior de registro conserva idénticos los archivos de ejecución y su despliegue se confirma antes de la entrega.

# Retratos originales de muestra

Recursos locales creados con la herramienta integrada image_gen el 28 de octubre de 2026 para dos adultos ficticios. No se usaron fotografías, famosos ni referencias de personas reales. Los PNG conservan los metadatos de procedencia de la herramienta. No hay peticiones a servicios externos al usar la demo.

- `martina-v2.png`: resultado seleccionado tras reforzar el acabado pictórico de la primera generación. Pelo corto castaño rizado, piel oliva, sobrecamisa y luz cálida en un taller.
- `gabriel-v1.png`: resultado seleccionado de la generación de Gabriel. Piel morena, pelo oscuro ondulado, barba corta, camiseta y camisa sencilla.

Ambos archivos se inspeccionaron visualmente como imágenes. La revisión real del diseño a 390 px o en escritorio sigue pendiente. Los 28 retratos que faltaban ya se han generado y sustituido por ilustraciones originales; no quedan SVG provisionales en el catálogo activo.

## Prompts utilizados (herramienta integrada, no CLI)

### Martina, generación inicial

Use case: illustration-story. Create ONE original vertical portrait illustration for a fictional adult dating demo, no real person reference. Subject: Martina, clearly adult 23-year-old woman, attractive natural expressive features, olive skin, short curly chestnut hair, warm knowing smile, informal overshirt over a plain top, bicycle mechanic. Carefully painted semi-realistic editorial portrait, softly visible brush texture, warm natural afternoon lighting, nuanced face anatomy, not a photograph, not a geometric avatar, no anime. Chest-up composition, entire head with generous headroom, face in upper third, lower chest uncluttered so UI may crop safely. Muted warm workshop background subtly hinting at bicycles, no text, no logos, no watermark. Palette harmonizes with pale pink, raspberry and plum UI without tinting skin pink. This is first in a matching two-portrait series, consistent soft painterly technique. Save generated image as an available local artifact.

### Martina, edición seleccionada

Edit this generated fictional Martina portrait only to make the illustration technique unmistakably painterly and match the soft painted editorial portrait series. Preserve her face, age 23 adult appearance, olive skin, short chestnut curls, overshirt, pose, warmth and framing. Render skin, hair and background with clearly visible soft gouache/oil brush strokes, matte painted texture and slightly simplified tonal planes. Eliminate the photographic microdetail / lens rendering, especially background and skin. Still semi-realistic, attractive natural expressive anatomy, not cartoon or geometric. Warm light. No text, logos or watermark.

La referencia de esta edición fue únicamente la primera imagen generada de Martina.

### Gabriel

Use case: illustration-story. ONE original vertical portrait for the same fictional adult dating demo portrait series: semi-realistic editorial painted illustration with subtle brush texture, warm afternoon light, natural expressive facial anatomy, NOT a photo or geometric avatar. Gabriel, clearly adult 28-year-old male editorial illustrator, warm brown skin, dark wavy hair, short neatly trimmed beard, observant kind eyes and relaxed quiet-humour smile. Simple off-white T-shirt with a muted plum casual shirt, understated personality. Face distinct from Martina: longer face, broader nose, dark expressive eyebrows. Chest-up portrait with full head and generous headroom, face in upper third, lower chest uncluttered for safe UI cropping. Soft warm neutral studio background with subtle sketchbook hint, no text, no branding, no watermark, no real person likeness. Soft painterly realism, warm light, tactile brushwork, not glossy 3D, not anime. Matching Martina's olive-skinned curly-haired bicycle mechanic portrait in medium and lighting, but clearly different face.


## Catálogo completo (30/30)

Se generaron 28 retratos nuevos con la herramienta integrada image_gen, uno por personaje pendiente, manteniendo las dos muestras aprobadas. Se inspeccionaron visualmente todos en `catalogo-contacto.jpg` y se revisó aparte un montaje de recortes aproximados de las tarjetas. No se usaron referencias de personas reales. No hay retratos pendientes.

Los prompts exactos de las 28 generaciones, con identificador, edad y descripción visual, están en `generation-prompts.json`. Los prompts originales de Martina y Gabriel figuran arriba. El lenguaje común fue ilustración editorial semirrealista, pincelada visible de óleo/gouache, textura mate y luz cálida, con rasgos, poses, ropa y fondos distintos. No son fotografías ni avatares geométricos.

`portraits/<id>.jpg` son derivados optimizados con lado mayor 960 px y JPEG calidad 82; `portraits/<id>-thumb.jpg` son miniaturas de 180 px, calidad 75. Se usó la herramienta de sistema sips, sin añadir dependencias a la app. El original generado permanece en la ubicación de generación; los dos PNG aprobados del proyecto permanecen intactos. La procedencia documentada de las generaciones se conserva aquí y en los prompts; los derivados comprimidos no se presentan como archivos fuente con metadatos originales intactos.

Los 30 retratos y las 30 miniaturas suman aproximadamente 6,44 MiB; el JPEG más pesado ronda 249 KiB y la miniatura mayor 13 KiB. Solo se solicita el retrato de la tarjeta actual; las conexiones usan miniaturas con carga diferida. La hoja de contacto es un archivo aparte y no se carga automáticamente en la demo.

Se ajustó el punto de recorte hacia la parte superior (12%) para dejar más aire sobre las cabezas. La inspección de imágenes y montajes no es una prueba real de navegador. Quedan pendientes recortes reales, legibilidad, foco y navegación a 390 px y escritorio porque Computer Use no tiene permisos.


## Ilustración de bienvenida (independiente del catálogo)

`welcome-date-original.png` es una nueva generación original con la herramienta integrada image_gen, sin imágenes de referencia y sin reutilizar retratos. Dos adultos ficticios de unos 25–30 años comparten una mirada y sonrisa en una primera cita, con luz cálida, tonos rosas suaves y pincelada semirrealista. No contiene texto, nombres, edades ni etiquetas.

Original PNG: 1536 × 1024. Derivado `welcome-date.jpg`: 1200 × 800, JPEG calidad 82 mediante sips, sin recorte; aproximadamente 236 KiB. Ambos están guardados en el proyecto. El prompt completo y método figuran en `welcome-generation.json`. Solo el JPEG se publica en `docs/`.

Se inspeccionaron el original, el derivado y reducciones a 343/358 px: ambas caras permanecen completas. La bienvenida usa altura automática para mostrar el encuadre entero. No son capturas del navegador; la adaptación y legibilidad de la interfaz a 375/390 px y escritorio siguen pendientes de revisión real.

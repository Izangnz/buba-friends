# Buba Friends · candidata para el viernes 30 de octubre de 2026

Demo local para adultos, con 30 personajes ficticios, ilustraciones originales, coincidencias programadas y mensajes locales. Sin cuentas reales, respuestas automáticas, servidor de producto ni pagos. Música escrita a mano y enlaces opcionales a Spotify, sin conexión de cuentas. Web publicada: **https://izangnz.github.io/buba-friends/**.

## Vista previa

Desde la raíz de este proyecto:

```sh
python3 scripts/prepare_publication.py
python3 scripts/preview_publication.py --port 4175
```

Abrir **http://127.0.0.1:4175/buba-friends/**. La vista sirve una copia aislada de `docs/` bajo una subruta, igual que un repositorio de Pages. No sirve backups, código de pruebas ni materiales de trabajo. Para detenerla: Ctrl+C. Después de regenerar `docs/`, detener y arrancar de nuevo la vista previa, que es una instantánea.

El puerto 4175 tiene almacenamiento independiente del 4174: el guardado previo no se borra ni migra automáticamente. La clave sigue siendo `buba-friends-v1`. Dentro de un mismo origen, recargar conserva los datos. Publicar en otro dominio tampoco traslada los datos locales del Mac al móvil.

Para continuar usando los datos de la dirección original, su entrada sigue siendo `index.html` en **http://127.0.0.1:4174/**, servida con:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

No hace falta reiniciar los datos actuales para ensayar: usar la vista del puerto 4175 o una ventana privada. Las pruebas automáticas emplean objetos de almacenamiento propios; no leen el almacenamiento real del navegador.

## Carpeta preparada para publicar

`docs/` contiene únicamente `index.html`, `manifest.webmanifest`, `.nojekyll`, JS (app y módulos de historias), CSS, dos SVG del logo, cuatro PNG de iconos, tres SVG de historias y 61 JPEG: 60 retratos/miniaturas y la ilustración optimizada de bienvenida. No incluye los PNG originales grandes, hoja de contacto, prompts, README, pruebas, scripts ni ZIP.

Editar los archivos fuente de la raíz y `codificacion/`; no editar las copias de `docs/` a mano. Después de cada cambio:

```sh
node codificacion/tests/demo.test.cjs
python3 scripts/prepare_publication.py
python3 scripts/verify_publication.py
```

Node es necesario para la batería de lógica; Python 3.9 o posterior para empaquetar y verificar. No se necesitan paquetes externos. Si Node no está en PATH, ejecutar la batería mediante un runtime Node disponible; no confundir esa ausencia con que las pruebas hayan pasado. En este bloque se ejecutaron mediante el runtime Node de herramientas.

La verificación de publicación arranca servidores temporales en bucle local, copia solo `docs/` y comprueba los 77 archivos por HTTP en raíz y subruta. No abre un navegador ni evalúa el diseño.

Todas las rutas de ejecución son relativas. El manifest tiene nombre Buba Friends, `id`, `start_url` y `scope` iguales a `./`, modo standalone e iconos PNG de 192 y 512 px. El icono Apple conserva sus 180 px. No hay service worker, fuentes remotas ni dependencias de localhost en los archivos publicables. La carga y el aspecto desde la pantalla de inicio de iPhone aún requieren un dispositivo real.

## Publicación autorizada y actualizaciones

Repositorio público independiente: https://github.com/Izangnz/buba-friends. Pages publica desde `main` y `/docs`; el historial anterior se conserva. La cuenta se verificó mediante GitHub CLI, de forma independiente de VS Code.

Cuenta autenticada y verificada mediante GitHub CLI oficial: **Izangnz**. El usuario ha elegido explícitamente el nombre de la cuenta y su correo noreply para los commits, configurados solo en este repositorio. El repositorio se creó tras comprobar que no existía bajo la sesión autenticada. El primer despliegue terminó con éxito, Pages indica `built` y HTTPS está activo. La entrada pública respondió HTTP 200 y los 76 archivos de ejecución coinciden byte a byte con `docs/`. El marcador `.nojekyll` completa los 77 archivos del paquete local.

Antes de cada publicación, revisar los archivos fuente/publicables y el índice de Git antes de cualquier commit: ya contiene cambios de bloques anteriores. Añadir archivos revisados de forma explícita, sin `git add .`. `backups/` está excluido por `.gitignore`; no usar `git add -f` con copias o datos privados. No subir historias propias, almacenamiento del navegador, secretos ni materiales de generación innecesarios.

Configurar Pages: Settings → Pages → Deploy from a branch → rama publicada (habitualmente `main`) → `/docs` → Save. GitHub admite `/docs` como origen: [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Para actualizaciones posteriores: editar fuentes, ejecutar `node codificacion/tests/demo.test.cjs`, regenerar `docs/`, verificar por HTTP y revisar el diff. Añadir explícitamente los archivos cambiados y sus copias publicables, crear commit con la identidad verificada y hacer push dentro de la autorización recibida. Confirmar el estado del despliegue y la respuesta de la URL pública; no presentar una dirección prevista como un resultado confirmado.

## Recorrido de presentación de tres minutos

1. **0:00–0:30.** Abrir la vista aislada, confirmar +18 y pulsar Crear mi perfil. Escribir nombre y seleccionar edad 18–100; guardar y continuar. Elegir Mujeres, Hombres o Ambos, sin selección automática.
2. **0:30–1:10.** Mostrar la tarjeta y su información; cerrar con ×. Explicar los tres controles. Con Mujeres o Ambos, el primer perfil es Vega y genera coincidencia al mostrar interés. Con Hombres, Leo no coincide; el siguiente, Nico, sí. No todos los intereses producen coincidencia.
3. **1:10–1:55.** Abrir “Escribir un hola” desde la coincidencia simulada. Elegir una sugerencia, modificarla y enviarla manualmente. Aclarar que nadie recibe ni responde mensajes: es chat local.
4. **1:55–2:25.** Ir a Mi perfil → Editar mi perfil → cambiar un campo → Guardar. Mostrar la vista previa guardada.
5. **2:25–3:00.** Volver a Descubrir, abrir Filtros, mostrar género/18–100/intereses y cancelar. Recargar para demostrar persistencia. Si hace falta volver al inicio, Mi perfil → Reiniciar → confirmar; hacerlo solo en los datos de ensayo.

## Reglas conservadas y correcciones

Se mantienen exactamente los 30 identificadores, sus campos y coincidencias programadas, los 30 retratos y 30 miniaturas, el logo y la paleta rosa/blanco/ciruela. Los recursos existentes se compararon byte a byte con la copia anterior.

- Deshacer recupera solo el último pasar y mantiene filtros, sin revertir coincidencias ni chat. Ahora sigue disponible cuando pasar deja una lista vacía.
- Los filtros son provisionales: Aplicar guarda; × o Escape cancela. Limpiar prepara 18–100 y todos los intereses manteniendo el género provisional; todavía requiere Aplicar. Los desplegables se limitan entre sí y se validan también en JS.
- Deslizar izquierda pasa y derecha muestra interés. Requiere 85 px o el 25 % del ancho, el mayor. Un gesto corto, vertical o cancelado no decide. Información queda excluida. Se libera la captura del puntero al terminar y los botones siguen disponibles. Se conserva el bloqueo de 350 ms para evitar decisiones repetidas.
- Todos los diálogos tienen cierre superior visible, Escape nativo y devolución de foco. El detalle conserva tarjeta y filtros. La navegación y las decisiones recuperan un destino de foco tras reconstruir la pantalla.
- Se ajustan retratos, espaciado, listas y navegación para 375/390 px mediante CSS adaptable; se permite desplazamiento vertical y no se recorta el texto para encajarlo. No se afirma que esos tamaños estén revisados visualmente.
- El campo de chat usa 16 px para evitar el zoom automático de iOS. Al recibir foco o cambiar el viewport visual se intenta centrar el campo/formulario, dejando margen para navegación y teclado. Su funcionamiento real con teclado de iPhone sigue pendiente.
- Reiniciar exige confirmación y devuelve bienvenida, sin preferencia, filtros 18–100, sin decisiones/chat y sin estados transitorios de edición o bloqueo.
- El formato `buba-friends-v1`, los mensajes históricos y las etiquetas antiguas de intereses se conservan. No se escribe al arrancar.

## Validación de esta candidata

**Comprobaciones ejecutadas sobre archivos y HTTP real:** sintaxis JavaScript; catálogo completo y retratos/miniaturas sin cambios; iconos PNG 32/180/192/512 y Apple existentes; lista cerrada de 77 archivos publicables; bytes de la copia iguales al fuente; rutas relativas; manifest con ámbito/inicio propios; 77 respuestas correctas en raíz y otras 77 bajo `/buba-friends/`, usando copias aisladas sin el resto del proyecto; ausencia de localhost obligatorio y service worker; `git diff --check`.

**Pruebas con DOM/almacenamiento y eventos de puntero simulados:** recorridos completos con Mujeres, Hombres y Ambos; coincidencia fácil sin hacer coincidir a todos; mensaje y sugerencias editables; edición y validación de perfil; recarga; los 30 perfiles según género/edad; edades inválidas y límites; aplicar/cancelar/limpiar/validar filtros; deshacer en estado vacío; bloqueo de duplicados; ambos sentidos de gesto, umbral, vertical, cancelación y exclusión de información; datos antiguos, guardado bloqueado; cancelar y confirmar reinicio. No son pruebas de DOM de navegador real, de foco real o visuales.

**Pendiente en navegador real:** revisión completa a 390 × 844, 375 px y escritorio, altura de tarjeta/rostros/desbordamientos, apertura y cierre por Escape, orden de Tab y foco visible, scroll y comportamiento del teclado virtual. El inventario de herramientas devolvió `The browser access host is unavailable`; no se insistió con Safari.

**Lista breve para iPhone real, antes del viernes:**

- Recorrido de tres minutos y recarga, sin reiniciar datos personales de ensayo que se quieran conservar.
- Safari a 390/375 px: rostros, tarjeta/controles, scroll, zoom, navegación y espacio del indicador inferior.
- Abrir filtros/detalle, desplazar hasta el final, cerrar y comprobar que la tarjeta no cambia.
- Deslizar en ambos sentidos, hacer un gesto corto y uno vertical; tocar información y pulsar rápido. Comprobar los botones como alternativa.
- Escribir y enviar con teclado abierto; editar y guardar el perfil; confirmar que ningún control queda tapado.
- Añadir a pantalla de inicio desde la URL publicada: nombre, corazón, arranque standalone, navegación, recarga y persistencia en ese contexto. El Mac y el iPhone no comparten almacenamiento local.

No se han identificado fallos de lógica que bloqueen el recorrido en las pruebas disponibles. La validación visual y táctil sigue abierta; no se declara comprobada en iPhone.

## Recuperación del bloque

`backups/antes-candidata-presentacion-20261028.zip` y `backups/despues-candidata-presentacion-20261028.zip`: copias locales identificadas, **no commits**. Incluyen código y recursos revisados, guías y scripts; la copia final incluye `docs/`. Excluyen `.git`, ZIP anteriores, archivos sensibles, cachés y almacenamiento del navegador. No se sobrescribe el historial existente. Extraer en otra carpeta para recuperar sin reemplazar la versión actual accidentalmente.


## Acabado de bienvenida · 28/10/2026

Textos acordados: «Sé tú. Conoce a alguien.», «Comparte tus gustos, descubre nuevas personas y deja que surja la conexión.» y lateral «Las buenas conexiones empiezan siendo tú.». Se conserva el aviso de simulación, confirmación +18 y entrada. Se elimina el logo duplicado del contenido de bienvenida: queda la marca de cabecera en móvil o la lateral en escritorio.

La tarjeta de Vega se sustituye por una ilustración de bienvenida independiente, sin controles, nombres, edades ni etiquetas. `assets/welcome-date-original.png` es el original generado (1536 × 1024); `assets/welcome-date.jpg` es el JPEG optimizado (1200 × 800, calidad 82, aproximadamente 236 KiB). Se generó con la herramienta integrada image_gen, sin referencias de catálogo o personas reales. Prompt exacto y método en `assets/welcome-generation.json`. Solo el JPEG optimizado se añade a la lista cerrada de publicación; original y documentación de generación quedan fuera de `docs/`.

Inspeccionados visualmente el resultado original y el JPEG, además de reducciones de la ilustración a 343 y 358 px de ancho, equivalentes al ancho disponible con márgenes de 16 px en pantallas de 375 y 390. Ambas caras se conservan completas. La imagen se muestra a anchura adaptable y altura automática, sin recorte de cover ni textos superpuestos. Estas inspecciones son de la imagen, no capturas de la aplicación ni pruebas de legibilidad real del texto.

Comprobados: fuente y `docs/` idénticos en los archivos de ejecución; 77 archivos por HTTP en raíz y subruta, paquete independiente; textos nuevos y recurso relativo; catálogo, lógica y retratos existentes sin cambios; batería completa anterior con DOM/almacenamiento simulados, incluida entrada y persistencia. No se leen ni reinician los datos reales del navegador.

Limitación: el acceso a navegadores continúa indisponible y un intento de acceso a Safari agotó el tiempo de espera. Pendiente la revisión visual real de la bienvenida a 375 px, 390 × 844 y escritorio, y en iPhone. No se insistió con más intentos.

Recuperación de este acabado: `backups/antes-portada-bienvenida-20261028.zip` y `backups/despues-portada-bienvenida-20261028.zip`. Son copias locales, no commits; sin ZIP previos, cachés, secretos o almacenamiento del navegador. En ese bloque la identidad de Git todavía estaba sin configurar y no se había publicado; la publicación posterior está documentada en esta guía.


## Historias locales · bloque autorizado para publicar

En la versión anterior, Conexiones incluía Historias encima de las conversaciones; desde el 29/10 están en su pestaña independiente: Tu historia con + y las historias activas de coincidencias. Todas las coincidencias siguen accesibles en su fila y conversación, tengan o no historia. El aro rosa indica historia sin ver; el aro discontinuo indica vista y no es una confirmación de lectura del chat.

Crear: + → imagen JPEG/PNG/WebP hasta 8 MB → previsualizar → texto opcional hasta 180 caracteres → Publicar en la demo. El aviso «Solo se guarda en este navegador» está junto al botón. Se verifica la firma del archivo, se decodifica y convierte a JPEG de hasta 1280 px, calidad 82; imágenes mayores de 40 megapíxeles se rechazan. Cancelar no guarda nada y libera la vista previa.

`stories.js` guarda metadatos y blobs en IndexedDB, base `buba-friends-stories-v1`; no introduce base64 en localStorage. Las operaciones esperan a la confirmación de la transacción. Fallos de lectura, cuota, permisos, formatos o almacenamiento se muestran como errores. Si Historias no está disponible, el recorrido de citas y chat sigue funcionando.

Cada historia tiene `createdAt` y `expiresAt` persistidos. Caduca exactamente a las 24 horas: se comprueba al arrancar, volver a primer plano, abrir/listar/responder y con un temporizador hasta la siguiente caducidad. Recargar no renueva las fechas. Las historias propias destacadas sobreviven en Mi perfil; al caducar desaparecen de la fila activa. Quitar una destacada caducada o eliminar una historia elimina también el blob. Las URL temporales se liberan cuando ya no se utilizan.

El visor no avanza automáticamente. Tiene cerrar, anterior, siguiente, autor y tiempo transcurrido. Solo se puede responder a historias activas de coincidencias existentes, nunca a las propias. Una confirmación añade un único mensaje al chat correcto y abre esa conversación. La referencia conserva identificador y texto; al caducar o eliminarse la historia muestra «Historia no disponible», sin guardar una miniatura o copia oculta de la imagen en el mensaje.

Los tres ejemplos son ilustraciones SVG originales de este proyecto: exposición (Vega), sendero (Nico) y concierto (Alma). Se identifican como ejemplos. Sus fechas se inicializan una sola vez de forma atómica; no se vuelven a sembrar tras caducar. El reinicio confirmado limpia historias, destacadas y blobs, y restaura únicamente los ejemplos con un nuevo inicio para ensayar. Los SVG de ejemplo siguen formando parte de los recursos de la app para ese reinicio; no son imágenes subidas por el usuario.

Pruebas: batería del recorrido principal y referencias del guardado anterior; historias con repositorio y DOM aislados, reloj antes/en/después de las 24 horas, recarga, creación/cancelación, vistas, destacar/quitar, eliminación y liberación, respuestas vacías/duplicadas/propias/sin coincidencia, referencias no disponibles, errores de almacenamiento y reinicio; validación de firmas y flujo de canvas con decodificación simulada. No equivalen a probar IndexedDB/canvas en Safari real. Revisión real de archivos y 77 recursos HTTP en raíz y subruta con `verify_publication.py`. Sin datos del navegador ni historias propias en el paquete.

Pendiente: prueba visual real de Historias a 375/390 px y escritorio, selector de archivos/decodificación, cuota y persistencia de IndexedDB en iPhone, teclado del visor, foco, desplazamiento y accesibilidad. El host de navegador no está disponible y el control de VS Code indica que faltan permisos; no se afirma revisión en dispositivo.

Publicación completada en **https://izangnz.github.io/buba-friends/** y verificada por HTTP tras el despliegue correcto de GitHub Pages. Cuenta Izangnz verificada, identidad noreply elegida expresamente y configuración de Git limitada a este proyecto. No se ha tocado mi-progreso-diario. Los datos locales de 4175 no se transfieren automáticamente al dominio publicado.


Recuperación: `backups/antes-historias-publicacion-20261028.zip` y `backups/despues-historias-publicacion-20261028.zip`, copias locales de archivos revisados, no commits; sin otras copias, `.git`, almacenamiento del navegador, historias privadas, secretos ni cachés.


## Recuperación y verificación de publicación

- `f1eccea`: commit de recuperación de la candidata antes del primer push; conserva como antecesor el commit inicial `1f21cd7`.
- Commit posterior de documentación: registra la publicación confirmada y deja el resultado en el historial, sin modificar recursos de ejecución.
- Copias locales: `backups/antes-publicacion-github-20261028.zip` y `backups/despues-publicacion-github-20261028.zip`. No contienen otras copias, `.git`, credenciales, datos del navegador ni historias subidas. Son copias de archivos, distintas de los commits.
- Despliegue inicial verificado: https://github.com/Izangnz/buba-friends/actions/runs/40783351650.

Las pruebas de lógica y reloj y la verificación pública de recursos no equivalen a una revisión visual del navegador. Se mantiene la lista pendiente de iPhone anterior.


## Perfil obligatorio, música y pestaña Historias · 29/10/2026

Recorrido nuevo: bienvenida +18 → Crear mi perfil → elegir a quién descubrir → Descubrir. Nombre y edad empiezan vacíos y son obligatorios; selector 18–100 y validación JS. Bio, intereses y música son opcionales y vacíos. El avatar propio es un icono neutro. La navegación se protege durante la creación. Guardar correctamente persiste una marca explícita `profileCompleted`; si el almacenamiento falla, no permite terminar el alta.

Migración en la misma clave `buba-friends-v1`: el Alex exactamente intacto vuelve al perfil vacío, conservando coincidencias, decisiones y mensajes. Un perfil personalizado válido se conserva. Si algún campo coincide con los antiguos ejemplos, se conservan todos sus datos y se solicita confirmación o edición mediante Guardar y continuar. No se escribe al arrancar ni se cambia IndexedDB durante la migración. Campos personales antiguos desconocidos se conservan.

Mi música permite cinco artistas y tres canciones con título y artista. Se añaden y eliminan filas; los campos se editan directamente y se guardan con el perfil. Cada enlace opcional se valida con URL: HTTPS, host exacto `open.spotify.com`, sin credenciales ni puerto no estándar, ruta `/artist/` o `/track/` y un identificador de 22 caracteres alfanuméricos. Nombres escapados al mostrar; sin HTML, búsquedas, reproducción, SDK ni sincronización de Spotify. La vista previa propia y el detalle de perfiles muestran música si existe. No se han añadido preferencias a los 30 personajes existentes.

Cuatro destinos en móvil y escritorio: Descubrir, Conexiones, Historias y Mi perfil. Historias reutiliza visor, blobs, fechas y ejemplos persistidos. Solo incluye historias propias y de coincidencias. Conexiones conserva chats y coincidencias; Mi perfil conserva destacadas. Responder abre el chat correcto una sola vez y Volver lleva a Historias. No se han modificado el repositorio de historias ni las fechas de caducidad.

Pruebas simuladas ejecutadas: recorridos Mujeres/Hombres/Ambos con coincidencia/chat/recarga; alta obligatoria, bloqueo de acceso a otras pestañas, edades y espacios, migraciones intacta/personalizada/ambigua y almacenamiento bloqueado; controles de música añadir/editar/eliminar, máximos 5/3, persistencia, escape HTML y dominios engañosos; historias propias y de coincidencias, respuestas sin duplicar, caducidad exacta 24 horas, referencias no disponibles, destacadas, borrado y reinicio. Estas pruebas usan DOM, almacenamiento, reloj y decodificación simulados.

Revisión visual real pendiente a 375/390 px y escritorio: el inventario de navegador informa `The browser access host is unavailable`. No se ha repetido el intento de controlar Safari. Las cuatro pestañas usan flex con ancho mínimo cero; esto es una comprobación del CSS, no evidencia visual de ausencia de desbordamiento. Pendiente en iPhone: distribución, teclado, selector de archivos, IndexedDB, modo pantalla de inicio y navegación táctil.

Para probar el nuevo inicio sin borrar datos: abrir la URL pública en una ventana privada o utilizar la vista local en otro puerto. No pulsar Reiniciar en el contexto que contenga los datos que se quieran conservar. Perfil y música se guardan en localStorage; metadatos e imágenes de historias en IndexedDB, en ese navegador y origen. No hay registro ni servidor de usuarios.

Recuperación anterior: etiqueta Git local `recuperacion-antes-perfil-musica-historias-20261029`, sobre `6dae5f4`. El commit final conserva el historial y sirve como recuperación posterior. Los parámetros de versión de CSS/JS en index.html evitan reutilizar esos recursos antiguos al cargar la entrada actualizada.

## Mis gustos musicales · buscador iTunes · 29/10/2026

Añadir artista/canción abre un diálogo con búsqueda textual y selección. Fuente: iTunes Search API pública, no MusicKit ni API autenticada de Apple Music. Se sigue el mecanismo documentado de scripts dinámicos con `callback` para búsquedas entre dominios: https://performance-partners.apple.com/search-api (continuación oficial del archivo https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/). No hay claves, proxy, infraestructura adicional, reproducción, retratos ni portadas.

Búsqueda desde dos caracteres, pausa de 450 ms y separación mínima de 3,1 segundos entre solicitudes dentro del diálogo, máximo diez resultados, tienda ES, entidades `musicArtist` y `song`. Cada consulta invalida la anterior; cerrar cancela temporizadores y limpia scripts/callbacks. Tiempo de espera de diez segundos, carga, vacío, error y reintento. La alternativa «Introducir nombres manualmente» siempre está disponible, no necesita red y guarda una marca `manual`. La consulta de búsqueda se envía a Apple; la selección se guarda al guardar el perfil.

Los resultados usan botones nativos para toque, Tab, Enter y Espacio; flecha abajo desde la consulta enfoca el primer resultado. Escape y cierre superior usan el diálogo existente y restituyen el foco. El diálogo permite scroll, tiene cierre sticky y ajusta su altura al viewport visual cuando cambia el teclado. Estos ajustes no constituyen una comprobación real en iPhone.

Persistencia en la misma clave `buba-friends-v1`, sin escritura inicial ni migración destructiva. Se mantienen favoritos y enlaces Spotify anteriores, perfiles y demás datos. Las selecciones nuevas incluyen `provider: itunes`, `providerId`, `type`, nombre, artista de canción, álbum/género disponibles y URL real del resultado. Lista explícita de destinos HTTPS: `itunes.apple.com` (documentación oficial) y `music.apple.com` (respuestas reales verificadas); se rechazan credenciales, puertos no estándar y dominios parecidos. La etiqueta del enlace corresponde al destino. No se construyen enlaces Spotify. Límites cinco artistas/tres canciones; duplicados bloqueados al seleccionar por identificador o nombre/artista normalizados. Los duplicados históricos no se borran.

Comprobación real desde terminal: HTTPS 200 con callback documentado, diez resultados de artistas para «Rosalia» y diez de canciones para «Imagine John Lennon», identificadores y enlaces `music.apple.com` devueltos por Apple. Esto comprueba el catálogo y JSONP servido, **no su ejecución en un navegador desde GitHub Pages**. El inventario de navegador volvió a devolver `The browser access host is unavailable`; quedan pendientes Safari, el origen público, diseño 375/390 px/escritorio, teclado virtual y foco real. La alternativa manual permanece funcional sin el catálogo.

Pruebas simuladas: recorrido principal e historias completos; añadir/eliminar, límites, duplicados, escape, enlaces engañosos, metadatos de catálogo y persistencia/recarga, compatibilidad Spotify; transporte JSONP, parámetros, limpieza, errores, timeout, cancelación, respuestas antiguas, reintento, vacío, selección y manual sin enlace. `node codificacion/tests/demo.test.cjs` incluye las tres baterías. El entorno sin Node en PATH ejecuta las mismas baterías mediante el runtime Node de herramientas. Paquete generado con `prepare_publication.py` y verificado con `verify_publication.py`.

Recuperación anterior: etiqueta local `recuperacion-antes-buscador-musical-20261029` sobre `6a71ae9`. Recuperación posterior: commit final del buscador y etiqueta local `recuperacion-despues-buscador-musical-20261029`. Son referencias Git, no copias ZIP; no contienen almacenamiento del navegador ni historias privadas.

Prueba en iPhone sin borrar datos: (1) abrir la URL actualizada, ir a Mi perfil → Editar mi perfil → Mis gustos musicales (o crear perfil en ventana privada); (2) buscar «Rosalia» en Añadir artista y «Imagine John Lennon» en Añadir canción, seleccionar, guardar y recargar; (3) comprobar favorito existente/duplicado, eliminar uno y probar entrada manual sin red; cerrar el diálogo con teclado abierto y confirmar que resultados y controles son accesibles. Si la búsqueda falla, utilizar la entrada manual y registrar el mensaje de error.

## Foto de perfil opcional · 29/10/2026

En **Mi perfil**, debajo de la silueta neutra, pulsar **Añadir foto**. También está disponible al crear el perfil. Elegir JPEG, PNG o WebP de hasta 8 MB/40 megapíxeles; previsualizar, ajustar zoom y posición horizontal/vertical y **Guardar foto**, o **Cancelar**. Una vez guardada aparecen **Cambiar foto** y **Eliminar foto** (con confirmación). El avatar se muestra en la vista previa propia y en «Tu historia», incluso cuando existe una historia activa. Sin foto se muestra únicamente una silueta SVG neutra, sin nombres, iniciales ni retratos de catálogo.

`profile-photo.js` reutiliza `BubaStories.optimizeImage` y la validación de firma/formato. La imagen preparada se recorta a un JPEG de 512 × 512, calidad 82. El guardado usa la base IndexedDB existente `buba-friends-stories-v1`, almacén `meta`, clave independiente `profile-photo`; las historias siguen en `stories`, y su marcador `seeded`, fechas, blobs y destacadas no cambian. No hay cambio de versión/esquema ni migración de los datos anteriores. La transacción debe terminar antes de sustituir el avatar. Cancelar, un archivo inválido o un error de guardado conserva la foto anterior. No hay base64 ni foto en localStorage o en Git; no se sube a un servidor. El reinicio global confirmado también elimina la foto.

Los cambios de foto actualizan únicamente sus elementos de imagen y controles: no reconstruyen el formulario ni descartan campos del perfil en edición. El diálogo tiene cierre superior, Escape, cancelación, rangos etiquetados para teclado y toque, controles de al menos 44 px y foco visible. Ajusta altura al viewport visual y permite scroll. No se puede cancelar una transacción de guardado ya iniciada desde los controles: se espera a su confirmación o error.

Pruebas simuladas en `tests/profile-photo.test.cjs`: añadir/encuadrar/guardar/recargar/cambiar/cancelar/eliminar, error al sustituir y eliminar, archivo inválido, firmas y límites, cancelación con optimización pendiente, geometría del recorte, liberación de URLs; operaciones reales del módulo de repositorio con dobles de transacciones que completan o abortan y comprobación de que el marcador de historias no cambia. Pasan también las baterías existentes del recorrido principal y de Historias. Son pruebas con repositorio, canvas y DOM simulados; no equivalen a IndexedDB, selector de archivos ni revisión visual en Safari real.

Impedimento concreto para la revisión visual: el inventario de navegador devuelve `The browser access host is unavailable`. Pendientes en iPhone y escritorio: selector de archivos real, orientación de fotografías, persistencia/quota de IndexedDB, encuadre táctil, foco y disposición a 375/390 px. HEIC, GIF y SVG se rechazan con explicación; elegir/exportar JPEG, PNG o WebP.

Publicación: el paquete añade únicamente `codificacion/profile-photo.js`, total 78 archivos (77 recursos HTTP más `.nojekyll`). Fuentes y copias de `docs/` se generan con el proceso existente. Recuperación anterior: etiqueta Git local `recuperacion-antes-foto-perfil-20261029`; posterior: commit final de la foto y etiqueta `recuperacion-despues-foto-perfil-20261029`. No son copias ZIP ni contienen fotos personales.

## Corrección del acceso iTunes en iPhone · 29/10/2026 · versión 20261029-4

**Evidencia reproducida por HTTP, sin navegador real:** el endpoint oficial `https://itunes.apple.com/search` con los parámetros anteriores (`term`, `country=ES`, `media=music`, `entity=musicArtist`/`song`, `limit=10`, `callback`) devuelve HTTP 200 y JavaScript con un User-Agent de terminal. Con identificación de Safari/iPhone devuelve HTTP 301 hacia `musics://mzstoreservices-…itunes.apple.com/search?...`. Ese destino no es un script HTTPS y explica un error de carga compatible con el observado. Eliminar por separado `entity`, `country` o `limit` no evitó la redirección; **eliminar `media` sí**. Cambiar a Accept JSON o añadir X-Requested-With no evitó el 301 en la comprobación; no se introducen esas cabeceras ni un nuevo transporte en la app.

Se omite el filtro opcional `media` y se conservan las entidades específicas `musicArtist` y `song`, el callback, el país ES, diez resultados y URLSearchParams para codificación (incluidos acentos, espacios y símbolos). Apple documenta `media` como opcional, con valor predeterminado `all`, y el acceso entre dominios mediante scripts con callback: https://performance-partners.apple.com/search-api. No cambia proveedor, endpoint, infraestructura ni autenticación.

Verificación HTTP con identificación de Safari/iPhone iOS 18 y 26 y cabeceras Referer/Sec-Fetch propias de una carga de script: sin `media`, artistas «Rosalía» y canciones «Imagine John Lennon» devolvieron HTTP 200, `text/javascript; charset=utf-8`, callback correcto y diez resultados reales. Las respuestas incluyen `X-Content-Type-Options: nosniff` y un tipo JavaScript válido. La entrada pública no entregó cabeceras CSP ni COEP y no tiene meta CSP. Fuente y docs eran idénticos antes del cambio; no hay evidencia de una divergencia del paquete. **Identificar una petición como Safari en terminal no equivale a ejecutar Safari desde el origen público**. La redirección está reproducida; su relación con ese iPhone concreto debe confirmarse con la versión corregida.

Se distinguen: `empty` (respuesta válida sin resultados), `offline` (el navegador informa sin conexión), `timeout` (diez segundos sin respuesta), y `service` (fallo de carga, política de seguridad, callback ausente o respuesta no válida). `onLine=true` no demuestra conectividad: ante un error genérico se indica que puede haber un bloqueo de red/navegador, sin afirmar una caída del servidor ni CORS. Un resultado recibido pero no interpretable ya no se presenta como una búsqueda vacía.

Los callbacks son únicos por consulta. Se limpian script, timeout y listeners; las consultas canceladas o fallidas retienen un callback inerte durante 30 segundos para absorber ejecuciones tardías y luego lo eliminan. Las respuestas y diagnósticos antiguos no sustituyen los de la consulta actual. Se conserva reintento, pausa y límites; la separación entre solicitudes se conserva también al reabrir el diálogo. No se modifican selecciones guardadas, foto, chats ni historias.

**Diagnóstico temporal copiable:** abrir «Diagnóstico temporal de búsqueda» debajo de la entrada manual → «Copiar diagnóstico». Contiene versión, entidad, filtro omitido, fase/últimos pasos, señal online del navegador, milisegundos, script cargado, callback recibido y cantidades de resultados. No incluye consulta, URL completa, User-Agent, nombres, identificadores de catálogo, perfil, almacenamiento, fotos ni credenciales; no se envía automáticamente. Si el portapapeles no está disponible, el campo se puede seleccionar y copiar. Fases relevantes: `script-requested`, `script-error`, `csp-blocked`, `missing-callback`, `callback`, `invalid-response`, `invalid-results`, `timeout`, `offline`, `empty`, `results`.

Pruebas simuladas ampliadas: consulta con acentos/símbolos y ausencia de `media`, callback y limpieza, respuestas vacías e inválidas, carga sin callback, offline antes/durante la petición, errores de script/CSP/inicio, timeout, callbacks cancelados tardíos, consultas simultáneas independientes, respuestas consecutivas fuera de orden, diagnóstico sin consulta, reintento y selección. Pasan las baterías existentes de perfil, foto, Historias y recorrido principal. Las comprobaciones HTTP y esas simulaciones **no certifican Safari real**. El inventario de navegador sigue devolviendo `The browser access host is unavailable`.

Prueba mínima en iPhone: abrir la URL con la versión nueva → Mi perfil → Editar mi perfil → Añadir artista, buscar «Rosalía»; cambiar la consulta y reintentar si falla. Repetir con Añadir canción → «Imagine John Lennon», seleccionar, guardar y recargar. Si falla, copiar el diagnóstico de esa búsqueda y compartirlo; no es necesario compartir perfil ni fotos. La entrada manual permanece como alternativa y no se considera una resolución del fallo de búsqueda.

Recuperación anterior: etiqueta Git local `recuperacion-antes-diagnostico-itunes-20261029`. Posterior: commit final y etiqueta local `recuperacion-despues-diagnostico-itunes-20261029`. Paquete regenerado con el proceso existente, sin datos personales ni infraestructura nueva.

## Historias por persona y visor inmersivo · 29/10/2026 · presentación 20261029-5

La pestaña Historias muestra una sola fila horizontal de avatares circulares. Primero Tu historia con la foto propia existente y botón +; después, solo conexiones con historias activas. Se agrupan las historias de una misma persona en un círculo: rosa si queda alguna sin ver, aro discreto si todas están vistas. Al abrir se elige la primera sin ver o la primera disponible. Los avatares de conexiones reutilizan sus retratos existentes, no previsualizaciones rectangulares. Se conservan etiquetas de demo/ejemplo y un estado vacío fuera de la fila.

El visor reutiliza el diálogo nativo, con fondo oscuro, imagen completa mediante `object-fit: contain`, segmentos estáticos por persona, avatar, nombre, tiempo y cierre visible. Solo la historia seleccionada tiene el segmento rosa; no hay avance automático ni temporizador de progreso. Botones laterales sobre la imagen y controles Anterior/Siguiente equivalentes; flechas del teclado fuera de controles editables. La respuesta y sus botones están separados de las zonas de avance. En móvil el diálogo ocupa el viewport disponible, con zonas seguras y ajuste al viewport visual; en escritorio es vertical y centrado sobre un fondo oscuro. La navegación se oculta únicamente mientras el visor está abierto.

Avanzar mantiene el mismo diálogo. Al cerrar se reconstruyen los aros vistos y se devuelve foco, scroll horizontal y posición vertical anteriores. Los refrescos no reconstruyen la lista detrás del visor abierto. El envío conserva el chat del autor, el bloqueo de duplicados y la comprobación de vigencia; conserva también publicación, borrado y destacadas. No hay cambios en `stories.js`, IndexedDB, fotos, imágenes originales ni fechas, y no se reinicia ni migra el almacenamiento. La versión de recursos cambia solo para CSS y `stories-ui.js`.

Pruebas simuladas enfocadas: dos historias de una conexión se agrupan en un círculo; exclusión de no conexiones; avatares existentes; segmentos, límites y navegación por botones/zonas de imagen dentro del mismo autor y diálogo; respuesta sin activar navegación, ajuste al viewport visual; restauración de foco y scroll; cancelación de navegación pendiente al cerrar; no renovación de fechas. Se mantienen los casos de publicar/cancelar, destacar, borrar, responder al chat correcto sin duplicados, caducidad y referencias no disponibles. Pasan también las regresiones del resto de la aplicación. HTTP local verifica los 78 archivos del paquete en raíz y subruta.

Pendiente de revisión visual real en iPhone y escritorio: altura útil del visor, imagen completa, zonas seguras, teclado de respuesta, toque lateral y regreso a la posición de la fila. El inventario de navegador devolvió `The browser access host is unavailable`; no se han repetido intentos fallidos ni se presenta el CSS o las simulaciones como una comprobación visual.

Recuperación anterior: etiqueta Git local `recuperacion-antes-visor-historias-20261029`; posterior: commit final y etiqueta local `recuperacion-despues-visor-historias-20261029`. No se han leído ni publicado datos del navegador ni fotos personales.

## Galería de perfiles y gestos de Descubrir · 29/10/2026 · versión 20261029-6

Información (i) abre una galería independiente: retrato actual primero, después dos marcos CSS/SVG con icono de cámara y texto «Foto de prueba · Demo». No son fotografías, no generan peticiones de imagen ni sustituyen el catálogo. Contador, indicadores y botones Anterior/Siguiente; deslizar a izquierda avanza y a derecha retrocede, sin superar extremos. El gesto vertical deja leer el detalle. Abrir/cerrar conserva la tarjeta y las decisiones; la galería no guarda ni cambia coincidencias, mensajes o preferencias.

Modelo de galería: `profileGallery(p)` reutiliza `portrait(p)` y conserva los campos antiguos `image`/miniatura sin modificarlos y admite un campo opcional `images: [{src, alt}]` (también rutas como strings) para imágenes reales adicionales. Evita repetir el retrato y completa hasta tres posiciones con marcos Demo. Ninguno de los 30 perfiles se ha modificado. `prepare_publication.py` incluye las rutas declaradas adicionales en su lista revisada y conserva la validación de archivos locales; actualmente no hay recursos nuevos, y el paquete sigue teniendo 78 archivos. Las miniaturas existentes no cambian.

**Fallo reproducido en el controlador anterior:** `onlostpointercapture=reset` cancelaba también el evento propagado desde la imagen hija cuando su captura se transfería a la tarjeta. En la reproducción aislada, después del primer movimiento la tarjeta tenía transform y texto de interés; enviar la pérdida de captura de la hija y continuar moviendo dejaba transform/texto vacíos y el gesto abandonado. Es coherente con la captura táctil implícita y su transferencia descritas en Pointer Events: https://www.w3.org/TR/pointerevents3/#implicit-pointer-capture y https://www.w3.org/TR/pointerevents3/#process-pending-pointer-capture. Esto demuestra un fallo del controlador, **no confirma por sí solo el comportamiento del iPhone del usuario**.

Corrección: captura en la superficie desde pointerdown, sin esperar a decidir dirección; se ignora la pérdida de captura propagada por un hijo y se atiende únicamente la de la superficie/puntero activo. Reinicio seguro antes de liberar captura, incluso si las APIs lanzan una excepción. Cancelación en pointercancel, pérdida real, drag nativo, blur, ocultación, apertura de diálogo y reconstrucción de pantalla. Un gesto solo termina una vez y usa el mismo `decide()` y bloqueo de 350 ms que los botones. No hay otro temporizador ni estado de animación que mantenga bloqueada una tarjeta.

La tarjeta sigue el desplazamiento horizontal con rotación limitada e indicadores de texto «ME INTERESA ♥» / «PASAR ✕». Umbral de 25 % del ancho (mínimo 64 px); gesto corto vuelve al centro con transición. Se mantiene `touch-action: pan-y pinch-zoom`, sin impedir el scroll vertical; si el gesto vira claramente a vertical se cancela sin decidir. Imágenes sin arrastre nativo y superficie sin selección/callout. La información y otros controles quedan excluidos. Movimiento reducido elimina transición y rotación. Pointer Events es el único flujo: no se duplican decisiones con manejadores Touch Events paralelos.

La galería reutiliza el detector horizontal con callbacks propios que solo cambian el índice de imagen; detiene propagación de eventos y nunca invoca `decide()`. Sus controles, flechas de teclado y superficie tienen foco visible. El retrato usa `object-fit: contain`; los marcos tienen dimensiones estables y hay una presentación explícita de imagen no disponible para evitar iconos rotos si un recurso futuro falla.

Pruebas simuladas: derecha/interés, izquierda/pasar, umbral corto, vertical y giro a vertical, exclusión de controles, cancelación/pérdida real y transferencia de captura desde hija, blur/ocultación, excepción de captura, drag nativo, cambio de pantalla, diálogo a mitad de gesto, gestos consecutivos/pulsaciones rápidas, duplicados, coincidencia y deshacer; galería por botones/gestos/teclado, extremos, marcos sin img, recuperación de tarjeta al cerrar y comparación exacta del estado/guardado sin cambios. Pasan las baterías existentes de Historias (incluido el visor publicado), foto y demás regresiones. `stories.js`, `stories-ui.js`, `profile-photo.js` y el catálogo se compararon con c3e35c7 y permanecen intactos. Fuente/docs y los 78 archivos se verifican mediante HTTP local en raíz y subruta.

Pendiente de verificación táctil real: el inventario informa `The browser access host is unavailable`. No se declara reparado en Safari solo por las simulaciones. En iPhone: (1) arrastrar tarjeta a ambos lados, comprobar texto/seguimiento, soltar corto y desplazar verticalmente; (2) repetir varios gestos, cancelar y abrir i durante un arrastre; (3) recorrer 1–3 por gestos y botones, probar extremos y scroll del detalle; (4) cerrar, comprobar la misma tarjeta, probar deshacer y abrir Historias. Usar datos de ensayo si no se quieren modificar decisiones personales; no hace falta reiniciar.

Recuperación anterior: etiqueta Git local `recuperacion-antes-galeria-gestos-20261029`, sobre c3e35c7. Posterior: commit final y etiqueta local `recuperacion-despues-galeria-gestos-20261029`. Sin fotos personales, almacenamiento del navegador ni secretos en el paquete.

## Volver a ver perfiles · 29/10/2026 · versión 20261029-7

Cuando no quedan perfiles pendientes que cumplan los filtros, Descubrir muestra «No hay más perfiles» y **Volver a ver perfiles**. Se explica que se repetirán los perfiles de la demo que cumplan los filtros actuales. El botón limpia únicamente `decisions`, `lastPass` y el bloqueo transitorio de decisiones; mantiene los filtros, preferencia, perfil, música, coincidencias y conversaciones. No llama a IndexedDB, no cambia foto, historias, fechas ni destacadas. No utiliza el reinicio global. Si falla localStorage, revierte la limpieza y conserva el estado anterior.

Si ningún perfil cumple los filtros, se ofrece **Ajustar filtros**, sin botón de repetición ni promesa de que limpiar decisiones lo resuelva. También se distingue agotar solo el subconjunto filtrado de agotar todo el catálogo.

Al recargar se respeta una lista de decisiones explícita, incluso vacía; solo los guardados antiguos sin esa lista usan las coincidencias como referencia de perfiles ya vistos. Repetir interés por una conexión existente no crea otra coincidencia, no muestra una nueva coincidencia ni reinserta el mensaje de ejemplo (tampoco en un chat vacío). Los nuevos matches conservan el comportamiento anterior.

Pruebas con almacenamiento aislado: conservación exacta del estado salvo decisiones/deshacer, filtros y recarga; repetición con todo el catálogo o solo un subconjunto agotado; ausencia de candidatos por filtros; chat existente, chat vacío y coincidencias sin duplicados; error de persistencia con restauración; compatibilidad del guardado antiguo sin decisiones. Se ejecutan también las regresiones de gestos/galería, Historias y foto. No se han leído ni reiniciado datos del navegador del usuario.

Recuperación anterior: `recuperacion-antes-repetir-perfiles-20261029`. Posterior: commit final y etiqueta local `recuperacion-despues-repetir-perfiles-20261029`. Paquete actualizado mediante el proceso habitual; quedan pendientes la revisión visual/táctil en iPhone de este botón y los gestos ya documentados.

## Descubrir en una pantalla móvil · 29/10/2026 · versión 20261029-8

El modo compacto se aplica solo a Descubrir en móvil (ancho hasta 600 px) cuando hay una tarjeta. Cabecera de 44 px con Filtros y «Ampliar vista», resumen compacto, tarjeta flexible, decisiones de 58/70 px y navegación en una fila propia del grid. La altura usa `100dvh` como alternativa y el alto actual de `visualViewport`/`innerHeight`, actualizado al cambiar barras u orientación. Se respetan las zonas seguras. Se compactan textos secundarios y márgenes; ocupación/intereses completos siguen en Información. Nombre y edad permanecen visibles y el retrato usa contain para mantener la ilustración completa.

Antes de bloquear scroll se miden desbordamientos de main/layout/nav/tarjeta/texto y se exige una zona de retrato de al menos 160 px. Si no cabe, no se oculta contenido: se usa el flujo desplazable original. Alturas inferiores a 480 px, orientación horizontal, zoom de pinza activo o raíz tipográfica mayor de 20 px también mantienen scroll. El botón «Ampliar vista» permite elegirlo voluntariamente; «Una pantalla» vuelve a intentar el ajuste. En fallback automático se indica «Vista ampliada». El modo no se guarda ni cambia datos personales. Un probe de 1rem con ResizeObserver detecta cambios tipográficos sin observar elementos cuyo tamaño cambia por el propio ajuste.

En el modo de una pantalla, html/body bloquean únicamente el scroll de Descubrir y la tarjeta usa `touch-action: pinch-zoom`: los movimientos verticales no desplazan la página ni deciden. No hay un preventDefault global ni un bloqueo de zoom. En la alternativa accesible vuelve el scroll nativo, incluido sobre la tarjeta; con zoom activo la tarjeta permite pan/zoom y el controlador no toma decisiones. La galería sigue usando pan-y/pinch-zoom. Se conserva el controlador corregido de captura, indicadores, arrastres cortos, cancelaciones y protección contra duplicados. Los cambios de viewport cancelan el arrastre de forma segura.

Al salir de Descubrir (o al no quedar tarjeta) se retiran las clases que bloquean scroll. Mi perfil, Historias y conversaciones mantienen su disposición habitual. Filtros, Información y los demás diálogos de Descubrir conservan desplazamiento interno, con altura y posición ajustadas al viewport visual; no se cambia de modo el fondo al abrir el teclado del diálogo. Cerrar vuelve a evaluar la altura útil.

Pruebas simuladas: selección del modo con geometrías representativas para 375×667 (alto visual 550) y 390×844 (altos visuales 664/844), desbordamiento, retrato insuficiente, texto grande, zoom, viewport bajo, modo manual, teclado/diálogo y restauración al pasar a perfil/Historias/chat/escritorio. Estas dimensiones son **fixtures**, no capturas ni medidas de Safari real. Pasan las pruebas de gestos consecutivos/cortos, botones, cancelación, galería/Filtros, conservación, repetición de perfiles, Historias y foto. Se mantiene la verificación HTTP de los 78 archivos publicables.

Limitación real de herramientas: inventario de navegador sin host disponible; el acceso alternativo a Safari nativo devolvió `Computer Use permissions are not granted`. No se ha verificado visualmente 375×667/390×844 ni el tacto en iPhone. Pendiente: Safari con barras visibles y desde icono, controles simultáneamente visibles, arrastre horizontal sin scroll, gesto vertical sin decisión, diálogo con scroll, vuelta a otras pestañas y ampliación de texto/zoom. No se ha leído ni reiniciado el almacenamiento del usuario.

Recuperación anterior: `recuperacion-antes-descubrir-pantalla-20261029`. Posterior: commit final y etiqueta local `recuperacion-despues-descubrir-pantalla-20261029`. No cambia el catálogo, los recursos gráficos ni el almacenamiento de fotos/Historias.

## Colecciones de destacadas · 30/10/2026 · versión 20261030-1

Mi perfil muestra un círculo por colección, con portada, nombre, número de imágenes y Editar. Nueva colección permite seleccionar historias propias activas o ya guardadas y escribir un nombre de 1–30 caracteres. Desde una historia propia, Guardar en colección abre el selector de colecciones existentes (nombre y portada) o Nueva colección. Solo Confirmar guarda; cancelar no crea colecciones vacías. Una misma historia puede estar en varias colecciones, sin repetirse dentro de una de ellas.

Editar permite renombrar, elegir la portada entre sus imágenes, añadir historias, quitar una imagen o eliminar la colección. Quitar y eliminar requieren confirmación; si es la última imagen se avisa de que también desaparecerá la colección vacía. Las historias activas y las imágenes de otras colecciones se conservan. Eliminar una historia activa guardada en colecciones la retira de la fila activa, conservando su imagen para las colecciones. No se borran archivos caducados hasta que ya no tienen referencias.

El círculo abre el visor inmersivo existente, con nombre de colección, autor, segmentos estáticos, controles laterales y botones, zonas seguras y avance manual. Nunca hay respuesta a destacadas propias. Cerrar devuelve al perfil y restaura scroll/foco. Los selectores y gestores son diálogos desplazables, ajustados al viewport visual en móvil. Las actualizaciones durante la edición del perfil reemplazan solo la sección Destacadas y conservan los campos sin guardar.

Almacenamiento: misma base `buba-friends-stories-v1`, versión 1, sin cambio de esquema. La clave `highlight-collections-v1` del almacén `meta` guarda `{migrated:true, collections:[{id,name,storyIds,coverId,createdAt}]}`. Las imágenes permanecen en los registros originales de `stories`, una por historia; las colecciones contienen referencias, no blobs/base64 adicionales. Lectura, migración, metadatos y limpieza de archivos se ejecutan dentro de la misma transacción readwrite de `stories`/`meta` y solo se consideran guardados al completar la transacción. La foto propia usa su clave independiente, que estas operaciones no tocan.

Migración única: las historias propias que tenían `featured` se agrupan en «Mis destacadas», en el mismo orden de la lista antigua (creación descendente, id en empate), incluidas las caducadas. El marcador se confirma atómicamente con la colección. Recargar no crea duplicados ni renueva fechas. `featured` se mantiene como estado derivado de las referencias; fuera de la fila activa se conservan las imágenes mientras alguna colección las utilice. El reinicio completo existente limpia también las colecciones y los blobs propios; no se ha ejecutado sobre los datos reales del usuario.

Pruebas simuladas en `collections.test.cjs`: varias imágenes, duplicados, nombres inválidos y cancelación, renombrar/portada (incluida sustitución al retirarla), añadir/quitar, última imagen con aviso, borrar colecciones activas/compartidas/caducadas, GC, persistencia y migración única con orden, fallo de transacción sin cambios, foto independiente, caducidad sin pérdida de destacadas, visor sin respuesta, navegación/cierre/scroll y reinicio. Se prueba el código real del repositorio con dobles de IndexedDB que completan/abortan; no es IndexedDB real de Safari. Pasan también las baterías existentes de Historias, foto, música, decisiones/galería y disposición de Descubrir. `app.js` y `profile-photo.js` permanecen byte a byte intactos; las reglas previas de CSS también se conservan y solo se añaden estilos de colecciones.

El host de navegador sigue indisponible; quedan pendientes revisión visual móvil/escritorio y persistencia de IndexedDB en iPhone. No se afirma haber verificado esos casos táctiles. El comportamiento de Descubrir confirmado por el usuario no se ha alterado. Paquete publicado por el proceso existente: 79 archivos, incluido `collections-ui.js`, sin backups, archivos temporales ni fotos del navegador.

Para crear una colección con dos imágenes: publicar dos historias propias en Historias → Mi perfil → Destacadas → Nueva colección → seleccionar las dos, escribir el nombre y Confirmar. Alternativamente guardar la primera desde su visor en Nueva colección y la segunda en la colección ya creada. Si ya están destacadas, también se pueden seleccionar sin volver a publicarlas.

Recuperación anterior: etiqueta local `recuperacion-antes-colecciones-destacadas-20261029` sobre `3329ff0`. Posterior: commit final y etiqueta local `recuperacion-despues-colecciones-destacadas-20261030`. Son referencias Git; no incluyen datos del navegador.

## Portadas circulares de Destacadas · 30/10/2026 · CSS 20261030-2

Corrección limitada a `.featured-section`. El marco anterior era un ítem flex vertical con `flex-shrink: 1` implícito, imagen en una rejilla con tamaño intrínseco y sin recorte en el marco. Un border-radius de 50 % por sí solo no garantiza un círculo cuando la caja o su imagen se comprimen/desbordan. Se fija el marco con dimensiones mínimas/máximas iguales, aspect-ratio 1 y flex no compresible: 70 × 70 px a 375/390 px, 74 × 74 px en escritorio, borde incluido. El marco recorta con overflow hidden y radio 50 %. La imagen es absoluta, ocupa el marco con object-fit cover y no participa en el cálculo de su tamaño. Los nombres quedan debajo en un bloque que puede envolver; botón y columna tienen ancho fijo. Nueva colección usa el mismo marco cuadrado, con el + centrado. No cambian visor, migración, almacenamiento ni funciones.

Comprobaciones proporcionales: revisión de cascada/especificidad y de las dimensiones declaradas para imagen vertical/horizontal/cuadrada, nombres largos y varias columnas; igualdad fuente/docs y paquete HTTP aislado. No se han repetido baterías de lógica ajenas al CSS. El host de navegador sigue indisponible: **falta medir ancho/alto y comprobar visualmente en iPhone a 375 y 390 px**, con esas proporciones de imagen, nombre largo, borde y botón +. No se presenta la inspección estática como validación visual ni como reproducción exacta del layout de Safari.

Recuperación anterior: `recuperacion-antes-portadas-circulares-20261030`; posterior: commit final y `recuperacion-despues-portadas-circulares-20261030`. Sin acceso a fotos ni datos del navegador.

## Recorte interior de avatares de Historias · 30/10/2026 · CSS 20261030-3

La captura real del usuario muestra el aro circular de Historias con una imagen vertical ovalada que sobresale por debajo, mientras Tu historia conserva su forma. La corrección previa estaba limitada a `.featured-section` y no alcanzaba `.stories-section`. En el HTML de las conexiones la imagen es un img sin clase portrait: no le afectan las alturas de retratos de Descubrir. El defecto de estilos era dejar la imagen en una rejilla con dimensiones porcentuales/intrínsecas y sin recorte del marco en Historias.

Se comparte el marco cuadrado no compresible y con overflow hidden entre ambos listados, sin incluir `.story-viewer` ni las tarjetas. Imágenes directas absolutamente posicionadas, block, ancho/alto 100 %, proporción 1 y object-fit cover: no participan en las dimensiones del marco ni pueden sobresalir. La foto propia anidada y la silueta se limitan a la misma caja. Los nombres y el botón + permanecen fuera del marco. Tamaños declarados de 70×70 px a 375/390 px y 74×74 px en escritorio, borde incluido.

Verificación proporcional: inspección de la captura, selectores y cascada; fuente/docs y HTTP de publicación. Sin cambios en JS, datos, migración, visor grande o retratos de Descubrir. Falta comprobación visual y medición real en iPhone del recorte de imágenes verticales, horizontales y cuadradas en Historias y Destacadas; no se afirma validada la apariencia por pruebas de lógica.

Recuperación anterior: `recuperacion-antes-recorte-avatares-20261030`; posterior: commit final y `recuperacion-despues-recorte-avatares-20261030`.

# Buba Friends · candidata para el viernes 30 de octubre de 2026

Demo local para adultos, con 30 personajes ficticios, ilustraciones originales, coincidencias programadas y mensajes locales. Sin cuentas reales, respuestas automáticas, servidor de producto, pagos, Spotify ni publicación realizada.

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

El usuario ha autorizado el repositorio público independiente `Izangnz/buba-friends`, con Pages desde la rama correspondiente y `/docs`, conservando el historial. Ha indicado usar la cuenta conectada en VS Code. No se ha creado ningún repositorio remoto, commit de este bloque, push ni despliegue.

Cuenta autenticada y verificada mediante GitHub CLI oficial: **Izangnz**. El usuario ha elegido explícitamente el nombre de la cuenta y su correo noreply para los commits, configurados solo en este repositorio. El repositorio público independiente ya está creado y no contenía archivos anteriores. La publicación de Pages se está preparando; el resultado debe verificarse antes de anunciarlo.

Antes de cada publicación, revisar los archivos fuente/publicables y el índice de Git antes de cualquier commit: ya contiene cambios de bloques anteriores. Añadir archivos revisados de forma explícita, sin `git add .`. `backups/` está excluido por `.gitignore`; no usar `git add -f` con copias o datos privados. No subir historias propias, almacenamiento del navegador, secretos ni materiales de generación innecesarios.

Configurar Pages: Settings → Pages → Deploy from a branch → rama publicada (habitualmente `main`) → `/docs` → Save. GitHub admite `/docs` como origen: [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Para actualizaciones posteriores: editar fuentes, ejecutar `node codificacion/tests/demo.test.cjs`, regenerar `docs/`, verificar por HTTP y revisar el diff. Añadir explícitamente los archivos cambiados y sus copias publicables, crear commit con la identidad verificada y hacer push dentro de la autorización recibida. Confirmar el estado del despliegue y la respuesta de la URL pública; no presentar una dirección prevista como un resultado confirmado.

## Recorrido de presentación de tres minutos

1. **0:00–0:30.** Abrir la vista aislada. Mostrar el aviso de simulación, confirmar +18 y pulsar Empezar. Elegir Mujeres, Hombres o Ambos, sin selección automática.
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

Recuperación de este acabado: `backups/antes-portada-bienvenida-20261028.zip` y `backups/despues-portada-bienvenida-20261028.zip`. Son copias locales, no commits; sin ZIP previos, cachés, secretos o almacenamiento del navegador. La identidad de Git sigue sin configurar. No se ha publicado nada.


## Historias locales · bloque autorizado para publicar

Conexiones incluye Historias encima de las conversaciones: Tu historia con + y las historias activas de coincidencias. Todas las coincidencias siguen accesibles en su fila y conversación, tengan o no historia. El aro rosa indica historia sin ver; el aro discontinuo indica vista y no es una confirmación de lectura del chat.

Crear: + → imagen JPEG/PNG/WebP hasta 8 MB → previsualizar → texto opcional hasta 180 caracteres → Publicar en la demo. El aviso «Solo se guarda en este navegador» está junto al botón. Se verifica la firma del archivo, se decodifica y convierte a JPEG de hasta 1280 px, calidad 82; imágenes mayores de 40 megapíxeles se rechazan. Cancelar no guarda nada y libera la vista previa.

`stories.js` guarda metadatos y blobs en IndexedDB, base `buba-friends-stories-v1`; no introduce base64 en localStorage. Las operaciones esperan a la confirmación de la transacción. Fallos de lectura, cuota, permisos, formatos o almacenamiento se muestran como errores. Si Historias no está disponible, el recorrido de citas y chat sigue funcionando.

Cada historia tiene `createdAt` y `expiresAt` persistidos. Caduca exactamente a las 24 horas: se comprueba al arrancar, volver a primer plano, abrir/listar/responder y con un temporizador hasta la siguiente caducidad. Recargar no renueva las fechas. Las historias propias destacadas sobreviven en Mi perfil; al caducar desaparecen de la fila activa. Quitar una destacada caducada o eliminar una historia elimina también el blob. Las URL temporales se liberan cuando ya no se utilizan.

El visor no avanza automáticamente. Tiene cerrar, anterior, siguiente, autor y tiempo transcurrido. Solo se puede responder a historias activas de coincidencias existentes, nunca a las propias. Una confirmación añade un único mensaje al chat correcto y abre esa conversación. La referencia conserva identificador y texto; al caducar o eliminarse la historia muestra «Historia no disponible», sin guardar una miniatura o copia oculta de la imagen en el mensaje.

Los tres ejemplos son ilustraciones SVG originales de este proyecto: exposición (Vega), sendero (Nico) y concierto (Alma). Se identifican como ejemplos. Sus fechas se inicializan una sola vez de forma atómica; no se vuelven a sembrar tras caducar. El reinicio confirmado limpia historias, destacadas y blobs, y restaura únicamente los ejemplos con un nuevo inicio para ensayar. Los SVG de ejemplo siguen formando parte de los recursos de la app para ese reinicio; no son imágenes subidas por el usuario.

Pruebas: batería del recorrido principal y referencias del guardado anterior; historias con repositorio y DOM aislados, reloj antes/en/después de las 24 horas, recarga, creación/cancelación, vistas, destacar/quitar, eliminación y liberación, respuestas vacías/duplicadas/propias/sin coincidencia, referencias no disponibles, errores de almacenamiento y reinicio; validación de firmas y flujo de canvas con decodificación simulada. No equivalen a probar IndexedDB/canvas en Safari real. Revisión real de archivos y 77 recursos HTTP en raíz y subruta con `verify_publication.py`. Sin datos del navegador ni historias propias en el paquete.

Pendiente: prueba visual real de Historias a 375/390 px y escritorio, selector de archivos/decodificación, cuota y persistencia de IndexedDB en iPhone, teclado del visor, foco, desplazamiento y accesibilidad. El host de navegador no está disponible y el control de VS Code indica que faltan permisos; no se afirma revisión en dispositivo.

Publicación autorizada por el usuario en el repositorio público independiente **Izangnz/buba-friends**, desde la rama correspondiente y `/docs`. El usuario indica usar la cuenta conectada en VS Code. Todavía no se ha podido verificar esa sesión desde las herramientas: Git carece de identidad y credencial accesible; el flujo oficial por navegador de GitHub CLI está iniciado y pendiente de autorización. No se ha inventado identidad, creado repositorio remoto ni hecho push. No se ha tocado mi-progreso-diario. No se considera una URL prevista como despliegue confirmado. Los datos locales de 4175 no se transferirán automáticamente al dominio publicado.

Recuperación: `backups/antes-historias-publicacion-20261028.zip` y `backups/despues-historias-publicacion-20261028.zip`, copias locales de archivos revisados, no commits; sin otras copias, `.git`, almacenamiento del navegador, historias privadas, secretos ni cachés.

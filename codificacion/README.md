# Buba Friends

Demo de citas para mayores de 18 años, independiente de Mi Progreso Diario. Identidad rosa suave, frambuesa y ciruela, diez personajes adultos ficticios e ilustraciones SVG propias. Sin dependencias, cuentas, pagos, geolocalización, respuestas automáticas ni servicios externos.

## Abrir y reiniciar

Desde la carpeta `buba-friends`:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Abre **http://127.0.0.1:4174/**. `index.html` es la única entrada de la aplicación. El antiguo `buba friends.html` solo redirige a ella para conservar enlaces anteriores. No duplica la aplicación.

El servidor sirve archivos exclusivamente en este ordenador; no publica la demo ni recibe mensajes. Detén el proceso con Ctrl+C y repite el comando para volver a iniciarlo. Si ya está ejecutándose, basta con abrir la dirección y recargar. Abrir `index.html` directamente también es posible, aunque el guardado bajo `file://` depende del navegador. Usa siempre el mismo origen (dirección y puerto) para acceder a los mismos datos locales.

## Recorrido

1. Confirma +18 y abre el detalle de Vega, incluida su pregunta para romper el hielo.
2. Muestra interés: Vega genera una coincidencia explícitamente simulada.
3. Entra en el chat. Una sugerencia rellena el campo, sin enviar; puedes editarla y pulsar Enviar. Los mensajes no salen del navegador. El mensaje inicial está etiquetado como ejemplo.
4. Vuelve a conexiones y entra en Mi perfil. Guarda nombre, edad, bio e intereses; la vista previa refleja lo guardado.
5. Recarga y comprueba perfil, decisiones, conexiones, mensajes y filtros.
6. Prueba filtros, pasa un perfil y deshaz. Agota los perfiles para ver los estados vacíos.
7. Reinicia desde Mi perfil y confirma en el diálogo. Cancelar conserva la demo.

Coincidencias programadas: Vega, Alma, Nico, Mar, Lara y Dani. Leo, Inés, Hugo y Sara guardan interés sin generar coincidencia. Nunca hay respuestas automáticas.

## Filtros y deshacer

Los filtros aplican conjuntamente un intervalo de edad inclusivo (18–120) y un interés opcional a los perfiles aún sin decidir. No cambian decisiones ni conversaciones. Aplicar guarda los filtros y Limpiar restaura todos los intereses y edades. Hay estados distintos para filtros sin resultados y catálogo agotado.

Deshacer solo recupera la última decisión si fue un «pasar». Una nueva decisión sustituye esa oportunidad; mostrar interés la cancela, genere o no coincidencia. No hay una pila de deshacer y nunca se revierten coincidencias ni mensajes. La oportunidad de deshacer persiste al recargar y mantiene los filtros actuales: si excluyen al personaje recuperado, limpia o ajusta los filtros para verlo.

## Guardado compatible

Se mantiene la clave `buba-friends-v1` y los identificadores `vega`, `leo`, `alma`, `nico`, `ines`. `read()` conserva los datos válidos de la versión anterior y completa propiedades ausentes con filtros abiertos y `lastPass: null`. No intenta deducir si las decisiones antiguas eran pasar o interés. No escribe ni borra el guardado al arrancar. Los nuevos personajes quedan disponibles automáticamente. El reinicio explícito restaura el estado inicial completo de esta demo.

Nombre: 2–35 caracteres tras quitar espacios extremos. Edad: entero entre 18 y 120. Bio: hasta 350 caracteres. Intereses: hasta 150. Mensajes: hasta 1000. Se escapa el texto antes de insertarlo en HTML. Los intereses personalizan un texto de descubrimiento; no existe un algoritmo de compatibilidad.

## Archivos

- `index.html`: entrada, idioma, metadatos y referencias a recursos.
- `buba friends.html`: enlace de compatibilidad que redirige a la entrada principal.
- `codificacion/styles.css`: identidad, símbolo CSS, componentes, foco visible y reglas responsivas.
- `codificacion/app.js`: catálogo, retratos, navegación (`page`, `activeChat`, `render`, `bind`), filtros (`remaining`), deshacer (`undoPass`), perfil y guardado (`read`, `save`).
- `codificacion/tests/demo.test.cjs`: pruebas sin dependencias. Con Node instalado: `node codificacion/tests/demo.test.cjs`.

## Comprobaciones de este bloque

Realizadas:

- Sintaxis JavaScript y pruebas ejecutadas con el motor Node de la herramienta disponible, sin instalar dependencias.
- DOM y almacenamiento simulados: recorrido mediante manejadores, detalle, coincidencia y chat, sugerencias que no envían, mensaje con escape HTML, guardado y lectura, edición y vista previa, validación, filtros combinados e inválidos, limpieza, deshacer tras recarga y bloqueo tras interés, fin del catálogo, conexiones vacías, cancelar y confirmar reinicio.
- Carga de un guardado anterior sin las propiedades nuevas: conserva perfil, mensajes, coincidencias y decisiones y no escribe al arrancar.
- HTTP local: entrada principal, JavaScript y CSS responden con estado 200.
- Revisión estática de adaptación móvil, contenedores flexibles, textos largos y foco visible.

Pendientes:

- Clics y recarga en navegador real; comprobación del foco por teclado.
- Revisión visual real a 390 px y en escritorio, contraste de todo el diseño y ausencia de desbordamientos en renderizado real.
- Safari/iPhone real. El intento de control de Safari agotó el tiempo disponible; no se dispone de una sesión controlable. Las pruebas de lógica no equivalen a una revisión visual.

No se han tocado datos del navegador del usuario ni publicado la aplicación.


## Actualización de la paleta

- Fondo general `#FFF0F5`; superficies `#FFFCF9`; texto principal `#452238`; texto de apoyo `#76596B`; botones, corazones y destacados `#D6336C`.
- El texto pequeño de énfasis usa `#B32658` para mejorar el contraste sobre rosa suave. Botones principales y mensajes propios usan texto blanco cálido sobre frambuesa; ejemplos usan texto ciruela sobre rosa pálido.
- Cálculos de contraste de colores sólidos: texto principal/fondo 12,37:1; secundario/fondo 5,58:1; secundario/tarjeta 6,02:1; texto claro/botón 4,52:1; texto desactivado/fondo desactivado 5,01:1. No constituyen una auditoría del renderizado completo.
- Se mantienen las ilustraciones y se refuerzan sus fondos de texto superpuesto. Foco de teclado ciruela, con tratamiento claro sobre las tarjetas ilustradas. Los controles inválidos usan un borde frambuesa oscuro.
- Verificado: batería de lógica existente con DOM simulado, entrada y CSS locales con respuesta HTTP 200, revisión estática de variables y reglas responsivas. Sin cambios en JavaScript ni datos guardados.
- Pendiente de revisión visual del usuario: todas las pantallas a 390 px y escritorio, superposiciones, foco al recorrer con Tab, errores nativos de formulario y desbordamientos. Safari no respondió al intento de control; no se ha realizado revisión visual en navegador.

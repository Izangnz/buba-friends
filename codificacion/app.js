'use strict';
const KEY = 'buba-friends-v1';
const profiles = [
 {
  "id": "vega",
  "gender": "woman",
  "name": "Vega",
  "age": 25,
  "city": "Madrid",
  "bio": "Me pierdo en las librerías y siempre encuentro una excusa para ver el atardecer. ¿Un café sin mirar el reloj?",
  "tags": [
   "Arte",
   "Café",
   "Escapadas"
  ],
  "color": "#d6ad88",
  "shirt": "#e9ede1",
  "hair": "#48342c",
  "match": true,
  "question": "¿Qué librería o exposición me enseñarías primero?",
  "occupation": "Conservadora de patrimonio",
  "personality": "Curiosa, serena y con un punto irónico.",
  "favoritePlan": "Exposición pequeña, librería de segunda mano y café.",
  "seeking": "Una relación que crezca con conversaciones y tiempo compartido.",
  "image": "codificacion/assets/portraits/vega.jpg",
  "thumbnail": "codificacion/assets/portraits/vega-thumb.jpg"
 },
 {
  "id": "leo",
  "gender": "man",
  "name": "Leo",
  "age": 27,
  "city": "Valencia",
  "bio": "Diseño cosas, cocino sin receta y hago fotos de todo. Busco alguien con quien compartir planes sencillos.",
  "tags": [
   "Diseño",
   "Cocina",
   "Fotografía"
  ],
  "color": "#adbca0",
  "shirt": "#405c52",
  "hair": "#44372e",
  "match": false,
  "question": "¿Qué plato te sale bien incluso sin receta?",
  "occupation": "Diseñador de producto",
  "personality": "Práctico, sociable y de ideas rápidas.",
  "favoritePlan": "Mercado de barrio, receta improvisada y paseo con cámara.",
  "seeking": "Conocer a alguien con quien construir algo estable sin correr.",
  "image": "codificacion/assets/portraits/leo.jpg",
  "thumbnail": "codificacion/assets/portraits/leo-thumb.jpg"
 },
 {
  "id": "alma",
  "gender": "woman",
  "name": "Alma",
  "age": 24,
  "city": "Sevilla",
  "bio": "Una playlist para cada momento y una mochila siempre preparada. Mi plan favorito empieza con «¿y si…?»",
  "tags": [
   "Música",
   "Viajes",
   "Naturaleza"
  ],
  "color": "#c4b6d2",
  "shirt": "#c27652",
  "hair": "#382d2b",
  "match": true,
  "question": "¿Qué canción pondrías al empezar un viaje?",
  "occupation": "Técnica de sonido",
  "personality": "Espontánea, generosa y un poco noctámbula.",
  "favoritePlan": "Concierto al aire libre y escapada al día siguiente.",
  "seeking": "Una conexión con ganas de explorar juntos.",
  "image": "codificacion/assets/portraits/alma.jpg",
  "thumbnail": "codificacion/assets/portraits/alma-thumb.jpg"
 },
 {
  "id": "nico",
  "gender": "man",
  "name": "Nico",
  "age": 29,
  "city": "Bilbao",
  "bio": "Entre una ruta por el monte y una peli en el sofá, me quedo con las dos. Cuéntame tu último descubrimiento.",
  "tags": [
   "Senderismo",
   "Cine",
   "Perros"
  ],
  "color": "#a9bdc7",
  "shirt": "#d7bd79",
  "hair": "#634736",
  "match": true,
  "question": "¿Qué peli merece una segunda tarde en el sofá?",
  "occupation": "Fisioterapeuta",
  "personality": "Paciente, bromista y más de escuchar que de interrumpir.",
  "favoritePlan": "Ruta entre árboles y una película al volver.",
  "seeking": "Una relación estable donde quepan la calma y la aventura.",
  "image": "codificacion/assets/portraits/nico.jpg",
  "thumbnail": "codificacion/assets/portraits/nico-thumb.jpg"
 },
 {
  "id": "ines",
  "gender": "woman",
  "name": "Inés",
  "age": 26,
  "city": "Barcelona",
  "bio": "Cerámica los domingos, conciertos pequeños y conversaciones largas. Aprendiendo a disfrutar de las cosas despacio.",
  "tags": [
   "Cerámica",
   "Música en directo",
   "Lectura"
  ],
  "color": "#d9c79b",
  "shirt": "#936665",
  "hair": "#382d26",
  "match": false,
  "question": "¿Qué concierto pequeño recuerdas con más cariño?",
  "occupation": "Arquitecta",
  "personality": "Observadora, sensible y de humor seco.",
  "favoritePlan": "Taller de cerámica y concierto en una sala pequeña.",
  "seeking": "Conocer a alguien con curiosidad y ganas de cuidarse mutuamente.",
  "image": "codificacion/assets/portraits/ines.jpg",
  "thumbnail": "codificacion/assets/portraits/ines-thumb.jpg"
 },
 {
  "id": "mar",
  "gender": "woman",
  "name": "Mar",
  "age": 32,
  "city": "A Coruña",
  "bio": "Nado en el mar incluso cuando hace fresco. Después, tortilla y una sobremesa sin planes. Busco a alguien que se apunte sin preguntar por la temperatura.",
  "tags": [
   "Mar",
   "Cocina",
   "Lectura"
  ],
  "color": "#8eb9bd",
  "shirt": "#e1ad86",
  "hair": "#342e38",
  "match": true,
  "question": "¿Un baño en el mar o una sobremesa de tres horas?",
  "occupation": "Ingeniera naval",
  "personality": "Directa, cariñosa y difícil de sacar del agua.",
  "favoritePlan": "Baño temprano, tortilla recién hecha y una sobremesa larga.",
  "seeking": "Una relación que encaje con una vida tranquila junto al mar.",
  "image": "codificacion/assets/portraits/mar.jpg",
  "thumbnail": "codificacion/assets/portraits/mar-thumb.jpg"
 },
 {
  "id": "hugo",
  "gender": "man",
  "name": "Hugo",
  "age": 33,
  "city": "Zaragoza",
  "bio": "Tengo un pequeño huerto y una gran colección de discos. Me gusta invitar a cenar, aunque las verduras no siempre llegan a tiempo.",
  "tags": [
   "Música",
   "Cocina",
   "Naturaleza"
  ],
  "color": "#adadca",
  "shirt": "#557c70",
  "hair": "#695043",
  "match": false,
  "question": "¿Qué disco no te cansas de escuchar?",
  "occupation": "Profesor de ciencias",
  "personality": "Metódico para el huerto, improvisador para todo lo demás.",
  "favoritePlan": "Cenar con verduras de temporada y escuchar un disco entero.",
  "seeking": "Una relación estable con espacio para las aficiones de cada uno.",
  "image": "codificacion/assets/portraits/hugo.jpg",
  "thumbnail": "codificacion/assets/portraits/hugo-thumb.jpg"
 },
 {
  "id": "lara",
  "gender": "woman",
  "name": "Lara",
  "age": 28,
  "city": "Granada",
  "bio": "Escalo por las mañanas y dibujo en las terrazas por las tardes. Me enamoran las personas que se ríen de sus propios tropiezos.",
  "tags": [
   "Escalada",
   "Arte",
   "Café"
  ],
  "color": "#d8a6a0",
  "shirt": "#5f658f",
  "hair": "#29272f",
  "match": true,
  "question": "¿Una terraza para dibujar o una escapada a la montaña?",
  "occupation": "Ilustradora de mapas",
  "personality": "Vital, tenaz y capaz de reírse de un mal día.",
  "favoritePlan": "Escalada suave y dibujar en una terraza con sombra.",
  "seeking": "Alguien con quien probar planes nuevos y dejar que pase lo que tenga que pasar.",
  "image": "codificacion/assets/portraits/lara.jpg",
  "thumbnail": "codificacion/assets/portraits/lara-thumb.jpg"
 },
 {
  "id": "dani",
  "gender": "man",
  "name": "Dani",
  "age": 24,
  "city": "Gijón",
  "bio": "Profesor de día, batería cuando los vecinos me dejan. Estoy aprendiendo a bailar y me vendría bien alguien que tampoco cuente los pasos.",
  "tags": [
   "Baile",
   "Música",
   "Cine"
  ],
  "color": "#b5bd8f",
  "shirt": "#945d58",
  "hair": "#513d2f",
  "match": true,
  "question": "¿Qué canción te saca a bailar sin pensarlo?",
  "occupation": "Profesor de primaria",
  "personality": "Sociable, paciente y con ritmo para casi todo.",
  "favoritePlan": "Ensayo con amigos y primera clase de baile en pareja.",
  "seeking": "Una relación con complicidad y buen humor cotidiano.",
  "image": "codificacion/assets/portraits/dani.jpg",
  "thumbnail": "codificacion/assets/portraits/dani-thumb.jpg"
 },
 {
  "id": "sara",
  "gender": "woman",
  "name": "Sara",
  "age": 30,
  "city": "Málaga",
  "bio": "Reparo bicis, colecciono mapas y elijo las vacaciones por la comida. Un paseo largo y un sitio nuevo para cenar me parecen una buena primera cita.",
  "tags": [
   "Bicicleta",
   "Viajes",
   "Cocina"
  ],
  "color": "#d6ba8e",
  "shirt": "#456e88",
  "hair": "#54322f",
  "match": false,
  "question": "¿Qué ciudad visitarías solo por su comida?",
  "occupation": "Técnica de movilidad urbana",
  "personality": "Resolutiva, aventurera y buena encontrando atajos.",
  "favoritePlan": "Paseo en bici y probar un restaurante de otro barrio.",
  "seeking": "Una relación donde compartir proyectos sin perder la independencia.",
  "image": "codificacion/assets/portraits/sara.jpg",
  "thumbnail": "codificacion/assets/portraits/sara-thumb.jpg"
 },
 {
  "id": "martina",
  "gender": "woman",
  "name": "Martina",
  "age": 23,
  "city": "",
  "occupation": "Mecánica de bicicletas",
  "personality": "Ingeniosa, independiente y cercana.",
  "bio": "Arreglo bicis, improviso escapadas y siempre digo que la última cuesta ya es la última. Casi nunca es verdad.",
  "tags": [
   "Bicicleta",
   "Música en directo",
   "Escapadas"
  ],
  "favoritePlan": "Ruta corta en bici con parada para desayunar.",
  "seeking": "Conocer a alguien con quien pueda surgir una relación, sin prisas.",
  "question": "¿Ruta con desayuno o concierto sin conocer al grupo?",
  "image": "codificacion/assets/martina-v2.png",
  "color": "#c6ad8d",
  "shirt": "#8e514e",
  "hair": "#54382c",
  "match": true,
  "thumbnail": "codificacion/assets/portraits/martina-thumb.jpg"
 },
 {
  "id": "gabriel",
  "gender": "man",
  "name": "Gabriel",
  "age": 28,
  "city": "",
  "occupation": "Ilustrador editorial",
  "personality": "Sociable, observador y con humor tranquilo.",
  "bio": "Dibujo para ganarme la vida y cocino para convencer a mis amigos de que vengan a casa. Mi carbonara no lleva nata.",
  "tags": [
   "Ilustración",
   "Cocina",
   "Cine"
  ],
  "favoritePlan": "Cocinar para amigos y descubrir una película.",
  "seeking": "Una relación estable.",
  "question": "¿Qué plato prepararías para impresionar sin complicarte la vida?",
  "image": "codificacion/assets/gabriel-v1.png",
  "color": "#c7ad8a",
  "shirt": "#6b4145",
  "hair": "#332925",
  "match": true,
  "thumbnail": "codificacion/assets/portraits/gabriel-thumb.jpg"
 },
 {
  "id": "elia",
  "name": "Elia",
  "age": 20,
  "gender": "woman",
  "city": "Valladolid",
  "occupation": "Estudiante de ingeniería ambiental",
  "personality": "Tranquila, perseverante y de preguntas inesperadas.",
  "tags": [
   "Naturaleza",
   "Lectura",
   "Bicicleta"
  ],
  "bio": "Estudio cómo gastar menos recursos y practico gastando menos tiempo mirando el móvil. Me llevo una novela a todas partes, aunque a veces solo leo el billete del tren.",
  "favoritePlan": "Pasear por un jardín botánico y leer un rato al sol.",
  "seeking": "Conocer a alguien con quien hablar sin tener que llenar todos los silencios.",
  "question": "¿Qué libro te llevarías a un viaje sin fecha de vuelta?",
  "match": true,
  "image": "codificacion/assets/portraits/elia.jpg",
  "thumbnail": "codificacion/assets/portraits/elia-thumb.jpg"
 },
 {
  "id": "aina",
  "name": "Aina",
  "age": 21,
  "gender": "woman",
  "city": "Girona",
  "occupation": "Librera y estudiante de Historia",
  "personality": "Sociable, ingeniosa y fácil de entusiasmar.",
  "tags": [
   "Lectura",
   "Baile",
   "Cocina"
  ],
  "bio": "Recomiendo libros según el humor del día y hago unas croquetas que no caben en ninguna receta. Si hay música, acabaré bailando aunque solo haya venido a saludar.",
  "favoritePlan": "Cocinar entre varios y acabar moviendo los muebles para bailar.",
  "seeking": "Una conexión con alguien que se tome en serio lo que le ilusiona.",
  "question": "¿Qué cena montarías con tres ingredientes y buena compañía?",
  "match": true,
  "image": "codificacion/assets/portraits/aina.jpg",
  "thumbnail": "codificacion/assets/portraits/aina-thumb.jpg"
 },
 {
  "id": "rocio",
  "name": "Rocío",
  "age": 22,
  "gender": "woman",
  "city": "Córdoba",
  "occupation": "Técnica de laboratorio",
  "personality": "Observadora, organizada y con ganas de improvisar al salir.",
  "tags": [
   "Fotografía",
   "Senderismo",
   "Música"
  ],
  "bio": "De lunes a viernes mido todo con precisión. El fin de semana hago fotos desenfocadas que defiendo como arte. Me gusta andar hasta encontrar un sitio donde apetezca quedarse.",
  "favoritePlan": "Caminar por una vía verde y hacer fotos sin un destino concreto.",
  "seeking": "Conocer a alguien y ver si la confianza se convierte en relación.",
  "question": "¿Prefieres guardar un paisaje en una foto o en la memoria?",
  "match": false,
  "image": "codificacion/assets/portraits/rocio.jpg",
  "thumbnail": "codificacion/assets/portraits/rocio-thumb.jpg"
 },
 {
  "id": "bruno",
  "name": "Bruno",
  "age": 19,
  "gender": "man",
  "city": "Salamanca",
  "occupation": "Estudiante de cocina",
  "personality": "Expresivo, constante y poco amigo de las medias tintas.",
  "tags": [
   "Cocina",
   "Deporte",
   "Cine"
  ],
  "bio": "Estoy aprendiendo cocina y aceptando que quemar una sartén no me convierte en chef. Juego al baloncesto por las tardes y elijo las pelis por lo que luego dan para discutir.",
  "favoritePlan": "Preparar una pizza desde cero y elegir una película por turnos.",
  "seeking": "Una relación con alguien con quien aprender sobre la marcha.",
  "question": "¿Qué ingrediente defenderías aunque el resto de la mesa no esté de acuerdo?",
  "match": true,
  "image": "codificacion/assets/portraits/bruno.jpg",
  "thumbnail": "codificacion/assets/portraits/bruno-thumb.jpg"
 },
 {
  "id": "alexis",
  "name": "Alexis",
  "age": 20,
  "gender": "man",
  "city": "Santander",
  "occupation": "Estudiante de diseño y aprendiz de encuadernación",
  "personality": "Creativo, afable y competitivo solo en los juegos de mesa.",
  "tags": [
   "Diseño",
   "Juegos de mesa",
   "Mar"
  ],
  "bio": "Hago cuadernos a mano y luego me da pena estrenarlos. Siempre llevo un juego pequeño en la mochila: más de una sobremesa se ha complicado por mi culpa.",
  "favoritePlan": "Playa al caer la tarde y una partida sin mirar el reloj.",
  "seeking": "Conocer a alguien con quien compartir aficiones y hacer sitio a otras nuevas.",
  "question": "¿Qué juego sacarías para romper el hielo sin romper una amistad?",
  "match": false,
  "image": "codificacion/assets/portraits/alexis.jpg",
  "thumbnail": "codificacion/assets/portraits/alexis-thumb.jpg"
 },
 {
  "id": "iker",
  "name": "Iker",
  "age": 21,
  "gender": "man",
  "city": "Pamplona",
  "occupation": "Técnico en energías renovables",
  "personality": "Práctico, leal y de entusiasmos contagiosos.",
  "tags": [
   "Escalada",
   "Emprendimiento",
   "Cocina"
  ],
  "bio": "Trabajo instalando cosas que aprovechan el sol. Fuera del curro me da por inventar proyectos con amigos, casi todos con un presupuesto optimista y una cena al final.",
  "favoritePlan": "Una sesión de escalada y cocinar algo que nunca hayamos probado.",
  "seeking": "Una relación en la que apoyarnos sin tener que hacerlo todo juntos.",
  "question": "¿Qué pequeño proyecto montarías si tuvieras un fin de semana libre?",
  "match": true,
  "image": "codificacion/assets/portraits/iker.jpg",
  "thumbnail": "codificacion/assets/portraits/iker-thumb.jpg"
 },
 {
  "id": "teo",
  "name": "Teo",
  "age": 23,
  "gender": "man",
  "city": "Cádiz",
  "occupation": "Educador social",
  "personality": "Abierto, espontáneo y experto en quitar hierro.",
  "tags": [
   "Música en directo",
   "Mar",
   "Fotografía"
  ],
  "bio": "Trabajo con grupos y sigo creyendo que escuchar es una habilidad infravalorada. Me apunto a los conciertos sin mirar reseñas y canto fatal con bastante seguridad.",
  "favoritePlan": "Paseo junto al mar y música en un local pequeño.",
  "seeking": "Conocer a alguien con quien pueda surgir una relación sin forzarla.",
  "question": "¿Qué canción te pone de buen humor incluso un lunes?",
  "match": true,
  "image": "codificacion/assets/portraits/teo.jpg",
  "thumbnail": "codificacion/assets/portraits/teo-thumb.jpg"
 },
 {
  "id": "julia",
  "name": "Julia",
  "age": 27,
  "gender": "woman",
  "city": "Madrid",
  "occupation": "Fundadora de un pequeño estudio de diseño",
  "personality": "Ambiciosa, reflexiva y con humor de andar por casa.",
  "tags": [
   "Emprendimiento",
   "Diseño",
   "Cine"
  ],
  "bio": "Mi estudio todavía cabe en una mesa grande. Me hace ilusión verlo crecer, pero también cerrar el portátil para llegar a una sesión de cine en versión original.",
  "favoritePlan": "Película en un cine de barrio y comentar el final tomando algo.",
  "seeking": "Una relación estable que sume sin competir con lo que nos importa.",
  "question": "¿Qué película te gustó más después de hablarla con alguien?",
  "match": true,
  "image": "codificacion/assets/portraits/julia.jpg",
  "thumbnail": "codificacion/assets/portraits/julia-thumb.jpg"
 },
 {
  "id": "noor",
  "name": "Noor",
  "age": 29,
  "gender": "woman",
  "city": "Valencia",
  "occupation": "Restauradora de muebles",
  "personality": "Paciente con la madera y bastante menos con un mal café.",
  "tags": [
   "Arte",
   "Café",
   "Senderismo"
  ],
  "bio": "Rescato sillas que otros darían por perdidas. En mi casa casi todo tiene una historia y alguna pata reparada. Me gusta el monte, pero no presumo de madrugar.",
  "favoritePlan": "Buscar un mercadillo y después caminar por una ruta sencilla.",
  "seeking": "Una relación con tiempo para conocernos de verdad.",
  "question": "¿Qué objeto guardarías aunque no valiera nada para los demás?",
  "match": false,
  "image": "codificacion/assets/portraits/noor.jpg",
  "thumbnail": "codificacion/assets/portraits/noor-thumb.jpg"
 },
 {
  "id": "adrian",
  "name": "Adrián",
  "age": 25,
  "gender": "man",
  "city": "Logroño",
  "occupation": "Técnico de impresión",
  "personality": "Reservado al principio, detallista y muy de cumplir lo que dice.",
  "tags": [
   "Arte",
   "Bicicleta",
   "Cocina"
  ],
  "bio": "Me paso el día entre tintas y papeles y aún me sorprende una buena portada. Cocino despacio y me oriento bastante peor de lo que admito cuando salgo en bici.",
  "favoritePlan": "Recorrer una vía tranquila y preparar una cena con lo que encontremos en el mercado.",
  "seeking": "Una relación con confianza, respeto y planes sencillos.",
  "question": "¿Te quedarías con una comida perfecta o con una historia divertida del intento?",
  "match": true,
  "image": "codificacion/assets/portraits/adrian.jpg",
  "thumbnail": "codificacion/assets/portraits/adrian-thumb.jpg"
 },
 {
  "id": "omar",
  "name": "Omar",
  "age": 26,
  "gender": "man",
  "city": "Málaga",
  "occupation": "Analista de datos",
  "personality": "Analítico en el trabajo, flexible fuera y de risa fácil.",
  "tags": [
   "Deporte",
   "Lectura",
   "Música en directo"
  ],
  "bio": "Puedo pasarme horas resolviendo un problema y perderme buscando el coche. Juego al voleibol, leo ensayo a ratos y no necesito conocer a un grupo para acercarme a escucharlo.",
  "favoritePlan": "Partido en la playa, ducha rápida y concierto improvisado.",
  "seeking": "Conocer a alguien con quien una buena conversación se convierta en algo más.",
  "question": "¿Qué tema podrías explicar durante una hora sin preparártelo?",
  "match": true,
  "image": "codificacion/assets/portraits/omar.jpg",
  "thumbnail": "codificacion/assets/portraits/omar-thumb.jpg"
 },
 {
  "id": "elena",
  "name": "Elena",
  "age": 31,
  "gender": "woman",
  "city": "Oviedo",
  "occupation": "Nutricionista",
  "personality": "Cálida, directa y bastante poco solemne.",
  "tags": [
   "Cocina",
   "Deporte",
   "Viajes"
  ],
  "bio": "Trabajo hablando de comida y descanso cocinando para los míos. No hago menús en las citas: me interesa más saber qué plato te recuerda a casa.",
  "favoritePlan": "Preparar una receta familiar y salir a dar una vuelta sin rumbo.",
  "seeking": "Una relación estable con cuidado mutuo y muchas sobremesas.",
  "question": "¿Qué plato te sabe a un lugar al que siempre volverías?",
  "match": true,
  "image": "codificacion/assets/portraits/elena.jpg",
  "thumbnail": "codificacion/assets/portraits/elena-thumb.jpg"
 },
 {
  "id": "irene",
  "name": "Irene",
  "age": 33,
  "gender": "woman",
  "city": "Bilbao",
  "occupation": "Productora cultural",
  "personality": "Decidida, sociable y buena haciendo que las cosas ocurran.",
  "tags": [
   "Arte",
   "Emprendimiento",
   "Naturaleza"
  ],
  "bio": "Organizo actividades culturales y tengo un talento raro para encontrar enchufes donde no los hay. Cuando todo acaba, agradezco una caminata en la que no tenga que coordinar a nadie.",
  "favoritePlan": "Visitar una galería pequeña y perder la tarde en un parque.",
  "seeking": "Una relación con admiración mutua y espacio para descansar juntos.",
  "question": "¿Qué actividad cultural traerías a tu barrio si pudieras organizarla?",
  "match": true,
  "image": "codificacion/assets/portraits/irene.jpg",
  "thumbnail": "codificacion/assets/portraits/irene-thumb.jpg"
 },
 {
  "id": "valeria",
  "name": "Valeria",
  "age": 34,
  "gender": "woman",
  "city": "León",
  "occupation": "Veterinaria",
  "personality": "Serena, independiente y con una risa que se oye desde lejos.",
  "tags": [
   "Naturaleza",
   "Lectura",
   "Cine"
  ],
  "bio": "Tengo horarios cambiantes, una pila de novelas y cierta debilidad por las películas que me hacen llorar. Valoro mucho a quien sabe cambiar de plan sin cambiar de humor.",
  "favoritePlan": "Paseo largo con una parada tranquila para leer y una peli en casa.",
  "seeking": "Una relación estable, honesta y compatible con vidas propias.",
  "question": "¿Cuál es tu manera favorita de recuperar un día que empezó torcido?",
  "match": false,
  "image": "codificacion/assets/portraits/valeria.jpg",
  "thumbnail": "codificacion/assets/portraits/valeria-thumb.jpg"
 },
 {
  "id": "samuel",
  "name": "Samuel",
  "age": 30,
  "gender": "man",
  "city": "Burgos",
  "occupation": "Carpintero y socio de un taller",
  "personality": "Meticuloso, afectuoso y de bromas dichas muy serio.",
  "tags": [
   "Emprendimiento",
   "Lectura",
   "Cocina"
  ],
  "bio": "Hago muebles que espero que duren más que mis cortes de pelo. Llevo un taller con un amigo y estoy aprendiendo a dejar el trabajo allí cuando bajo la persiana.",
  "favoritePlan": "Cocinar a fuego lento mientras cada uno cuenta su semana.",
  "seeking": "Una relación estable en la que sentirnos en casa sin dejar de sorprendernos.",
  "question": "¿Qué rincón de tu casa dice más de ti?",
  "match": true,
  "image": "codificacion/assets/portraits/samuel.jpg",
  "thumbnail": "codificacion/assets/portraits/samuel-thumb.jpg"
 },
 {
  "id": "pau",
  "name": "Pau",
  "age": 31,
  "gender": "man",
  "city": "Tarragona",
  "occupation": "Enfermero",
  "personality": "Cercano, resolutivo y con paciencia para lo importante.",
  "tags": [
   "Mar",
   "Deporte",
   "Música"
  ],
  "bio": "Mis días pueden ir muy deprisa, así que elijo despacio los ratos libres. Nado, escucho discos antiguos y preparo desayunos como si viniera visita aunque esté solo.",
  "favoritePlan": "Nadar temprano y alargar el desayuno en una terraza.",
  "seeking": "Una relación con alguien con quien cuidarnos sin complicarlo todo.",
  "question": "¿Qué pequeño ritual hace que un día libre merezca la pena?",
  "match": true,
  "image": "codificacion/assets/portraits/pau.jpg",
  "thumbnail": "codificacion/assets/portraits/pau-thumb.jpg"
 },
 {
  "id": "ruben",
  "name": "Rubén",
  "age": 32,
  "gender": "man",
  "city": "Sevilla",
  "occupation": "Guionista de radio",
  "personality": "Conversador, curioso y menos gracioso cuando le piden un chiste.",
  "tags": [
   "Cine",
   "Música en directo",
   "Bicicleta"
  ],
  "bio": "Escribo para que otras personas lo digan en voz alta. En persona prefiero escuchar historias que no conozco y pedalear hasta sitios a los que también llegaba el autobús.",
  "favoritePlan": "Paseo en bici, concierto y una charla de camino a casa.",
  "seeking": "Conocer a alguien con quien haya intención de construir una relación.",
  "question": "¿Qué anécdota tuya debería tener una versión para la radio?",
  "match": false,
  "image": "codificacion/assets/portraits/ruben.jpg",
  "thumbnail": "codificacion/assets/portraits/ruben-thumb.jpg"
 },
 {
  "id": "youssef",
  "name": "Youssef",
  "age": 34,
  "gender": "man",
  "city": "Barcelona",
  "occupation": "Ingeniero de sistemas",
  "personality": "Tranquilo, sociable y de entusiasmos muy concretos.",
  "tags": [
   "Cocina",
   "Juegos de mesa",
   "Senderismo"
  ],
  "bio": "Paso la semana arreglando sistemas y los domingos ajustando especias. Me encanta reunir amigos; también disfruto de un paseo en el que no haya que demostrar nada.",
  "favoritePlan": "Cocinar para varios y dejar que la sobremesa decida el resto.",
  "seeking": "Una relación estable con acuerdos claros y ganas de compartir.",
  "question": "¿Qué regla casera propondrías para una primera partida juntos?",
  "match": true,
  "image": "codificacion/assets/portraits/youssef.jpg",
  "thumbnail": "codificacion/assets/portraits/youssef-thumb.jpg"
 }
];
const fresh = () => ({started:false,decisions:[],matches:[],messages:{},preference:null,filters:{min:18,max:100,interest:''},lastPass:null,profileCompleted:false,profileReview:false,me:{name:'',age:'',bio:'',interests:'',music:{artists:[],songs:[]}}});
// Acepta únicamente enteros escritos con cifras; no convierte vacíos, decimales ni exponentes.
function parseAge(value){
 if(typeof value==='number')return Number.isInteger(value)&&value>=18&&value<=100?value:null;
 if(typeof value!=='string'||!/^\d{1,3}$/.test(value.trim()))return null;
 const age=Number(value.trim());return age>=18&&age<=100?age:null;
}
const preferences=[['women','♀','Mujeres'],['men','♂','Hombres'],['both','♀ ♂','Ambos']];
function validPreference(value){return preferences.some(([id])=>id===value);}
function formError(id,text){const el=root.querySelector('#'+id);if(el)el.textContent=text;}
function preferenceView(){return `<section class="discovery-preference" aria-labelledby="preference-title"><h2 id="preference-title">¿A quién quieres descubrir?</h2><div class="preference-buttons" role="group" aria-label="Perfiles que quieres descubrir">${preferences.map(([id,symbol,label])=>`<button type="button" data-preference="${id}" aria-pressed="${state.preference===id}" class="preference-button ${state.preference===id?'selected':''}">${label} <span aria-hidden="true">${symbol}</span></button>`).join('')}</div><p>Solo filtra los perfiles ficticios de esta demo. Tu elección se guarda en este navegador.</p></section>`;}
function ageOptions(min,max,selected){return Array.from({length:max-min+1},(_,i)=>min+i).map(age=>`<option value="${age}" ${age===selected?'selected':''}>${age}</option>`).join('');}
function read(){
 try{
  const s=JSON.parse(localStorage.getItem(KEY));if(!s||typeof s!=='object')return fresh();
  const base=fresh(), ids=new Set(profiles.map(p=>p.id));
  const matches=[...new Set((Array.isArray(s.matches)?s.matches:[]).filter(id=>ids.has(id)))];
  // An explicit decisions array (including empty after replay) is authoritative.
  const decisions=[...new Set((Array.isArray(s.decisions)?s.decisions:matches).filter(id=>ids.has(id)))];
  const messages={};
  for(const id of matches)messages[id]=(Array.isArray(s.messages?.[id])?s.messages[id]:[]).filter(m=>m&&typeof m.text==='string').map(m=>({mine:m.mine===true,text:m.text,...(m.story&&typeof m.story.id==='string'&&m.story.authorId===id?{story:{id:m.story.id.slice(0,100),authorId:id,caption:typeof m.story.caption==='string'?m.story.caption.slice(0,180):''}}:{})}));
  const f={...(s.filters||{})};f.interest=({Bici:'Bicicleta',Conciertos:'Música en directo'})[f.interest]||f.interest;const min=parseAge(f.min),max=parseAge(f.max);
  const filters={min:Number.isInteger(min)&&min>=18&&min<=100?min:18,max:Number.isInteger(max)&&max>=18&&max<=100?max:100,interest:profiles.some(p=>p.tags.includes(f.interest))?f.interest:''};
  if(filters.min>filters.max){filters.min=18;filters.max=100;}
  const me={...base.me};for(const k of ['name','bio','interests'])if(typeof s.me?.[k]==='string')me[k]=s.me[k];
  me.age=parseAge(s.me?.age)??base.me.age;
  me.music=normalizeMusic(s.me?.music);
  const legacy={name:'Alex',age:25,bio:'Me gustan los planes sencillos y conocer gente con curiosidad.',interests:'Café, música, paseos'};
  const untouched=!s.profileCompleted&&Object.entries(legacy).every(([k,v])=>me[k]===v)&&!me.music.artists.length&&!me.music.songs.length&&Object.keys(s.me||{}).every(k=>k in legacy||k==='music');
  const ambiguous=!s.profileCompleted&&!untouched&&Object.entries(legacy).some(([k,v])=>me[k]===v);
  // Preserve unknown personal fields too; never silently discard legacy user data.
  for(const [k,v] of Object.entries(s.me||{}))if(!(k in me))me[k]=v;
  if(untouched)Object.assign(me,base.me);
  const profileCompleted=!untouched&&!ambiguous&&!!me.name.trim()&&parseAge(me.age)!==null;
  return {...base,profileCompleted,profileReview:ambiguous||s.profileReview===true,started:s.started===true,preference:validPreference(s.preference)?s.preference:null,decisions,matches,messages,me,filters,lastPass:s.lastPass===decisions.at(-1)&&!matches.includes(s.lastPass)?s.lastPass:null};
 }catch{return fresh();}
}
function matchingProfiles(){if(!state.preference)return [];const f=state.filters;return profiles.filter(p=>(state.preference==='both'||p.gender===(state.preference==='women'?'woman':'man'))&&p.age>=f.min&&p.age<=f.max&&(!f.interest||p.tags.includes(f.interest)));}
function remaining(){return matchingProfiles().filter(p=>!state.decisions.includes(p.id));}
function discoverEmpty(){return matchingProfiles().length?`<div class="empty"><div class="flower">✳</div><h2>No hay más perfiles.</h2><p>Se repetirán los perfiles de la demo que cumplan tus filtros actuales. Tus conexiones y conversaciones se conservan.</p><button type="button" class="btn" id="review-profiles">Volver a ver perfiles</button><button type="button" class="btn light" data-nav="matches">Ver conexiones</button></div>`:`<div class="empty"><div class="flower">✳</div><h2>No hay perfiles con estos filtros.</h2><p>Ningún perfil de la demo cumple los filtros actuales. Ajusta a quién descubrir, las edades o los intereses para encontrar perfiles.</p><button type="button" class="btn" id="adjust-empty-filters">Ajustar filtros</button></div>`;}
function reviewProfiles(){
 if(page!=='discover'||!state.preference||current()||!matchingProfiles().length||document.querySelector('dialog[open]'))return;
 const previous={decisions:state.decisions,lastPass:state.lastPass},previousUntil=decisionUntil;
 state.decisions=[];state.lastPass=null;decisionUntil=0;
 if(!save()){Object.assign(state,previous);decisionUntil=previousUntil;return;}
 render();root.querySelector('#pass')?.focus({preventScroll:true});toast('Se repiten los perfiles de la demo que cumplen tus filtros. Tus conexiones y mensajes se conservan.');
}
function current(){return remaining()[0];}
function undoPass(){if(!state.lastPass||state.decisions.at(-1)!==state.lastPass)return;const id=state.lastPass;state.decisions.pop();state.lastPass=null;decisionUntil=0;save();render();root.querySelector('#pass')?.focus({preventScroll:true});toast(`${profiles.find(p=>p.id===id).name} vuelve a estar disponible. Se mantienen tus filtros.`);}
function suggestions(p){return [p.question,`He visto que te gusta ${p.tags[0].toLowerCase()}. ¿Qué me recomendarías para empezar?`,`Si organizamos un plan de ${p.tags[1].toLowerCase()}, ¿por dónde empezamos?`];}
function filtersView(){const f=state.filters;return `<form id="filters" class="filters" novalidate><fieldset><legend>¿A quién quieres descubrir?</legend>${preferences.map(([id,symbol,label])=>`<label class="filter-choice"><input type="radio" name="preference" value="${id}" ${state.preference===id?'checked':''}> ${label} ${symbol}</label>`).join('')}</fieldset><div class="filter-fields"><label>Edad mínima<select id="age-min" name="min">${ageOptions(18,f.max,f.min)}</select></label><label>Edad máxima<select id="age-max" name="max">${ageOptions(f.min,100,f.max)}</select></label><label class="interest-filter">Interés<select name="interest"><option value="">Todos los intereses</option>${[...new Set(profiles.flatMap(p=>p.tags))].sort((a,b)=>a.localeCompare(b,'es')).map(t=>`<option ${f.interest===t?'selected':''}>${t}</option>`).join('')}</select></label></div><p id="filters-error" class="form-error" role="alert"></p><div class="panel-actions"><button class="btn">Aplicar</button><button type="button" class="text-btn" id="clear-filters">Limpiar filtros</button></div></form>`;}
function openFilters(){const d=modal(`<h2>Filtros</h2><p>Los cambios se guardan al aplicar.</p>${filtersView()}`);const form=d.querySelector('#filters'),min=d.querySelector('#age-min'),max=d.querySelector('#age-max');
 const sync=()=>{const lo=parseAge(min.value),hi=parseAge(max.value);if(lo!==null&&hi!==null&&lo<=hi){min.innerHTML=ageOptions(18,hi,lo);max.innerHTML=ageOptions(lo,100,hi);}};min.onchange=max.onchange=sync;
  d.querySelector('#clear-filters').onclick=()=>{min.innerHTML=ageOptions(18,100,18);max.innerHTML=ageOptions(18,100,100);form.elements.interest.value='';};
 form.onsubmit=e=>{e.preventDefault();const data=new FormData(form),lo=parseAge(data.get('min')),hi=parseAge(data.get('max')),preference=data.get('preference');if(lo===null||hi===null||lo>hi||!validPreference(preference)){d.querySelector('#filters-error').textContent='Elige a quién descubrir y edades entre 18 y 100, en orden.';return;}const interest=data.get('interest');if(interest&&!profiles.some(p=>p.tags.includes(interest))){d.querySelector('#filters-error').textContent='Elige un interés de la lista.';return;}state.filters={min:lo,max:hi,interest};state.preference=preference;save();d.close();render();root.querySelector('#open-filters')?.focus();};
}
function ownPreview(){return `<aside class="own-preview" aria-label="Vista previa de tu perfil guardado"><span class="eyebrow">ASÍ QUEDA TU PERFIL</span>${globalThis.BubaPhoto?BubaPhoto.avatar()+BubaPhoto.controls():''}<h2>${esc(state.me.name)}, ${state.me.age}</h2><p>${esc(state.me.bio)||'Un par de líneas sobre ti pueden abrir una conversación.'}</p><div class="tags">${state.me.interests.split(',').map(t=>t.trim()).filter(Boolean).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>${musicView(state.me.music)}<small>Vista previa guardada · Solo en este navegador</small></aside>`;}
let chatOrigin='matches';
let state=read(), page=state.started?'discover':'welcome', activeChat=null, editingProfile=false, decisionUntil=0, cardGesture=null, discoverObserver=null, discoverScrollPreferred=false;
const root=document.querySelector('#app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{toast('El navegador no permite guardar. Los cambios duran hasta cerrar esta página.');return false;}}
function portrait(p){return 'codificacion/assets/portraits/'+p.id+'.jpg';}
function thumbnail(p){return p.thumbnail||portrait(p);}
function toast(text){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=text;document.body.append(el);setTimeout(()=>el.remove(),3500);}
function go(next){page=next==='preference'?'discover':next;activeChat=null;editingProfile=false;render();window.scrollTo(0,0);focusMain();}
function focusMain(){root.querySelector('#main-content')?.focus({preventScroll:true});}
function render(){discoverObserver?.disconnect();discoverObserver=null;cardGesture?.dispose();cardGesture=null;if(!state.started)page='welcome';else if(!state.profileCompleted)page='setup';else if(!state.preference)page='discover';root.innerHTML=`<a class="skip-link" href="#main-content">Ir al contenido</a><div class="layout"><aside class="sidebar"><div class="brand"><img src="codificacion/assets/logo-horizontal.svg" alt="Buba Friends"></div><nav class="nav" aria-label="Navegación principal">${[['discover','✦','Descubrir'],['matches','♡','Conexiones'],['stories','◉','Historias'],['profile','◯','Mi perfil']].map(([id,icon,label])=>`<button data-nav="${id}" ${!state.started||!state.profileCompleted||!state.preference?'disabled':''} class="${(page===id||(id==='discover'&&page==='preference'))?'active':''}" ${(page===id||(id==='discover'&&page==='preference'))?'aria-current="page"':''}><b aria-hidden="true">${icon}</b>${label}${id==='matches'&&state.matches.length?` · ${state.matches.length}`:''}</button>`).join('')}</nav><div class="aside-note"><strong>Las buenas conexiones empiezan siendo tú.</strong>Demo de aprendizaje.<br>Perfiles y coincidencias ficticios.<br>Solo para mayores de 18 años.</div></aside><main class="main" id="main-content" tabindex="-1"><header class="topbar"><img class="header-logo" src="codificacion/assets/logo-horizontal.svg" alt="Buba Friends"><span class="pill">Demo · +18</span>${page==='discover'?`<button type="button" class="text-btn discover-view-toggle" id="discover-view-toggle" aria-pressed="false">Ampliar vista</button><button class="btn light" id="open-filters">Filtros</button>`:''}</header>${content()}<footer class="footer">Hecho para conectar, a tu ritmo. · Todos los perfiles son ficticios e ilustrados.</footer></main></div>`;
root.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>go(b.dataset.nav));bind();setupDiscoverViewport();}
function content(){if(page==='setup')return `<section class="intro"><h1>Crear mi perfil</h1></section>${state.profileReview?'<p role="status">Tu perfil antiguo contiene datos que podrían ser ejemplos. Confirma o edita los campos antes de continuar; conservamos tus conexiones, mensajes e historias.</p>':''}${globalThis.BubaPhoto?'<section class="profile-photo-section"><h2>Tu foto (opcional)</h2>'+BubaPhoto.avatar()+BubaPhoto.controls()+'</section>':''}${profileForm(true)}`;if(page==='stories')return `<section class="intro"><div><h1>Historias.</h1><p>Momentos de tus conexiones y los tuyos.</p></div></section>${typeof storiesConnectionsView==='function'?storiesConnectionsView():''}`;if(page==='welcome')return `<section class="welcome"><div><h1>Sé tú. Conoce a alguien.</h1><p>Comparte tus gustos, descubre nuevas personas y deja que surja la conexión.</p><p class="muted">Esta es una demo: nadie es real, las coincidencias son simuladas y tus mensajes se quedan en este navegador.</p><label class="check"><input id="adult" type="checkbox">Confirmo que tengo 18 años o más y entiendo que es una simulación.</label><button id="start" class="btn" disabled>Crear mi perfil ↗</button></div><figure class="welcome-illustration"><img src="codificacion/assets/welcome-date.jpg" width="1200" height="800" decoding="async" fetchpriority="high" alt="Ilustración de dos adultos ficticios que se miran y sonríen durante una primera cita, con luz cálida y tonos rosas."></figure></section>`;
if(page==='discover'){const p=current();return `<div class="discovery-summary"><span>${state.preference?preferences.find(([id])=>id===state.preference)[2]+' · '+state.filters.min+'–'+state.filters.max+' años'+(state.filters.interest?' · '+esc(state.filters.interest):''):'Elige Mujeres, Hombres o Ambos para mostrar perfiles.'}</span><small>${remaining().length} pendientes · Perfiles ficticios</small></div><small class="discover-layout-note" role="status">Vista ampliada con desplazamiento. Puedes usar los botones para decidir.</small>${!state.preference?preferenceView():''}${!state.preference?'':p?`<span class="discover-type-probe" aria-hidden="true"></span><div class="discover-grid"><div><article class="card" id="swipe-card"><span class="swipe-hint" role="status" aria-live="polite" aria-atomic="true"></span><button class="card-detail" id="detail" aria-label="Información del perfil">ⓘ</button><img decoding="async" draggable="false" class="portrait ${p.image?'painted-portrait':''}" src="${portrait(p)}" alt="Retrato ilustrado de ${p.name}, perfil ficticio"><div class="card-info"><h2>${p.name}, ${p.age}</h2><p class="profile-meta">${p.city?`⌖ ${esc(p.city)} · `:''}Perfil ficticio</p>${p.occupation?`<p class="occupation">${esc(p.occupation)}</p>`:''}<div class="tags">${p.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}</div></div></article><div class="actions"><button class="round undo" id="undo" aria-label="Deshacer último pasar" title="${state.lastPass?'Recuperar último perfil pasado':'Solo se puede deshacer el último pasar'}" ${state.lastPass?'':'disabled'}>↶</button><button class="round" id="pass" aria-label="Pasar de ${p.name}">×</button><button class="round like" id="like" aria-label="Mostrar interés por ${p.name}">♥</button></div><div class="caption"><span>Desliza o usa los botones.</span><span class="discover-extra-help"> Deshacer recupera solo el último pasar. · ${profiles.length-state.decisions.length} de ${profiles.length} perfiles sin decidir</span></div></div><aside class="side-copy"><div class="flower" aria-hidden="true">✳</div><h2>Tu tipo de plan.<br>Tu tipo de persona.</h2><p>Cada perfil tiene una pregunta para romper el hielo. Abre el detalle y elige por dónde empezar.</p><div class="mini-note"><span class="eyebrow">TUS INTERESES, A MANO</span><p>Usamos tus intereses solo para personalizar este texto. Aquí no hay un algoritmo de compatibilidad.</p></div></aside></div>`:discoverEmpty()+(state.lastPass?'<div class="empty-undo"><button class="btn light" id="undo">↶ Deshacer último pasar</button><p>Recupera solo el último pasar. Se mantienen tus filtros.</p></div>':'')}`;}
if(page==='matches'){if(activeChat)return chat();return `<section class="intro"><div><h1>Tus conexiones.</h1><p>Tus coincidencias simuladas, todas en un mismo lugar.</p></div></section><h2 class="section-title">Coincidencias simuladas</h2><div class="match-strip">${state.matches.map(id=>{const p=profiles.find(p=>p.id===id);return `<button data-chat="${id}"><img src="${thumbnail(p)}" alt="" class="avatar"><span>${p.name}</span></button>`;}).join('')||'<p>Aún no hay coincidencias simuladas.</p>'}</div><h2 class="section-title">Conversaciones</h2><div class="list">${state.matches.length?state.matches.map(id=>{const p=profiles.find(p=>p.id===id);if(!p)return '';const msgs=state.messages[id]||[];return `<button class="match-row" data-chat="${id}"><img class="avatar" src="${thumbnail(p)}" loading="lazy" decoding="async" alt=""><div><strong>${p.name}, ${p.age}</strong><small class="connection-label">Coincidencia simulada${p.city?` · ${p.city}`:''}</small><small>${msgs.length?esc(msgs.at(-1).text.slice(0,55)):'Coincidencia de prueba · Di hola'}</small></div><span class="arrow">↗</span></button>`;}).join(''):empty('Tu próxima historia empieza aquí.','Muestra interés por un perfil para descubrir una coincidencia simulada.','Descubrir perfiles','discover')}</div>`;}
return `<section class="intro"><div><h1>Tu perfil, tu esencia.</h1><p>Los pequeños detalles cuentan tu historia.</p></div></section>${ownPreview()}${typeof storiesProfileView==='function'?storiesProfileView():''}<button class="btn light" id="edit-profile">${editingProfile?'Cerrar edición':'Editar mi perfil'}</button><div class="profile-layout" ${editingProfile?'':'hidden'}>${profileForm(false)}</div><button class="danger" id="reset">Reiniciar toda la demo</button>`;}
function empty(title,body,label,target){return `<div class="empty"><div class="flower">✳</div><h2>${title}</h2><p>${body}</p><button class="btn" data-nav="${target}">${label} ↗</button></div>`;}
function chat(){const p=profiles.find(p=>p.id===activeChat);return `<section class="intro"><div><h1>Empieza con un hola.</h1><p>Chat local de prueba · No se envían mensajes a nadie.</p></div></section><section class="chat"><header class="chat-head"><button id="back" aria-label="Volver a ${chatOrigin==='stories'?'historias':chatOrigin==='profile'?'mi perfil':'conexiones'}">‹ ${chatOrigin==='stories'?'Historias':chatOrigin==='profile'?'Mi perfil':'Conexiones'}</button><img class="avatar" src="${thumbnail(p)}" loading="lazy" decoding="async" alt=""><div><strong>${p.name}</strong><div class="muted">Personaje ficticio · simulación</div></div></header><div class="messages" aria-live="polite">${(state.messages[p.id]||[]).map(m=>`<div class="bubble ${m.mine?'mine':''}"><small>${m.mine?'Tú':'Mensaje de ejemplo · '+p.name}</small>${m.story?(typeof storyReference==='function'?storyReference(m.story):'<div class="story-reference">Historia no disponible</div>'):''}${esc(m.text)}</div>`).join('')}</div><div class="suggestions"><strong>¿Te falta una primera frase?</strong><p>Elige una, edítala y envíala cuando quieras.</p>${suggestions(p).map((text,i)=>`<button class="suggestion" data-suggestion="${i}" type="button">${esc(text)}</button>`).join('')}</div><form class="send" id="send"><input name="message" aria-label="Mensaje de prueba" placeholder="Escribe tu primer hola…" maxlength="1000" required autocomplete="off"><button class="btn">Enviar</button></form></section>`;}
// Optional images: [{src, alt}] (or paths), appended to the existing portrait.
// No extra photographs are fabricated: unfilled positions are explicit demo frames.
function profileGallery(p){
 const items=[{type:'image',src:portrait(p),alt:'Retrato ilustrado de '+p.name}];
 for(const entry of Array.isArray(p.images)?p.images:[]){const src=typeof entry==='string'?entry:entry?.src;if(typeof src!=='string'||!src.trim()||items.some(item=>item.src===src))continue;items.push({type:'image',src,alt:typeof entry?.alt==='string'?entry.alt:'Imagen del perfil de '+p.name});}
 while(items.length<3)items.push({type:'demo',position:items.length+1});
 return items;
}
function galleryDemo(label='Foto de prueba · Demo'){return `<div class="gallery-demo"><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 18h11l4-6h10l4 6h11v34H12z"/><circle cx="32" cy="34" r="10"/></svg><strong>${esc(label)}</strong><span>Espacio de demostración</span></div>`;}
function gallerySlide(item){return item.type==='image'?`<img class="gallery-image" decoding="async" draggable="false" src="${esc(item.src)}" alt="${esc(item.alt)}">`:galleryDemo();}
function galleryDots(items,index){return items.map((item,i)=>`<li class="${i===index?'selected':''}" ${i===index?'aria-current="step"':''}><span class="sr-only">Imagen ${i+1}</span></li>`).join('');}
function profileGalleryMarkup(p){const items=profileGallery(p);return `<section class="profile-gallery" aria-label="Galería del perfil"><div id="gallery-viewport" class="gallery-viewport" tabindex="0" aria-label="Imágenes del perfil" aria-describedby="gallery-help gallery-counter"><div id="gallery-slide" class="gallery-slide">${gallerySlide(items[0])}</div></div><div class="gallery-controls"><button type="button" class="text-btn" id="gallery-prev" aria-label="Imagen anterior" disabled>‹ Anterior</button><span id="gallery-counter" role="status" aria-live="polite" aria-atomic="true">1 de ${items.length}</span><button type="button" class="text-btn" id="gallery-next" aria-label="Imagen siguiente">Siguiente ›</button></div><ol id="gallery-dots" class="gallery-dots" aria-label="Posiciones de la galería">${galleryDots(items,0)}</ol><p id="gallery-help" class="muted">Desliza para cambiar de imagen. Aquí no decides sobre el perfil.</p></section>`;}
function bindProfileGallery(d,p){
 const items=profileGallery(p),viewport=d.querySelector('#gallery-viewport'),slide=d.querySelector('#gallery-slide');let index=0,closed=false;
 const paint=()=>{slide.innerHTML=gallerySlide(items[index]);d.querySelector('#gallery-counter').textContent=`${index+1} de ${items.length}`;d.querySelector('#gallery-dots').innerHTML=galleryDots(items,index);d.querySelector('#gallery-prev').disabled=index===0;d.querySelector('#gallery-next').disabled=index===items.length-1;const img=slide.querySelector('img');if(img)img.onerror=()=>{slide.innerHTML=galleryDemo('Imagen no disponible');};};
 const change=step=>{if(closed)return;const next=Math.max(0,Math.min(items.length-1,index+step));if(next!==index){index=next;paint();}};
 const gesture=bindHorizontalGesture(viewport,{isolate:true,ratio:.15,min:32,canStart:()=>!closed&&d.open,onDrag:dx=>{slide.style.transform=`translateX(${Math.max(-24,Math.min(24,dx*.15))}px)`;},onReset:()=>{slide.style.transform='';},onCommit:right=>change(right?-1:1)});
 d.querySelector('#gallery-prev').onclick=()=>{gesture.cancel();change(-1);};d.querySelector('#gallery-next').onclick=()=>{gesture.cancel();change(1);};
 viewport.onkeydown=e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();gesture.cancel();change(e.key==='ArrowLeft'?-1:1);}};
 d.addEventListener('close',()=>{closed=true;gesture.dispose();});paint();
}
function profileDetail(p){return `${profileGalleryMarkup(p)}<span class="eyebrow">PERFIL FICTICIO · +18</span><h2>${esc(p.name)}, ${p.age}</h2>${p.occupation?`<p class="detail-occupation">${esc(p.occupation)}</p>`:''}${p.city?`<p>${esc(p.city)}</p>`:''}${p.personality?`<p>${esc(p.personality)}</p>`:''}<section class="detail-section"><h3>Sobre mí</h3><p>${esc(p.bio)}</p></section>${p.favoritePlan?`<section class="detail-section"><h3>Mi plan favorito</h3><p>${esc(p.favoritePlan)}</p></section>`:''}${p.seeking?`<section class="detail-section"><h3>Qué busco</h3><p>${esc(p.seeking)}</p></section>`:''}<div class="tags">${p.tags.slice(0,3).map(tag=>`<span class="tag">${esc(tag)}</span>`).join('')}</div>${musicView(p.music)}<div class="icebreaker"><h3>Para romper el hielo</h3><p>${esc(p.question)}</p></div><button class="btn" id="close-detail">Volver a descubrir</button>`;}
function modal(html){cardGesture?.cancel();document.querySelector('dialog')?.close();const d=document.createElement('dialog');
 // Every dialog has a close control at its top, including long profile details.
 d.innerHTML='<button type="button" class="dialog-close" aria-label="Cerrar diálogo">×</button>'+html;
 const opener=document.activeElement;document.body.append(d);document.body.classList.add('modal-open');
 d.querySelector('.dialog-close').onclick=()=>d.close();
 d.addEventListener('close',()=>{d.remove();if(document.querySelector('dialog[open]'))return;document.body.classList.remove('modal-open');if(opener?.isConnected)opener.focus({preventScroll:true});else focusMain();updateDiscoverViewport();});
 d.setAttribute('aria-label','Buba Friends · '+(d.querySelector('h2')?.textContent||'Diálogo'));d.showModal();return d;
}
function decide(like){const p=current();if(!p||Date.now()<decisionUntil||document.querySelector('dialog[open]'))return;const newMatch=like&&p.match&&!state.matches.includes(p.id);decisionUntil=Date.now()+350;state.decisions.push(p.id);state.lastPass=like?null:p.id;if(newMatch){state.matches.push(p.id);state.messages[p.id]??=[{mine:false,text:'¡Hola! Este es un mensaje de ejemplo para empezar la conversación. ¿Qué plan te apetece compartir?'}];}save();render();root.querySelector(like?'#like':'#pass')?.focus({preventScroll:true});if(newMatch){const d=modal(`<div class="match-art" aria-hidden="true"><img src="${thumbnail(p)}" decoding="async"><span>♥</span></div><span class="eyebrow">COINCIDENCIA SIMULADA</span><h2>¡Hay conexión!</h2><p>Has conectado con ${p.name}. Esta coincidencia está programada para que puedas probar la experiencia.</p><button class="btn" id="open-chat">Escribir un hola ↗</button><button class="btn light" id="keep">Seguir descubriendo</button>`);d.querySelector('#open-chat').onclick=()=>{d.close();page='matches';activeChat=p.id;render();focusMain();};d.querySelector('#keep').onclick=()=>d.close();}else toast(like?(p.match?'Ya estáis conectados. Tu conversación se conserva.':'Interés guardado. Este perfil no genera coincidencia de prueba.'):'Perfil pasado. Vamos a conocer a alguien más.');}
function bind(){const $=s=>root.querySelector(s);
if(typeof bindStories==='function')bindStories();
if(globalThis.BubaPhoto)BubaPhoto.bind(root);
if($('#open-filters'))$('#open-filters').onclick=openFilters;
if($('#discover-view-toggle'))$('#discover-view-toggle').onclick=()=>{discoverScrollPreferred=!discoverScrollPreferred;cardGesture?.cancel();updateDiscoverViewport();};
if($('#adjust-empty-filters'))$('#adjust-empty-filters').onclick=openFilters;
if($('#review-profiles'))$('#review-profiles').onclick=reviewProfiles;
if($('#edit-profile'))$('#edit-profile').onclick=()=>{editingProfile=!editingProfile;render();root.querySelector(editingProfile?'#profile-form input':'#edit-profile')?.focus();};
bindMusic();
bindSwipe();
root.querySelectorAll('[data-preference]').forEach(button=>button.onclick=()=>{
 const choice=button.dataset.preference;if(!validPreference(choice))return;
 state.preference=choice;save();render();
 root.querySelector('#open-filters')?.focus();
});
if($('#undo'))$('#undo').onclick=undoPass;
root.querySelectorAll('[data-suggestion]').forEach(b=>b.onclick=()=>{const p=profiles.find(p=>p.id===activeChat);const input=$('.send input');input.value=suggestions(p)[Number(b.dataset.suggestion)];input.focus();});
if($('#adult'))$('#adult').onchange=e=>$('#start').disabled=!e.target.checked;if($('#start'))$('#start').onclick=()=>{state.started=true;save();go('discover');};if($('#pass'))$('#pass').onclick=()=>decide(false);if($('#like'))$('#like').onclick=()=>decide(true);if($('#detail'))$('#detail').onclick=()=>{const p=current();const d=modal(profileDetail(p));bindProfileGallery(d,p);d.querySelector('#close-detail').onclick=()=>d.close();};root.querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>{chatOrigin='matches';activeChat=b.dataset.chat;render();focusMain();});if($('#back'))$('#back').onclick=()=>go(chatOrigin);if($('#send'))$('#send').onsubmit=e=>{e.preventDefault();const text=new FormData(e.target).get('message').trim();if(!text)return;if(text.length>1000){toast('El mensaje admite hasta 1000 caracteres.');return;}(state.messages[activeChat]??=[]).push({mine:true,text});save();render();$('.messages').scrollTop=$('.messages').scrollHeight;$('.send input').focus();};if($('#profile-form'))$('#profile-form').onsubmit=e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));data.name=data.name.trim();data.bio=data.bio.trim();data.interests=data.interests.trim();if(data.name.length<1||data.name.length>35){formError('profile-error','El nombre debe tener entre 1 y 35 caracteres.');return;}if(data.bio.length>350||data.interests.length>150){formError('profile-error','Revisa las longitudes: 350 caracteres para la bio y 150 para intereses.');return;}data.age=parseAge(data.age);if(data.age===null){formError('profile-error','Indica una edad entera entre 18 y 100 años. Tu perfil guardado no se ha cambiado.');return;}try{data.music=musicFromForm(e.target);}catch(error){formError('profile-error',error.message);return;}
const initial=!state.profileCompleted;const previous={me:state.me,profileCompleted:state.profileCompleted,profileReview:state.profileReview};state.me={...state.me,...data};state.profileCompleted=true;state.profileReview=false;const saved=save();if(!saved){Object.assign(state,previous);formError('profile-error','No se pudo guardar el perfil. Habilita el almacenamiento del navegador para continuar.');return;}editingProfile=false;if(initial)page='discover';render();root.querySelector('#edit-profile')?.focus({preventScroll:true});if(saved)toast('Tu perfil está guardado en este navegador.');};if($('#reset'))$('#reset').onclick=()=>{const d=modal('<h2>¿Volvemos a empezar?</h2><p>Se borrarán tus mensajes, intereses, perfil, historias, destacadas e imágenes guardadas en esta demo.</p><button class="btn" id="confirm-reset">Sí, reiniciar</button><button class="btn light" id="cancel">Cancelar</button>');d.querySelector('#cancel').onclick=()=>d.close();d.querySelector('#confirm-reset').onclick=async()=>{const button=d.querySelector('#confirm-reset');if(button.disabled)return;button.disabled=true;try{if(globalThis.BubaPhoto)await BubaPhoto.remove();if(typeof resetStories==='function')await resetStories();}catch(e){button.disabled=false;toast('No se pudo completar el reinicio de historias. '+e.message);return;}state=fresh();decisionUntil=0;editingProfile=false;save();d.close();go('welcome');toast('Demo reiniciada. Todo listo para otra presentación.');};};}
// Pointer Events only: pan-y/pinch-zoom remains native; no competing touch handlers.
function bindHorizontalGesture(surface,{canStart=()=>true,onDrag=()=>{},onReset=()=>{},onCommit,ratio=.25,min=64,isolate=false}){
 let gesture=null,disposed=false;
 const stop=e=>{if(isolate)e?.stopPropagation?.();};
 const cancel=()=>{const id=gesture?.id;gesture=null;try{if(id!==undefined&&surface.hasPointerCapture?.(id))surface.releasePointerCapture(id);}catch{}surface.classList.remove('dragging');onReset();};
 const allowed=()=>!disposed&&surface.isConnected&&canStart();
 surface.onpointerdown=e=>{
  stop(e);if(gesture||!allowed()||e.isPrimary===false||(e.button!==undefined&&e.button!==0)||e.target?.closest?.('button,a,input,textarea,select,label,[role="button"]'))return;
  gesture={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,dy:0,horizontal:false};
  // Capture on the surface immediately, before movement transfers capture from a child.
  try{surface.setPointerCapture(e.pointerId);}catch{cancel();}
 };
 surface.onpointermove=e=>{
  stop(e);if(!gesture||gesture.id!==e.pointerId)return;if(!allowed()){cancel();return;}
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  if(!gesture.horizontal){if(Math.abs(dy)>10&&Math.abs(dy)>=Math.abs(dx)){cancel();return;}if(Math.abs(dx)<10||Math.abs(dx)<Math.abs(dy)*1.3)return;gesture.horizontal=true;}
  if(Math.abs(dy)>16&&Math.abs(dy)>Math.abs(dx)*1.2){cancel();return;}gesture.dx=dx;gesture.dy=dy;if(e.cancelable)e.preventDefault();surface.classList.add('dragging');onDrag(dx);
 };
 surface.onpointerup=e=>{
  stop(e);if(!gesture||gesture.id!==e.pointerId)return;
  const dx=Number.isFinite(e.clientX)?e.clientX-gesture.x:gesture.dx,dy=Number.isFinite(e.clientY)?e.clientY-gesture.y:gesture.dy,commit=gesture.horizontal&&Math.abs(dy)<=Math.max(16,Math.abs(dx)*1.2)&&allowed()&&Math.abs(dx)>=Math.max(min,surface.clientWidth*ratio);
  cancel();if(commit)onCommit(dx>0);
 };
 surface.onpointercancel=e=>{stop(e);if(!e||gesture?.id===e.pointerId)cancel();};
 // lostpointercapture bubbles. A child's capture transfer is NOT loss of this surface.
 surface.onlostpointercapture=e=>{stop(e);if(e?.target===surface&&gesture?.id===e.pointerId)cancel();};
 surface.ondragstart=e=>{stop(e);e.preventDefault();cancel();};
 const hide=()=>{if(document.visibilityState==='hidden')cancel();};
 window.addEventListener?.('blur',cancel);document.addEventListener?.('visibilitychange',hide);
 return {cancel,dispose(){if(disposed)return;disposed=true;cancel();window.removeEventListener?.('blur',cancel);document.removeEventListener?.('visibilitychange',hide);}};
}
function bindSwipe(){
 const card=root.querySelector('#swipe-card');if(!card)return;const hint=card.querySelector('.swipe-hint');
 cardGesture=bindHorizontalGesture(card,{canStart:()=>page==='discover'&&!(window.visualViewport?.scale>1.01)&&Date.now()>=decisionUntil&&!document.querySelector('dialog[open]'),onDrag:dx=>{
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  card.style.transform=`translate3d(${dx}px,0,0) rotate(${reduced?0:Math.max(-12,Math.min(12,dx/30))}deg)`;
  const text=dx>0?'ME INTERESA ♥':'PASAR ✕';if(hint.textContent!==text)hint.textContent=text;hint.style.opacity=String(Math.min(1,.5+Math.abs(dx)/120));
 },onReset:()=>{card.style.transform='';hint.style.opacity='0';hint.textContent='';},onCommit:right=>decide(right)});
}
// Only mobile Discover with a card is a single-screen layout. Other screens keep native scroll.
function updateDiscoverViewport(){
 const html=document.documentElement,body=document.body;
 const setClass=(el,name,on)=>el?.classList?.[on?'add':'remove'](name);
 const mobile=Number.isFinite(window.innerWidth)&&window.innerWidth<=600,card=root.querySelector('#swipe-card');
 const active=mobile&&page==='discover'&&!!card;
 setClass(body,'discover-screen',active);
 const viewport=window.visualViewport,zoomed=active&&viewport?.scale>1.01;
 setClass(body,'discover-zoomed',zoomed);
 if(!active){setClass(html,'discover-fit',false);setClass(body,'discover-fit',false);setClass(body,'discover-expanded',false);discoverScrollPreferred=false;html?.style?.removeProperty('--discover-height');return;}
 const height=Math.floor(viewport?.height||window.innerHeight);
 if(Number.isFinite(height)){
  html?.style?.setProperty('--discover-dialog-height',height+'px');
  html?.style?.setProperty('--discover-vv-top',(viewport?.offsetTop||0)+'px');
 }
 // Keep the underlying layout stable while a dialog/keyboard is open; its own scroll remains native.
 if(document.querySelector('dialog[open]'))return;
 const rootFont=typeof getComputedStyle==='function'&&html?parseFloat(getComputedStyle(html).fontSize):16;
 let fits=Number.isFinite(height)&&height>=480&&window.innerWidth<height&&!zoomed&&rootFont<=20&&!discoverScrollPreferred;
 if(Number.isFinite(height))html?.style?.setProperty('--discover-height',height+'px');
 setClass(html,'discover-fit',fits);setClass(body,'discover-fit',fits);setClass(body,'discover-expanded',!fits);
 if(fits){
  const main=root.querySelector('.main'),layout=root.querySelector('.layout'),nav=root.querySelector('.nav'),portrait=card.querySelector('.portrait'),info=card.querySelector('.card-info');
  const overflow=el=>!el||!el.clientHeight||el.scrollHeight>el.clientHeight+2;
  fits=!!portrait?.getBoundingClientRect&&portrait.getBoundingClientRect().height>=160&&!overflow(main)&&!overflow(layout)&&!overflow(nav)&&!overflow(card)&&!overflow(info);
 }
 setClass(html,'discover-fit',fits);setClass(body,'discover-fit',fits);setClass(body,'discover-expanded',!fits);
 const toggle=root.querySelector('#discover-view-toggle');
 if(toggle){toggle.textContent=fits?'Ampliar vista':discoverScrollPreferred?'Una pantalla':'Vista ampliada';toggle.disabled=!fits&&!discoverScrollPreferred;toggle.setAttribute('aria-pressed',String(!fits));toggle.setAttribute('aria-label',fits?'Usar vista ampliada con desplazamiento':discoverScrollPreferred?'Intentar vista de una pantalla':'La altura o el tamaño del texto requiere desplazamiento');}
}
function setupDiscoverViewport(){
 updateDiscoverViewport();const probe=root.querySelector('.discover-type-probe');
 if(probe&&typeof ResizeObserver!=='undefined'){discoverObserver=new ResizeObserver(()=>{cardGesture?.cancel();updateDiscoverViewport();});discoverObserver.observe(probe);}
}
function discoverViewportChanged(){cardGesture?.cancel();updateDiscoverViewport();}
window.addEventListener?.('resize',discoverViewportChanged);
window.visualViewport?.addEventListener('resize',discoverViewportChanged);
window.visualViewport?.addEventListener('scroll',updateDiscoverViewport);
function keepEditorVisible(){
 if(!window.matchMedia?.('(max-width: 600px)').matches)return;
 const field=document.activeElement;if(!field?.matches?.('input:not([type="radio"]):not([type="checkbox"]), textarea'))return;
 const target=field.closest('.send')||field;
 target.scrollIntoView({block:'center',behavior:'auto'});
}
window.visualViewport?.addEventListener('resize',keepEditorVisible);
document.addEventListener?.('focusin',()=>setTimeout(keepEditorVisible,300));
render();

function spotifyURL(value,kind){
 if(!value.trim())return '';
 let u;try{u=new URL(value);}catch{throw new Error('Escribe un enlace válido de Spotify o deja el enlace vacío.');}
 if(u.protocol!=='https:'||u.hostname!=='open.spotify.com'||u.port||u.username||u.password||!new RegExp('^/'+(kind==='artists'?'artist':'track')+'/[A-Za-z0-9]{22}/?$').test(u.pathname))throw new Error('Usa HTTPS y open.spotify.com con una ruta de artista o canción válida.');
 return u.href;
}
function catalogURL(value){
 const u=new URL(value);
 if(u.protocol!=='https:'||!['music.apple.com','itunes.apple.com'].includes(u.hostname)||u.username||u.password||u.port)throw new Error('Enlace de catálogo no permitido.');
 return u.href;
}
function musicURL(item,kind){return item.provider==='itunes'?catalogURL(item.url):spotifyURL(item.url||'',kind);}
function normalizeMusic(m){const out={artists:[],songs:[]};for(const [kind,max] of [['artists',5],['songs',3]])for(const item of (Array.isArray(m?.[kind])?m[kind]:[]).slice(0,max)){if(!item||typeof item.name!=='string')continue;let url='';try{url=musicURL(item,kind);}catch{}out[kind].push({...item,name:item.name.slice(0,100),artist:typeof item.artist==='string'?item.artist.slice(0,100):'',url});}return out;}
function musicLink(i){return i.url?` · <a href="${esc(i.url)}" target="_blank" rel="noopener noreferrer">${i.provider==='itunes'?(new URL(i.url).hostname==='music.apple.com'?'Ver en Apple Music':'Ver en iTunes'):'Abrir en Spotify'}</a>`:'';}
function musicView(m){m=normalizeMusic(m);if(!m.artists.length&&!m.songs.length)return '';return `<section class="music-preview"><h3>Mis gustos musicales</h3>${[['artists','Artistas favoritos'],['songs','Canciones favoritas']].map(([kind,label])=>m[kind].length?`<h4>${label}</h4><ul>${m[kind].map(i=>`<li>${esc(i.name)}${kind==='songs'?' · '+esc(i.artist):''}${i.manual?' · Introducido manualmente':''}${musicLink(i)}</li>`).join('')}</ul>`:'').join('')}</section>`;}
function musicRow(kind,item={},index=0){return `<div class="music-row" data-music-row="${kind}" data-music-item="${esc(JSON.stringify(item))}"><label>${kind==='artists'?'Artista':'Título'}<input data-music-name value="${esc(item.name||'')}" maxlength="100" required ${item.provider==='itunes'?'readonly':''}></label>${kind==='songs'?`<label>Artista de la canción<input data-music-artist value="${esc(item.artist||'')}" maxlength="100" required ${item.provider==='itunes'?'readonly':''}></label>`:''}<input data-music-url type="hidden" value="${esc(item.url||'')}"><small>${item.manual?'Introducido manualmente':item.provider==='itunes'?'Catálogo iTunes':'Guardado anteriormente'}${musicLink(item)}</small><button type="button" class="text-btn" data-remove-music aria-label="Eliminar ${kind==='artists'?'artista':'canción'} ${index+1}">Eliminar</button></div>`;}
function musicEditor(){const m=normalizeMusic(state.me.music);return `<section class="music-editor"><h2>Mis gustos musicales</h2><p>Busca en el catálogo iTunes o introduce un nombre manualmente. Guarda el perfil para conservar los cambios.</p>${[['artists','Artistas favoritos',5],['songs','Canciones favoritas',3]].map(([kind,label,max])=>`<h3>${label} · hasta ${max}</h3><div data-music-list="${kind}">${m[kind].map((item,i)=>musicRow(kind,item,i)).join('')}</div><button type="button" class="btn light" data-add-music="${kind}">Añadir ${kind==='artists'?'artista':'canción'}</button>`).join('')}</section>`;}
function musicFromForm(form){const m={artists:[],songs:[]};for(const kind of ['artists','songs']){const rows=form.querySelectorAll(`[data-music-row="${kind}"]`);if(rows.length>(kind==='artists'?5:3))throw new Error('Has superado el máximo de favoritos.');for(const row of rows){const name=row.querySelector('[data-music-name]').value.trim(),artist=kind==='songs'?row.querySelector('[data-music-artist]').value.trim():'';if(!name||name.length>100||(kind==='songs'&&(!artist||artist.length>100)))throw new Error('Completa el nombre y, para cada canción, su artista (máximo 100 caracteres).');const old=JSON.parse(row.dataset?.musicItem||'{}');const item={...old,name,artist,url:musicURL({...old,url:row.querySelector('[data-music-url]').value.trim()},kind)};m[kind].push(item);}for(const item of m[kind]){const count=m[kind].filter(i=>sameMusic(i,item)).length,previous=(state.me.music?.[kind]||[]).filter(i=>sameMusic(i,item)).length;if(count>Math.max(1,previous))throw new Error('Ya has añadido este favorito. Elimina el duplicado.');}}return m;}
function sameMusic(a,b){const key=s=>s.normalize('NFKC').trim().toLocaleLowerCase().replace(/\s+/g,' ');return (a.provider==='itunes'&&b.provider==='itunes'&&String(a.providerId)===String(b.providerId))||(key(a.name)===key(b.name)&&key(a.artist||'')===key(b.artist||''));}
function catalogItems(data,kind){return (Array.isArray(data?.results)?data.results:[]).filter(i=>i&&(kind==='artists'?i.wrapperType==='artist':i.kind==='song')).slice(0,10).flatMap(i=>{try{const providerId=kind==='artists'?i.artistId:i.trackId,name=kind==='artists'?i.artistName:i.trackName;if(!Number.isSafeInteger(providerId)||typeof name!=='string'||!name.trim()||(kind==='songs'&&typeof i.artistName!=='string'))return [];return [{provider:'itunes',providerId,type:kind==='artists'?'artist':'song',name:name.slice(0,100),artist:kind==='songs'?i.artistName.slice(0,100):'',album:typeof i.collectionName==='string'?i.collectionName:'',genre:typeof i.primaryGenreName==='string'?i.primaryGenreName:'',url:catalogURL(kind==='artists'?(i.artistLinkUrl||i.artistViewUrl):i.trackViewUrl)}];}catch{return [];}});}
// Apple documents callback scripts and an optional media filter (default: all).
// media=music was observed redirecting iPhone user agents to musics:// instead of JSONP.
function searchCatalog(query,kind,onDiagnostic=()=>{}){
 let script,timer,settled=false,rejectRequest,called=false,loaded=false;
 const started=Date.now();searchCatalog.lastStarted=started;
 searchCatalog.sequence=(searchCatalog.sequence||0)+1;
 const callback='bubaMusic'+started+'_'+searchCatalog.sequence+'_'+Math.random().toString(36).slice(2);
 const phases=[];
 const report=(phase,counts={})=>{phases.push(phase);if(phases.length>8)phases.shift();onDiagnostic({version:'20261029-4',transport:'jsonp',entity:kind==='artists'?'musicArtist':'song',media:'omitted',phase,online:globalThis.navigator?.onLine===false?'no':globalThis.navigator?.onLine===true?'yes':'unknown',elapsedMs:Math.max(0,Date.now()-started),scriptLoaded:loaded,callbackReceived:called,...counts,steps:phases.join('>')});};
 const fail=(code,message)=>Object.assign(new Error(message),{code});
 const offline=()=>globalThis.navigator?.onLine===false;
 const cleanup=()=>{
  clearTimeout(timer);if(script){script.onload=script.onerror=null;script.remove();}
  document.removeEventListener?.('securitypolicyviolation',onPolicy);window.removeEventListener?.('offline',onOffline);
  // A removed script may still execute. A short-lived inert callback absorbs it safely.
  if(window[callback]&&!called){const ignore=()=>{};window[callback]=ignore;setTimeout(()=>{if(window[callback]===ignore)delete window[callback];},30000);}
  else delete window[callback];
 };
 let finish;
 const onOffline=()=>{if(offline())finish(fail('offline','Sin conexión. Comprueba el acceso a Internet y reintenta.'),'offline');};
 const onPolicy=e=>{try{if(new URL(e.blockedURI).hostname==='itunes.apple.com')finish(fail('service','Servicio no disponible: la política de seguridad ha bloqueado la búsqueda.'),'csp-blocked');}catch{}};
 const promise=new Promise((resolve,reject)=>{
  rejectRequest=reject;
  finish=(error,phase,items,counts)=>{if(settled)return;settled=true;report(phase,counts);cleanup();error?reject(error):resolve(items);};
  report('created');
  if(offline()){finish(fail('offline','Sin conexión. Comprueba el acceso a Internet y reintenta.'),'offline');return;}
  try{
   window[callback]=data=>{
    if(settled)return;called=true;loaded=true;report('callback');
    if(!data||!Array.isArray(data.results)||!Number.isFinite(data.resultCount)||data.resultCount<0){finish(fail('service','Servicio no disponible: iTunes devolvió una respuesta no válida.'),'invalid-response');return;}
    const items=catalogItems(data,kind);
    if(data.results.length&&!items.length){finish(fail('service','Servicio no disponible: no se pudieron interpretar los resultados de iTunes.'),'invalid-results',null,{received:data.results.length,usable:0});return;}
    finish(null,items.length?'results':'empty',items,{received:data.results.length,usable:items.length});
   };
   report('callback-registered');script=document.createElement('script');script.async=true;
   const params=new URLSearchParams({term:query,country:'ES',entity:kind==='artists'?'musicArtist':'song',limit:'10',callback});
   script.src='https://itunes.apple.com/search?'+params;
   script.onerror=()=>finish(offline()?fail('offline','Sin conexión. Comprueba el acceso a Internet y reintenta.'):fail('service','Servicio no disponible: no se pudo cargar iTunes. Puede haber un bloqueo de red o del navegador.'),offline()?'offline':'script-error');
   script.onload=()=>{loaded=true;if(!called)finish(fail('service','Servicio no disponible: el script no entregó el callback de iTunes.'),'missing-callback');};
   document.addEventListener?.('securitypolicyviolation',onPolicy);window.addEventListener?.('offline',onOffline);
   timer=setTimeout(()=>finish(fail('timeout','Tiempo de espera agotado. iTunes no respondió a tiempo; reintenta.'),'timeout'),10000);
   report('script-requested');document.head.append(script);
  }catch{finish(fail('service','Servicio no disponible: no se pudo iniciar la búsqueda.'),'setup-error');}
 });
 return {promise,cancel(){if(settled)return;settled=true;report('cancelled');cleanup();rejectRequest(fail('cancelled','Búsqueda cancelada.'));}};
}
function openMusicSearch(kind,add){
 const song=kind==='songs';const d=modal(`<h2>Añadir ${song?'canción':'artista'}</h2><div class="music-search"><label>Buscar en iTunes<input id="music-query" type="search" maxlength="100" autocomplete="off" placeholder="${song?'Título o artista':'Nombre del artista'}" aria-describedby="music-status"></label><p class="muted">La consulta se envía a Apple. No necesitas iniciar sesión.</p><p id="music-status" role="status" aria-live="polite">Escribe al menos dos caracteres.</p><button type="button" id="music-retry" class="text-btn" hidden>Reintentar búsqueda</button><ul id="music-results" aria-label="Resultados de búsqueda"></ul><details><summary>Introducir nombres manualmente</summary><label>${song?'Título':'Artista'}<input id="music-manual-name" maxlength="100"></label>${song?'<label>Artista de la canción<input id="music-manual-artist" maxlength="100"></label>':''}<button type="button" id="music-manual-add" class="btn light">Añadir manualmente</button></details><p id="music-add-error" role="alert"></p><details class="music-diagnostic"><summary>Diagnóstico temporal de búsqueda</summary><p class="muted">No incluye tu consulta, nombres, perfil ni credenciales.</p><label>Informe copiable<textarea id="music-diagnostic" rows="6" readonly></textarea></label><button type="button" class="text-btn" id="music-copy-diagnostic">Copiar diagnóstico</button><p id="music-copy-status" role="status"></p></details></div>`);
 d.classList.add('music-dialog');
 const fit=()=>{const v=window.visualViewport;if(v){d.style.maxHeight=Math.max(120,v.height-24)+'px';d.style.top=(v.offsetTop+12)+'px';}};fit();window.visualViewport?.addEventListener('resize',fit);window.visualViewport?.addEventListener('scroll',fit);
 const input=d.querySelector('#music-query'),status=d.querySelector('#music-status'),results=d.querySelector('#music-results'),retry=d.querySelector('#music-retry');let debounce,request,version=0,closed=false,lastRequest=searchCatalog.lastStarted||0;
 const diagnostic=d.querySelector('#music-diagnostic');diagnostic.value='BUBA MUSIC version=20261029-4 phase=ready';
 const showDiagnostic=info=>{diagnostic.value='BUBA MUSIC '+Object.entries(info).map(([k,v])=>k+'='+v).join(' ');};
 d.querySelector('#music-copy-diagnostic').onclick=async()=>{try{if(!globalThis.navigator?.clipboard?.writeText)throw Error();await navigator.clipboard.writeText(diagnostic.value);d.querySelector('#music-copy-status').textContent='Diagnóstico copiado.';}catch{diagnostic.focus();diagnostic.select?.();d.querySelector('#music-copy-status').textContent='Selecciona y copia el informe de este campo.';}};
 const select=item=>{try{add(item);d.close();}catch(e){d.querySelector('#music-add-error').textContent=e.message;}};
 const run=async()=>{const q=input.value.trim();const ticket=++version;request?.cancel();results.innerHTML='';retry.hidden=true;if(q.length<2){status.textContent='Escribe al menos dos caracteres.';return;}status.textContent='Buscando…';lastRequest=Date.now();request=searchCatalog(q,kind,info=>{if(!closed&&ticket===version)showDiagnostic(info);});try{const items=await request.promise;if(closed||ticket!==version)return;status.textContent=items.length?`${items.length} resultados. Selecciona uno.`:'Sin resultados. Puedes introducir el nombre manualmente.';for(const item of items){const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.className='music-result';button.textContent=[item.name,song?item.artist:item.genre,song?item.album:''].filter(Boolean).join(' · ');button.onclick=()=>select(item);li.append(button);results.append(li);}}catch(e){if(closed||ticket!==version)return;status.textContent=e.message+' Puedes añadirlo manualmente.';retry.hidden=false;}};
 input.oninput=()=>{version++;diagnostic.value='BUBA MUSIC version=20261029-4 phase=debouncing';request?.cancel();clearTimeout(debounce);results.innerHTML='';retry.hidden=true;status.textContent=input.value.trim().length<2?'Escribe al menos dos caracteres.':'Esperando para buscar…';debounce=setTimeout(run,Math.max(450,3100-(Date.now()-lastRequest)));};
 retry.onclick=()=>{clearTimeout(debounce);debounce=setTimeout(run,Math.max(0,3100-(Date.now()-lastRequest)));status.textContent='Preparando reintento…';};
 input.onkeydown=e=>{if(e.key==='Enter')e.preventDefault();if(e.key==='ArrowDown'){e.preventDefault();results.querySelector('button')?.focus();}};
 d.querySelector('#music-manual-add').onclick=()=>{const name=d.querySelector('#music-manual-name').value.trim(),artist=song?d.querySelector('#music-manual-artist').value.trim():'';if(!name||(song&&!artist)){d.querySelector('#music-add-error').textContent='Completa el nombre y el artista de la canción.';return;}select({name,artist,url:'',manual:true,type:song?'song':'artist'});};
 d.addEventListener('close',()=>{closed=true;version++;clearTimeout(debounce);request?.cancel();window.visualViewport?.removeEventListener('resize',fit);window.visualViewport?.removeEventListener('scroll',fit);});input.focus();
}
function bindMusic(){const form=root.querySelector('#profile-form');if(!form)return;
 const removals=()=>form.querySelectorAll('[data-remove-music]').forEach(b=>b.onclick=()=>{b.closest('[data-music-row]').remove();limits();});
 const limits=()=>form.querySelectorAll('[data-add-music]').forEach(b=>b.disabled=form.querySelectorAll(`[data-music-row="${b.dataset.addMusic}"]`).length>=(b.dataset.addMusic==='artists'?5:3));
 form.querySelectorAll('[data-add-music]').forEach(b=>b.onclick=()=>{const kind=b.dataset.addMusic;openMusicSearch(kind,item=>{const list=form.querySelector(`[data-music-list="${kind}"]`),current=musicFromForm(form)[kind];if(current.length>=(kind==='artists'?5:3))throw new Error('Has alcanzado el límite.');if(current.some(i=>sameMusic(i,item)))throw new Error('Ya has añadido este favorito.');list.insertAdjacentHTML('beforeend',musicRow(kind,item,list.children.length));removals();limits();});});removals();limits();
 const update=()=>{const button=form.querySelector('[data-save-profile]');if(button)button.disabled=!form.elements.name.value.trim()||form.elements.name.value.trim().length>35||parseAge(form.elements.age.value)===null;};form.addEventListener('input',update);form.addEventListener('change',update);update();
}
function profileForm(initial){return `<form class="form" id="profile-form" novalidate><label>Nombre<input name="name" value="${esc(state.me.name)}" maxlength="35" placeholder="Tu nombre" required></label><label>Edad<select name="age" required><option value="">Selecciona tu edad</option>${ageOptions(18,100,parseAge(state.me.age))}</select></label><label>Sobre mí (opcional)<textarea name="bio" maxlength="350">${esc(state.me.bio)}</textarea></label><label>Intereses, separados por comas (opcional)<input name="interests" value="${esc(state.me.interests)}" maxlength="150"></label>${musicEditor()}<p id="profile-error" class="form-error" role="alert"></p><button class="btn" data-save-profile>${initial?'Guardar y continuar':'Guardar mi perfil'}</button><p class="muted">Tu perfil y música se conservan en este navegador, sin registro.</p></form>`;}

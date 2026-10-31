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
const fresh = () => ({started:false,onboardingVersion:2,discoveryView:'cards',discoveryOrder:'usual',savedProfiles:[],likes:[],chatMeta:{},decisions:[],matches:[],messages:{},preference:null,filters:{min:18,max:100,interest:''},lastPass:null,profileCompleted:false,profileReview:false,profileDraft:false,setupStep:0,me:{name:'',age:'',bio:'',interests:'',music:{artists:[],songs:[]}}});
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
  for(const id of matches)messages[id]=normalizeChatMessages(s.messages?.[id],id);
  const chatMeta={};for(const id of matches){const m=s.chatMeta?.[id]||{};chatMeta[id]={archived:m.archived===true,opened:m.opened===true,draft:typeof m.draft==='string'?m.draft.slice(0,1000):'',replyTo:typeof m.replyTo==='string'?m.replyTo:null,scrollTop:Number.isFinite(m.scrollTop)&&m.scrollTop>=0?m.scrollTop:null};}
  const f={...(s.filters||{})};f.interest=({Bici:'Bicicleta',Conciertos:'Música en directo'})[f.interest]||f.interest;const min=parseAge(f.min),max=parseAge(f.max);
  const filters={min:Number.isInteger(min)&&min>=18&&min<=100?min:18,max:Number.isInteger(max)&&max>=18&&max<=100?max:100,interest:profiles.some(p=>p.tags.includes(f.interest))?f.interest:''};
  Object.assign(filters,BubaDiscovery.normalizeFilters(f,profiles),{min:filters.min,max:filters.max});
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
  const profileCompleted=s.profileDraft!==true&&!untouched&&!ambiguous&&!!me.name.trim()&&parseAge(me.age)!==null;
  return {...base,discoveryView:s.discoveryView==='explore'?'explore':'cards',discoveryOrder:s.discoveryOrder==='common'?'common':'usual',savedProfiles:[...new Set((Array.isArray(s.savedProfiles)?s.savedProfiles:[]).filter(id=>ids.has(id)))],likes:[...new Set((Array.isArray(s.likes)?s.likes:[]).filter(id=>ids.has(id)))],chatMeta,profileDraft:s.profileDraft===true,onboardingVersion:2,setupStep:BubaExperience.draftStep(s.setupStep,s.onboardingVersion),profileCompleted,profileReview:ambiguous||s.profileReview===true,started:s.started===true,preference:validPreference(s.preference)?s.preference:null,decisions,matches,messages,me,filters,lastPass:s.lastPass===decisions.at(-1)&&!matches.includes(s.lastPass)?s.lastPass:null};
 }catch{return fresh();}
}
function matchingProfiles(){return profiles.filter(p=>BubaDiscovery.matches(p,state.preference,state.filters));}
function remaining(){return BubaDiscovery.order(matchingProfiles().filter(p=>!state.decisions.includes(p.id)&&(page!=='explore'||!exploreCategory||BubaExperience.inCategory(p,exploreCategory,BubaDiscovery.intention))),state.me,state.discoveryOrder);}
function discoverEmpty(){if(page==='explore'&&exploreCategory&&!remaining().length)return '<div class="empty"><h2>No hay perfiles disponibles en este tema.</h2><p>Puede que no haya datos del tema, que los filtros no coincidan o que ya hayas revisado sus perfiles. Tus preferencias y decisiones siguen igual.</p><button type="button" class="btn light" id="back-explore-categories">Ver otras categorías</button><button type="button" class="text-btn" id="adjust-empty-filters">Revisar filtros</button></div>';return matchingProfiles().length?`<div class="empty"><div class="flower">✳</div><h2>No hay más perfiles.</h2><p>Se repetirán los perfiles de la demo que cumplan tus filtros actuales. Tus conexiones y conversaciones se conservan.</p><button type="button" class="btn" id="review-profiles">Volver a ver perfiles</button><button type="button" class="btn light" data-nav="matches">Ver conexiones</button></div>`:`<div class="empty"><div class="flower">✳</div><h2>No hay perfiles con estos filtros.</h2><p>Ningún perfil de la demo cumple los filtros actuales. Ajusta a quién descubrir, las edades o los intereses para encontrar perfiles.</p><button type="button" class="btn" id="adjust-empty-filters">Ajustar filtros</button></div>`;}
function reviewProfiles(){
 if((page!=='discover'&&page!=='explore')||!state.preference||current()||!matchingProfiles().length||document.querySelector('dialog[open]'))return;
 const previous={decisions:state.decisions,lastPass:state.lastPass,likes:state.likes},previousUntil=decisionUntil;
 state.decisions=[];state.lastPass=null;decisionUntil=0;
 if(!save()){Object.assign(state,previous);decisionUntil=previousUntil;return;}
 render();root.querySelector('#pass')?.focus({preventScroll:true});toast('Se repiten los perfiles de la demo que cumplen tus filtros. Tus conexiones y mensajes se conservan.');
}
function current(){return remaining()[0];}
function undoPass(){if(!state.lastPass||state.decisions.at(-1)!==state.lastPass)return;const id=state.lastPass;state.decisions.pop();state.lastPass=null;decisionUntil=0;save();render();root.querySelector('#pass')?.focus({preventScroll:true});toast(`${profiles.find(p=>p.id===id).name} vuelve a estar disponible. Se mantienen tus filtros.`);}
function suggestions(p){return [p.question,`He visto que te gusta ${p.tags[0].toLowerCase()}. ¿Qué me recomendarías para empezar?`,`Si organizamos un plan de ${p.tags[1].toLowerCase()}, ¿por dónde empezamos?`];}
function filtersView(){const f=state.filters,chosen=BubaDiscovery.interests(f);return `<form id="filters" class="filters" novalidate><fieldset><legend>¿A quién quieres descubrir?</legend>${preferences.map(([id,symbol,label])=>`<label class="filter-choice"><input type="radio" name="preference" value="${id}" ${state.preference===id?'checked':''}> ${label} ${symbol}</label>`).join('')}</fieldset><div class="filter-fields"><label>Edad mínima<select id="age-min" name="min">${ageOptions(18,f.max,f.min)}</select></label><label>Edad máxima<select id="age-max" name="max">${ageOptions(f.min,100,f.max)}</select></label><label>Intención<select id="filter-intention" name="intention"><option value="">Sin filtrar</option>${BubaDiscovery.intentions.map(([id,label])=>`<option value="${id}" ${f.intention===id?'selected':''}>${label}</option>`).join('')}</select></label></div><fieldset><legend>Intereses · basta con compartir uno</legend><div class="interest-options">${BubaDiscovery.tags(profiles.flatMap(p=>p.tags)).sort((a,b)=>a.localeCompare(b,'es')).map(t=>`<label class="filter-choice"><input type="checkbox" name="interests" value="${esc(t)}" ${chosen.includes(t)?'checked':''}>${esc(t)}</label>`).join('')}</div></fieldset><p class="muted">Edad, género, intención e intereses se combinan. Las intenciones ambiguas o sin indicar no coinciden con un filtro de intención.</p><p id="filters-error" class="form-error" role="alert"></p><div class="panel-actions"><button class="btn">Aplicar</button><button type="button" class="btn light" id="cancel-filters">Cancelar</button><button type="button" class="text-btn" id="clear-filters">Limpiar filtros</button></div></form>`;}
function openFilters(){const d=modal(`<h2>Filtros</h2><p>Los cambios se guardan al aplicar.</p>${filtersView()}`),form=d.querySelector('#filters'),min=d.querySelector('#age-min'),max=d.querySelector('#age-max');
 const sync=()=>{const lo=parseAge(min.value),hi=parseAge(max.value);if(lo!==null&&hi!==null&&lo<=hi){min.innerHTML=ageOptions(18,hi,lo);max.innerHTML=ageOptions(lo,100,hi);}};min.onchange=max.onchange=sync;
 d.querySelector('#cancel-filters').onclick=()=>d.close();
 d.querySelector('#clear-filters').onclick=()=>{min.innerHTML=ageOptions(18,100,18);max.innerHTML=ageOptions(18,100,100);d.querySelector('#filter-intention').value='';form.querySelectorAll('[name="interests"]').forEach(el=>el.checked=false);if(form.elements.interest)form.elements.interest.value='';};
 form.onsubmit=e=>{e.preventDefault();const data=new FormData(form),lo=parseAge(data.get('min')),hi=parseAge(data.get('max')),preference=data.get('preference'),intention=data.get('intention')||'';if(lo===null||hi===null||lo>hi||!validPreference(preference)){d.querySelector('#filters-error').textContent='Elige a quién descubrir y edades entre 18 y 100, en orden.';return;}const selected=data.getAll?data.getAll('interests'):[];if(!selected.length&&data.get('interest'))selected.push(data.get('interest'));const allowed=BubaDiscovery.tags(profiles.flatMap(p=>p.tags));if(selected.some(t=>!allowed.includes(t))||intention&&!BubaDiscovery.intentions.some(([id])=>id===intention)){d.querySelector('#filters-error').textContent='Elige intereses e intención de las listas.';return;}if(!commitDiscovery(()=>{state.filters={min:lo,max:hi,interest:selected[0]||'',interests:[...new Set(selected)],intention};state.preference=preference;})){d.querySelector('#filters-error').textContent='No se pudieron guardar los filtros. Los anteriores se conservan.';return;}d.close();render();root.querySelector('#open-filters')?.focus();};
}
function ownPreview(){return `<aside class="own-preview" aria-label="Vista previa de tu perfil guardado"><span class="eyebrow">ASÍ QUEDA TU PERFIL</span>${globalThis.BubaPhoto?BubaPhoto.avatar():''}<h2>${esc(state.me.name)}, ${state.me.age}</h2><p>${esc(state.me.bio)||'Un par de líneas sobre ti pueden abrir una conversación.'}</p><div class="tags">${state.me.interests.split(',').map(t=>t.trim()).filter(Boolean).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>${musicView(state.me.music)}<small>Vista previa guardada · Solo en este navegador</small></aside>`;}
let editingSection=0,exploreCategory=null,exploreMode='categories',exploreScroll=0,showSentInterests=false;
let showingSaved=false;
let rowSwipeCleanup=null;
let chatOrigin='matches',connectionQuery='',showArchivedChats=false,chatNewMessage=false;
const seekOptions=[...BubaExperience.intentions.map(([,label])=>label),'Prefiero no indicarlo'];
const promptOptions=['Un plan que siempre me apetece…','Podemos llevarnos bien si…','Algo que me hace reír…','Una cosa que quiero probar…','Un pequeño detalle que valoro…','Mi domingo ideal empieza…'];
let state=read(), page=state.started?(state.discoveryView==='explore'?'explore':'discover'):'welcome', activeChat=null, editingProfile=false, decisionUntil=0, cardGesture=null, discoverObserver=null, discoverScrollPreferred=false;
const root=document.querySelector('#app');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch{toast('El navegador no permite guardar. Los cambios duran hasta cerrar esta página.');return false;}}
function portrait(p){return 'codificacion/assets/portraits/'+p.id+'.jpg';}
function thumbnail(p){return p.thumbnail||portrait(p);}
function toast(text){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=text;document.body.append(el);setTimeout(()=>el.remove(),3500);}
function go(next){rememberChatView(true);if(next==='discover'||next==='explore'){cardGesture?.cancel();const desired=next==='explore'?'explore':'cards';if(state.discoveryView!==desired&&!commitDiscovery(()=>{state.discoveryView=desired;}))return;showingSaved=false;}page=next==='preference'?'discover':next;activeChat=null;editingProfile=false;render();window.scrollTo(0,0);focusMain();}
function focusMain(){root.querySelector('#main-content')?.focus({preventScroll:true});}
function render(){rowSwipeCleanup?.();rowSwipeCleanup=null;discoverObserver?.disconnect();discoverObserver=null;cardGesture?.dispose();cardGesture=null;if(!state.started)page='welcome';else if(!state.profileCompleted)page='setup';else if(!state.preference)page='discover';root.innerHTML=`<a class="skip-link" href="#main-content">Ir al contenido</a><div class="layout"><aside class="sidebar"><div class="brand"><img src="codificacion/assets/logo-horizontal.svg" alt="Buba Friends"></div><nav class="nav" aria-label="Navegación principal">${[['discover','✦','Descubrir'],['explore','◇','Explorar'],['matches','♡','Conexiones'],['stories','◉','Historias'],['profile','◯','Mi perfil']].map(([id,icon,label])=>`<button data-nav="${id}" ${!state.started||!state.profileCompleted||!state.preference?'disabled':''} class="${(page===id||(id==='discover'&&page==='preference'))?'active':''}" ${(page===id||(id==='discover'&&page==='preference'))?'aria-current="page"':''}><b aria-hidden="true">${icon}</b>${label}${id==='matches'&&state.matches.length?` · ${state.matches.length}`:''}</button>`).join('')}</nav><div class="aside-note"><strong>Las buenas conexiones empiezan siendo tú.</strong>Demo de aprendizaje.<br>Perfiles y coincidencias ficticios.<br>Solo para mayores de 18 años.</div></aside><main class="main" id="main-content" tabindex="-1"><header class="topbar"><img class="header-logo" src="codificacion/assets/logo-horizontal.svg" alt="Buba Friends"><span class="pill">Demo · +18</span>${page==='discover'||page==='explore'?`${page==='discover'?'<button type="button" class="text-btn discover-view-toggle" id="discover-view-toggle" aria-pressed="false">Ampliar vista</button>':''}<button class="btn light" id="open-filters">Filtros</button>`:''}</header>${content()}<footer class="footer">Hecho para conectar, a tu ritmo. · Todos los perfiles son ficticios e ilustrados.</footer></main></div>`;
root.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>go(b.dataset.nav));bind();setupDiscoverViewport();}
function content(){if(page==='explore')return explorePage();if(page==='setup')return `${state.profileReview?'<p role="status">Tu perfil antiguo contiene datos que podrían ser ejemplos. Confirma o edita los campos antes de continuar; conservamos tus conexiones, mensajes e historias.</p>':''}${profileForm(true)}`;if(page==='stories')return `<section class="intro"><div><h1>Historias.</h1><p>Momentos de tus conexiones y los tuyos.</p></div></section>${typeof storiesConnectionsView==='function'?storiesConnectionsView():''}`;if(page==='welcome')return `<section class="welcome"><div><h1>Sé tú. Conoce a alguien.</h1><p>Comparte tus gustos, descubre nuevas personas y deja que surja la conexión.</p><p class="muted">Esta es una demo: nadie es real, las coincidencias son simuladas y tus mensajes se quedan en este navegador.</p><label class="check"><input id="adult" type="checkbox">Confirmo que tengo 18 años o más y entiendo que es una simulación.</label><button id="start" class="btn" disabled>Crear mi perfil ↗</button></div><figure class="welcome-illustration"><img src="codificacion/assets/welcome-date.jpg" width="1200" height="800" decoding="async" fetchpriority="high" alt="Ilustración de dos adultos ficticios que se miran y sonríen durante una primera cita, con luz cálida y tonos rosas."></figure></section>`;
if(page==='discover'){if(showingSaved)return discoveryBrowse();const p=current();return `<div class="discovery-summary">${discoveryTools()}${filterChips()}<span>${state.preference?preferences.find(([id])=>id===state.preference)[2]+' · '+state.filters.min+'–'+state.filters.max+' años'+(state.filters.interest?' · '+esc(state.filters.interest):''):'Elige Mujeres, Hombres o Ambos para mostrar perfiles.'}</span><small>${remaining().length} pendientes · Perfiles ficticios</small></div><small class="discover-layout-note" role="status">Vista ampliada con desplazamiento. Puedes usar los botones para decidir.</small>${!state.preference?preferenceView():''}${!state.preference?'':p?`<span class="discover-type-probe" aria-hidden="true"></span><div class="discover-grid"><div><article class="card" id="swipe-card"><span class="swipe-hint" role="status" aria-live="polite" aria-atomic="true"></span><button class="card-detail" id="detail" aria-label="Información del perfil">ⓘ</button><img decoding="async" draggable="false" class="portrait ${p.image?'painted-portrait':''}" src="${portrait(p)}" alt="Retrato ilustrado de ${p.name}, perfil ficticio"><div class="card-info"><h2>${p.name}, ${p.age}</h2><p class="profile-meta">${p.city?`⌖ ${esc(p.city)} · `:''}Perfil ficticio</p>${p.occupation?`<p class="occupation">${esc(p.occupation)}</p>`:''}<div class="tags">${p.tags.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join('')}</div>${affinityMarkup(p,1)}</div></article><div class="actions"><button class="round undo" id="undo" aria-label="Deshacer último pasar" title="${state.lastPass?'Recuperar último perfil pasado':'Solo se puede deshacer el último pasar'}" ${state.lastPass?'':'disabled'}>↶</button><button class="round" id="pass" aria-label="Pasar de ${p.name}">×</button><button class="round like" id="like" aria-label="${state.matches.includes(p.id)?'Ya tenéis una conexión con ':state.likes.includes(p.id)?'Ya mostraste interés por ':'Mostrar interés por '}${p.name}" ${state.likes.includes(p.id)||state.matches.includes(p.id)?'disabled':''}>♥</button></div><div class="caption"><span>Desliza o usa los botones.</span><span class="discover-extra-help"> Deshacer recupera solo el último pasar. · ${profiles.length-state.decisions.length} de ${profiles.length} perfiles sin decidir</span></div></div><aside class="side-copy"><div class="flower" aria-hidden="true">✳</div><h2>Tu tipo de plan.<br>Tu tipo de persona.</h2><p>Cada perfil tiene una pregunta para romper el hielo. Abre el detalle y elige por dónde empezar.</p><div class="mini-note"><span class="eyebrow">TUS INTERESES, A MANO</span><p>Las etiquetas comparan solo los datos que has guardado. El orden por cosas en común es opcional y no calcula compatibilidad.</p></div></aside></div>`:discoverEmpty()+(state.lastPass?'<div class="empty-undo"><button class="btn light" id="undo">↶ Deshacer último pasar</button><p>Recupera solo el último pasar. Se mantienen tus filtros.</p></div>':'')}`;}
if(page==='matches'){if(activeChat)return chat();return connectionsView();}
return profileDashboard()+'<button type="button" id="reset" hidden>Reiniciar toda la demo</button>';}
function empty(title,body,label,target){return `<div class="empty"><div class="flower">✳</div><h2>${title}</h2><p>${body}</p><button class="btn" data-nav="${target}">${label} ↗</button></div>`;}
function chat(){const p=profiles.find(p=>p.id===activeChat);if(!p)return connectionsView();const meta=chatSettings(p.id),messages=state.messages[p.id]||[];let day='';return `<section class="chat" aria-label="Conversación local con ${esc(p.name)}"><header class="chat-head"><button type="button" id="back" aria-label="Volver a ${chatOrigin==='stories'?'historias':chatOrigin==='profile'?'mi perfil':'conexiones'}">‹ Volver</button><button type="button" id="chat-profile" class="chat-person" aria-label="Ver perfil de ${esc(p.name)}"><img class="avatar" src="${thumbnail(p)}" alt=""><span><strong>${esc(p.name)}</strong><small>Perfil ficticio · Chat local</small></span></button><button type="button" id="chat-menu" class="text-btn" aria-label="Opciones de conversación">•••</button></header><div class="messages" id="chat-messages" tabindex="0" role="region" aria-label="Mensajes de la conversación">${messages.map(m=>{const next=messageDay(m.createdAt),separator=day===next?'':`<p class="message-day">${esc(next)}</p>`;day=next;return separator+messageMarkup(m,p);}).join('')||'<p class="chat-empty">Todavía no has escrito aquí. Tu primer mensaje se guardará solo en este navegador.</p>'}</div><div class="chat-compose"><button type="button" class="text-btn" id="chat-jump" ${chatNewMessage?'':'hidden'}>Ver mensaje nuevo ↓</button>${meta.archived?'<p class="chat-local-note">Conversación archivada. Enviar un mensaje la recupera.</p>':''}<div id="reply-composer">${composerReply(meta.replyTo,messages)}</div><form class="send" id="send"><label class="sr-only" for="chat-message">Mensaje local</label><textarea id="chat-message" name="message" rows="1" maxlength="1000" placeholder="Escribe un mensaje…" aria-describedby="chat-local-note chat-error">${esc(meta.draft)}</textarea><button type="submit" class="btn" id="chat-send" aria-label="Enviar mensaje local" ${meta.draft.trim()?'':'disabled'}>Enviar</button></form><p class="form-error" id="chat-error" role="alert"></p><p class="chat-local-note" id="chat-local-note">Solo en este navegador · Nadie recibe ni lee estos mensajes.</p>${!messages.some(m=>m.mine)?`<details class="suggestions"><summary>Ideas para empezar</summary>${suggestions(p).map((text,i)=>`<button class="suggestion" data-suggestion="${i}" type="button">${esc(text)}</button>`).join('')}</details>`:''}</div></section>`;}
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
function sharedProfile(p){return affinityMarkup(p);}
function profileDetail(p){return `${profileGalleryMarkup(p)}<span class="eyebrow">PERFIL FICTICIO · +18</span><h2>${esc(p.name)}, ${p.age}</h2>${p.occupation?`<p class="detail-occupation">${esc(p.occupation)}</p>`:''}${p.city?`<p>${esc(p.city)}</p>`:''}${p.personality?`<p>${esc(p.personality)}</p>`:''}${p.bio?`<section class="detail-section"><h3>Sobre mí</h3><p>${esc(p.bio)}</p></section>`:''}${p.favoritePlan?`<section class="detail-section"><h3>Mi plan favorito</h3><p>${esc(p.favoritePlan)}</p></section>`:''}${p.seeking?`<section class="detail-section"><h3>Qué busco</h3><p>${esc(p.seeking)}</p></section>`:''}${p.tags.length?`<section class="detail-section"><h3>Intereses</h3><div class="tags">${p.tags.map(tag=>`<span class="tag">${esc(tag)}</span>`).join('')}</div></section>`:''}${musicView(p.music)}${p.question?`<div class="icebreaker"><h3>Para romper el hielo</h3><p>${esc(p.question)}</p></div>`:''}${sharedProfile(p)}${affinityNote(p)}${discoveryDetailActions(p)}<button class="btn" id="close-detail">Volver a descubrir</button>`;}
function modal(html){cardGesture?.cancel();document.querySelector('dialog')?.close();const d=document.createElement('dialog');
 // Every dialog has a close control at its top, including long profile details.
 d.innerHTML='<button type="button" class="dialog-close" aria-label="Cerrar diálogo">×</button>'+html;
 const opener=document.activeElement;document.body.append(d);document.body.classList.add('modal-open');
 d.querySelector('.dialog-close').onclick=()=>d.close();
 d.addEventListener('close',()=>{d.remove();if(document.querySelector('dialog[open]'))return;document.body.classList.remove('modal-open');if(opener?.isConnected)opener.focus({preventScroll:true});else focusMain();updateDiscoverViewport();});
 d.setAttribute('aria-label','Buba Friends · '+(d.querySelector('h2')?.textContent||'Diálogo'));d.showModal();return d;
}
function decide(like,id=null){const p=id?profiles.find(p=>p.id===id):current();if(!p||(id&&!canDecideProfile(p))||(like&&(state.likes.includes(p.id)||state.matches.includes(p.id)))||Date.now()<decisionUntil||document.querySelector('dialog[open]'))return;const newMatch=like&&p.match&&!state.matches.includes(p.id);const previous=JSON.parse(JSON.stringify(state)),previousUntil=decisionUntil;decisionUntil=Date.now()+350;state.decisions.push(p.id);if(like&&!state.likes.includes(p.id))state.likes.push(p.id);state.lastPass=like?null:p.id;if(newMatch){state.matches.push(p.id);state.messages[p.id]??=normalizeChatMessages([{mine:false,createdAt:Date.now(),text:'¡Hola! Este es un mensaje de ejemplo para empezar la conversación. ¿Qué plan te apetece compartir?'}],p.id);}if(!save()){state=previous;decisionUntil=previousUntil;return;}render();root.querySelector(like?'#like':'#pass')?.focus({preventScroll:true});if(newMatch){const d=modal(`<div class="match-art" aria-hidden="true"><img src="${thumbnail(p)}" decoding="async"><span>♥</span></div><span class="eyebrow">COINCIDENCIA SIMULADA</span><h2>¡Hay conexión!</h2><p>Has conectado con ${p.name}. Esta coincidencia está programada para que puedas probar la experiencia.</p><button class="btn" id="open-chat">Escribir un hola ↗</button><button class="btn light" id="keep">Seguir descubriendo</button>`);d.querySelector('#open-chat').onclick=()=>{d.close();openConversation(p.id);};d.querySelector('#keep').onclick=()=>d.close();}else toast(like?(p.match?'Ya estáis conectados. Tu conversación se conserva.':'Interés guardado. Este perfil no genera coincidencia de prueba.'):'Perfil pasado. Vamos a conocer a alguien más.');}
function bind(){const $=s=>root.querySelector(s);
if(typeof bindStories==='function')bindStories();
if(globalThis.BubaPhoto)BubaPhoto.bind(root);
if($('#open-filters'))$('#open-filters').onclick=openFilters;
if($('#discover-view-toggle'))$('#discover-view-toggle').onclick=()=>{discoverScrollPreferred=!discoverScrollPreferred;cardGesture?.cancel();updateDiscoverViewport();};
if($('#adjust-empty-filters'))$('#adjust-empty-filters').onclick=openFilters;
if($('#review-profiles'))$('#review-profiles').onclick=reviewProfiles;
if($('#preview-profile'))$('#preview-profile').onclick=openOwnProfile;
if($('#edit-profile'))$('#edit-profile').onclick=()=>{editingSection=0;editingProfile=!editingProfile;render();root.querySelector(editingProfile?'#profile-form input':'#edit-profile')?.focus();};
bindMusic();bindPersonalProfile();
bindSwipe();
root.querySelectorAll('[data-preference]').forEach(button=>button.onclick=()=>{
 const choice=button.dataset.preference;if(!validPreference(choice))return;
 state.preference=choice;save();render();
 root.querySelector('#open-filters')?.focus();
});
if($('#undo'))$('#undo').onclick=undoPass;
if($('#adult'))$('#adult').onchange=e=>$('#start').disabled=!e.target.checked;if($('#start'))$('#start').onclick=()=>{state.started=true;save();go('discover');};if($('#pass'))$('#pass').onclick=()=>decide(false);if($('#like'))$('#like').onclick=()=>decide(true);if($('#detail'))$('#detail').onclick=()=>{openDiscoveryDetail(current());};if($('#profile-form'))$('#profile-form').onsubmit=e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target));data.name=data.name.trim();data.bio=data.bio.trim();data.interests=data.interests.trim();if(!state.profileCompleted&&state.setupStep<8){advanceSetup(e.target,1);return;}if(data.name.length<1||data.name.length>35){formError('profile-error','El nombre debe tener entre 1 y 35 caracteres.');return;}if(data.bio.length>350||data.interests.length>500){formError('profile-error','Revisa las longitudes: 350 caracteres para la bio y 500 para intereses.');return;}data.seeking=seekOptions.includes(data.seeking)||data.seeking===state.me.seeking?data.seeking:'';delete data.orientations;Object.assign(data,BubaExperience.fields(new FormData(e.target),state.me,e.target));delete data.discoveryPreference;data.prompts=readPrompts(e.target);data.age=parseAge(data.age);if(data.age===null){formError('profile-error','Indica una edad entera entre 18 y 100 años. Tu perfil guardado no se ha cambiado.');return;}try{data.music=musicFromForm(e.target);}catch(error){formError('profile-error',error.message);return;}
const initial=!state.profileCompleted;const previous={me:state.me,profileCompleted:state.profileCompleted,profileReview:state.profileReview,profileDraft:state.profileDraft};state.me={...state.me,...data};state.profileCompleted=true;state.profileDraft=false;state.profileReview=false;const saved=save();if(!saved){Object.assign(state,previous);formError('profile-error','No se pudo guardar el perfil. Habilita el almacenamiento del navegador para continuar.');return;}editingProfile=false;if(initial)page='discover';render();root.querySelector('#edit-profile')?.focus({preventScroll:true});if(saved)toast('Tu perfil está guardado en este navegador.');};if($('#reset'))$('#reset').onclick=()=>{const d=modal('<h2>¿Volvemos a empezar?</h2><p>Se borrarán tus mensajes, intereses, perfil, historias, destacadas e imágenes guardadas en esta demo.</p><button class="btn" id="confirm-reset">Sí, reiniciar</button><button class="btn light" id="cancel">Cancelar</button>');d.querySelector('#cancel').onclick=()=>d.close();d.querySelector('#confirm-reset').onclick=async()=>{const button=d.querySelector('#confirm-reset');if(button.disabled)return;button.disabled=true;try{if(globalThis.BubaPhoto)await BubaPhoto.remove();if(typeof resetStories==='function')await resetStories();}catch(e){button.disabled=false;toast('No se pudo completar el reinicio de historias. '+e.message);return;}state=fresh();decisionUntil=0;editingProfile=false;save();d.close();go('welcome');toast('Demo reiniciada. Todo listo para otra presentación.');};};bindConversations();bindDiscovery();bindExperience();}
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
 if(page==='matches'&&activeChat)return;
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
 const removals=()=>form.querySelectorAll('[data-remove-music]').forEach(b=>b.onclick=()=>{b.closest('[data-music-row]').remove();limits();if(!state.profileCompleted)captureDraft(form);});
 const limits=()=>form.querySelectorAll('[data-add-music]').forEach(b=>b.disabled=form.querySelectorAll(`[data-music-row="${b.dataset.addMusic}"]`).length>=(b.dataset.addMusic==='artists'?5:3));
 form.querySelectorAll('[data-add-music]').forEach(b=>b.onclick=()=>{const kind=b.dataset.addMusic;openMusicSearch(kind,item=>{const list=form.querySelector(`[data-music-list="${kind}"]`),current=musicFromForm(form)[kind];if(current.length>=(kind==='artists'?5:3))throw new Error('Has alcanzado el límite.');if(current.some(i=>sameMusic(i,item)))throw new Error('Ya has añadido este favorito.');list.insertAdjacentHTML('beforeend',musicRow(kind,item,list.children.length));removals();limits();if(!state.profileCompleted)captureDraft(form);});});removals();limits();
 const update=()=>{const button=form.querySelector('[data-save-profile]');if(button)button.disabled=(!state.profileCompleted&&state.setupStep>0)?false:!form.elements.name.value.trim()||form.elements.name.value.trim().length>35||parseAge(form.elements.age.value)===null;};form.addEventListener('input',update);form.addEventListener('change',update);update();
}
function readPrompts(form){return [0,1,2].map(i=>({question:form.elements['question'+i]?.value||'',answer:(form.elements['answer'+i]?.value||'').trim().slice(0,200)})).filter(p=>promptOptions.includes(p.question)&&p.answer);}
function promptView(me){return (Array.isArray(me.prompts)?me.prompts:[]).slice(0,3).filter(p=>p.question&&p.answer).map(p=>`<section class="detail-section"><h3>${esc(p.question)}</h3><p>${esc(p.answer)}</p></section>`).join('');}
function personalSections(me){return `${publicPersonalInfo(me)}${me.bio?`<section class="detail-section"><h3>Sobre mí</h3><p>${esc(me.bio)}</p></section>`:''}${me.seeking?`<section class="detail-section"><h3>Qué busco</h3><p>${esc(me.seeking)}</p></section>`:''}${me.interests?`<h3>Intereses</h3><div class="tags">${me.interests.split(',').map(t=>t.trim()).filter(Boolean).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`:''}${promptView(me)}${musicView(me.music)}`;}
function openOwnProfile(){const images=globalThis.BubaPhoto?.images||[];const d=modal(`<span class="eyebrow">TU PERFIL · SOLO EN ESTE NAVEGADOR</span>${images.length?`<div class="own-gallery"><img data-own-slide src="${images[0]}" alt="Tu foto principal"><div class="gallery-controls"><button type="button" class="text-btn" data-own-prev>‹ Anterior</button><span data-own-count role="status"></span><button type="button" class="text-btn" data-own-next>Siguiente ›</button></div></div>`:'<p class="muted">Perfil sin fotos</p>'}<h2>${esc(state.me.name)}, ${state.me.age}</h2>${personalSections(state.me)}<p class="muted">Esta vista no aparece en Descubrir ni se envía a otras personas.</p>`);let index=0;const update=()=>{d.querySelector('[data-own-slide]').src=images[index];d.querySelector('[data-own-slide]').alt='Tu foto '+(index+1);d.querySelector('[data-own-count]').textContent=(index+1)+' de '+images.length;d.querySelector('[data-own-prev]').disabled=index===0;d.querySelector('[data-own-next]').disabled=index===images.length-1;};if(images.length){d.querySelector('[data-own-prev]').onclick=()=>{index--;update();};d.querySelector('[data-own-next]').onclick=()=>{index++;update();};update();}}
function captureDraft(form){const formData=new FormData(form),values=Object.fromEntries(formData);const before=state.me,wasDraft=state.profileDraft,wasPreference=state.preference;let music=before.music;try{music=musicFromForm(form);}catch{}state.me={...before,...BubaExperience.fields(formData,before,form),name:values.name||'',age:values.age||'',bio:values.bio||'',interests:values.interests||'',seeking:values.seeking||'',prompts:[0,1,2].map(i=>({question:form.elements['question'+i]?.value||'',answer:form.elements['answer'+i]?.value||''})),music};state.profileDraft=true;state.onboardingVersion=2;if(validPreference(values.discoveryPreference))state.preference=values.discoveryPreference;if(!save()){state.me=before;state.preference=wasPreference;state.profileDraft=wasDraft;formError('profile-error','No se pudo guardar el borrador. Mantén esta página abierta y reintenta.');return false;}return true;}
function advanceSetup(form,delta){if(delta>0&&state.setupStep===0&&(!form.elements.name.value.trim()||parseAge(form.elements.age.value)===null)){formError('profile-error','Escribe tu nombre y elige una edad entre 18 y 100.');return;}if(!captureDraft(form))return;const old=state.setupStep;state.setupStep=Math.max(0,Math.min(8,old+delta));if(!save()){state.setupStep=old;return;}render();root.querySelector('#profile-form section:not([hidden]) h2')?.focus();}
function bindPersonalProfile(){const form=root.querySelector('#profile-form');if(!form)return;const cancel=form.querySelector('[data-cancel-profile]');if(cancel)cancel.onclick=()=>{editingProfile=false;render();root.querySelector('#edit-profile')?.focus();};if(state.profileCompleted)return;const back=form.querySelector('[data-setup-prev]');if(back)back.onclick=()=>{if(state.setupStep===0){if(!captureDraft(form))return;state.started=false;if(save())go('welcome');else state.started=true;}else advanceSetup(form,-1);};form.addEventListener('input',()=>captureDraft(form));form.addEventListener('change',()=>captureDraft(form));}
function profileForm(initial){return experienceProfileForm(initial);}

// Local conversation data. Old messages receive stable IDs, never invented dates.
function normalizeChatMessages(list,authorId){const used=new Set();return (Array.isArray(list)?list:[]).filter(m=>m&&typeof m.text==='string').map((m,i)=>{let id=typeof m.id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(m.id)?m.id:`legacy-${authorId}-${i}`;while(used.has(id))id+='-copy';used.add(id);const out={...m,id,mine:m.mine===true,text:m.text};if(!Number.isFinite(m.createdAt)||m.createdAt<=0)delete out.createdAt;if(typeof m.replyTo!=='string')delete out.replyTo;if(m.story&&typeof m.story.id==='string'&&m.story.authorId===authorId)out.story={id:m.story.id.slice(0,100),authorId,caption:typeof m.story.caption==='string'?m.story.caption.slice(0,180):''};else delete out.story;return out;});}
function chatSettings(id){return state.chatMeta[id]??={archived:false,opened:false,draft:'',replyTo:null,scrollTop:null};}
function commitChatChange(change){const previous=JSON.parse(JSON.stringify(state));change();if(save())return true;state=previous;return false;}
function newChatMessage(text,extra={}){return {id:'msg-'+Date.now()+'-'+Math.random().toString(36).slice(2,10),mine:true,text,createdAt:Date.now(),...extra};}
function appendChatMessage(id,message){if(!state.matches.includes(id))return false;const list=state.messages[id]||[];if(message.id&&list.some(m=>m.id===message.id))return true;return commitChatChange(()=>{(state.messages[id]??=[]).push(message);Object.assign(chatSettings(id),{archived:false,opened:true,scrollTop:null});});}
function conversationActivity(id){return (state.messages[id]||[]).reduce((latest,m)=>Math.max(latest,Number.isFinite(m.createdAt)?m.createdAt:0),0);}
function conversationIds(archived=false,query=''){const key=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');return state.matches.filter(id=>chatSettings(id).archived===archived&&key(profiles.find(p=>p.id===id)?.name||'').includes(key(query.trim()))).sort((a,b)=>conversationActivity(b)-conversationActivity(a)||state.matches.indexOf(b)-state.matches.indexOf(a));}
function deleteChatMessage(id,messageId){const message=state.messages[id]?.find(m=>m.id===messageId);if(!message?.mine)return false;return commitChatChange(()=>{state.messages[id]=state.messages[id].filter(m=>m.id!==messageId);if(chatSettings(id).replyTo===messageId)chatSettings(id).replyTo=null;});}
function setChatArchived(id,value){if(!state.matches.includes(id))return false;return commitChatChange(()=>{chatSettings(id).archived=value;});}
function clearChat(id){return commitChatChange(()=>{state.messages[id]=[];Object.assign(chatSettings(id),{draft:'',replyTo:null,scrollTop:null});});}
function removeConnection(id){return commitChatChange(()=>{state.matches=state.matches.filter(x=>x!==id);delete state.messages[id];delete state.chatMeta[id];});}

function messageDay(value){return Number.isFinite(value)&&value>0?new Date(value).toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'}):'Mensajes anteriores · Sin fecha guardada';}
function messageTime(value){return Number.isFinite(value)&&value>0?new Date(value).toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'}):'';}
function messageDate(value){return Number.isFinite(value)&&value>0?new Date(value).toLocaleDateString('es-ES',{day:'numeric',month:'short'})+' · '+messageTime(value):'';}
function connectionsView(){return `<section class="intro"><h1>Tus conexiones.</h1><p>Conversaciones de demo, a tu ritmo.</p></section><label class="connection-search">Buscar por nombre<input type="search" id="connection-search" value="${esc(connectionQuery)}" maxlength="60" placeholder="Nombre de una conexión" autocomplete="off"></label><div class="connection-tabs"><button type="button" class="btn ${showArchivedChats?'light':''}" id="show-active-chats" aria-pressed="${!showArchivedChats}">Activas</button><button type="button" class="btn ${showArchivedChats?'':'light'}" id="show-archived-chats" aria-pressed="${showArchivedChats}">Archivadas (${state.matches.filter(id=>chatSettings(id).archived).length})</button></div><button type="button" class="text-btn" id="show-sent" aria-pressed="${showSentInterests}">Intereses enviados (${state.likes.length})</button>${showSentInterests?`<section class="sent-interests"><h2>Intereses enviados en esta demo</h2>${state.likes.length?state.likes.map(id=>{const p=profiles.find(p=>p.id===id);return `<button type="button" class="text-btn" data-open-person="${id}">${esc(p.name)} · ${state.matches.includes(id)?'Conexión':'Interés guardado'}</button>`;}).join(''):'<p>Todavía no hay intereses enviados registrados.</p>'}</section>`:''}<div id="connection-results" aria-live="polite">${connectionResults()}</div>`;}
function connectionResults(){const ids=conversationIds(showArchivedChats,connectionQuery);if(!state.matches.length)return empty('Tu próxima conversación empieza aquí.','Muestra interés en Descubrir para encontrar conexiones de demostración.','Descubrir perfiles','discover');if(!ids.length)return `<div class="empty"><h2>${connectionQuery?'No hay coincidencias con ese nombre.':showArchivedChats?'No tienes conversaciones archivadas.':'No hay conversaciones activas.'}</h2><p>${connectionQuery?'Prueba otro nombre o revisa Archivadas.':showArchivedChats?'Las conversaciones que archives aparecerán aquí.':'Puedes recuperar una desde Archivadas.'}</p></div>`;const isNew=id=>!chatSettings(id).opened&&!(state.messages[id]||[]).some(m=>m.mine);const fresh=showArchivedChats?[]:ids.filter(isNew),chats=showArchivedChats?ids:ids.filter(id=>!isNew(id));return `${!showArchivedChats?`<h2 class="section-title">Nuevas conexiones</h2><div class="match-strip">${fresh.length?fresh.map(id=>{const p=profiles.find(p=>p.id===id);return `<button type="button" data-chat="${id}" aria-label="Abrir conexión con ${esc(p.name)}"><img src="${thumbnail(p)}" alt="" class="avatar"><span>${esc(p.name)}</span></button>`;}).join(''):'<p>No hay nuevas conexiones. Tus conversaciones están debajo.</p>'}</div>`:''}<h2 class="section-title">${showArchivedChats?'Conversaciones archivadas':'Conversaciones'}</h2><div class="list">${chats.map(id=>{const p=profiles.find(p=>p.id===id),messages=state.messages[id]||[],last=messages.at(-1);return `<div class="conversation-swipe" data-conversation-row="${id}"><button type="button" class="row-archive-action" data-row-archive="${id}" tabindex="-1" aria-hidden="true" aria-label="${showArchivedChats?'Desarchivar':'Archivar'} conversación con ${esc(p.name)}">${showArchivedChats?'Desarchivar':'Archivar'}</button><button type="button" class="match-row" data-chat="${id}"><img class="avatar" src="${thumbnail(p)}" alt=""><span class="conversation-summary"><strong>${esc(p.name)}</strong><small>${last?esc((last.mine?'Tú: ':'Ejemplo: ')+last.text.slice(0,100)):'Sin mensajes · Escribe cuando quieras'}</small>${last?.createdAt?`<time>${esc(messageDate(last.createdAt))}</time>`:''}</span><span aria-hidden="true">›</span></button></div>`;}).join('')||'<p>Abre una nueva conexión para empezar. Los mensajes son locales.</p>'}</div>`;}
function quotedMessage(id,messages){return messages.find(m=>m.id===id);}
function composerReply(id,messages){if(!id)return '';const m=quotedMessage(id,messages);return `<div class="reply-preview"><span><strong>Responder a ${m?(m.mine?'tu mensaje':'un mensaje de demostración'):'mensaje no disponible'}</strong><small>${m?esc(m.text.slice(0,140)):'El mensaje original ya no está disponible.'}</small></span><button type="button" class="text-btn" id="cancel-reply" aria-label="Cancelar respuesta">×</button></div>`;}
function messageMarkup(m,p){const original=m.replyTo?quotedMessage(m.replyTo,state.messages[p.id]||[]):null;return `<article class="bubble ${m.mine?'mine':''}" id="message-${esc(m.id)}" tabindex="-1" data-message="${esc(m.id)}"><small>${m.mine?'Tú':'Mensaje de ejemplo · '+esc(p.name)}</small>${m.replyTo?(original?`<button type="button" class="message-quote" data-jump-message="${esc(m.replyTo)}" aria-label="Ir al mensaje citado">${esc(original.text.slice(0,140))}</button>`:'<div class="message-quote">Mensaje original no disponible</div>'):''}${m.story?(typeof storyReference==='function'?storyReference(m.story):'<div class="story-reference">Historia no disponible</div>'):''}<p class="message-text">${esc(m.text)}</p>${m.createdAt?`<time>${esc(messageTime(m.createdAt))}</time>`:''}<details class="message-actions"><summary aria-label="Acciones del mensaje">Opciones</summary><button type="button" class="text-btn" data-reply-message="${esc(m.id)}">Responder</button><button type="button" class="text-btn" data-copy-message="${esc(m.id)}">Copiar texto</button>${m.mine?`<button type="button" class="text-btn" data-delete-message="${esc(m.id)}">Eliminar mi mensaje</button>`:''}</details></article>`;}
function rememberChatView(persist=false){if(page!=='matches'||!activeChat||!state.matches.includes(activeChat))return;const box=root.querySelector('.messages');if(box&&Number.isFinite(box.scrollTop)){const meta=chatSettings(activeChat),value=Math.max(0,box.scrollTop);meta.scrollTop=value;if(persist)save();}}
function openConversation(id,origin='matches'){if(!state.matches.includes(id))return;rememberChatView(true);chatOrigin=origin;activeChat=id;page='matches';chatNewMessage=false;chatSettings(id).opened=true;save();render();root.querySelector('#chat-message')?.focus({preventScroll:true});}
function chatError(text){formError('chat-error',text);}
function updateComposer(){const field=root.querySelector('#chat-message'),button=root.querySelector('#chat-send');if(!field)return;field.style.height='auto';const limit=Math.min(136,Math.max(46,Math.floor((window.visualViewport?.height||window.innerHeight||760)*.18)));field.style.height=Math.min(limit,Math.max(46,field.scrollHeight||46))+'px';if(button)button.disabled=!field.value.trim();}
function saveChatDraft(){const field=root.querySelector('#chat-message');if(!field||!activeChat)return;const id=activeChat,text=field.value.slice(0,1000);if(chatSettings(id).draft===text)return;chatSettings(id).draft=text;if(!save()){chatError('No se pudo guardar el borrador. Conserva esta página abierta y vuelve a intentarlo.');}else chatError('');updateComposer();}
function selectChatReply(id){if(!state.messages[activeChat]?.some(m=>m.id===id))return;if(!commitChatChange(()=>{chatSettings(activeChat).replyTo=id;})){chatError('No se pudo guardar la respuesta.');return;}const node=root.querySelector('#reply-composer');node.innerHTML=composerReply(id,state.messages[activeChat]);bindCancelReply();root.querySelector('#chat-message')?.focus({preventScroll:true});}
function bindCancelReply(){const cancel=root.querySelector('#cancel-reply');if(cancel)cancel.onclick=()=>{if(!commitChatChange(()=>{chatSettings(activeChat).replyTo=null;}))return;root.querySelector('#reply-composer').innerHTML='';root.querySelector('#chat-message')?.focus({preventScroll:true});};}
function sendChatMessage(form){if(form!==root.querySelector('#send')||form.isConnected===false)return;const text=String(new FormData(form).get('message')||'').trim();if(!text)return;if(text.length>1000){chatError('El mensaje admite hasta 1000 caracteres.');return;}const id=activeChat,box=root.querySelector('.messages'),scroll=box?.scrollTop||0,atBottom=!box||(box.scrollHeight-scroll-(box.clientHeight||0)<72);const message=newChatMessage(text,chatSettings(id).replyTo?{replyTo:chatSettings(id).replyTo}:{});if(!commitChatChange(()=>{(state.messages[id]??=[]).push(message);Object.assign(chatSettings(id),{draft:'',replyTo:null,archived:false,opened:true,scrollTop:atBottom?null:scroll});})){chatError('No se pudo guardar el mensaje. Tu texto sigue aquí; vuelve a intentarlo.');return;}chatNewMessage=!atBottom;render();root.querySelector('#chat-message')?.focus({preventScroll:true});}
function confirmChatAction(title,description,action){const d=modal(`<h2>${title}</h2><p>${description}</p><p data-chat-action-error class="form-error" role="alert"></p><div class="panel-actions"><button type="button" class="btn" id="confirm-chat-action">Confirmar</button><button type="button" class="btn light" id="cancel-chat-action">Cancelar</button></div>`);d.querySelector('#cancel-chat-action').onclick=()=>d.close();let done=false;d.querySelector('#confirm-chat-action').onclick=()=>{if(done)return;if(!action()){d.querySelector('[data-chat-action-error]').textContent='No se pudo guardar el cambio. Se conservan los datos anteriores.';return;}done=true;d.close();render();root.querySelector('#chat-message')?.focus({preventScroll:true});};}
function openChatMenu(){const id=activeChat,archived=chatSettings(id).archived;const d=modal(`<h2>Esta conversación</h2><div class="chat-menu"><button type="button" class="btn light" id="archive-chat">${archived?'Recuperar conversación':'Archivar conversación'}</button><button type="button" class="btn light" id="clear-chat">Vaciar mensajes</button><button type="button" class="danger" id="remove-connection">Eliminar conexión</button></div><p>Las acciones afectan solo a esta conversación local.</p>`);d.querySelector('#archive-chat').onclick=()=>{rememberChatView(false);if(!setChatArchived(id,!archived))return;d.close();go('matches');};d.querySelector('#clear-chat').onclick=()=>{d.close();confirmChatAction('¿Vaciar esta conversación?','Se borrarán sus mensajes, el borrador y la respuesta en preparación. La conexión se conserva. Esta acción no se puede deshacer.',()=>{if(!clearChat(id))return false;chatNewMessage=false;return true;});};d.querySelector('#remove-connection').onclick=()=>{d.close();confirmChatAction('¿Eliminar esta conexión?','Se eliminarán esta conexión, sus mensajes y su borrador. Dejarás de ver sus Historias. Tu perfil, fotos, historias propias y otras conversaciones se conservan. No se puede deshacer. El perfil seguirá decidido hasta que elijas volver a ver perfiles en Descubrir.',()=>{if(!removeConnection(id))return false;activeChat=null;chatOrigin='matches';return true;});};}
function openChatProfile(){const p=profiles.find(p=>p.id===activeChat),box=root.querySelector('.messages'),scroll=box?.scrollTop||0;const d=modal(profileDetail(p));bindProfileGallery(d,p);bindPersonActions(d,p,d);d.querySelector('#close-detail').textContent='Volver a la conversación';d.querySelector('#close-detail').onclick=()=>d.close();d.addEventListener('close',()=>{if(box?.isConnected){box.scrollTop=scroll;root.querySelector('#chat-profile')?.focus({preventScroll:true});}});}
function bindConnectionButtons(){rowSwipeCleanup?.();rowSwipeCleanup=null;root.querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>openConversation(b.dataset.chat));if(page==='matches'&&!activeChat&&globalThis.BubaConversationSwipe)rowSwipeCleanup=BubaConversationSwipe.bindList({root,document,window,onArchive:id=>{if(!setChatArchived(id,!showArchivedChats))return false;render();root.querySelector(showArchivedChats?'#show-archived-chats':'#show-active-chats')?.focus({preventScroll:true});return true;}});}
function updateChatViewport(){const on=page==='matches'&&!!activeChat;document.body.classList[on?'add':'remove']('chat-screen');document.body.classList[on&&(window.visualViewport?.height||window.innerHeight||700)<460?'add':'remove']('chat-tight');document.documentElement?.classList?.[on?'add':'remove']('chat-screen');if(!on)return;const box=root.querySelector('.messages'),follow=box&&box.scrollHeight-box.scrollTop-(box.clientHeight||0)<72;const viewport=window.visualViewport;document.documentElement?.style?.setProperty('--chat-height',Math.max(180,viewport?.height||window.innerHeight||700)+'px');document.documentElement?.style?.setProperty('--chat-top',(viewport?.offsetTop||0)+'px');updateComposer();if(follow)box.scrollTop=box.scrollHeight;}
function bindConversations(){updateChatViewport();bindConnectionButtons();const search=root.querySelector('#connection-search');if(search)search.oninput=()=>{connectionQuery=search.value.slice(0,60);root.querySelector('#connection-results').innerHTML=connectionResults();bindConnectionButtons();root.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>go(b.dataset.nav));};for(const [selector,archived] of [['#show-active-chats',false],['#show-archived-chats',true]]){const b=root.querySelector(selector);if(b)b.onclick=()=>{showArchivedChats=archived;render();root.querySelector(archived?'#show-archived-chats':'#show-active-chats')?.focus();};}if(page!=='matches'||!activeChat)return;const id=activeChat,box=root.querySelector('.messages'),field=root.querySelector('#chat-message'),form=root.querySelector('#send');if(field){field.oninput=saveChatDraft;updateComposer();}if(box){box.scrollTop=chatSettings(id).scrollTop??box.scrollHeight;box.onscroll=()=>{chatSettings(id).scrollTop=Math.max(0,box.scrollTop);};}if(form)form.onsubmit=e=>{e.preventDefault();sendChatMessage(form);};const back=root.querySelector('#back');if(back)back.onclick=()=>go(chatOrigin);const profile=root.querySelector('#chat-profile');if(profile)profile.onclick=openChatProfile;const menu=root.querySelector('#chat-menu');if(menu)menu.onclick=openChatMenu;bindCancelReply();root.querySelectorAll('[data-reply-message]').forEach(b=>b.onclick=()=>selectChatReply(b.dataset.replyMessage));root.querySelectorAll('[data-jump-message]').forEach(b=>b.onclick=()=>{const target=root.querySelector('#message-'+b.dataset.jumpMessage);if(target){const box=root.querySelector('.messages');if(box&&Number.isFinite(target.offsetTop))box.scrollTop=Math.max(0,target.offsetTop-((box.clientHeight||0)-(target.offsetHeight||0))/2);target.focus({preventScroll:true});}else toast('Mensaje original no disponible.');});root.querySelectorAll('[data-copy-message]').forEach(b=>b.onclick=async()=>{const m=state.messages[id]?.find(m=>m.id===b.dataset.copyMessage);if(!m)return;try{await navigator.clipboard.writeText(m.text);toast('Texto copiado.');}catch{const d=modal('<h2>Copiar mensaje</h2><label>Selecciona y copia el texto<textarea id="copy-message-text" readonly></textarea></label>');const copy=d.querySelector('#copy-message-text');copy.value=m.text;copy.focus();copy.select?.();}});root.querySelectorAll('[data-delete-message]').forEach(b=>b.onclick=()=>{rememberChatView(false);confirmChatAction('¿Eliminar tu mensaje?','Se eliminará solo este mensaje. Las respuestas que lo citan mostrarán una referencia no disponible.',()=>deleteChatMessage(id,b.dataset.deleteMessage));});root.querySelectorAll('[data-suggestion]').forEach(b=>b.onclick=()=>{field.value=suggestions(profiles.find(p=>p.id===id))[Number(b.dataset.suggestion)];saveChatDraft();field.focus({preventScroll:true});});const jump=root.querySelector('#chat-jump');if(jump)jump.onclick=()=>{box.scrollTop=box.scrollHeight;chatNewMessage=false;jump.hidden=true;};}
window.visualViewport?.addEventListener('resize',updateChatViewport);
window.visualViewport?.addEventListener('scroll',updateChatViewport);
window.addEventListener('resize',updateChatViewport);

window.addEventListener('pagehide',()=>rememberChatView(true));

// Discovery preferences are local and separate from interest decisions.
function commitDiscovery(change){const previous=JSON.parse(JSON.stringify(state));change();if(save())return true;state=previous;return false;}
function affinityMarkup(p,max=20){const result=BubaDiscovery.affinity(state.me,p);const labels=[...result.interests.map(t=>'Compartís '+t),...result.artists.map(a=>'También le gusta '+a),...(result.sameIntent?['Misma intención: '+BubaDiscovery.intentions.find(([id])=>id===result.intention)[1]]:[])];return labels.length?`<div class="affinity-labels" aria-label="Cosas en común">${labels.slice(0,max).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>`:'';}
function affinityNote(p){const a=BubaDiscovery.affinity(state.me,p);return a.score?'':`<p class="muted">${a.comparable?'No aparecen coincidencias en los datos disponibles.':'No hay información suficiente para comparar afinidades con este perfil.'}</p>`;}
function discoveryTools(){return `<div class="discovery-tools" aria-label="Herramientas de descubrimiento"><button type="button" class="text-btn" id="show-saved" aria-pressed="${showingSaved}">Guardados (${state.savedProfiles.length})</button><label class="discovery-order"><span class="sr-only">Orden de perfiles</span><select id="discovery-order" title="Orden de perfiles"><option value="usual" ${state.discoveryOrder==='usual'?'selected':''}>Orden habitual</option><option value="common" ${state.discoveryOrder==='common'?'selected':''}>Más cosas en común</option></select></label></div>`;}
function filterChips(){const f=state.filters,chips=[];if(state.preference&&state.preference!=='both')chips.push(['gender',preferences.find(([id])=>id===state.preference)[2]]);if(f.min!==18||f.max!==100)chips.push(['age',`${f.min}–${f.max} años`]);if(f.intention)chips.push(['intention',BubaDiscovery.intentions.find(([id])=>id===f.intention)?.[1]||'Intención']);for(const t of BubaDiscovery.interests(f))chips.push(['interest:'+t,t]);return chips.length?`<div class="filter-chips" aria-label="Filtros activos">${chips.map(([key,label])=>`<button type="button" class="tag" data-remove-filter="${esc(key)}" aria-label="Quitar filtro ${esc(label)}">${esc(label)} ×</button>`).join('')}</div>`:'';}
function profileDecisionState(p){if(state.matches.includes(p.id))return 'Ya tenéis una conexión';if(state.likes.includes(p.id))return 'Ya mostraste interés';if(state.decisions.includes(p.id))return 'Perfil ya revisado · pasado o decisión anterior';return 'Pendiente de revisar';}
function canDecideProfile(p){return !state.matches.includes(p.id)&&!state.likes.includes(p.id)&&!state.decisions.includes(p.id);}
function discoveryDetailActions(p){return `<section class="discovery-detail-actions" aria-label="Acciones de perfil"><p role="status">${profileDecisionState(p)}</p><button type="button" class="btn light" data-save-person="${p.id}" aria-pressed="${state.savedProfiles.includes(p.id)}">${state.savedProfiles.includes(p.id)?'Quitar de Guardados':'Guardar perfil'}</button><button type="button" class="btn light" data-person-pass="${p.id}" ${canDecideProfile(p)?'':'disabled'}>Pasar</button><button type="button" class="btn" data-person-like="${p.id}" ${canDecideProfile(p)?'':'disabled'}>Mostrar interés</button></section>`;}
function discoveryBrowse(){const list=showingSaved?BubaDiscovery.order(profiles.filter(p=>state.savedProfiles.includes(p.id)),state.me,state.discoveryOrder):remaining();const emptySaved='<div class="empty"><h2>Todavía no hay guardados.</h2><p>Guarda perfiles desde Explorar o su detalle. Guardar no muestra interés ni genera conexiones.</p><button type="button" class="btn" data-discovery-view="explore">Explorar perfiles</button></div>';return `<section class="discovery-summary">${discoveryTools()}${filterChips()}<p>${showingSaved?'Guardados privados · Incluye perfiles ya revisados, al margen de los filtros.':list.length+' perfiles pendientes con tus filtros · Perfiles ficticios'}</p></section>${!state.preference?preferenceView():''}${state.discoveryOrder==='common'?'<p class="order-explanation">Un punto por interés o artista compartido y por la misma intención explícita. Empates en el orden habitual. Sin coincidencias se mantiene ese orden.</p>':''}${!showingSaved&&!list.some(p=>BubaDiscovery.affinity(state.me,p).comparable)?'<p class="muted">No hay información suficiente para comparar afinidades. Puedes añadir intereses, música o intención en Mi perfil; el catálogo no siempre tiene todos esos datos.</p>':''}${list.length?`<section class="explore-grid" aria-label="${showingSaved?'Perfiles guardados':'Explorar perfiles'}">${list.map(p=>`<article class="explore-person"><button type="button" class="explore-open" data-open-person="${p.id}" aria-label="Ver perfil de ${esc(p.name)}, ${p.age} años"><img src="${portrait(p)}" alt="Retrato ilustrado de ${esc(p.name)}" loading="lazy" decoding="async"><span><strong>${esc(p.name)}, ${p.age}</strong><small>${esc(p.tags[0]||p.occupation||'Perfil ficticio')}</small></span></button>${affinityMarkup(p,2)}${showingSaved?`<p class="saved-state">${profileDecisionState(p)}</p>`:''}<button type="button" class="text-btn" data-save-person="${p.id}" aria-pressed="${state.savedProfiles.includes(p.id)}">${state.savedProfiles.includes(p.id)?'Quitar de Guardados':'Guardar perfil'}</button></article>`).join('')}</section>`:showingSaved?emptySaved:state.preference?discoverEmpty():'<p>Elige a quién descubrir para empezar.</p>'}`;}
function toggleSavedProfile(id){if(!profiles.some(p=>p.id===id))return false;return commitDiscovery(()=>{state.savedProfiles=state.savedProfiles.includes(id)?state.savedProfiles.filter(x=>x!==id):[...state.savedProfiles,id];});}
function openDiscoveryDetail(p){if(!p)return;const scrollX=window.scrollX||0,scrollY=window.scrollY||0;const d=modal(profileDetail(p));d.addEventListener('close',()=>{if(d.discoveryRefresh){render();(root.querySelector('[data-open-person="'+p.id+'"]')||root.querySelector(showingSaved?'#show-saved':'#detail')||root.querySelector('#main-content'))?.focus({preventScroll:true});window.scrollTo(scrollX,scrollY);}});bindProfileGallery(d,p);d.querySelector('#close-detail').textContent=showingSaved?'Volver a Guardados':page==='explore'?'Volver a Explorar':'Volver a descubrir';d.querySelector('#close-detail').onclick=()=>d.close();bindPersonActions(d,p,d);}
function bindPersonActions(scope,p=null,dialog=null){scope.querySelectorAll('[data-save-person]').forEach(b=>b.onclick=()=>{const id=b.dataset.savePerson;if(!toggleSavedProfile(id))return;if(dialog){b.textContent=state.savedProfiles.includes(id)?'Quitar de Guardados':'Guardar perfil';b.setAttribute('aria-pressed',String(state.savedProfiles.includes(id)));const behind=root.querySelector(`[data-save-person="${id}"]`);if(behind){behind.textContent=b.textContent;behind.setAttribute('aria-pressed',String(state.savedProfiles.includes(id)));}dialog.discoveryRefresh=true;}else{render();(root.querySelector(`[data-save-person="${id}"]`)||root.querySelector('#show-saved')||root.querySelector('#main-content'))?.focus({preventScroll:true});}});scope.querySelectorAll('[data-person-pass]').forEach(b=>b.onclick=()=>{const person=profiles.find(x=>x.id===b.dataset.personPass);if(person&&canDecideProfile(person)&&Date.now()>=decisionUntil){if(dialog)dialog.discoveryRefresh=false;dialog?.close();decide(false,person.id);}});scope.querySelectorAll('[data-person-like]').forEach(b=>b.onclick=()=>{const person=profiles.find(x=>x.id===b.dataset.personLike);if(person&&canDecideProfile(person)&&Date.now()>=decisionUntil){if(dialog)dialog.discoveryRefresh=false;dialog?.close();decide(true,person.id);}});}
function bindDiscovery(){root.querySelectorAll('[data-discovery-view]').forEach(b=>b.onclick=()=>{cardGesture?.cancel();if(b.dataset.discoveryView==='explore'){exploreMode='all';exploreCategory=null;}go(b.dataset.discoveryView==='explore'?'explore':'discover');});const saved=root.querySelector('#show-saved');if(saved)saved.onclick=()=>{cardGesture?.cancel();showingSaved=!showingSaved;render();root.querySelector('#show-saved')?.focus({preventScroll:true});};const order=root.querySelector('#discovery-order');if(order)order.onchange=()=>{cardGesture?.cancel();if(!commitDiscovery(()=>{state.discoveryOrder=order.value==='common'?'common':'usual';}))return;render();root.querySelector('#discovery-order')?.focus({preventScroll:true});};root.querySelectorAll('[data-open-person]').forEach(b=>b.onclick=()=>openDiscoveryDetail(profiles.find(p=>p.id===b.dataset.openPerson)));bindPersonActions(root);root.querySelectorAll('[data-remove-filter]').forEach(b=>b.onclick=()=>{cardGesture?.cancel();if(!commitDiscovery(()=>{const key=b.dataset.removeFilter;if(key==='age'){state.filters.min=18;state.filters.max=100;}else if(key==='gender')state.preference='both';else if(key==='intention')state.filters.intention='';else if(key.startsWith('interest:')){state.filters.interests=BubaDiscovery.interests(state.filters).filter(t=>t!==key.slice(9));state.filters.interest=state.filters.interests[0]||'';}}))return;render();root.querySelector('#open-filters')?.focus({preventScroll:true});});}

window.visualViewport?.addEventListener('resize',updateSetupViewport);
window.visualViewport?.addEventListener('scroll',updateSetupViewport);
window.addEventListener('resize',updateSetupViewport);

document.addEventListener('buba-photo-updated',refreshProfilePhotoSummary);

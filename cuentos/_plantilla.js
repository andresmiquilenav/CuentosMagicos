/* ============================================================
   PLANTILLA PARA UN CUENTO NUEVO  (este archivo NO se carga)

   1) Copia este archivo como  cuentos/<id>.js   (ej.: cuentos/pinocho.js)
   2) Crea la carpeta          sonidos/<id>/     y guarda allí los MP3
   3) Añade el id a            cuentos/indice.js
   La biblioteca mostrará la tarjeta sola. No hay que tocar index.html,
   style.css ni script.js.

   Los MP3 se buscan en:  sonidos/<id>/<archivo>
   ============================================================ */
registrarCuento({

    /* ---------- Información del cuento ---------- */

    id: "pinocho",                      // igual que el nombre del archivo y de la carpeta de sonidos
    titulo: "Pinocho",                  // portada, tarjeta y primera página
    subtitulo: "Un cuento interactivo", // opcional (ese es el valor por defecto)
    descripcion: "Una marioneta que quería ser niño.",   // frase corta de la tarjeta
    icono: "🪵",                        // emoji de la tarjeta

    colores: { cubierta: ["#5a3f2c", "#3a281b"] },       // opcional: degradado de la tarjeta

    /* opcional: dibujo de la portada y de la tarjeta.
       Es el interior de un SVG de 120 x 84 (usa currentColor para el color dorado).
       Si se omite, se usa un libro con estrellas. */
    // emblema: `<g fill="none" stroke="currentColor" stroke-width="2"><path d="M20 70 H100"/></g>`,

    // opcional: texto de cierre (por defecto "Fin")
    // final: "Fin",


    /* ---------- Escenas ---------- */

    escenas: [
        {
            id: "taller",                // identificador interno de la escena
            titulo: "El taller",         // aparece junto al indicador de progreso

            /* opcionales */
            ambiente: "torre",           // aire de la página: torre | bosque | anochecer | noche
            decoracion: "linternas",     // luces flotando de fondo (pensada para ambiente "noche")
            imagen: { src: "imagenes/pinocho/taller.jpg", alt: "El taller de Geppetto" },

            /* Cada elemento es un párrafo.
               - Una línea que empieza con "—" se muestra como diálogo.
               - Una línea que termina en ":" y va seguida de un diálogo se junta con él. */
            texto: [
                "Había una vez un carpintero llamado Geppetto que trabajaba en su taller.",
                "Un día talló una marioneta de madera. Era Pinocho."
            ],

            /* Palabras que se vuelven interactivas. El motor las busca solo en el texto:
               no hay que marcarlas. */
            interacciones: {
                "taller": {
                    sonido: "taller.mp3",   // archivo dentro de sonidos/<id>/  (por defecto: <palabra>.mp3)
                    animacion: "brillo"     // efecto visual (por defecto: "brillo")
                },
                "marioneta": {
                    sonido: "madera.mp3",
                    animacion: "magia",
                    apariciones: [1]        // opcional: qué apariciones suenan dentro de la escena.
                                            //   [1] la primera (por defecto) · [2] la segunda · [1, 3] · "todas"
                }
            }
        }
    ]
});


/* ============================================================
   ANIMACIONES DISPONIBLES (se usan en  animacion: "...")

   brillo       brillo suave (por defecto)
   magia        destellos dorados en estrella
   destellos    destellos suaves que suben
   resplandor   halo luminoso
   deslizar     leve movimiento horizontal
   vibrar       pequeña vibración
   campana      pulso doble y ondas
   cristal      brillo cristalino azulado
   viento       movimiento vertical y ráfagas de viento
   ondear       movimiento fluido con partículas doradas
   misterio     brillo violeta con humo sutil
   organico     balanceo suave con hojas
   luces        pequeñas luces que ascienden
   trote        rebote de trote con polvo
   ascenso      movimiento ascendente escalonado
   apertura     hojas de ventana que se abren
   acero        destello metálico
   expansion    luz que se expande con anillos

   Para crear una combinación nueva sin tocar el motor, define
   en este mismo archivo (antes de registrarCuento):

     registrarAnimacion("polvoDeHadas", {
         clase: "anim-brillo",                              // movimiento CSS existente
         chispas: { cantidad: 20, estilo: "oro" }           // partículas
     });

   Opciones de chispas: cantidad, estilo (oro | suave | cristal | humo |
   hoja | luz | polvo | acero), direccion (radial | arriba | abajo | lado |
   quieto), recorrido [min, max], duracion (ms), tam [min, max] (em).
   También: ondas: { cantidad, escala }, rafagas: n, apertura: true, filo: true.
   Un movimiento CSS totalmente nuevo se añade en style.css como
   .palabra.activa.anim-<nombre> { animation: ... }.
   ============================================================ */

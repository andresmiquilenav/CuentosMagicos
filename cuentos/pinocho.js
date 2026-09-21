/* ============================================================
   PINOCHO
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/pinocho/<archivo>.mp3
   (Guía completa de campos en cuentos/_plantilla.js)

   Archivos de sonido que espera este cuento (aún por añadir):
     pinocho.mp3   gepetto.mp3   madera.mp3   titere.mp3   nariz.mp3
     grillo.mp3    zorro.mp3     ballena.mp3  mar.mp3      libertad.mp3
   ============================================================ */

/* Animaciones propias de Pinocho.
   Los nombres madera, crecer, salto, movimiento y onda no existían en el motor,
   así que se definen aquí con registrarAnimacion, apoyándose en movimientos CSS
   que ya existen (anim-organico, anim-deslizar, anim-viento, anim-vibrar,
   anim-campana). No hace falta tocar script.js ni style.css. */
registrarAnimacion("madera",     { clase: "anim-organico", chispas: { cantidad: 5, estilo: "polvo", direccion: "abajo", recorrido: [10, 26], duracion: 900, tam: [0.4, 0.7] } });
registrarAnimacion("crecer",     { clase: "anim-deslizar" });
registrarAnimacion("salto",      { clase: "anim-viento", chispas: { cantidad: 3, estilo: "polvo", direccion: "arriba", recorrido: [6, 16], duracion: 800, tam: [0.4, 0.7] } });
registrarAnimacion("movimiento", { clase: "anim-vibrar" });
registrarAnimacion("onda",       { clase: "anim-campana", ondas: { cantidad: 2, escala: 2.4 } });

registrarCuento({
    id: "pinocho",
    titulo: "Pinocho",
    descripcion: "Una aventura de madera, sueños y verdad.",

    escenas: [
        {
            id: "gepetto",
            titulo: "Gepetto y la madera",
            texto: [
                "Había una vez un anciano carpintero llamado Gepetto que vivía solo en una pequeña casa.",
                "Un día encontró un extraño trozo de madera que parecía tener vida propia.",
                "Gepetto llevó la madera a su taller y comenzó a trabajar con ella.",
                "Poco a poco, talló un pequeño títere con brazos, piernas y una alegre sonrisa.",
                "—Te llamaré Pinocho —dijo Gepetto.",
                "Pero aquella noche ocurrió algo maravilloso.",
                "El pequeño títere comenzó a moverse.",
                "Pinocho había cobrado vida."
            ],
            interacciones: {
                "Gepetto": { sonido: "gepetto.mp3", animacion: "brillo" },
                "madera": { sonido: "madera.mp3", animacion: "madera" },
                "Pinocho": { sonido: "pinocho.mp3", animacion: "brillo" }
            }
        },
        {
            id: "nacimiento",
            titulo: "El nacimiento de Pinocho",
            texto: [
                "Gepetto estaba sorprendido y feliz.",
                "Había construido un títere, pero ahora tenía un verdadero niño delante de él.",
                "—¡Pinocho! —exclamó.",
                "Pinocho comenzó a correr por toda la casa.",
                "Saltaba, reía y hacía preguntas sobre todo lo que veía.",
                "Gepetto decidió enviarlo a la escuela para que pudiera aprender y conocer el mundo.",
                "Antes de salir, le dio algunos consejos.",
                "—Sé bueno, escucha a los demás y nunca tengas miedo de decir la verdad.",
                "Pinocho prometió obedecer."
            ],
            interacciones: {
                "Pinocho": { sonido: "pinocho.mp3", animacion: "trote" }
            }
        },
        {
            id: "nariz",
            titulo: "La nariz que crecía",
            texto: [
                "Camino a la escuela, Pinocho conoció a unos desconocidos que intentaron convencerlo de que abandonara su camino.",
                "Pinocho comenzó a inventar excusas.",
                "Cada vez que decía una mentira, su nariz crecía un poco más.",
                "—¡Oh, no! —dijo Pinocho al verla.",
                "Intentó esconderla, pero era demasiado grande.",
                "Comprendió entonces que las mentiras podían traer problemas.",
                "Finalmente decidió decir la verdad.",
                "Poco a poco, su nariz volvió a su tamaño normal.",
                "Pinocho prometió no volver a mentir."
            ],
            interacciones: {
                "Pinocho": { sonido: "pinocho.mp3", animacion: "brillo" },
                "nariz": { sonido: "nariz.mp3", animacion: "crecer" }
            }
        },
        {
            id: "grillo",
            titulo: "El grillo y sus consejos",
            texto: [
                "Mientras caminaba, Pinocho conoció a un pequeño grillo que decidió acompañarlo.",
                "El grillo intentaba ayudarlo a distinguir entre lo correcto y lo incorrecto.",
                "—Piensa antes de actuar —le decía.",
                "Pero Pinocho quería conocer todas las cosas del mundo.",
                "A veces escuchaba los consejos del grillo y otras veces los ignoraba.",
                "Sin embargo, poco a poco comenzó a comprender que quienes lo querían de verdad solo deseaban ayudarlo.",
                "El pequeño grillo continuó a su lado."
            ],
            interacciones: {
                "grillo": { sonido: "grillo.mp3", animacion: "salto" }
            }
        },
        {
            id: "teatro",
            titulo: "El teatro de títeres",
            texto: [
                "Un día, Pinocho llegó hasta un teatro de títeres.",
                "Al ver el escenario, quedó maravillado.",
                "Los títeres comenzaron a bailar y a moverse.",
                "Pinocho se sintió como en casa.",
                "El dueño del teatro lo vio y decidió convertirlo en parte del espectáculo.",
                "Durante un tiempo, Pinocho disfrutó de las luces y de los aplausos.",
                "Pero pronto comprendió que no quería pasar toda su vida siendo tratado como un simple títere.",
                "Él quería ser libre y regresar junto a Gepetto."
            ],
            interacciones: {
                "títeres": { sonido: "titere.mp3", animacion: "ondear" },
                "Pinocho": { sonido: "pinocho.mp3", animacion: "trote" }
            }
        },
        {
            id: "zorro",
            titulo: "El zorro y el gato",
            texto: [
                "Cuando Pinocho salió del teatro, se encontró con un astuto zorro y un gato.",
                "Ellos le prometieron riquezas y aventuras.",
                "Pinocho decidió seguirlos.",
                "Pero pronto descubrió que aquellas promesas eran engañosas.",
                "El zorro y el gato solo querían aprovecharse de él.",
                "Pinocho comprendió que no debía confiar en cualquiera que le ofreciera algo maravilloso.",
                "Recordó los consejos de Gepetto y del grillo.",
                "Entonces decidió regresar a casa."
            ],
            interacciones: {
                "zorro": { sonido: "zorro.mp3", animacion: "movimiento" },
                "Pinocho": { sonido: "pinocho.mp3", animacion: "brillo" }
            }
        },
        {
            id: "ballena",
            titulo: "La ballena",
            texto: [
                "Cuando Pinocho regresaba a casa, descubrió que Gepetto había salido a buscarlo.",
                "El viejo carpintero había llegado hasta el mar.",
                "Pinocho decidió encontrarlo.",
                "Pero una enorme ballena apareció entre las olas y se tragó a Gepetto.",
                "Pinocho entró en el mar para buscarlo.",
                "Después de mucho esfuerzo, consiguió encontrar a Gepetto dentro de la enorme ballena.",
                "—¡Papá! —gritó Pinocho.",
                "Juntos buscaron una manera de escapar.",
                "Finalmente lograron salir y regresar a tierra firme.",
                "Pinocho había demostrado que estaba dispuesto a hacer cualquier cosa para salvar a quien amaba."
            ],
            interacciones: {
                "ballena": { sonido: "ballena.mp3", animacion: "onda" },
                "mar": { sonido: "mar.mp3", animacion: "onda" },
                "Pinocho": { sonido: "pinocho.mp3", animacion: "brillo" }
            }
        },
        {
            id: "regreso",
            titulo: "El regreso y la libertad",
            texto: [
                "Después de todas aquellas aventuras, Pinocho regresó junto a Gepetto.",
                "Había aprendido muchas cosas.",
                "Había descubierto que decir la verdad era importante, que debía escuchar a quienes lo querían y que sus decisiones tenían consecuencias.",
                "Gepetto abrazó a Pinocho.",
                "—Estoy orgulloso de ti.",
                "Aquella noche ocurrió algo extraordinario.",
                "Pinocho despertó y descubrió que ya no era un títere de madera.",
                "Se había convertido en un niño de verdad.",
                "Pinocho miró a Gepetto y sonrió.",
                "Había aprendido a ser valiente, responsable y sincero.",
                "Y finalmente había encontrado su libertad."
            ],
            interacciones: {
                "Pinocho": { sonido: "pinocho.mp3", animacion: "brillo" },
                "libertad": { sonido: "libertad.mp3", animacion: "destellos" }
            }
        }
    ]
});

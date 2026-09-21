/* ============================================================
   RAPUNZEL
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/rapunzel/<archivo>.mp3
   (Guía completa de campos en cuentos/_plantilla.js)
   ============================================================ */
registrarCuento({
    id: "rapunzel",
    titulo: "Rapunzel",
    subtitulo: "Un cuento interactivo",
    descripcion: "Una torre, un bosque y un cabello sin fin.",
    icono: "🌿",
    colores: { cubierta: ["#3b5243", "#25372d"] },

    /* Dibujo de la portada y de la tarjeta (interior de un SVG de 120 x 84) */
    emblema: `
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <path d="M10 78 H110"/>
            <path d="M51 78 V32 H69 V78" fill="rgba(230,200,119,.28)"/>
            <path d="M47 32 L60 8 L73 32 Z" fill="rgba(230,200,119,.28)"/>
            <path d="M57 49 V44 a3 3 0 0 1 6 0 V49 Z"/>
            <path d="M63 49 C69 56 57 62 63 69 C67 74 61 78 63 82"/>
            <path d="M18 78 L27 56 L36 78"/>
            <path d="M84 78 L93 52 L102 78"/>
        </g>
        <g fill="currentColor">
            <circle cx="60" cy="6" r="2.4"/>
            <path d="M26 20 L27.4 24.6 L32 26 L27.4 27.4 L26 32 L24.6 27.4 L20 26 L24.6 24.6 Z"/>
            <path d="M96 16 L97.4 20.6 L102 22 L97.4 23.4 L96 28 L94.6 23.4 L90 22 L94.6 20.6 Z"/>
        </g>`,

    escenas: [
        {
            id: "torre",
            titulo: "La torre",
            ambiente: "torre",
            texto: [
                "Había una vez una joven llamada Rapunzel que vivía encerrada en una enorme torre, en medio de un bosque.",
                "Rapunzel tenía un cabello dorado, largo y brillante que parecía no tener fin. Desde que era pequeña, una poderosa bruja la había mantenido allí, lejos de todo el mundo.",
                "La torre no tenía puertas. Solo había una pequeña ventana en lo alto."
            ],
            interacciones: {
                "torre":   { sonido: "torre.mp3",   animacion: "viento" },
                "cabello": { sonido: "cabello.mp3", animacion: "ondear" },
                "bruja":   { sonido: "bruja.mp3",   animacion: "misterio" },
                "ventana": { sonido: "ventana.mp3", animacion: "apertura" }
            }
        },
        {
            id: "bosque",
            titulo: "El bosque",
            ambiente: "bosque",
            texto: [
                "Cada día, Rapunzel miraba el bosque desde aquella ventana y soñaba con conocer el mundo que existía más allá de las paredes de piedra.",
                "—¿Qué habrá al otro lado del bosque? —se preguntaba.",
                "Pasaron muchos años."
            ],
            interacciones: {
                "bosque": { sonido: "bosque.mp3", animacion: "organico" }
            }
        },
        {
            id: "principe",
            titulo: "El príncipe",
            ambiente: "bosque",
            texto: [
                "Una tarde, un joven príncipe atravesó el bosque montado en su caballo. Al escuchar una hermosa voz que cantaba desde lo alto, se detuvo. Era Rapunzel.",
                "El príncipe levantó la mirada y vio la enorme torre. Pero no había ninguna puerta."
            ],
            interacciones: {
                "caballo": { sonido: "caballo.mp3", animacion: "trote" },
                "torre":   { sonido: "torre.mp3",   animacion: "viento" }
            }
        },
        {
            id: "escalada",
            titulo: "La escalada",
            ambiente: "anochecer",
            texto: [
                "Entonces escuchó una voz que gritaba:",
                "—¡Rapunzel, Rapunzel, deja caer tu cabello!",
                "Rapunzel dejó caer su larguísimo cabello dorado desde la ventana. La bruja trepó por él y entró en la torre.",
                "El príncipe comprendió entonces cómo podía entrar. Esperó hasta que la bruja se marchó y regresó al anochecer.",
                "—¡Rapunzel, Rapunzel, deja caer tu cabello! —dijo.",
                "Rapunzel dejó caer nuevamente su cabello. El príncipe comenzó la escalada."
            ],
            interacciones: {
                /* apariciones: [2] = solo la segunda vez que aparece en la escena
                   (la primera está dentro del grito y se deja como texto normal) */
                "cabello":  { sonido: "cabello.mp3",  animacion: "ondear", apariciones: [2] },
                "bruja":    { sonido: "bruja.mp3",    animacion: "misterio" },
                "escalada": { sonido: "escalada.mp3", animacion: "ascenso" }
            }
        },
        {
            id: "descubrimiento",
            titulo: "El descubrimiento",
            ambiente: "anochecer",
            texto: [
                "Cuando llegó hasta la ventana, Rapunzel se sorprendió al verlo. Por primera vez, alguien de fuera de la torre había llegado hasta ella.",
                "El príncipe llevaba una espada al costado y le contó sobre el mundo exterior, los grandes reinos y los caminos que atravesaban el bosque.",
                "Rapunzel comenzó a soñar con ser libre."
            ],
            interacciones: {
                "ventana": { sonido: "ventana.mp3",  animacion: "apertura" },
                "espada":  { sonido: "espada.mp3",   animacion: "acero" },
                /* la palabra del texto es "libre"; su sonido es libertad.mp3 */
                "libre":   { sonido: "libertad.mp3", animacion: "expansion" }
            }
        },
        {
            id: "separacion",
            titulo: "La separación",
            ambiente: "torre",
            texto: [
                "Pero la bruja descubrió lo que estaba ocurriendo. Furiosa, cortó el largo cabello de Rapunzel y la llevó lejos de la torre.",
                "Cuando el príncipe regresó, encontró la torre vacía. Intentó subir usando el cabello que quedaba, pero cayó al suelo y quedó herido.",
                "Pasó el tiempo."
            ],
            interacciones: {
                "bruja":   { sonido: "bruja.mp3",   animacion: "misterio" },
                "cabello": { sonido: "cabello.mp3", animacion: "ondear" },
                /* la primera "torre" queda como texto; suena la segunda */
                "torre":   { sonido: "torre.mp3",   animacion: "viento", apariciones: [2] }
            }
        },
        {
            id: "reencuentro",
            titulo: "El reencuentro",
            ambiente: "bosque",
            texto: [
                "Un día, mientras caminaba por un lejano bosque, el príncipe escuchó nuevamente aquella voz. Siguió el sonido hasta encontrar a Rapunzel.",
                "Cuando se vieron, ambos se abrazaron. Las lágrimas de Rapunzel cayeron sobre los ojos del príncipe y, milagrosamente, su vista regresó."
            ],
            interacciones: {
                "bosque": { sonido: "bosque.mp3", animacion: "organico" }
            }
        },
        {
            id: "libertad",
            titulo: "La libertad",
            ambiente: "noche",
            decoracion: "linternas",
            texto: [
                "Entonces Rapunzel y el príncipe emprendieron juntos el camino de regreso. Atravesaron el bosque y llegaron a un lugar donde cientos de pequeñas linternas iluminaban el cielo nocturno.",
                "Rapunzel las contempló maravillada. Por primera vez, estaba realmente libre.",
                "Y desde aquel día, Rapunzel nunca volvió a mirar el mundo desde una ventana.",
                "Ahora podía caminar hacia él."
            ],
            interacciones: {
                "linternas": { sonido: "linterna.mp3", animacion: "luces" },
                "libre":     { sonido: "libertad.mp3", animacion: "expansion" },
                "ventana":   { sonido: "ventana.mp3",  animacion: "apertura" }
            }
        }
    ]
});

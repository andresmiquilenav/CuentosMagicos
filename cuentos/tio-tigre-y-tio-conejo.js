/* ============================================================
   TÍO TIGRE Y TÍO CONEJO
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/tio-tigre-y-tio-conejo/<archivo>.mp3
   Generado con el Creador de cuentos.
   ============================================================ */
registrarCuento({
    id: "tio-tigre-y-tio-conejo",
    titulo: "Tío Tigre y Tío Conejo",
    descripcion: "Cuento tradicional de Venezuela",
    icono: "🐇🐅",

    escenas: [
        {
            id: "escena-1",
            titulo: "Escena 1",
            texto: [
                "Una calurosa mañana, se encontraba Tío Conejo recolectando zanahorias para el almuerzo. De repente, escuchó un rugido aterrador: ¡era Tío Tigre!",
                "—¡Ajá, Tío Conejo! —dijo el felino—. No tienes escapatoria, pronto te convertirás en un delicioso bocadillo.",
                "En ese instante, Tío Conejo notó unas piedras muy grandes en lo alto de la colina e ideó un plan.",
                "—Puede que yo sea un delicioso bocadillo, pero estoy muy flaquito —dijo Tío Conejo—. Mira hacia la cima de la colina, ahí tengo mis vacas y te puedo traer una. ¿Por qué conformarte con un pequeño bocadillo, cuando puedes darte un gran banquete?"
            ],
            interacciones: {
                "rugido": { sonido: "rugido.mp3", animacion: "brillo", apariciones: "todas" },
                "Conejo": { sonido: "conejo.mp3", animacion: "luces", apariciones: [1, 2] }
            }
        },
        {
            id: "escena-2",
            titulo: "Escena 2",
            texto: [
                "Como Tío Tigre se encontraba de cara al sol, no podía ver con claridad y aceptó la propuesta. Entonces le permitió a Tío Conejo ir colina arriba mientras él esperaba abajo.",
                "Al llegar a la cima de la colina, Tío Conejo gritó:",
                "—Abre bien los brazos Tío Tigre, estoy arreando la vaca más gordita.",
                "Entonces, Tío Conejo se acercó a la piedra más grande y la empujó con todas sus fuerzas. La piedra rodó rápidamente."
            ],
            interacciones: {
                "Tigre": { sonido: "tigre.mp3", animacion: "luces", apariciones: [1, 2] },
                "cima": { sonido: "cima.mp3", animacion: "ascenso" },
                "rodó": { sonido: "rodó.mp3", animacion: "brillo" }
            }
        },
        {
            id: "escena-3",
            titulo: "Escena 3",
            texto: [
                "Tío Tigre estaba tan emocionado que no vio la enorme piedra que lo aplastó, dejándolo adolorido por meses.",
                "Tío Conejo huyó saltando de alegría.",
                "Moraleja: Más vale ser astuto que fuerte."
            ],
            interacciones: {
                "alegría": { sonido: "alegría.mp3", animacion: "cristal" }
            }
        }
    ]
});

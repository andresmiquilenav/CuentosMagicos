/* ============================================================
   CENICIENTA
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/cenicienta/<archivo>.mp3
   (Guía completa de campos en cuentos/_plantilla.js)
   ============================================================ */
registrarCuento({
    id: "cenicienta",
    titulo: "Cenicienta",
    subtitulo: "Un cuento interactivo",
    descripcion: "Un hada, un baile y una medianoche.",
    icono: "👠",
    colores: { cubierta: ["#2c3a63", "#1d2743"] },

    /* Dibujo de la portada y de la tarjeta (interior de un SVG de 120 x 84) */
    emblema: `
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <path d="M22 58 L14 26 L38 42 L60 14 L82 42 L106 26 L98 58 Z" fill="rgba(230,200,119,.28)"/>
            <path d="M22 58 H98"/>
            <path d="M25 67 H95"/>
        </g>
        <g fill="currentColor">
            <circle cx="14" cy="23" r="3.6"/>
            <circle cx="60" cy="11" r="3.6"/>
            <circle cx="106" cy="23" r="3.6"/>
            <circle cx="60" cy="47" r="2.6"/>
            <circle cx="40" cy="52" r="1.8"/>
            <circle cx="80" cy="52" r="1.8"/>
        </g>`,

    escenas: [
        {
            id: "casa",
            titulo: "La casa",
            texto: [
                "Había una vez una joven llamada Cenicienta que vivía en una enorme casa junto a su madrastra y sus dos hermanastras.",
                "Después de la muerte de su padre, Cenicienta tuvo que encargarse de casi todas las tareas de la casa. Cada mañana encendía el fuego, limpiaba las habitaciones y barría los largos pisos de piedra con una vieja escoba. Aunque estaba cansada, Cenicienta siempre conservaba una pequeña esperanza en su corazón."
            ],
            interacciones: {
                "escoba": { sonido: "escoba.mp3", animacion: "brillo" }
            }
        },
        {
            id: "invitacion",
            titulo: "La invitación",
            texto: [
                "Un día llegó una invitación. El príncipe ofrecería un gran baile en el castillo. Todas las jóvenes del reino estaban invitadas.",
                "Cenicienta quería asistir, pero su madrastra se negó. Cuando todos se fueron, Cenicienta quedó sola en el jardín. Entonces comenzó a llorar."
            ],
            interacciones: {
                "castillo": { sonido: "castillo.mp3", animacion: "brillo" }
            }
        },
        {
            id: "hada",
            titulo: "El hada madrina",
            texto: [
                "De pronto, una luz apareció entre los árboles. Era su hada madrina.",
                "—No llores, Cenicienta —dijo suavemente—. Esta noche irás al baile.",
                "El hada levantó su varita. Una luz brillante rodeó a Cenicienta. Era magia."
            ],
            interacciones: {
                "hada":  { sonido: "hada.mp3",  animacion: "destellos" },
                "magia": { sonido: "magia.mp3", animacion: "magia" }
            }
        },
        {
            id: "transformacion",
            titulo: "La transformación",
            texto: [
                "Su viejo vestido comenzó a transformarse. La tela gastada se convirtió en un hermoso vestido brillante.",
                "Pero todavía faltaba algo. El hada hizo aparecer un magnífico carruaje. Dos hermosos caballos esperaban frente a la casa."
            ],
            interacciones: {
                "vestido":  { sonido: "vestido.mp3",  animacion: "resplandor" },
                "carruaje": { sonido: "carruaje.mp3", animacion: "deslizar" },
                "caballos": { sonido: "caballos.mp3", animacion: "vibrar" }
            }
        },
        {
            id: "baile",
            titulo: "El baile",
            texto: [
                "Cenicienta subió al carruaje y partió hacia el castillo. Cuando llegó, las grandes puertas se abrieron. Dentro había música, luces y cientos de personas.",
                "El príncipe vio a Cenicienta y quedó maravillado. Bailaron durante toda la noche."
            ],
            interacciones: {
                "castillo": { sonido: "castillo.mp3", animacion: "brillo" }
            }
        },
        {
            id: "medianoche",
            titulo: "La medianoche",
            texto: [
                "Pero Cenicienta recordó las palabras del hada:",
                "—Debes regresar antes de la medianoche.",
                "Entonces comenzaron a sonar las campanadas. Cenicienta se asustó. Corrió por las escaleras del castillo. En su apuro perdió un zapato. Pero no se detuvo.",
                "Subió al carruaje y regresó a casa justo cuando el último sonido de las campanas desaparecía en la noche."
            ],
            interacciones: {
                "medianoche": { sonido: "medianoche.mp3", animacion: "brillo" },
                "campanadas": { sonido: "campanadas.mp3", animacion: "campana" },
                "zapato":     { sonido: "zapato.mp3",     animacion: "cristal" }
            }
        },
        {
            id: "zapato",
            titulo: "El zapato",
            texto: [
                "Al día siguiente, el príncipe salió en busca de la joven que había perdido aquel misterioso zapato. Recorrió todo el reino hasta encontrar a Cenicienta. El zapato le quedó perfectamente.",
                "Y desde aquel día, Cenicienta nunca volvió a sentirse sola."
            ]
        }
    ]
});

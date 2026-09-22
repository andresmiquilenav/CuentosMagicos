/* ============================================================
   LA SIRENITA
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/sirenita/<archivo>.mp3
   ============================================================ */
registrarCuento({
    id: "sirenita",
    titulo: "La Sirenita",
    descripcion: "Un mar profundo, una bruja y un gran amor.",
    icono: "🧜‍♀️",
    colores: { cubierta: ["#1a4b6c", "#0d2538"] },
/* Dibujo de la portada y de la tarjeta para La Sirenita
   (interior de un SVG de 120 x 84) */
emblema: `
    <g fill="none" stroke="currentColor" stroke-width="2"
       stroke-linejoin="round" stroke-linecap="round">

        <!-- Ola -->
        <path d="M10 76 Q25 66 40 76 T70 76 T100 76 T110 76"/>

        <!-- Cuerpo de la sirenita -->
        <path d="M57 48
                 C52 43 52 35 58 31
                 C64 27 70 31 70 38
                 C70 43 67 47 64 50
                 L68 61
                 C64 65 57 65 53 61
                 Z"
              fill="rgba(230,200,119,.28)"/>

        <!-- Cola -->
        <path d="M63 57
                 C55 60 48 66 40 69
                 C35 71 30 68 28 64
                 C35 66 41 63 46 58
                 C51 53 57 52 63 57 Z"
              fill="rgba(230,200,119,.22)"/>

        <!-- Aleta de la cola -->
        <path d="M40 69
                 C34 68 28 70 23 75
                 C30 76 36 75 40 69 Z"
              fill="rgba(230,200,119,.28)"/>

        <!-- Cabello -->
        <path d="M56 34
                 C49 30 49 22 56 18
                 C64 14 72 19 72 27
                 C72 32 69 35 65 37
                 C63 32 60 31 56 34 Z"
              fill="rgba(230,200,119,.28)"/>

        <!-- Brazo -->
        <path d="M67 43 Q75 50 78 57"/>

        <!-- Sol -->
        <circle cx="94" cy="20" r="9"
                fill="rgba(230,200,119,.18)"/>
    </g>

    <g fill="currentColor">
        <!-- Ojo -->
        <circle cx="65" cy="27" r="1.5"/>

        <!-- Burbujas -->
        <circle cx="80" cy="31" r="1.8"/>
        <circle cx="87" cy="24" r="1.2"/>
        <circle cx="83" cy="17" r="1"/>
    </g>`,
    escenas: [
        {
            id: "reino",
            titulo: "El fondo del mar",
            texto: [
                "En lo más profundo del océano, vivía una joven y curiosa sirenita llamada Ariel. Le encantaba nadar y coleccionar tesoros humanos junto a su fiel amigo, un pequeño pez."
            ],
            interacciones: {
                "océano": { sonido: "océano.mp3", animacion: "organico" }
            }
        },
        {
            id: "tormenta",
            titulo: "El rescate",
            texto: [
                "Una noche, nadó hasta la superficie y vio un gran barco con un apuesto príncipe. De pronto, una terrible tormenta sacudió el mar y el joven cayó al agua."
            ],
            interacciones: {
                "barco": { sonido: "barco.mp3", animacion: "deslizar" },
                "príncipe": { sonido: "príncipe.mp3", animacion: "brillo" }
            }
        },
        {
            id: "bruja",
            titulo: "La bruja del mar",
            texto: [
                "Ariel rescató al príncipe y se enamoró de él. Para poder conocerlo en la superficie, visitó a la malvada bruja del mar, quien le entregó una poción mágica a cambio de su voz."
            ],
            interacciones: {
                "bruja": { sonido: "bruja.mp3", animacion: "misterio" }
            }
        },
        {
            id: "final",
            titulo: "Un nuevo comienzo",
            texto: [
                "Aunque era difícil comunicarse sin su voz, el príncipe reconoció su gran corazón. Al final, rompieron el hechizo, recuperó su voz y vivieron una gran historia de amor para siempre.",
                "FIN"
            ],
            interacciones: {
                "hechizo": { sonido: "hechizo.mp3", animacion: "magia" },
                "amor": { sonido: "amor.mp3", animacion: "luces" }
            }
        }
    ]
});

/* ------------------------------------------------------------
   Ajuste propio de este cuento (opcional).
   ------------------------------------------------------------ */
(function () {
    var estilo = document.createElement("style");
    estilo.textContent =
        "@media (max-width: 400px) {" +
        "  #pantalla-portada[data-cuento=\"sirenita\"] .titulo {" +
        "    font-size: clamp(1.5rem, 7.6vw, 2.3rem);" +
        "    letter-spacing: .1em;" +
        "    padding-left: .1em;" +
        "  }" +
        "}";
    document.head.appendChild(estilo);
})();

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
emblema: `
    <g fill="none" stroke="currentColor" stroke-width="2"
       stroke-linejoin="round" stroke-linecap="round">

        <!-- Ola -->
        <path d="M10 76 Q25 66 40 76 T70 76 T100 76 T110 76"/>

        <!-- Cabeza y cuerpo -->
        <circle cx="60" cy="27" r="8"
                fill="rgba(230,200,119,.28)"/>

        <path d="M54 34
                 C51 40 52 49 58 55
                 L63 55
                 C68 48 69 40 66 34
                 Z"
              fill="rgba(230,200,119,.28)"/>

        <!-- Cabello -->
        <path d="M53 29
                 C46 25 48 17 56 15
                 C65 13 71 19 68 27
                 C65 23 61 23 57 25
                 Z"
              fill="rgba(230,200,119,.28)"/>

        <!-- Cola -->
        <path d="M60 52
                 C52 57 45 63 37 67
                 C33 69 29 67 26 64
                 C33 65 39 61 44 56
                 C49 51 55 49 60 52 Z"
              fill="rgba(230,200,119,.22)"/>

        <!-- Aleta -->
        <path d="M37 67
                 C31 67 25 70 21 75
                 C29 75 34 73 37 67 Z"
              fill="rgba(230,200,119,.28)"/>

        <!-- Brazo -->
        <path d="M65 39 Q72 46 75 52"/>

        <!-- Sol -->
        <circle cx="94" cy="21" r="8"
                fill="rgba(230,200,119,.18)"/>
    </g>

    <g fill="currentColor">
        <circle cx="63" cy="25" r="1.5"/>
        <circle cx="82" cy="28" r="1.7"/>
        <circle cx="88" cy="20" r="1.1"/>
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

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
   /* Dibujo de la portada y de la tarjeta para La Sirenita (interior de un SVG de 120 x 84) */
    emblema: `
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <!-- Silueta de la Sirenita (cuerpo y cola curvada) -->
            <path d="M30 75 Q 20 55, 35 30 C 50 10, 70 10, 85 30 Q 105 55, 95 75 Z" fill="rgba(173,216,230,.25)"/>
            <!-- Concha marina decorativa (en el cabello o como marco) -->
            <path d="M55 20 C 48 12, 72 12, 65 20 Q 65 26, 70 26 C 78 26, 78 14, 70 14 Q 60 14, 50 14 C 42 14, 42 26, 50 26 Q 55 26, 55 20 Z" fill="rgba(255,192,203,.2)"/>
            <!-- Olas estilizadas/Corriente de agua -->
            <path d="M10 80 C 30 65, 50 65, 60 80 S 90 95, 110 80"/>
        </g>
        <g fill="currentColor">
            <!-- Burbujas / Estrellas de mar -->
            <circle cx="80" cy="20" r="2"/>
            <circle cx="20" cy="40" r="1.5"/>
            <circle cx="90" cy="50" r="1.5"/>
            <!-- Pequeña estrella de mar decorativa -->
            <path d="M40 68 L 42 73 L 47 73 L 43 76 L 45 81 L 40 78 L 35 81 L 37 76 L 33 73 L 38 73 Z"/>
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

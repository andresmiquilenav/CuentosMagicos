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
 /* Dibujo de la portada y de la tarjeta para La Sirenita - Minimalista (interior de un SVG de 120 x 84) */
    emblema: `
        <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
            <!-- La Luna o el Sol en el horizonte (círculo superior) -->
            <circle cx="95" cy="25" r="12" fill="rgba(255,255,255,.1)"/>
            
            <!-- La Roca sobre la que se sienta (trazo base inferior) -->
            <path d="M20 78 Q 40 65, 60 78 T 100 78" stroke-width="3"/>
            
            <!-- Silueta de la Sirenita (cabeza, torso y cola curvada) -->
            <!-- Se sienta en el centro de la roca (aprox. X=60) -->
            <path d="M50 68 C 48 50, 55 35, 60 35 C 65 35, 72 50, 70 68 Z" fill="rgba(173,216,230,.35)"/>
            <!-- La cola extendida hacia la izquierda -->
            <path d="M50 68 C 35 68, 30 85, 45 75 Q 50 72, 55 75 Z" fill="rgba(173,216,230,.2)" transform="rotate(-10 50 68)"/>
        </g>
        <g fill="currentColor">
            <!-- Pequeño detalle de cabello o corona en la cabeza -->
            <circle cx="60" cy="32" r="2.5"/>
            <!-- Una única burbuja subiendo -->
            <circle cx="80" cy="55" r="1.5"/>
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

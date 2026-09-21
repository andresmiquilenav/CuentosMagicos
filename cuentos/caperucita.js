/* ============================================================
   CAPERUCITA ROJA
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/caperucita/<archivo>.mp3
   ============================================================ */
registrarCuento({
    id: "caperucita",
    titulo: "Caperucita Roja",
    descripcion: "Una canasta, un lobo en el bosque y una abuelita.",
    icono: "🧺",
    colores: { cubierta: ["#8b0000", "#4a0000"] },

    escenas: [
        {
            id: "mision",
            titulo: "La misión",
            texto: [
                "Había una vez una niña llamada Caperucita Roja. Un día, su mamá le pidió que llevara una canasta con comida a su abuelita, que estaba enferma."
            ],
            interacciones: {
                "niña": { sonido: "niña.mp3", animacion: "destellos" },
                "mamá": { sonido: "mamá.mp3", animacion: "magia" },
                "comida": { sonido: "comida.mp3", animacion: "expansion" }
            }
        },
        {
            id: "bosque",
            titulo: "El bosque",
            texto: [
                "Caperucita tomó la canasta y caminó feliz por el bosque. Mientras avanzaba, escuchaba a los pájaros cantar."
            ],
            interacciones: {
                "caminó": { sonido: "caminó.mp3", animacion: "trote" },
                "bosque": { sonido: "bosque.mp3", animacion: "organico" },
                "pájaros": { sonido: "pájaros.mp3", animacion: "luces" }
            }
        },
        {
            id: "lobo",
            titulo: "El lobo",
            texto: [
                "De pronto, un lobo apareció entre los árboles.",
                "—¿Adónde vas, Caperucita?",
                "—A llevarle comida a mi abuelita."
            ],
            interacciones: {
                "lobo": { sonido: "lobo.mp3", animacion: "vibrar" },
                "árboles": { sonido: "árboles.mp3", animacion: "ondear" }
            }
        },
        {
            id: "flores",
            titulo: "Las flores",
            texto: [
                "El lobo le señaló unas flores.",
                "—¿Por qué no recoges algunas para tu abuelita?",
                "Caperucita comenzó a recogerlas mientras el lobo se alejaba."
            ],
            interacciones: {
                "flores": { sonido: "flores.mp3", animacion: "destellos" },
                "recogerlas": { sonido: "recogerlas.mp3", animacion: "campana" }
            }
        },
        {
            id: "casa",
            titulo: "La casa",
            texto: [
                "El lobo llegó primero a la casa de la abuelita. Llamó a la puerta y entró."
            ],
            interacciones: {
                "casa": { sonido: "casa.mp3", animacion: "misterio" },
                "Llamó": { sonido: "llamó.mp3", animacion: "apertura" }
            }
        },
        {
            id: "disfraz",
            titulo: "El disfraz",
            texto: [
                "El lobo se puso el gorro de la abuelita y se escondió en la cama.",
                "Cuando Caperucita llegó, se acercó lentamente."
            ],
            interacciones: {
                "gorro": { sonido: "gorro.mp3", animacion: "acero" },
                "cama": { sonido: "cama.mp3", animacion: "ondear" }
            }
        },
        {
            id: "ojos",
            titulo: "Qué ojos tan grandes",
            texto: [
                "—Abuelita, ¡qué ojos tan grandes tienes!",
                "—Son para verte mejor.",
                "—¿Y qué orejas tan grandes tienes?",
                "—Son para escucharte mejor."
            ],
            interacciones: {
                "ojos": { sonido: "ojos.mp3", animacion: "destellos" },
                "orejas": { sonido: "orejas.mp3", animacion: "campana" }
            }
        },
        {
            id: "dientes",
            titulo: "Los dientes",
            texto: [
                "Caperucita miró a su abuelita con atención.",
                "—¿Y qué dientes tan grandes tienes?",
                "—¡Son para comerte mejor!",
                "Caperucita dio un gran grito y salió corriendo."
            ],
            interacciones: {
                "dientes": { sonido: "dientes.mp3", animacion: "acero" },
                "grito": { sonido: "grito.mp3", animacion: "vibrar" }
            }
        },
        {
            id: "lenador",
            titulo: "El leñador",
            texto: [
                "Un leñador que estaba cerca escuchó los gritos y entró rápidamente.",
                "El lobo huyó hacia el bosque, y Caperucita abrazó a su abuelita."
            ],
            interacciones: {
                "leñador": { sonido: "leñador.mp3", animacion: "magia" },
                "abrazó": { sonido: "abrazó.mp3", animacion: "expansion" }
            }
        },
        {
            id: "leccion",
            titulo: "La lección",
            texto: [
                "Caperucita prometió nunca volver a alejarse del camino.",
                "Desde aquel día, recordó escuchar a su mamá y tener cuidado con los desconocidos.",
                "Y así, Caperucita y su abuelita vivieron felices.",
                "FIN"
            ],
            interacciones: {
                "felices": { sonido: "felices.mp3", animacion: "luces" }
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
        "  #pantalla-portada[data-cuento=\"caperucita\"] .titulo {" +
        "    font-size: clamp(1.5rem, 7.6vw, 2.3rem);" +
        "    letter-spacing: .1em;" +
        "    padding-left: .1em;" +
        "  }" +
        "}";
    document.head.appendChild(estilo);
})();
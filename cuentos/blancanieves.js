/* ============================================================
   BLANCANIEVES Y EL ESPEJO MÁGICO
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/blancanieves/<archivo>.mp3
   (Guía completa de campos en cuentos/_plantilla.js)

   Cada sonido lleva exactamente el nombre de su palabra:
     furiosa.mp3   bosque.mp3    corrió.mp3      puerta.mp3
     alegres.mp3   sorprendidos.mp3   malvada.mp3   mordió.mp3
     lloraron.mp3  hechizo.mp3   pajaritos.mp3   celebraron.mp3
   ============================================================ */
registrarCuento({
    id: "blancanieves",
    titulo: "Blancanieves y el Espejo Mágico",
    descripcion: "Un espejo, siete enanitos y una manzana.",
    icono: "🍎",
    colores: { cubierta: ["#6b2a2a", "#3f1616"] },

    escenas: [
        {
            id: "espejo",
            titulo: "El espejo mágico",
            texto: [
                "Érase una vez, en un reino muy lejano, una dulce princesa llamada Blancanieves. Tenía la piel blanca como la nieve, los labios rojos como la cereza y el cabello negro como la noche. Vivía en un gran castillo junto a su madrastra, una reina muy vanidosa que poseía un espejo mágico.",
                "Todas las mañanas, la reina se miraba en él y preguntaba:",
                "—Espejito, espejito mágico en la pared, ¿quién es la más hermosa de este reino?",
                "Y el espejo siempre respondía:",
                "—Tú eres la más hermosa, Majestad.",
                "Pero un día, cuando Blancanieves creció y se convirtió en una hermosa jovencita, el espejo le dio una respuesta diferente:",
                "—Majestad, ahora Blancanieves es la más bella de este lugar.",
                "Al escuchar esto, la reina se puso furiosa y ordenó a un cazador que llevara a la niña al fondo del bosque. Sin embargo, el cazador, al ver los ojos tan puros de Blancanieves, no pudo hacerle daño.",
                "—¡Huye, pequeña! La reina te busca —le dijo con ternura."
            ],
            interacciones: {
                "furiosa": { sonido: "furiosa.mp3", animacion: "vibrar" },
                "bosque": { sonido: "bosque.mp3", animacion: "organico" }
            }
        },
        {
            id: "casita",
            titulo: "La casita en el bosque",
            texto: [
                "Blancanieves corrió asustada entre los árboles hasta que encontró una casita diminuta. Empujó la puerta despacito (¡crec!) y, como estaba agotada, se quedó dormida en una de las camitas.",
                "Poco después llegaron los dueños de la casa: siete alegres enanos que trabajaban en las minas. Al ver a la princesa, se quedaron sorprendidos, pero al conocer su historia, la recibieron con los brazos abiertos. Desde entonces, vivieron muy felices juntos: ella les cocinaba y ellos la cuidaban."
            ],
            interacciones: {
                "corrió": { sonido: "corrió.mp3", animacion: "trote" },
                "puerta": { sonido: "puerta.mp3", animacion: "apertura" },
                "alegres": { sonido: "alegres.mp3", animacion: "destellos" },
                "sorprendidos": { sonido: "sorprendidos.mp3", animacion: "campana" }
            }
        },
        {
            id: "manzana",
            titulo: "La manzana encantada",
            texto: [
                "Tiempo después, la malvada reina descubrió gracias a su espejo que Blancanieves seguía viva. Disfrazada de anciana, fue hasta la cabaña y le ofreció una manzana roja y brillante.",
                "Confiada y de buen corazón, Blancanieves la mordió... y cayó profundamente dormida, pues la fruta tenía un hechizo.",
                "Cuando los enanos la encontraron, lloraron desconsolados. Como no querían separarse de ella, la colocaron en una urna de cristal en medio del bosque, rodeada de flores."
            ],
            interacciones: {
                "malvada": { sonido: "malvada.mp3", animacion: "misterio" },
                "mordió": { sonido: "mordió.mp3", animacion: "acero" },
                "lloraron": { sonido: "lloraron.mp3", animacion: "ondear" }
            }
        },
        {
            id: "despertar",
            titulo: "El despertar",
            texto: [
                "Un día, un apuesto príncipe que pasaba por allí vio a Blancanieves en la urna. Quedó tan enamorado de su dulzura que se acercó y le dio un suave beso en la mejilla.",
                "En ese instante, el hechizo se rompió. Blancanieves abrió los ojos y sonrió. Los enanos saltaron de alegría y los pajaritos cantaron con fuerza. El príncipe la llevó a su castillo, donde celebraron una gran fiesta... y vivieron felices para siempre."
            ],
            interacciones: {
                "hechizo": { sonido: "hechizo.mp3", animacion: "magia" },
                "pajaritos": { sonido: "pajaritos.mp3", animacion: "luces" },
                "celebraron": { sonido: "celebraron.mp3", animacion: "expansion" }
            }
        }
    ]
});

/* ------------------------------------------------------------
   Ajuste propio de este cuento (opcional; se puede borrar).
   "BLANCANIEVES" es una palabra larga: en móviles estrechos el título de la
   portada se cortaba (320 px) o quedaba pegado al borde (360 px). Este bloque
   lo reduce solo aquí y solo en pantallas de hasta 400 px; los demás cuentos
   no se ven afectados.
   ------------------------------------------------------------ */
(function () {
    var estilo = document.createElement("style");
    estilo.textContent =
        "@media (max-width: 400px) {" +
        "  #pantalla-portada[data-cuento=\"blancanieves\"] .titulo {" +
        "    font-size: clamp(1.5rem, 7.6vw, 2.3rem);" +
        "    letter-spacing: .1em;" +
        "    padding-left: .1em;" +
        "  }" +
        "}";
    document.head.appendChild(estilo);
})();

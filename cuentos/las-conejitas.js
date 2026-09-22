/* ============================================================
   LAS CONEJITAS
   Solo contenido y configuración. La lógica vive en script.js.
   Sonidos: sonidos/las-conejitas/<archivo>.mp3
   Generado con el Creador de cuentos.
   ============================================================ */
registrarCuento({
    id: "las-conejitas",
    titulo: "Las conejitas",
    descripcion: "Un cuento de dos conejitas princesas",
    icono: "🐇🐇",

    escenas: [
        {
            id: "escena-1",
            titulo: "Escena 1",
            texto: [
                "Había una vez, en un bosque lleno de colores y flores brillantes, una familia muy peculiar y muy feliz. En una casita acogedora vivían papá Tigre, mamá Cierva, y sus dos pequeñas y saltarinas hijas: Mía e Isa, que eran dos conejitas de orejas suaves.",
                "A Mía le encantaba correr rápido por el prado y presumir que daba los saltos más altos. Siempre decía:",
                "—¡Miren qué tan alto llego! Nadie salta como yo.",
                "Por el contrario, Isa era una conejita muy paciente. Le gustaba observar las pequeñas cosas del bosque, ayudar a su mamá a buscar las hojas más tiernas y escuchar las historias de rugidos suaves que le contaba su papá Tigre.",
                "Un día caluroso, mamá Cierva les dio una misión:",
                "—Mis amores, necesito que crucen el prado de las mariposas y me traigan un poco de trébol fresco para la merienda."
            ],
            interacciones: {
                "feliz": { sonido: "feliz.mp3", animacion: "brillo" },
                "saltarinas": { sonido: "saltarinas.mp3", animacion: "brillo" },
                "conejitas": { sonido: "conejitas.mp3", animacion: "brillo" },
                "correr": { sonido: "correr.mp3", animacion: "brillo" },
                "hojas": { sonido: "hojas.mp3", animacion: "brillo" },
                "papá": { sonido: "papá.mp3", animacion: "brillo" },
                "mamá": { sonido: "mamá.mp3", animacion: "brillo" }
            }
        },
        {
            id: "escena-2",
            titulo: "Escena 2",
            texto: [
                "Mía salió disparada como un cohete, sin escuchar los consejos de prudencia que le daba su hermana. Confiada en que era la más rápida, iba tan distraída mirando las nubes que no vio una pequeña raíz en el camino. ¡Zas! Mía tropezó y dio una vuelta en el aire, cayendo directo en un charco de lodo.",
                "Sus orejas blancas quedaron marrones y su patita le dolía un poquito. Mía comenzó a llorar, pensando que ya no servía para nada.",
                "En ese momento llegó Isa caminando con calma. No corría, pero avanzaba con paso seguro. Al ver a su hermana, Isa no se burló; al contrario, la abrazó con cariño, la ayudó a limpiar el lodo con cuidado y le tendió la pata para caminar juntas el resto del tramo.",
                "Cuando llegaron a casa, papá Tigre las recibió con un fuerte abrazo y mamá Cierva les preparó una rica merienda. Mía comprendió que no se trata de quién llega primero o quién hace las cosas más rápido, sino de valorar las cualidades de los demás y estar siempre listos para ayudar."
            ],
            interacciones: {
                "disparada": { sonido: "disparada.mp3", animacion: "brillo" },
                "tropezó": { sonido: "tropezó.mp3", animacion: "brillo" },
                "llorar": { sonido: "llorar.mp3", animacion: "brillo" },
                "abrazó": { sonido: "abrazó.mp3", animacion: "brillo" },
                "Cierva": { sonido: "cierva.mp3", animacion: "brillo" },
                "listos": { sonido: "listos.mp3", animacion: "brillo" }
            }
        },
        {
            id: "escena-3",
            titulo: "Escena 3",
            texto: [
                "Moraleja",
                "La verdadera grandeza no está en presumir nuestras habilidades, sino en la paciencia, la humildad y el amor con el que ayudamos a quienes nos rodean cuando más lo necesitan."
            ],
            interacciones: {
                "amor": { sonido: "amor.mp3", animacion: "brillo" }
            }
        }
    ]
});

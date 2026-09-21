"use strict";

/* ============================================================
   CUENTOS MÁGICOS — motor de cuentos interactivos

   Este archivo es el MOTOR: no contiene ningún cuento.
   Cada cuento vive en  cuentos/<id>.js  y es solo información:
   escenas, texto, palabras interactivas, sonidos y animaciones.

   Cómo se agrega un cuento nuevo (ver cuentos/_plantilla.js):
     1) cuentos/<id>.js      (copiar la plantilla)
     2) sonidos/<id>/*.mp3
     3) añadir el id en cuentos/indice.js

   Índice de este archivo
     1. Configuración
     2. Biblioteca de animaciones
     3. Estado y elementos de la interfaz
     4. Audio centralizado
     5. Avisos
     6. Efectos visuales (partículas, ondas...)
     7. Registro y carga de cuentos
     8. Palabras interactivas (detección y activación)
     9. Vistas: biblioteca, portada y lector de escenas
    10. Transiciones (desvanecer y pasar página)
    11. Eventos
    12. Inicio
   ============================================================ */


/* ------------------------------------------------------------
   1. CONFIGURACIÓN
   ------------------------------------------------------------ */
const CONFIG = {
    carpetaCuentos: "cuentos",
    carpetaSonidos: "sonidos",
    sonidoPagina: "pagina.mp3",         // sonido del motor: sonidos/pagina.mp3
    duracionPaginaMs: 1000,             // duración de la animación de pasar página
    duracionEfectoMs: 800,              // duración del brillo de una palabra al tocarla
    subtituloPorDefecto: "Un cuento interactivo",
    textoFinal: "Fin"
};

const EMBLEMA_POR_DEFECTO = `
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
        <path d="M60 40 C48 32 30 31 14 36 V74 C30 69 48 70 60 77 C72 70 90 69 106 74 V36 C90 31 72 32 60 40 Z" fill="rgba(230,200,119,.28)"/>
        <path d="M60 40 V77"/>
    </g>
    <g fill="currentColor">
        <path d="M60 4 L62.5 12.5 L71 15 L62.5 17.5 L60 26 L57.5 17.5 L49 15 L57.5 12.5 Z"/>
        <path d="M32 14 L33.6 19.4 L39 21 L33.6 22.6 L32 28 L30.4 22.6 L25 21 L30.4 19.4 Z"/>
        <path d="M88 14 L89.6 19.4 L95 21 L89.6 22.6 L88 28 L86.4 22.6 L81 21 L86.4 19.4 Z"/>
    </g>`;

/* Luces que flotan en el fondo cuando una escena tiene decoracion: "linternas" */
const LINTERNAS = [
    { x: 6,  y: 70, dur: 21, delay: -3,  tam: 0.9 },
    { x: 17, y: 34, dur: 17, delay: -9,  tam: 0.7 },
    { x: 29, y: 82, dur: 24, delay: -14, tam: 1 },
    { x: 41, y: 52, dur: 19, delay: -6,  tam: 0.75 },
    { x: 53, y: 20, dur: 26, delay: -18, tam: 0.95 },
    { x: 64, y: 64, dur: 20, delay: -11, tam: 0.7 },
    { x: 75, y: 40, dur: 23, delay: -2,  tam: 1 },
    { x: 86, y: 78, dur: 18, delay: -8,  tam: 0.8 },
    { x: 93, y: 26, dur: 25, delay: -16, tam: 0.65 }
];


/* ------------------------------------------------------------
   2. BIBLIOTECA DE ANIMACIONES
      Cada cuento elige una por nombre:  animacion: "magia"
      Los movimientos y brillos de cada una están en style.css
      (clase .anim-<nombre>). Aquí se configuran las partículas y
      demás detalles. Se pueden agregar más con registrarAnimacion().

      chispas    { cantidad, estilo, direccion, recorrido, duracion, tam, x, y }
                 estilo:    oro | suave | cristal | humo | hoja | luz | polvo | acero
                 direccion: radial (por defecto) | arriba | abajo | lado | quieto
      ondas      { cantidad, escala }
      rafagas    cantidad de ráfagas de viento
      apertura   true: hojas de ventana que se abren
      filo       true: destello que recorre la palabra
      clase      clase CSS del movimiento (por defecto "anim-<nombre>")
   ------------------------------------------------------------ */
const ANIMACIONES = {
    brillo:     {},
    magia:      { chispas: { cantidad: 12, estilo: "oro" } },
    destellos:  { chispas: { cantidad: 6, estilo: "suave", direccion: "arriba" } },
    resplandor: {},
    deslizar:   {},
    vibrar:     {},
    campana:    { ondas: { cantidad: 2 } },
    cristal:    { chispas: { cantidad: 4, estilo: "cristal" } },

    viento:     { rafagas: 3 },
    ondear:     { chispas: { cantidad: 8, estilo: "suave", direccion: "abajo", recorrido: [16, 38], duracion: 1000 } },
    misterio:   { chispas: { cantidad: 6, estilo: "humo", direccion: "arriba", recorrido: [10, 30], duracion: 900 } },
    organico:   { chispas: { cantidad: 6, estilo: "hoja", direccion: "abajo", recorrido: [14, 36], duracion: 1000, tam: [0.3, 0.5] } },
    luces:      { chispas: { cantidad: 6, estilo: "luz", direccion: "arriba", recorrido: [30, 66], duracion: 1200, tam: [0.4, 0.65] } },
    trote:      { chispas: { cantidad: 3, estilo: "polvo", direccion: "lado", y: [78, 96], tam: [0.5, 0.8] } },
    ascenso:    {},
    apertura:   { apertura: true },
    acero:      { filo: true, chispas: { cantidad: 1, estilo: "acero", direccion: "quieto", x: [88, 98], y: [10, 30], tam: [0.8, 0.9], duracion: 600 } },
    expansion:  {
        chispas: { cantidad: 14, estilo: "luz", recorrido: [24, 60], duracion: 1100, tam: [0.35, 0.6] },
        ondas: { cantidad: 2, escala: 2.8 }
    }
};

function registrarAnimacion(nombre, configuracion) {
    if (!nombre || typeof nombre !== "string") {
        console.warn("[Cuentos] registrarAnimacion necesita un nombre.");
        return;
    }
    ANIMACIONES[nombre] = Object.assign({}, configuracion);
}
window.registrarAnimacion = registrarAnimacion;

function claseDeAnimacion(nombre) {
    const definicion = ANIMACIONES[nombre] || {};
    return definicion.clase || `anim-${nombre}`;
}


/* ------------------------------------------------------------
   3. ESTADO Y ELEMENTOS DE LA INTERFAZ
   ------------------------------------------------------------ */
const elementos = {
    app: document.getElementById("app"),
    botonSonido: document.getElementById("control-sonido"),
    botonVolver: document.getElementById("volver"),
    tarjetas: document.getElementById("tarjetas"),
    portadaContenido: document.getElementById("portada-contenido"),
    cielo: document.getElementById("cielo"),
    escenas: document.getElementById("escenas"),
    puntos: document.getElementById("progreso-puntos"),
    progresoNumero: document.getElementById("progreso-numero"),
    progresoTitulo: document.getElementById("progreso-titulo"),
    anterior: document.querySelector(".nav-anterior"),
    siguiente: document.querySelector(".nav-siguiente")
};

const vistas = {
    inicio: document.getElementById("pantalla-inicio"),
    biblioteca: document.getElementById("pantalla-biblioteca"),
    portada: document.getElementById("pantalla-portada"),
    cuento: document.getElementById("pantalla-cuento")
};

const estado = {
    vista: "inicio",       // inicio | biblioteca | portada | cuento
    cuento: null,          // cuento abierto (datos normalizados)
    indice: 0,             // escena visible
    escenas: [],           // elementos DOM de las escenas del cuento abierto
    puntos: [],            // puntos del indicador de progreso
    enTransicion: false
};

const biblioteca = [];                   // cuentos disponibles (normalizados), en el orden del índice
const diagnostico = [];                  // problemas al cargar cuentos (se muestran si la biblioteca queda vacía)
const cuentosRegistrados = [];           // datos crudos recibidos con registrarCuento()
let cuentosListos = Promise.resolve();   // se resuelve cuando termina la carga de cuentos

const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

function crear(etiqueta, clase, texto) {
    const nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
}


/* ------------------------------------------------------------
   4. AUDIO CENTRALIZADO
      - un objeto Audio por archivo, indexado por su ruta
      - nunca suenan dos sonidos a la vez
      - nada suena solo: todo parte de un gesto del usuario
      - rutas relativas: sonidos/<cuento>/<archivo>
   ------------------------------------------------------------ */
const audios = {};                       // ruta -> Audio
const rutasFallidas = new Set();         // rutas que no pudieron cargarse
let sonidoActual = null;                 // el único audio que puede estar sonando
let silenciado = false;
let avisoSilencioMostrado = false;

/* Ruta de un sonido. Con cuento: sonidos/<cuento>/<archivo>.
   Sin cuento (sonidos del motor): sonidos/<archivo>. */
function rutaSonido(cuento, archivo) {
    return cuento
        ? `${CONFIG.carpetaSonidos}/${cuento}/${archivo}`
        : `${CONFIG.carpetaSonidos}/${archivo}`;
}

function nombreDeRuta(ruta) {
    return ruta.split("/").pop().replace(/\.[^.]+$/, "");
}

function registrarFallo(ruta) {
    if (rutasFallidas.has(ruta)) return;
    rutasFallidas.add(ruta);
    console.warn(`[Cuentos] No se pudo cargar el sonido: ${ruta}`);
}

function crearAudio(ruta) {
    const audio = new Audio();
    audio.preload = "auto";
    audio.addEventListener("error", () => {
        if (audio._liberado) return;
        registrarFallo(ruta);
        // Si el usuario acaba de tocar la palabra, se le explica qué pasó.
        if (audio._avisarSiFalla) {
            mostrarAviso(`No se encontró el sonido «${nombreDeRuta(ruta)}» (${ruta}). Revisa la carpeta sonidos.`);
        }
    });
    audio.src = ruta;                    // empieza a cargar el archivo (no lo reproduce)
    audios[ruta] = audio;
    return audio;
}

function precargarSonidos(rutas) {
    rutas.forEach((ruta) => {
        if (!audios[ruta]) {
            crearAudio(ruta);
        } else if (audios[ruta].readyState === 0 && !rutasFallidas.has(ruta)) {
            audios[ruta].load();         // algunos móviles solo cargan tras un gesto
        }
    });
}

/* Libera la memoria de los sonidos de un cuento al salir de él. */
function liberarSonidos(rutas) {
    rutas.forEach((ruta) => {
        const audio = audios[ruta];
        if (!audio) return;
        audio._liberado = true;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
        delete audios[ruta];
        rutasFallidas.delete(ruta);
        if (sonidoActual === audio) sonidoActual = null;
    });
}

function detenerTodosLosSonidos() {
    Object.values(audios).forEach((audio) => {
        audio.pause();
        try { audio.currentTime = 0; } catch (e) { /* ignorar */ }
    });
    sonidoActual = null;
}

/* Reproduce un sonido:  playSound("cenicienta", "magia.mp3")
   (con cuento = null suena un sonido del motor: sonidos/<archivo>)
   1) detiene cualquier otro sonido  2) empieza desde el principio
   3) nunca suenan dos a la vez.
   opciones.avisar = false: si falla, solo se avisa en la consola. */
function playSound(cuento, archivo, opciones) {
    const avisar = !opciones || opciones.avisar !== false;

    if (silenciado) {
        if (avisar && !avisoSilencioMostrado) {
            avisoSilencioMostrado = true;
            mostrarAviso("El sonido está en silencio. Actívalo arriba a la derecha.");
        }
        return;
    }

    const ruta = rutaSonido(cuento, archivo);

    // Si la carga falló antes (archivo ausente o error pasajero), se reintenta en cada toque.
    if (!audios[ruta] || rutasFallidas.has(ruta)) {
        rutasFallidas.delete(ruta);
        crearAudio(ruta);
    }

    const audio = audios[ruta];
    audio._avisarSiFalla = avisar;
    clearTimeout(audio._temporizadorToque);
    audio._temporizadorToque = setTimeout(() => { audio._avisarSiFalla = false; }, 4000);

    if (sonidoActual && sonidoActual !== audio) {
        sonidoActual.pause();
        try { sonidoActual.currentTime = 0; } catch (e) { /* ignorar */ }
    }
    sonidoActual = audio;

    try { audio.currentTime = 0; } catch (e) { /* aún sin metadatos: no pasa nada */ }

    const promesa = audio.play();
    if (promesa && typeof promesa.catch === "function") {
        promesa.catch((error) => {
            if (error.name === "AbortError") return;   // cambio rápido de sonido: normal
            console.warn(`[Cuentos] El navegador no pudo reproducir ${ruta} (${error.name}).`);
            if (avisar && error.name === "NotAllowedError") {
                mostrarAviso("El navegador bloqueó el audio. Vuelve a tocar la palabra.");
            }
        });
    }
}

/* Botón global de sonido */
function actualizarBotonSonido() {
    elementos.botonSonido.textContent = silenciado ? "🔇 Silencio" : "🔊 Sonidos";
}

function alternarSonido() {
    silenciado = !silenciado;
    if (silenciado) detenerTodosLosSonidos();
    avisoSilencioMostrado = false;
    actualizarBotonSonido();
}


/* ------------------------------------------------------------
   5. AVISOS (discretos, abajo)
   ------------------------------------------------------------ */
let temporizadorAviso = null;

function mostrarAviso(texto) {
    let aviso = document.getElementById("aviso");
    if (!aviso) {
        aviso = crear("p", "aviso");
        aviso.id = "aviso";
        aviso.setAttribute("role", "status");
        document.body.appendChild(aviso);
    }
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => aviso.classList.remove("visible"), 5000);
}


/* ------------------------------------------------------------
   6. EFECTOS VISUALES
   ------------------------------------------------------------ */

function aleatorio(min, max) {
    return min + Math.random() * (max - min);
}

function entre(rango, porDefecto) {
    const par = rango || porDefecto;
    return aleatorio(par[0], par[1]);
}

/* Inserta un elemento decorativo dentro de la palabra y lo borra solo. */
function insertarTemporal(palabra, clase, milisegundos, estilos) {
    const nodo = crear("span", clase);
    nodo.setAttribute("aria-hidden", "true");
    if (estilos) {
        Object.keys(estilos).forEach((nombre) => nodo.style.setProperty(nombre, estilos[nombre]));
    }
    palabra.appendChild(nodo);
    setTimeout(() => nodo.remove(), milisegundos);
}

function lanzarChispas(palabra, config) {
    const duracion = config.duracion || 700;

    for (let i = 0; i < config.cantidad; i++) {
        let dx = 0;
        let dy = 0;

        switch (config.direccion) {
            case "arriba":                           // flotan hacia arriba
                dx = aleatorio(-20, 20);
                dy = -entre(config.recorrido, [14, 40]);
                break;
            case "abajo":                            // caen suavemente
                dx = aleatorio(-14, 14);
                dy = entre(config.recorrido, [14, 40]);
                break;
            case "lado":                             // salen hacia los lados, a ras de suelo
                dx = (Math.random() < 0.5 ? -1 : 1) * aleatorio(10, 26);
                dy = -aleatorio(2, 8);
                break;
            case "quieto":                           // solo aparecen y se apagan
                break;
            default: {                               // "radial": dispersión suave alrededor
                const angulo = aleatorio(0, Math.PI * 2);
                const distancia = entre(config.recorrido, [16, 42]);
                dx = Math.cos(angulo) * distancia;
                dy = Math.sin(angulo) * distancia * 0.8;
            }
        }

        const retraso = Math.round(aleatorio(0, 140));

        insertarTemporal(palabra, `chispa chispa-${config.estilo || "oro"}`, duracion + retraso + 250, {
            "--x": `${entre(config.x, [8, 92])}%`,
            "--y": `${entre(config.y, [15, 85])}%`,
            "--dx": `${dx.toFixed(1)}px`,
            "--dy": `${dy.toFixed(1)}px`,
            "--tam": `${entre(config.tam, [0.28, 0.5]).toFixed(2)}em`,
            "--duracion": `${duracion}ms`,
            "--retraso": `${retraso}ms`
        });
    }
}

function lanzarOndas(palabra, cantidad, escala) {
    for (let i = 0; i < cantidad; i++) {
        insertarTemporal(palabra, "onda", 1200 + i * 200, {
            "--retraso": `${i * 200}ms`,
            "--escala": String(escala || 1.9)
        });
    }
}

function lanzarRafagas(palabra, cantidad) {
    for (let i = 0; i < cantidad; i++) {
        insertarTemporal(palabra, "rafaga", 1100, {
            "--y": `${Math.round(aleatorio(22, 82))}%`,
            "--retraso": `${i * 110}ms`
        });
    }
}

/* Ejecuta la animación de una palabra: brillo base + movimiento CSS + extras. */
function animarPalabra(palabra, nombre) {
    const definicion = ANIMACIONES[nombre] || ANIMACIONES.brillo;

    // Reinicia la animación aunque se toque varias veces seguidas.
    palabra.classList.remove("activa");
    void palabra.offsetWidth;
    palabra.classList.add("activa");

    clearTimeout(palabra._temporizador);
    palabra._temporizador = setTimeout(
        () => palabra.classList.remove("activa"),
        CONFIG.duracionEfectoMs
    );

    if (menosMovimiento.matches) return;

    if (definicion.chispas)  lanzarChispas(palabra, definicion.chispas);
    if (definicion.ondas)    lanzarOndas(palabra, definicion.ondas.cantidad, definicion.ondas.escala);
    if (definicion.rafagas)  lanzarRafagas(palabra, definicion.rafagas);
    if (definicion.apertura) insertarTemporal(palabra, "apertura", 1000);
    if (definicion.filo)     insertarTemporal(palabra, "filo", 700);
}


/* ------------------------------------------------------------
   7. REGISTRO Y CARGA DE CUENTOS
      Cada cuentos/<id>.js llama a registrarCuento({...}).
      El motor lee cuentos/indice.js, carga esos archivos y
      convierte cada cuento en una estructura normalizada.
   ------------------------------------------------------------ */

function registrarCuento(datos) {
    cuentosRegistrados.push(datos);
}
window.registrarCuento = registrarCuento;

function cargarScript(src) {
    return new Promise((resolver, rechazar) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolver;
        script.onerror = () => rechazar(new Error(`No se pudo cargar ${src}`));
        document.head.appendChild(script);
    });
}

/* Convierte "apariciones" en algo que el motor entiende:
   [1] por defecto · 2 · [1, 3] · "todas" */
function normalizarApariciones(valor) {
    if (valor === "todas") return "todas";
    if (typeof valor === "number") return [valor];
    if (Array.isArray(valor) && valor.length) return valor.filter((n) => typeof n === "number");
    return [1];
}

function normalizarEscena(datos, posicion, idCuento) {
    const etiqueta = `${idCuento}, escena ${posicion + 1}`;
    if (!datos || typeof datos !== "object") {
        console.warn(`[Cuentos] Escena inválida (${etiqueta}).`);
        return null;
    }

    const bruto = Array.isArray(datos.texto) ? datos.texto : String(datos.texto || "").split(/\n\s*\n/);
    const parrafos = bruto.map((p) => String(p).trim()).filter(Boolean);
    if (!parrafos.length) {
        console.warn(`[Cuentos] La escena no tiene texto (${etiqueta}).`);
        return null;
    }

    const textoCompleto = parrafos.join("\n");
    const interacciones = Object.keys(datos.interacciones || {}).map((clave) => {
        const config = datos.interacciones[clave] || {};
        const palabra = String(clave).trim();
        let animacion = config.animacion || "brillo";

        if (!(animacion in ANIMACIONES)) {
            console.warn(`[Cuentos] Animación desconocida "${animacion}" para "${palabra}" (${etiqueta}). Se usa "brillo".`);
            animacion = "brillo";
        }
        if (!crearPatron(palabra).test(textoCompleto)) {
            console.warn(`[Cuentos] La palabra "${palabra}" no aparece en el texto de la escena (${etiqueta}).`);
        }

        return {
            palabra,
            sonido: config.sonido || `${palabra}.mp3`,
            animacion,
            apariciones: normalizarApariciones(config.apariciones)
        };
    });

    let imagen = null;
    if (typeof datos.imagen === "string") imagen = { src: datos.imagen, alt: "" };
    else if (datos.imagen && datos.imagen.src) imagen = { src: datos.imagen.src, alt: datos.imagen.alt || "" };

    return {
        id: String(datos.id || `escena-${posicion + 1}`),
        titulo: String(datos.titulo || ""),
        ambiente: datos.ambiente || "",
        decoracion: datos.decoracion || "",
        imagen,
        parrafos,
        interacciones
    };
}

function normalizarCuento(datos) {
    const id = datos && typeof datos.id === "string" ? datos.id.trim() : "";
    if (!/^[\w-]+$/.test(id)) {
        console.warn("[Cuentos] Un cuento tiene un id inválido (usa letras, números, guiones):", datos);
        return null;
    }
    if (!Array.isArray(datos.escenas) || datos.escenas.length === 0) {
        console.warn(`[Cuentos] El cuento "${id}" no tiene escenas.`);
        return null;
    }

    const escenas = datos.escenas
        .map((escena, i) => normalizarEscena(escena, i, id))
        .filter(Boolean);
    if (escenas.length === 0) return null;

    const rutas = new Set();
    escenas.forEach((escena) => {
        escena.interacciones.forEach((inter) => rutas.add(rutaSonido(id, inter.sonido)));
    });

    return {
        id,
        titulo: String(datos.titulo || id),
        subtitulo: datos.subtitulo || CONFIG.subtituloPorDefecto,
        descripcion: datos.descripcion || "",
        icono: datos.icono || "",
        colores: datos.colores && Array.isArray(datos.colores.cubierta) ? datos.colores.cubierta : null,
        emblema: datos.emblema || null,
        textoFinal: datos.final || CONFIG.textoFinal,
        escenas,
        rutas: Array.from(rutas)
    };
}

async function cargarCuentos() {
    const carpeta = CONFIG.carpetaCuentos;

    if (!Array.isArray(window.INDICE_CUENTOS)) {
        diagnostico.push(`No se encontró ${carpeta}/indice.js. La carpeta "${carpeta}" debe estar junto a index.html.`);
        console.warn(`[Cuentos] ${diagnostico[diagnostico.length - 1]}`);
    }

    const indice = Array.isArray(window.INDICE_CUENTOS) ? window.INDICE_CUENTOS : [];
    const ids = indice.filter((id, i) => typeof id === "string" && indice.indexOf(id) === i);

    if (ids.length === 0 && diagnostico.length === 0) {
        diagnostico.push(`${carpeta}/indice.js no lista ningún cuento.`);
        console.warn(`[Cuentos] ${diagnostico[0]}`);
    }

    // Se cargan en paralelo; un archivo roto no impide que los demás funcionen.
    await Promise.all(ids.map((id) =>
        cargarScript(`${carpeta}/${id}.js`).catch((error) => {
            diagnostico.push(`No se pudo cargar ${carpeta}/${id}.js`);
            console.warn(`[Cuentos] ${error.message}`);
        })
    ));

    // El orden de la biblioteca es el del índice.
    ids.forEach((id) => {
        const datos = cuentosRegistrados.find((c) => c && c.id === id);
        if (!datos) {
            // Si el archivo no se cargó, el motivo ya está en el diagnóstico.
            if (!diagnostico.some((texto) => texto.indexOf(`${carpeta}/${id}.js`) !== -1)) {
                diagnostico.push(`${carpeta}/${id}.js no registró ningún cuento con id "${id}".`);
            }
            console.warn(`[Cuentos] ${carpeta}/${id}.js no registró ningún cuento con id "${id}".`);
            return;
        }
        const cuento = normalizarCuento(datos);
        if (cuento) biblioteca.push(cuento);
        else diagnostico.push(`El cuento "${id}" tiene datos inválidos (mira la consola).`);
    });
}

function buscarCuento(id) {
    return biblioteca.find((cuento) => cuento.id === id) || null;
}


/* ------------------------------------------------------------
   8. PALABRAS INTERACTIVAS
      El motor busca en el texto las palabras definidas en
      "interacciones" y las convierte en <span class="palabra">.
   ------------------------------------------------------------ */

function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Coincide con la palabra completa (sin importar mayúsculas ni acentos vecinos).
   Grupo 1: carácter previo (o inicio). Grupo 2: la palabra. */
function crearPatron(palabra) {
    const cuerpo = escaparRegex(palabra).replace(/\s+/g, "\\s+");
    return new RegExp(`(^|[^\\p{L}\\p{N}_])(${cuerpo})(?![\\p{L}\\p{N}_])`, "giu");
}

/* Divide un párrafo en fragmentos: texto normal y palabras interactivas.
   "contadores" recuerda cuántas veces ha aparecido cada palabra en la escena. */
function segmentarParrafo(texto, interacciones, contadores) {
    const candidatos = [];

    interacciones.forEach((inter) => {
        const patron = crearPatron(inter.palabra);
        let coincidencia;
        while ((coincidencia = patron.exec(texto)) !== null) {
            const inicio = coincidencia.index + coincidencia[1].length;
            contadores[inter.palabra] = (contadores[inter.palabra] || 0) + 1;

            const cuenta = contadores[inter.palabra];
            if (inter.apariciones === "todas" || inter.apariciones.indexOf(cuenta) !== -1) {
                candidatos.push({ inicio, fin: inicio + coincidencia[2].length, inter });
            }
        }
    });

    // Ordena por posición (y la más larga primero) y descarta solapamientos.
    candidatos.sort((a, b) => a.inicio - b.inicio || (b.fin - b.inicio) - (a.fin - a.inicio));

    const fragmentos = [];
    let cursor = 0;
    candidatos.forEach((c) => {
        if (c.inicio < cursor) return;
        if (c.inicio > cursor) fragmentos.push({ texto: texto.slice(cursor, c.inicio) });
        fragmentos.push({ texto: texto.slice(c.inicio, c.fin), inter: c.inter });
        cursor = c.fin;
    });
    if (cursor < texto.length) fragmentos.push({ texto: texto.slice(cursor) });

    return fragmentos;
}

function crearPalabra(fragmento) {
    const inter = fragmento.inter;
    const palabra = crear("span", `palabra ${claseDeAnimacion(inter.animacion)}`, fragmento.texto);
    palabra.dataset.sonido = inter.sonido;
    palabra.dataset.animacion = inter.animacion;
    palabra.setAttribute("role", "button");
    palabra.setAttribute("tabindex", "0");
    return palabra;
}

function activarPalabra(palabra) {
    if (!estado.cuento) return;
    playSound(estado.cuento.id, palabra.dataset.sonido);
    animarPalabra(palabra, palabra.dataset.animacion);
}


/* ------------------------------------------------------------
   9. VISTAS: BIBLIOTECA, PORTADA Y LECTOR DE ESCENAS
   ------------------------------------------------------------ */

function crearEmblema(cuento, clase) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", clase);
    svg.setAttribute("viewBox", "0 0 120 84");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.innerHTML = cuento.emblema || EMBLEMA_POR_DEFECTO;
    return svg;
}

/* ---------- Biblioteca ---------- */

function crearTarjeta(cuento) {
    const hueco = crear("div", "hueco");
    const tarjeta = crear("button", "tarjeta");
    tarjeta.type = "button";
    tarjeta.dataset.accion = "abrir-cuento";
    tarjeta.dataset.cuento = cuento.id;

    if (cuento.colores && cuento.colores.length >= 2) {
        tarjeta.style.setProperty("--cubierta-1", cuento.colores[0]);
        tarjeta.style.setProperty("--cubierta-2", cuento.colores[1]);
    }

    const titulo = crear("span", "tarjeta-titulo");
    if (cuento.icono) {
        const icono = crear("span", "", cuento.icono);
        icono.setAttribute("aria-hidden", "true");
        titulo.appendChild(icono);
        titulo.appendChild(document.createTextNode(" "));
    }
    titulo.appendChild(document.createTextNode(cuento.titulo));

    tarjeta.appendChild(crearEmblema(cuento, "tarjeta-ilustracion"));
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(crear("span", "tarjeta-subtitulo", cuento.subtitulo));
    if (cuento.descripcion) tarjeta.appendChild(crear("span", "tarjeta-descripcion", cuento.descripcion));
    tarjeta.appendChild(crear("span", "tarjeta-entrada", "Abrir cuento"));

    hueco.appendChild(tarjeta);
    return hueco;
}

function construirBiblioteca() {
    elementos.tarjetas.textContent = "";

    if (biblioteca.length === 0) {
        elementos.tarjetas.appendChild(crear("p", "biblioteca-estado", "Todavía no hay cuentos en la biblioteca."));
        if (diagnostico.length) {
            const detalle = crear("ul", "biblioteca-detalle");
            diagnostico.forEach((texto) => detalle.appendChild(crear("li", "", texto)));
            elementos.tarjetas.appendChild(detalle);
        }
        return;
    }
    biblioteca.forEach((cuento) => elementos.tarjetas.appendChild(crearTarjeta(cuento)));
}

/* ---------- Portada de un cuento ---------- */

function construirPortada(cuento) {
    const contenido = elementos.portadaContenido;
    contenido.textContent = "";

    const titulo = crear("h1", "titulo", cuento.titulo);
    titulo.id = "titulo-portada";

    const comenzar = crear("button", "comenzar", "COMENZAR");
    comenzar.type = "button";
    comenzar.dataset.accion = "comenzar-cuento";

    const adorno = crear("div", "adorno");
    adorno.setAttribute("aria-hidden", "true");
    adorno.appendChild(document.createElement("i"));

    contenido.appendChild(crearEmblema(cuento, "emblema"));
    contenido.appendChild(titulo);
    contenido.appendChild(crear("p", "subtitulo", cuento.subtitulo));
    contenido.appendChild(adorno);
    contenido.appendChild(crear("p", "invitacion", "Toca las palabras mágicas mientras lees."));
    contenido.appendChild(comenzar);
    contenido.appendChild(crear("p", "pista", "✨ Las palabras brillantes tienen sonido. Tócalas."));

    vistas.portada.setAttribute("aria-labelledby", "titulo-portada");
}

/* ---------- Lector de escenas ---------- */

function crearAdorno() {
    const adorno = crear("div", "adorno");
    adorno.setAttribute("aria-hidden", "true");
    adorno.appendChild(document.createElement("i"));
    return adorno;
}

function crearEscena(cuento, escena, posicion) {
    const seccion = crear("section", "escena");
    seccion.dataset.escena = escena.id;
    seccion.dataset.titulo = escena.titulo;
    if (escena.ambiente) seccion.dataset.ambiente = escena.ambiente;
    if (escena.decoracion) seccion.dataset.decoracion = escena.decoracion;

    // Título del cuento: solo en la primera página.
    if (posicion === 0) {
        const cabecera = crear("header", "cuento-cabecera");
        cabecera.appendChild(crear("h2", "cuento-titulo", cuento.titulo));
        cabecera.appendChild(crearAdorno());
        seccion.appendChild(cabecera);
    }

    if (escena.imagen) {
        const figura = crear("figure", "escena-imagen");
        const imagen = document.createElement("img");
        imagen.src = escena.imagen.src;
        imagen.alt = escena.imagen.alt;
        imagen.loading = "lazy";
        imagen.addEventListener("error", () => {
            console.warn(`[Cuentos] No se pudo cargar la imagen: ${escena.imagen.src}`);
            figura.remove();
        });
        figura.appendChild(imagen);
        seccion.appendChild(figura);
    }

    // Texto: el motor detecta las palabras interactivas.
    const historia = crear("div", "historia");
    const contadores = {};
    escena.parrafos.forEach((texto, i) => {
        const parrafo = crear("p");

        if (texto.charAt(0) === "—") {
            parrafo.className = "dialogo";
        } else if (/:$/.test(texto) && (escena.parrafos[i + 1] || "").charAt(0) === "—") {
            parrafo.className = "antes-dialogo";
        }

        segmentarParrafo(texto, escena.interacciones, contadores).forEach((fragmento) => {
            parrafo.appendChild(fragmento.inter ? crearPalabra(fragmento) : document.createTextNode(fragmento.texto));
        });
        historia.appendChild(parrafo);
    });
    seccion.appendChild(historia);

    // Cierre: solo en la última página.
    if (posicion === cuento.escenas.length - 1) {
        const pie = crear("footer", "cuento-final");
        const enlace = crear("button", "enlace-cuentos", "Elegir otro cuento");
        enlace.type = "button";
        enlace.dataset.accion = "ir-biblioteca";
        pie.appendChild(crearAdorno());
        pie.appendChild(crear("p", "fin", cuento.textoFinal));
        pie.appendChild(enlace);
        seccion.appendChild(pie);
    }

    return seccion;
}

function construirLector(cuento) {
    const lector = vistas.cuento;

    elementos.escenas.textContent = "";
    estado.escenas = cuento.escenas.map((escena, i) => {
        const seccion = crearEscena(cuento, escena, i);
        elementos.escenas.appendChild(seccion);
        return seccion;
    });

    elementos.puntos.textContent = "";
    estado.puntos = cuento.escenas.map(() => elementos.puntos.appendChild(document.createElement("i")));

    delete lector.dataset.ambiente;
    delete lector.dataset.decoracion;
    lector.setAttribute("aria-label", cuento.titulo);

    // Luces de fondo (se muestran solo con decoracion: "linternas")
    if (!elementos.cielo.hasChildNodes()) {
        LINTERNAS.forEach((luz) => {
            const nodo = document.createElement("i");
            nodo.style.cssText =
                `--x:${luz.x}%; --y:${luz.y}%; --dur:${luz.dur}s; --delay:${luz.delay}s; --tam:${luz.tam}`;
            elementos.cielo.appendChild(nodo);
        });
    }
}

function actualizarProgreso() {
    const total = estado.escenas.length;
    const escena = estado.cuento.escenas[estado.indice];

    estado.puntos.forEach((punto, i) => {
        punto.classList.toggle("actual", i === estado.indice);
        punto.classList.toggle("hecho", i < estado.indice);
    });

    elementos.progresoNumero.textContent = `${estado.indice + 1} de ${total}`;
    elementos.progresoTitulo.textContent = escena.titulo ? ` · ${escena.titulo}` : "";

    elementos.anterior.disabled = estado.indice === 0;
    elementos.siguiente.disabled = estado.indice === total - 1;
}

function irAEscena(indice, opciones) {
    if (!estado.cuento) return;
    const animar = !opciones || opciones.animar !== false;

    const destino = Math.max(0, Math.min(indice, estado.escenas.length - 1));
    estado.indice = destino;

    estado.escenas.forEach((seccion, i) => { seccion.hidden = i !== destino; });

    const seccion = estado.escenas[destino];
    seccion.classList.remove("entra");
    if (animar) {
        void seccion.offsetWidth;
        seccion.classList.add("entra");
    }

    // Aire de la página (ambiente) y decoración de fondo de la escena.
    const lector = vistas.cuento;
    ["ambiente", "decoracion"].forEach((clave) => {
        if (seccion.dataset[clave]) lector.dataset[clave] = seccion.dataset[clave];
        else delete lector.dataset[clave];
    });

    actualizarProgreso();
    detenerTodosLosSonidos();                // ningún sonido sigue al cambiar de escena
}

function cambiarEscena(paso) {
    const antes = estado.indice;
    irAEscena(antes + paso);
    if (estado.indice !== antes) window.scrollTo(0, 0);
}

/* ---------- Abrir un cuento ---------- */

function abrirPortada(id) {
    const cuento = buscarCuento(id);
    if (!cuento) {
        console.warn(`[Cuentos] El cuento "${id}" no existe.`);
        return;
    }
    estado.cuento = cuento;
    estado.indice = 0;

    construirPortada(cuento);
    vistas.portada.dataset.cuento = cuento.id;
    vistas.cuento.dataset.cuento = cuento.id;

    precargarSonidos(cuento.rutas);
    mostrarVista("portada");
}

function comenzarCuento() {
    if (!estado.cuento) return;

    construirLector(estado.cuento);
    irAEscena(0, { animar: false });
    mostrarVista("cuento");

    // Extra que nunca debe impedir que el cuento arranque.
    try { precargarSonidos(estado.cuento.rutas); } catch (error) { console.warn("[Cuentos] Aviso al comenzar:", error); }
}

function volverABiblioteca() {
    if (estado.cuento) {
        liberarSonidos(estado.cuento.rutas);
        estado.cuento = null;
    }
    mostrarVista("biblioteca");
}


/* ------------------------------------------------------------
   10. TRANSICIONES ENTRE VISTAS
       "desvanecer": aparición suave (por defecto)
       "pagina":     la página actual se levanta y se pasa, como en un libro
   ------------------------------------------------------------ */

function pasarPagina(origen, destino) {
    return new Promise((resolver) => {
        window.scrollTo(0, 0);

        const marco = elementos.app.getBoundingClientRect();
        const caja = origen.getBoundingClientRect();

        // El destino aparece debajo; el origen se fija encima con su tamaño exacto y gira.
        destino.hidden = false;
        destino.classList.remove("entra");
        destino.classList.add("pagina-entrante");

        origen.classList.remove("entra");
        origen.style.left = `${caja.left - marco.left}px`;
        origen.style.top = `${caja.top - marco.top}px`;
        origen.style.width = `${caja.width}px`;
        origen.style.height = `${caja.height}px`;
        origen.classList.add("pagina-saliente");

        let terminado = false;
        const terminar = () => {
            if (terminado) return;
            terminado = true;
            clearTimeout(reserva);
            origen.hidden = true;
            origen.classList.remove("pagina-saliente");
            origen.removeAttribute("style");
            destino.classList.remove("pagina-entrante");
            resolver();
        };

        origen.addEventListener("animationend", (evento) => {
            if (evento.target === origen && evento.animationName === "pagina-girar") terminar();
        });
        const reserva = setTimeout(terminar, CONFIG.duracionPaginaMs + 250);
    });
}

/* Muestra una vista (inicio | biblioteca | portada | cuento).
   opciones.transicion: "desvanecer" | "pagina"
   opciones.sonido:     archivo de sonidos/ que suena con la transición */
async function mostrarVista(nombre, opciones) {
    const destino = vistas[nombre];
    const origen = vistas[estado.vista];
    if (!destino) {
        console.warn(`[Cuentos] No existe la vista "${nombre}".`);
        return;
    }

    const transicion = (opciones && opciones.transicion) || "desvanecer";
    const sonido = opciones && opciones.sonido;

    detenerTodosLosSonidos();                // ningún sonido sigue al cambiar de pantalla
    estado.vista = nombre;
    elementos.botonVolver.hidden = !(nombre === "portada" || nombre === "cuento");

    if (sonido) playSound(null, sonido, { avisar: false });

    if (transicion === "pagina" && origen && origen !== destino && !menosMovimiento.matches) {
        estado.enTransicion = true;
        await pasarPagina(origen, destino);
        estado.enTransicion = false;
    } else {
        Object.keys(vistas).forEach((clave) => { vistas[clave].hidden = vistas[clave] !== destino; });
        destino.classList.remove("entra");
        void destino.offsetWidth;
        destino.classList.add("entra");
        window.scrollTo(0, 0);
    }

    try { destino.focus({ preventScroll: true }); } catch (error) { /* ignorar */ }
}


/* ------------------------------------------------------------
   11. EVENTOS
   ------------------------------------------------------------ */

async function manejarAccion(boton) {
    switch (boton.dataset.accion) {
        case "comenzar-app":                 // portada general -> biblioteca, pasando página
            await cuentosListos;
            mostrarVista("biblioteca", { transicion: "pagina", sonido: CONFIG.sonidoPagina });
            // Si algún cuento no pudo cargarse (pero hay otros), se avisa una vez.
            if (biblioteca.length > 0 && diagnostico.length > 0) mostrarAviso(diagnostico[0]);
            break;
        case "ir-biblioteca":
            volverABiblioteca();
            break;
        case "abrir-cuento":
            abrirPortada(boton.dataset.cuento);
            break;
        case "comenzar-cuento":
            comenzarCuento();
            break;
        case "anterior":
            cambiarEscena(-1);
            break;
        case "siguiente":
            cambiarEscena(1);
            break;
    }
}

function palabraDe(evento) {
    return evento.target instanceof Element ? evento.target.closest(".palabra") : null;
}

function prepararEventos() {
    elementos.botonSonido.addEventListener("click", alternarSonido);

    // Un solo "click" delegado sirve para ratón y toque en móviles:
    // botones, tarjetas y palabras interactivas de cualquier cuento.
    document.addEventListener("click", (evento) => {
        if (!(evento.target instanceof Element) || estado.enTransicion) return;

        const boton = evento.target.closest("[data-accion]");
        if (boton && !boton.disabled) {
            manejarAccion(boton);
            return;
        }

        const palabra = palabraDe(evento);
        if (palabra) activarPalabra(palabra);
    });

    document.addEventListener("keydown", (evento) => {
        // Accesibilidad: Enter o Espacio sobre una palabra enfocada.
        if (evento.key === "Enter" || evento.key === " ") {
            const palabra = palabraDe(evento);
            if (palabra && !estado.enTransicion) {
                evento.preventDefault();
                activarPalabra(palabra);
            }
            return;
        }

        // Flechas del teclado para pasar de escena.
        if ((evento.key === "ArrowRight" || evento.key === "ArrowLeft") && estado.vista === "cuento") {
            cambiarEscena(evento.key === "ArrowRight" ? 1 : -1);
        }
    });

    // Evita el menú contextual al mantener pulsada una palabra (Android).
    document.addEventListener("contextmenu", (evento) => {
        if (palabraDe(evento)) evento.preventDefault();
    });
}


/* ------------------------------------------------------------
   12. INICIO
   ------------------------------------------------------------ */
function iniciar() {
    // Primero los botones: aunque algo falle, la aplicación siempre responde.
    prepararEventos();
    actualizarBotonSonido();

    // El sonido de pasar página se prepara desde el principio (solo se carga, no suena).
    try { precargarSonidos([rutaSonido(null, CONFIG.sonidoPagina)]); } catch (error) {
        console.warn("[Cuentos] No se pudo preparar el audio:", error);
    }

    cuentosListos = cargarCuentos()
        .then(construirBiblioteca)
        .catch((error) => {
            console.warn("[Cuentos] Error al cargar los cuentos:", error);
            construirBiblioteca();
        });
}

iniciar();

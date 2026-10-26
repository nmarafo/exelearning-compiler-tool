import { SNIPPETS_DICT } from './snippets.js';

export const EXE_VERSION = '4.0.5';

/**
 * Genera un UUID v4 estándar.
 */
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Codificación compatible con escape() estándar de JavaScript (Latin-1 %XX y Unicode %uXXXX),
 * requerida por el motor de eXeLearning v4.0.5 (libs/common.js y rubric.js).
 */
export function jsEscape(str) {
    if (str === undefined || str === null) return '';
    const s = String(str);
    if (typeof escape === 'function') {
        return escape(s);
    }
    const safeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@*_+-./';
    let out = '';
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const code = s.charCodeAt(i);
        if (safeChars.indexOf(ch) !== -1) {
            out += ch;
        } else if (code < 256) {
            out += '%' + code.toString(16).toUpperCase().padStart(2, '0');
        } else {
            out += '%u' + code.toString(16).toUpperCase().padStart(4, '0');
        }
    }
    return out;
}

/**
 * Encriptación XOR oficial utilizada por eXeLearning v4.0.5 ($exe.encrypt en libs/common.js)
 * para los iDevices interactivos (Nodex/Quiddity).
 * Opera sobre unidades de código UTF-16 de 16 bits con clave 146 (0x92) seguida de escape().
 */
export function exeEncrypt(str) {
    if (!str || str === 'undefined' || str === 'null') str = '';
    try {
        const key = 146;
        let result = '';
        for (let pos = 0; pos < str.length; pos++) {
            const byte = str.charCodeAt(pos);
            const char = key ^ byte;
            result += String.fromCharCode(char);
        }
        return jsEscape(result);
    } catch (ex) {
        return '';
    }
}

/**
 * Garantiza que un texto esté envuelto en una etiqueta <p>...</p> sin duplicarla.
 */
function ensureParagraph(html) {
    if (!html) return '';
    const trimmed = String(html).trim();
    if (/^<(p|div|ul|ol|h[1-6]|table|blockquote)\b/i.test(trimmed)) {
        return trimmed;
    }
    return `<p>${trimmed}</p>`;
}

/**
 * Extrae el contenido interior si el texto ya viene envuelto en un único <p>...</p>,
 * evitando generar <p><p>...</p></p> al reemplazar en plantillas con <p>{{INSTRUCTIONS}}</p>.
 */
function stripOuterParagraph(html) {
    if (!html) return '';
    return String(html).trim().replace(/^<p[^>]*>([\s\S]*?)<\/p>$/i, '$1');
}

/**
 * Elimina etiquetas HTML dejando texto plano limpio (necesario en DataGame JSON plano como relate).
 */
function stripHtmlTags(html) {
    if (!html) return '';
    return String(html).replace(/<[^>]+>/g, '').trim();
}

/**
 * Escapa caracteres especiales XML para nodos de texto fuera de CDATA.
 */
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Genera la miniatura oficial del proyecto (screenshot.png) requerida por eXeLearning v4.0.5
 * para la vista previa de proyectos en el panel de inicio y catálogo.
 */
export async function generateProjectThumbnail(title, author, theme = 'educablue') {
    try {
        if (typeof document === 'undefined') return null;
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 450;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Paletas de color por tema (v4.0.5)
        let grad1 = '#1e3a8a';
        let grad2 = '#0284c7';
        let accent = '#38bdf8';
        let badgeBg = 'rgba(56, 189, 248, 0.15)';

        if (theme === 'base') {
            grad1 = '#115e59';
            grad2 = '#0f766e';
            accent = '#2dd4bf';
            badgeBg = 'rgba(45, 212, 191, 0.15)';
        } else if (theme === 'neo') {
            grad1 = '#0f172a';
            grad2 = '#1e293b';
            accent = '#00f2fe';
            badgeBg = 'rgba(0, 242, 254, 0.15)';
        } else if (theme === 'universal') {
            grad1 = '#18181b';
            grad2 = '#27272a';
            accent = '#facc15';
            badgeBg = 'rgba(250, 204, 21, 0.15)';
        } else if (theme === 'intef') {
            grad1 = '#701a75';
            grad2 = '#4c1d95';
            accent = '#e879f9';
            badgeBg = 'rgba(232, 121, 249, 0.15)';
        }

        // Fondo degradado
        const bgGrad = ctx.createLinearGradient(0, 0, 800, 450);
        bgGrad.addColorStop(0, grad1);
        bgGrad.addColorStop(1, grad2);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 800, 450);

        // Diseños decorativos de fondo
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.arc(720, 90, 220, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(100, 420, 180, 0, Math.PI * 2);
        ctx.fill();

        // Insignia eXeLearning v4.0.5
        ctx.fillStyle = badgeBg;
        ctx.fillRect(50, 50, 290, 36);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.strokeRect(50, 50, 290, 36);

        ctx.fillStyle = accent;
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(`eXeLearning v${EXE_VERSION} · REA / SA`, 65, 74);

        // Título del proyecto
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const displayTitle = (title || 'Situación de Aprendizaje REA').trim();

        // Envoltura de texto en líneas (Word wrap)
        const words = displayTitle.split(' ');
        let currentLine = '';
        let y = 160;
        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine ? currentLine + ' ' + words[i] : words[i];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > 680 && i > 0) {
                ctx.fillText(currentLine, 60, y);
                currentLine = words[i];
                y += 46;
                if (y > 270) {
                    currentLine += '...';
                    break;
                }
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            ctx.fillText(currentLine, 60, y);
        }

        // Línea divisoria de acento
        ctx.strokeStyle = accent;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(60, y + 25);
        ctx.lineTo(180, y + 25);
        ctx.stroke();

        // Metadatos de Autoría y Licencia
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        const displayAuthor = author || 'Norberto Martín Afonso';
        ctx.fillText(`Autoría: ${displayAuthor}`, 60, y + 68);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(`Estilo: ${theme.toUpperCase()} · Licencia: Creative Commons BY-SA 4.0`, 60, y + 98);

        return await new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), 'image/png');
        });
    } catch (err) {
        console.warn('No se pudo generar miniatura PNG:', err);
        return null;
    }
}

/**
 * DTD oficial ODE Content DTD v2.0
 */
export const OFFICIAL_ODE_DTD = `<!--
    ODE Content DTD
    Document Type Definition for eXeLearning ODE XML format (content.xml)
    Version: 2.0
    Namespace: http://www.intef.es/xsd/ode
    Copyright (C) 2025-2026 eXeLearning - License: AGPL-3.0
-->
<!ELEMENT ode (userPreferences?, odeResources?, odeProperties?, odeNavStructures)>
<!ATTLIST ode
    xmlns CDATA #FIXED "http://www.intef.es/xsd/ode"
    version CDATA #IMPLIED>

<!ELEMENT userPreferences (userPreference*)>
<!ELEMENT userPreference (key, value)>

<!ELEMENT odeResources (odeResource*)>
<!ELEMENT odeResource (key, value)>

<!ELEMENT odeProperties (odeProperty*)>
<!ELEMENT odeProperty (key, value)>

<!ELEMENT key (#PCDATA)>
<!ELEMENT value (#PCDATA)>

<!ELEMENT odeNavStructures (odeNavStructure*)>
<!ELEMENT odeNavStructure (odePageId, odeParentPageId, pageName, odeNavStructureOrder, odeNavStructureProperties?, odePagStructures?)>

<!ELEMENT odePageId (#PCDATA)>
<!ELEMENT odeParentPageId (#PCDATA)>
<!ELEMENT pageName (#PCDATA)>
<!ELEMENT odeNavStructureOrder (#PCDATA)>

<!ELEMENT odeNavStructureProperties (odeNavStructureProperty*)>
<!ELEMENT odeNavStructureProperty (key, value)>

<!ELEMENT odePagStructures (odePagStructure*)>
<!ELEMENT odePagStructure (odePageId, odeBlockId, blockName, iconName?, odePagStructureOrder, odePagStructureProperties?, odeComponents?)>

<!ELEMENT odeBlockId (#PCDATA)>
<!ELEMENT blockName (#PCDATA)>
<!ELEMENT iconName (#PCDATA)>
<!ELEMENT odePagStructureOrder (#PCDATA)>

<!ELEMENT odePagStructureProperties (odePagStructureProperty*)>
<!ELEMENT odePagStructureProperty (key, value)>

<!ELEMENT odeComponents (odeComponent*)>
<!ELEMENT odeComponent (odePageId, odeBlockId, odeIdeviceId, odeIdeviceTypeName, htmlView?, jsonProperties?, odeComponentsOrder, odeComponentsProperties?)>

<!ELEMENT odeIdeviceId (#PCDATA)>
<!ELEMENT odeIdeviceTypeName (#PCDATA)>
<!ELEMENT htmlView (#PCDATA)>
<!ELEMENT jsonProperties (#PCDATA)>
<!ELEMENT odeComponentsOrder (#PCDATA)>

<!ELEMENT odeComponentsProperties (odeComponentsProperty*)>
<!ELEMENT odeComponentsProperty (key, value)>
`;

/**
 * Mensajes comunes estandarizados en norma culta canaria («ustedes») para juegos Nodex (v4.0.5)
 */
export const COMMON_GAME_MSGS = {
    msgHappen: "Pasar", msgReply: "Responder", msgSubmit: "Enviar",
    msgEnterCode: "Introduzcan el código de acceso", msgErrorCode: "El código de acceso no es correcto",
    msgGameOver: "¡Fin de la partida!", msgIndicateWord: "Proporcionen una palabra o expresión",
    msgClue: "¡Genial! La pista es:", msgYouHas: "Tienen %1 aciertos y %2 fallos",
    msgCodeAccess: "Código de acceso", msgPlayAgain: "Jugar otra vez",
    msgRequiredAccessKey: "Es necesario el código de acceso",
    msgInformationLooking: "¡Genial! La información que estaban buscando",
    msgPlayStart: "Pulsen aquí para jugar", msgErrors: "Errores", msgMoveOne: "Pasar",
    msgHits: "Aciertos", msgScore: "Puntuación", msgWeight: "Peso", msgMinimize: "Minimizar",
    msgMaximize: "Maximizar", msgTime: "Límite de tiempo (mm:ss)", msgLive: "Vida",
    msgFullScreen: "Pantalla Completa", msgExitFullScreen: "Salir del modo pantalla completa",
    msgNumQuestions: "Número de preguntas", msgNoImage: "Pregunta sin imágenes", msgCool: "¡Bien!",
    msgLoseT: "Han perdido 330 puntos", msgLoseLive: "Han perdido una vida",
    msgLostLives: "¡Han perdido todas sus vidas!", mgsAllQuestions: "¡Completadas las preguntas!",
    msgSuccesses: "¡Correcto! | ¡Excelente! | ¡Genial! | ¡Muy bien! | ¡Perfecto!",
    msgFailures: "¡No era eso! | ¡Incorrecto! | ¡No es correcto! | ¡Lo sentimos! | ¡Error!",
    msgTryAgain: "Necesitan al menos %s% de respuestas correctas para obtener la información. Inténtenlo de nuevo.",
    msgWrote: "Escriban la palabra correcta y pulsen en Responder. Si dudan, pulsen en Seguir.",
    msgNotNetwork: "A este juego solo se puede jugar con conexión a internet.",
    msgEndGameScore: "Comiencen la partida antes de guardar la puntuación.",
    msgScoreScorm: "La puntuación no se puede guardar porque esta página no forma parte de un paquete SCORM.",
    msgQuestion: "Pregunta", msgAnswer: "Responder", msgOnlySaveScore: "¡Solo pueden guardar la puntuación una vez!",
    msgOnlySave: "Solo pueden guardar una vez", msgInformation: "Información", msgYouScore: "Su puntuación",
    msgAuthor: "Autoría", msgOnlySaveAuto: "Su puntuación se guardará después de cada pregunta. Solo pueden jugar una vez.",
    msgSaveAuto: "Su puntuación se guardará automáticamente después de cada pregunta.",
    msgSeveralScore: "Pueden guardar la puntuación tantas veces como quieran",
    msgYouLastScore: "La última puntuación guardada es", msgActityComply: "Ya han realizado esta actividad.",
    msgPlaySeveralTimes: "Pueden realizar esta actividad cuantas veces quieran", msgClose: "Cerrar",
    msgLoading: "Cargando. Esperen, por favor...", msgPoints: "puntos", msgAudio: "Audio",
    msgCorrect: "Correcto", msgIncorrect: "Incorrecto", msgUncompletedActivity: "Actividad no completada",
    msgSuccessfulActivity: "Actividad superada. Puntuación: %s",
    msgUnsuccessfulActivity: "Actividad no superada. Puntuación: %s",
    msgSaveScore: "Guardar la puntuación", msgLookAnswer: "Miren la respuesta",
    msgTypeGame: "Juego", msgShowWords: "Mostrar las soluciones", msgAll: "Todas", msgUnanswered: "Sin contestar",
    msgShowRoulette: "Mostrar el rosco de palabras", msgHideRoulette: "Ocultar el rosco de palabras",
    msgStartWith: "Empieza por %1", msgContaint: "Contiene la letra %1",
    msgReady: "¿Preparados/as?", msgStartGame: "Pulsen aquí para comenzar", msgPass: "Pasar a la siguiente palabra",
    msgNewWord: "Palabra nueva", msgNewGame: "Pulsen aquí para comenzar otra partida",
    msgOneRound: "Una vuelta", msgTowRounds: "Dos vueltas", msgWhiteBoard: "Pizarra digital",
    msgImage: "Imagen",
    msgCheck: "Comprobar", msgShowSolution: "Mostrar las soluciones", msgReboot: "Jugar otra vez",
    msgSelectWord: "Hagan clic en la casilla de cada palabra para ver la definición",
    msgHorizontals: "Horizontales", msgVerticals: "Verticales",
    msgShowDefinitions: "Mostrar/ocultar definiciones", msgShowBack: "Mostrar/ocultar imagen de fondo",
    msgSolutionWord: "Palabra",
    msgRestart: "Reiniciar", msgEndGameM: "Han completado el juego. Su puntuación es %s.",
    msgTimeOver: "El tiempo ha finalizado. Inténtenlo de nuevo",
    msgAllAttemps: "¡Han agotado todos los intentos! Prueben de nuevo",
    mgsAllPhrases: "¡Han ordenado todas las tarjetas!", msgAttempts: "Intentos",
    msgNumbersAttemps: "Número de actividades pendientes", msgActivities: "Actividades",
    msgNextPhrase: "Próxima actividad", msgContinue: "Continuar",
    msgPositions: "Posiciones correctas", msgAllOK: "¡Genial! Todo correcto",
    msgAgain: "Inténtenlo de nuevo", msgPhrases: "Frases",
    msgWordsFind: "Palabras que faltan por encontrar",
    msgShowResolve: "Mostrar soluciones", msgLettersFound: "Letras encontradas"
};

/**
 * Normaliza una estructura plana o anidada de páginas a una lista con jerarquía odeParentPageId.
 */
function normalizePagesHierarchy(rawPages) {
    const flatPages = [];
    const nameToId = new Map();

    function processPage(page, parentId = '', level = 1) {
        const pageId = uuidv4();
        const pageName = page.page_name || page.title || `Página ${flatPages.length + 1}`;
        nameToId.set(pageName.toLowerCase().trim(), pageId);

        let assignedParentId = parentId;
        if (page.parent && typeof page.parent === 'string') {
            const pKey = page.parent.toLowerCase().trim();
            if (nameToId.has(pKey)) {
                assignedParentId = nameToId.get(pKey);
            }
        }

        const normalizedPage = {
            pageId,
            parentId: assignedParentId,
            page_name: pageName,
            idevices: page.idevices || [],
            level
        };
        flatPages.push(normalizedPage);

        // Procesar subpáginas anidadas si existen
        const subpages = page.subpages || page.children || [];
        if (Array.isArray(subpages)) {
            for (const sub of subpages) {
                processPage(sub, pageId, level + 1);
            }
        }
    }

    for (const p of rawPages) {
        processPage(p, '', 1);
    }

    return flatPages;
}

/**
 * Genera la tabla de resumen visual de DigCompEdu destacando los indicadores seleccionados.
 */
function buildDigcompeduTable(selectedIndicators = []) {
    const selectedSet = new Set(selectedIndicators.map(i => String(i).trim()));
    const areas = [
        { name: "1. Compromiso profesional", classPrefix: "a1", count: 5 },
        { name: "2. Contenidos digitales", classPrefix: "a2", count: 3 },
        { name: "3. Enseñanza y aprendizaje", classPrefix: "a3", count: 4 },
        { name: "4. Evaluación y retroalimentación", classPrefix: "a4", count: 3 },
        { name: "5. Empoderamiento del alumnado", classPrefix: "a5", count: 3 },
        { name: "6. Desarrollo de la competencia digital del alumnado", classPrefix: "a6", count: 5 }
    ];

    let headerRow1 = '<tr>';
    let headerRow2 = '<tr>';
    let bodyRow = '<tr>';

    areas.forEach((area, aIdx) => {
        headerRow1 += `<th scope="col" colspan="${area.count}" class="area${aIdx + 1}">${area.name}</th>`;
        for (let c = 1; c <= area.count; c++) {
            const indId = `${aIdx + 1}.${c}`;
            headerRow2 += `<th class="area${aIdx + 1}">${indId}</th>`;
            const isActive = selectedSet.has(indId);
            const activeStyle = isActive ? 'style="background-color:#0284c7;color:#fff;font-weight:bold;text-align:center;"' : '';
            const checkMark = isActive ? '✓' : '';
            bodyRow += `<td class="${area.classPrefix}c${c} cell-level" ${activeStyle}>${checkMark}</td>`;
        }
    });

    headerRow1 += '</tr>';
    headerRow2 += '</tr>';
    bodyRow += '</tr>';

    return `<table class="digcompedu-summary-table"><thead>${headerRow1}${headerRow2}</thead><tbody>${bodyRow}</tbody></table>`;
}

/**
 * Compila una estructura de proyecto JSON a un paquete nativo de eXeLearning (.elpx)
 * totalmente compatible con eXeLearning v4.0.5.
 *
 * @param {Array|Object} projectInput - Array de páginas o configuración de proyecto completa.
 * @param {Object} [customOptions] - Opciones personalizadas de metadatos (título, autor, tema, etc.).
 * @returns {Promise<Blob>} Archivo .elpx (ZIP) listo para descargar.
 */
export async function compileExeProject(projectInput, customOptions = {}) {
    const snippetsDict = SNIPPETS_DICT;
    const JSZipClass = (typeof window !== 'undefined' && window.JSZip) ? window.JSZip : (typeof JSZip !== 'undefined' ? JSZip : globalThis.JSZip);
    if (!JSZipClass) throw new Error("La librería JSZip no está disponible.");
    const jszip = new JSZipClass();

    // 1. Extraer páginas y metadatos
    let rawPages = [];
    let meta = { ...customOptions };

    if (Array.isArray(projectInput)) {
        rawPages = projectInput;
    } else if (projectInput && typeof projectInput === 'object') {
        rawPages = projectInput.pages || projectInput.sections || [];
        if (projectInput.metadata) {
            meta = { ...projectInput.metadata, ...meta };
        }
        if (projectInput.title && !meta.title) meta.title = projectInput.title;
        if (projectInput.subtitle && !meta.subtitle) meta.subtitle = projectInput.subtitle;
        if (projectInput.description && !meta.description) meta.description = projectInput.description;
        if (projectInput.author && !meta.author) meta.author = projectInput.author;
        if (projectInput.theme && !meta.theme) meta.theme = projectInput.theme;
        if (projectInput.lang && !meta.lang) meta.lang = projectInput.lang;
    }

    if (!Array.isArray(rawPages) || rawPages.length === 0) {
        throw new Error("No se encontraron páginas para compilar en la estructura JSON.");
    }

    // Identificadores y propiedades del proyecto
    const PROJECT_ID = uuidv4().replace(/-/g, '').substring(0, 20).toUpperCase();
    const PROJECT_VERSION_ID = uuidv4().replace(/-/g, '').substring(0, 20).toUpperCase();
    const MODIFIED_TIMESTAMP = Date.now();

    const projectTitle = meta.title || (rawPages[0] && rawPages[0].page_name) || "Situación de Aprendizaje REA";
    const projectSubtitle = meta.subtitle || "";
    const projectDescription = meta.description || `Situación de Aprendizaje y Recurso Educativo Abierto (REA): ${projectTitle}.`;
    const projectAuthor = meta.author || "Norberto Martín Afonso";
    const projectLang = meta.lang || "es";
    const projectTheme = (meta.theme || "educablue").toLowerCase();
    const projectLicense = meta.license || "creative commons: attribution - share alike 4.0";
    const projectLicenseUrl = meta.licenseUrl || "https://creativecommons.org/licenses/by-sa/4.0/";
    const addPagination = meta.addPagination !== false;

    // 2. Normalización de la jerarquía de páginas (Árbol didáctico eXeLearning)
    const pagesList = normalizePagesHierarchy(rawPages);

    // 3. Construcción del XML compatible con ODE Content DTD v2.0
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ode SYSTEM "content.dtd">
<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">
<userPreferences>
  <userPreference><key>theme</key><value>${escapeXml(projectTheme)}</value></userPreference>
</userPreferences>
<odeResources>
  <odeResource><key>odeId</key><value>${PROJECT_ID}</value></odeResource>
  <odeResource><key>odeVersionId</key><value>${PROJECT_VERSION_ID}</value></odeResource>
  <odeResource><key>exe_version</key><value>${EXE_VERSION}</value></odeResource>
</odeResources>
<odeProperties>
  <odeProperty><key>pp_title</key><value>${escapeXml(projectTitle)}</value></odeProperty>
  <odeProperty><key>pp_subtitle</key><value>${escapeXml(projectSubtitle)}</value></odeProperty>
  <odeProperty><key>pp_description</key><value>${escapeXml(projectDescription)}</value></odeProperty>
  <odeProperty><key>pp_author</key><value>${escapeXml(projectAuthor)}</value></odeProperty>
  <odeProperty><key>pp_lang</key><value>${escapeXml(projectLang)}</value></odeProperty>
  <odeProperty><key>pp_license</key><value>${escapeXml(projectLicense)}</value></odeProperty>
  <odeProperty><key>pp_licenseUrl</key><value>${escapeXml(projectLicenseUrl)}</value></odeProperty>
  <odeProperty><key>pp_theme</key><value>${escapeXml(projectTheme)}</value></odeProperty>
  <odeProperty><key>pp_exelearning_version</key><value>${EXE_VERSION}</value></odeProperty>
  <odeProperty><key>pp_modified</key><value>${MODIFIED_TIMESTAMP}</value></odeProperty>
  <odeProperty><key>pp_addExeLink</key><value>true</value></odeProperty>
  <odeProperty><key>pp_addPagination</key><value>${addPagination ? 'true' : 'false'}</value></odeProperty>
  <odeProperty><key>pp_addSearchBox</key><value>true</value></odeProperty>
  <odeProperty><key>pp_addAccessibilityToolbar</key><value>true</value></odeProperty>
  <odeProperty><key>pp_addMathJax</key><value>false</value></odeProperty>
  <odeProperty><key>exportSource</key><value>true</value></odeProperty>
  <odeProperty><key>pp_globalFont</key><value>default</value></odeProperty>
</odeProperties>
<odeNavStructures>`;

    let pageOrder = 0;
    for (const page of pagesList) {
        const pageId = page.pageId;
        const parentId = page.parentId || '';

        xml += `
<odeNavStructure>
  <odePageId>${pageId}</odePageId>
  <odeParentPageId>${parentId}</odeParentPageId>
  <pageName>${escapeXml(page.page_name)}</pageName>
  <odeNavStructureOrder>${pageOrder++}</odeNavStructureOrder>
  <odeNavStructureProperties>
    <odeNavStructureProperty><key>titlePage</key><value>${escapeXml(page.page_name)}</value></odeNavStructureProperty>
  </odeNavStructureProperties>
  <odePagStructures>`;

        let componentOrder = 0;
        for (const idev of (page.idevices || [])) {
            const idevType = (idev.type || idev.idevice || 'text').toLowerCase();
            if (!snippetsDict[idevType]) {
                console.warn(`iDevice de tipo '${idevType}' no reconocido. Se usará 'text' por defecto.`);
            }

            const snippetKey = snippetsDict[idevType] ? idevType : 'text';
            let snippet = snippetsDict[snippetKey];

            const blockId = 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const ideviceId = 'idevice-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const evalId = uuidv4();

            snippet = snippet.replace(/UUID-PAGINA/g, pageId);
            snippet = snippet.replace(/UUID-BLOQUE/g, blockId);
            snippet = snippet.replace(/UUID-IDEVICE/g, ideviceId);
            snippet = snippet.replace(/UUID-EVALUACION/g, evalId);

            // Icono y nombre de bloque según tipo
            let iconName = idev.iconName || 'activity';
            let blockName = idev.title || 'Contenido';
            if (!idev.iconName) {
                if (['form', 'guess', 'select-media-files', 'checklist', 'trueorfalse', 'crossword', 'sort', 'relate', 'rosco', 'word-search', 'quick-questions', 'quick-questions-multiple-choice', 'complete'].includes(idevType)) {
                    iconName = 'interactive';
                    blockName = idev.title || 'Actividad Interactiva';
                } else if (idevType === 'udl-content') {
                    iconName = 'info';
                    blockName = idev.title || 'Contenido Accesible DUA';
                } else if (idevType === 'rubric' || idevType === 'lomloe') {
                    iconName = 'competencies';
                    blockName = idev.title || (idevType === 'lomloe' ? 'Currículo LOMLOE Canarias' : 'Rúbrica de Evaluación');
                } else if (idevType === 'casestudy') {
                    iconName = 'case';
                    blockName = idev.title || 'Caso Práctico';
                } else if (idevType === 'interactive-video') {
                    iconName = 'video';
                    blockName = idev.title || 'Vídeo Interactivo';
                } else if (idevType === 'digcompedu') {
                    iconName = 'technology';
                    blockName = idev.title || 'Competencia Digital (DigCompEdu)';
                } else if (idevType === 'download-source-file') {
                    iconName = 'download';
                    blockName = idev.title || 'Descargar archivo fuente (.elpx)';
                }
            }

            // Normalización y mapeo de datos
            let props = { ...idev };
            if (idev.content && typeof idev.content === 'object') Object.assign(props, idev.content);
            let feedbackHtmlView = '';

            // --- Adaptaciones específicas por tipo de iDevice (ANTES de serializar jsonProperties) ---
            if (idevType === 'text') {
                if (props.summary) {
                    const summaryHtml = `<div class="exe-summary" style="background:#f0f9ff; padding:1.2rem; border-radius:0.75rem; margin-bottom:1.2rem; border-left:5px solid #0284c7; box-shadow:0 2px 4px rgba(0,0,0,0.05);"><strong style="color:#0369a1; display:block; margin-bottom:0.4rem; font-size:1.05rem;">💡 Resumen / Ideas Clave:</strong> ${props.summary}</div>`;
                    props.main_text = summaryHtml + (props.main_text || "");
                }
                if (props.duration) props.textInfoDurationInput = props.duration;
                if (props.participants) props.textInfoParticipantsInput = props.participants;
                if (props.feedback) props.textFeedbackTextarea = props.feedback;
            }

            if (idevType === 'lomloe') {
                props.lomloeDataset = props.lomloeDataset || props.dataset || "ES-CN";
                props.lomloeDisplayMode = props.lomloeDisplayMode || props.display_mode || "compact";
                props.lomloeSelections = props.lomloeSelections || props.selections || {};
                props.lomloeSummaryHtml = props.lomloeSummaryHtml || props.content || props.main_text || "";
            }

            if (idevType === 'digcompedu') {
                const indicators = props.indicators || props.competencies || props.digcompeduSelected || ["1.1", "2.1", "3.1"];
                const summaryText = props.content || props.main_text || props.digcompeduSummaryTextHtml || "";
                const tableHtml = buildDigcompeduTable(indicators);
                props.digcompeduSelected = indicators;
                props.digcompeduDisplayMode = props.display_mode || (summaryText ? "table+summary" : "table");
                props.digcompeduDataLang = "es";
                props.digcompeduGranularity = "indicator";
                props.digcompeduCount = indicators.length;
                props.digcompeduTableHtml = tableHtml;
                props.digcompeduSummaryTableHtml = tableHtml;
                props.digcompeduSummaryTextHtml = summaryText;
            }

            if (idevType === 'casestudy') {
                props.textTextarea = props.story || props.main_text || "";
                if (props.duration) props.textInfoDurationInput = props.duration;
                if (props.participants) props.textInfoParticipantsInput = props.participants;
                props.activities = [{
                    activity: props.activity || "Actividad del caso práctico",
                    feedback: props.feedback || "Retroalimentación orientativa",
                    buttonCaption: props.button_show || "Mostrar retroalimentación"
                }];
            }

            if (idevType === 'rubric') {
                const rawInstructions = stripOuterParagraph(idev.instructions || "Completen la siguiente rúbrica analítica de evaluación:");
                const instructionsHtml = `<p>${rawInstructions}</p>`;
                props.instructions = instructionsHtml;
                props.instructionsData = jsEscape(instructionsHtml);
                props.rubricTitle = idev.title || "Rúbrica de Evaluación";

                props.typeGame = "Rubric";
                props.version = 2;
                props.id = ideviceId;
                const scores = idev.scores || ["4 Excelente", "3 Satisfactorio", "2 Mejorable", "1 Insuficiente"];
                let categories = [];
                let descriptions = [];

                if (idev.rows && Array.isArray(idev.rows)) {
                    categories = idev.rows.map(r => r.category || r.criterion || "Criterio");
                    descriptions = idev.rows.map(r => [
                        { weight: "4", text: r.level4 || r.excelente || "" },
                        { weight: "3", text: r.level3 || r.satisfactorio || "" },
                        { weight: "2", text: r.level2 || r.mejorable || "" },
                        { weight: "1", text: r.level1 || r.insuficiente || "" }
                    ]);
                } else if (idev.criteria && Array.isArray(idev.criteria)) {
                    categories = idev.criteria.map(c => c.name || c.category || "Criterio");
                    descriptions = idev.criteria.map(c => {
                        return (c.levels || []).map((l, lIdx) => ({
                            weight: (l.score || (4 - lIdx)).toString(),
                            text: l.description || l.text || ""
                        }));
                    });
                } else if (idev.table && Array.isArray(idev.table.categories)) {
                    categories = idev.table.categories;
                    descriptions = idev.table.descriptions || [];
                } else {
                    categories = ["Concreción y Claridad", "Aplicación Práctica"];
                    descriptions = [
                        [{ weight: "4", text: "Excelente" }, { weight: "3", text: "Satisfactorio" }, { weight: "2", text: "Mejorable" }, { weight: "1", text: "Insuficiente" }],
                        [{ weight: "4", text: "Excelente" }, { weight: "3", text: "Satisfactorio" }, { weight: "2", text: "Mejorable" }, { weight: "1", text: "Insuficiente" }]
                    ];
                }

                props.table = {
                    title: props.rubricTitle,
                    categories: categories,
                    scores: scores,
                    descriptions: descriptions
                };
                props.title = props.table.title;
                props.categories = categories;
                props.scores = scores;
                props.descriptions = descriptions;
                props["visible-info"] = false;
                props.author = projectAuthor;
                props["author-url"] = "";
                props.license = "CC-BY-SA";
                props.weighted = 100;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
            }

            if (idevType === 'checklist') {
                const rawTasks = idev.tasks || idev.items || [];
                const levels = (Array.isArray(idev.levels) && idev.levels.length > 0 && idev.levels[0].item !== "PA")
                    ? idev.levels
                    : rawTasks.map(t => ({
                        type: "0",
                        nivel: "0",
                        item: typeof t === 'string' ? t : (t.item || t.task || t.text || ""),
                        points: typeof t === 'object' && t.points ? String(t.points) : ""
                    }));
                props.typeGame = "Cotejo";
                props.id = ideviceId;
                props.title = idev.title || "Lista de cotejo";
                props.subtitle = idev.subtitle || "";
                props.instructions = ensureParagraph(idev.instructions || "Marquen las evidencias o tareas completadas en la siguiente lista de cotejo:");
                props.footer = idev.footer || 'Esta <a href="https://es.wikipedia.org/wiki/Lista_de_comprobaci%C3%B3n">lista de cotejo</a> se encuentra bajo una licencia <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons BY-SA 4.0</a>';
                props.useScore = Boolean(idev.useScore);
                props.hasDecorative = idev.hasDecorative !== undefined ? Boolean(idev.hasDecorative) : true;
                props.userData = Boolean(idev.userData);
                props.saveData = idev.saveData !== undefined ? Boolean(idev.saveData) : true;
                props.isScorm = 0;
                props.weighted = 100;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.levels = levels;
                props.msgs = {
                    msgComplit: "Completadas", msgDone: "Hecho", msgInProgress: "En proceso",
                    msgUnrealized: "Sin completar", msgtaskNumber: "Número de tareas",
                    msgName: "Nombre", msgDate: "Fecha", msgSave: "Descargar",
                    msgList: "lista_de_cotejo", msgScore: "Puntuación", msgWeight: "Peso",
                    msgPoints: "puntos", msgPoint: "punto", msgReboot: "Reiniciar",
                    msgDelete: "¿Seguro que desean borrar todos los campos del formulario?",
                    msgSaveScorm: "Guardar la puntuación",
                    msgEndGameScore: "Completen la lista antes de guardar su puntuación.",
                    msgScoreScorm: "La puntuación no se puede guardar porque esta página no forma parte de un paquete SCORM.",
                    msgOnlySaveScore: "¡Solo pueden guardar la puntuación una vez!",
                    msgOnlySave: "Solo pueden guardar una vez",
                    msgOnlySaveAuto: "Su puntuación se guardará después de cada cambio.",
                    msgPlaySeveralTimes: "Pueden realizar esta actividad cuantas veces quieran",
                    msgYouLastScore: "La última puntuación guardada es",
                    msgSeveralScore: "Pueden guardar la puntuación tantas veces como quieran",
                    msgActityComply: "Ya han realizado esta actividad."
                };
            }

            if (idevType === 'select-media-files') {
                const options = idev.options || idev.cards || idev.items || [];
                feedbackHtmlView = idev.feedback ? ensureParagraph(idev.feedback) : "";
                props.typeGame = "SeleccionaMedias";
                props.version = 1.5;
                props.id = ideviceId;
                props.author = projectAuthor;
                props.instructions = ensureParagraph(idev.instructions || "Seleccionen las tarjetas correctas y pulsen en el botón de comprobación.");
                props.showMinimize = false;
                props.showSolution = true;
                props.timeShowSolution = 4;
                props.numberMaxCards = "30";
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.phrasesGame = (Array.isArray(idev.phrasesGame) && idev.phrasesGame.length > 0) ? idev.phrasesGame : [{
                    cards: options.map((opt, idx) => {
                        const isImage = Boolean(opt.url || opt.image);
                        return {
                            id: Date.now() + idx,
                            type: isImage ? 2 : 1,
                            author: opt.author || "",
                            alt: isImage ? (opt.alt || opt.description || opt.text || "") : "",
                            url: opt.url || opt.image || "",
                            audio: opt.audio || "",
                            eText: !isImage ? (opt.text || opt.eText || opt.description || String(opt)) : (opt.eText || ""),
                            color: opt.color || "#000000",
                            backcolor: opt.backcolor || "#ffffff",
                            state: Boolean(opt.is_correct !== undefined ? opt.is_correct : opt.state)
                        };
                    }),
                    msgError: idev.msgError || "Inténtenlo de nuevo",
                    msgHit: idev.msgHit || "¡Correcto!",
                    definition: idev.definition || idev.title || "Seleccionen las opciones correctas",
                    audioDefinition: "",
                    audioHit: "",
                    audioError: "",
                    url: "",
                    alt: "",
                    author: ""
                }];
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.textFeedBack = feedbackHtmlView ? jsEscape(feedbackHtmlView) : "";
                props.textAfter = "";
                props.feedBack = Boolean(feedbackHtmlView);
                props.percentajeFB = 100;
                props.customMessages = false;
                props.percentajeQuestions = 100;
                props.time = idev.time || 0;
                props.attempsNumber = idev.attempts || idev.attempsNumber || 2;
                props.modeTable = Boolean(idev.modeTable);
                props.evaluation = false;
                props.evaluationID = evalId;
                props.msgs = {
                    ...COMMON_GAME_MSGS,
                    msgChangeMode: "Cambiar modo de visualización",
                    msgTypeGame: "Selecciona (multimedia)",
                    msgTimeOver: "El tiempo ha finalizado",
                    mgsAllPhrases: "¡Han completado todas las actividades!",
                    msgNumbersAttemps: "Número de actividades pendientes",
                    msgActivities: "Actividades",
                    msgCheck: "Comprobar",
                    msgContinue: "Continuar",
                    msgAllOK: "¡Genial! Todo correcto",
                    msgAgain: "Inténtenlo de nuevo"
                };
            }

            if (idevType === 'sort') {
                const items = idev.items || idev.cards || [];
                feedbackHtmlView = idev.feedback ? ensureParagraph(idev.feedback) : "";
                const isPhraseMode = (idev.mode === 'phrases' || idev.gameType === 0);
                let phrasesGame = [];
                if (Array.isArray(idev.phrasesGame) && idev.phrasesGame.length > 0) {
                    phrasesGame = idev.phrasesGame;
                } else if (isPhraseMode) {
                    phrasesGame = items.map((it, idx) => ({
                        cards: [{ id: Date.now() + idx, type: 2, x: 0, y: 0, author: "", alt: "", url: "", audio: "", eText: "", color: "#000000", backcolor: "#ffffff" }],
                        msgError: "Inténtenlo de nuevo", msgHit: "¡Correcto!", definition: it.definition || "", phrase: it.text || it.phrase || String(it), audioDefinition: "", audioHit: "", audioError: ""
                    }));
                } else {
                    phrasesGame = [{
                        cards: items.map((it, idx) => ({
                            id: Date.now() + idx,
                            type: (typeof it === 'object' && it.url) ? 2 : 1,
                            x: 0, y: 0, author: "", alt: (typeof it === 'object' && it.alt) || "",
                            url: (typeof it === 'object' && it.url) || "",
                            audio: (typeof it === 'object' && it.audio) || "",
                            eText: typeof it === 'string' ? it : (it.eText || it.text || ""),
                            color: (typeof it === 'object' && it.color) || "#000000",
                            backcolor: (typeof it === 'object' && it.backcolor) || "#ffffff"
                        })),
                        msgError: idev.msgError || "Inténtenlo de nuevo",
                        msgHit: idev.msgHit || "¡Secuencia correcta!",
                        definition: idev.definition || idev.title || "Ordenen la secuencia en el orden correcto",
                        phrase: "",
                        audioDefinition: "",
                        audioHit: "",
                        audioError: ""
                    }];
                }
                props.typeGame = "Ordena";
                props.id = ideviceId;
                props.author = projectAuthor;
                props.instructions = ensureParagraph(idev.instructions || "Hagan clic sobre las tarjetas en el orden correcto para ordenar la secuencia.");
                props.showMinimize = false;
                props.showSolution = true;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.phrasesGame = phrasesGame;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.attempsNumber = idev.attempts || idev.attempsNumber || 2;
                props.textFeedBack = feedbackHtmlView ? jsEscape(feedbackHtmlView) : "";
                props.textAfter = "";
                props.caseSensitive = false;
                props.feedBack = Boolean(feedbackHtmlView);
                props.percentajeFB = 100;
                props.customMessages = false;
                props.percentajeQuestions = 100;
                props.timeShowSolution = 3;
                props.time = idev.time || 0;
                props.version = 1.5;
                props.maxWidth = true;
                props.cardHeight = 160;
                props.startAutomatically = false;
                props.orderedColumns = Boolean(idev.orderedColumns);
                props.gameColumns = idev.gameColumns || 0;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.wordBorder = true;
                props.type = isPhraseMode ? 0 : 1;
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'relate') {
                const pairs = idev.pairs || [];
                feedbackHtmlView = idev.feedback ? ensureParagraph(idev.feedback) : "";
                const cardsGame = (Array.isArray(idev.cardsGame) && idev.cardsGame.length > 0) ? idev.cardsGame : pairs.map(p => ({
                    url: p.image1 || "", x: 0, y: 0, author: "", alt: "", audio: "", color: "#000000", backcolor: "#ffffff", eText: p.text1 || "",
                    urlBk: p.image2 || "", xBk: 0, yBk: 0, authorBk: "", altBk: "", audioBk: "", colorBk: "#000000", backcolorBk: "#ffffff", eTextBk: p.text2 || ""
                }));
                props.typeGame = "Relaciona";
                props.id = ideviceId;
                props.author = projectAuthor;
                props.randomCards = true;
                // En relate, DataGame se guarda en JSON plano dentro de un <div> HTML; evitamos etiquetas <p> crudas dentro de instructions
                props.instructions = stripHtmlTags(idev.instructions || "Relacionen cada elemento con su pareja correspondiente.");
                props.showMinimize = false;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.cardsGame = cardsGame;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.textAfter = feedbackHtmlView ? jsEscape(feedbackHtmlView) : "";
                props.version = 2;
                props.percentajeCards = 100;
                props.type = idev.gameType || 0;
                props.showSolution = true;
                props.timeShowSolution = 3;
                props.time = idev.time || 0;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'crossword') {
                const words = idev.terms || idev.words || [];
                feedbackHtmlView = idev.feedback ? ensureParagraph(idev.feedback) : "";
                const wordsGame = (Array.isArray(idev.wordsGame) && idev.wordsGame.length > 0) ? idev.wordsGame : words.map(w => ({
                    word: (w.word || w.term || "").toUpperCase().trim(),
                    definition: w.definition || w.description || w.hint || "",
                    x: 0, y: 0, author: "", alt: "", url: "", audio: "", percentageShow: null
                }));
                props.typeGame = "Crucigrama";
                props.id = ideviceId;
                props.instructions = ensureParagraph(idev.instructions || "Completen el siguiente crucigrama educativo.");
                props.showMinimize = false;
                props.showSolution = true;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.wordsGame = wordsGame;
                props.isScorm = 0;
                props.hasBack = true;
                props.urlBack = "";
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.textFeedBack = feedbackHtmlView ? jsEscape(feedbackHtmlView) : "";
                props.textAfter = "";
                props.caseSensitive = false;
                props.tilde = false;
                props.feedBack = Boolean(feedbackHtmlView);
                props.percentajeFB = 100;
                props.version = 2;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.percentajeQuestions = "100";
                props.difficulty = "100";
                props.time = String(idev.time || "0");
                props.authorBackImage = "";
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'word-search') {
                const wordsList = idev.words || idev.terms || [];
                feedbackHtmlView = idev.feedback ? ensureParagraph(idev.feedback) : "";
                const wordsGame = (Array.isArray(idev.wordsGame) && idev.wordsGame.length > 0) ? idev.wordsGame : wordsList.map(w => ({
                    word: (typeof w === 'string' ? w : (w.word || w.term || "")).toUpperCase().trim(),
                    definition: (typeof w === 'object' ? (w.definition || w.hint || "") : ""),
                    x: 0, y: 0, author: "", alt: "", url: "", audio: "",
                    percentageShow: 100
                }));

                props.typeGame = "Sopa";
                props.id = ideviceId;
                props.instructions = ensureParagraph(idev.instructions || "Encuentren las palabras ocultas en la sopa de letras.");
                props.showMinimize = false;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.wordsGame = wordsGame.length ? wordsGame : [{ word: "EDUCACION", definition: "Proceso formativo", x: 0, y: 0, author: "", alt: "", url: "", audio: "", percentageShow: 100 }];
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.textFeedBack = feedbackHtmlView ? jsEscape(feedbackHtmlView) : "";
                props.textAfter = "";
                props.feedBack = Boolean(feedbackHtmlView);
                props.percentajeFB = 100;
                props.version = 2;
                props.percentajeQuestions = 100;
                props.time = idev.time || 0;
                props.hideTimeIcon = idev.hide_time_icon !== undefined ? Boolean(idev.hide_time_icon) : false;
                props.diagonals = Boolean(idev.diagonals);
                props.reverses = Boolean(idev.reverses);
                props.showResolve = true;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'rosco') {
                const spanishLetters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
                const wordsList = idev.words || idev.terms || [];
                const wordsGame = [];
                for (let i = 0; i < spanishLetters.length; i++) {
                    const letter = spanishLetters[i];
                    const found = wordsList.find(w => (w.letter || "").toUpperCase() === letter);
                    if (found) {
                        wordsGame.push({
                            letter,
                            word: found.word || found.term || "",
                            definition: found.definition || found.description || "",
                            type: found.type || 0,
                            time: 0, x: 0, y: 0, author: "", alt: "", url: "", audio: ""
                        });
                    } else {
                        wordsGame.push({
                            letter, word: "", definition: "", type: 0,
                            time: 0, x: 0, y: 0, author: "", alt: "", url: "", audio: ""
                        });
                    }
                }
                props.typeGame = "Rosco";
                props.id = ideviceId;
                props.instructions = ensureParagraph(idev.instructions || "Observen las letras, identifiquen y completen las palabras correspondientes a cada definición.");
                props.timeShowSolution = 3;
                props.durationGame = idev.time || 240;
                props.numberTurns = 1;
                props.showSolution = true;
                props.showMinimize = false;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.wordsGame = wordsGame;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.letters = spanishLetters;
                props.textAfter = "";
                props.caseSensitive = false;
                props.version = 2;
                props.modeBoard = false;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'guess') {
                const rawWords = idev.words || idev.terms || (idev.term ? [{ word: idev.term, definition: idev.hint || "", feedback: idev.feedback || "" }] : []);
                const wordsGame = (Array.isArray(idev.wordsGame) && idev.wordsGame.length > 0) ? idev.wordsGame : rawWords.map(w => ({
                    word: (w.word || w.term || "").toUpperCase().trim(),
                    definition: w.definition || w.hint || "",
                    msgHit: w.feedback || idev.feedback || "¡Correcto!",
                    msgError: "¡Incorrecto!",
                    type: 0, time: 0, x: 0, y: 0, author: "", alt: "", url: "", audio: "",
                    percentageShow: 35
                }));
                props.typeGame = "Adivina";
                props.version = 2;
                props.id = ideviceId;
                props.instructions = ensureParagraph(idev.instructions || "Descubran el término oculto a partir de su definición.");
                props.wordsGame = wordsGame;
                props.showMinimize = false;
                props.optionsRamdon = false;
                props.showSolution = true;
                props.timeShowSolution = 3;
                props.useLives = true;
                props.numberLives = 3;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.msgs = { ...COMMON_GAME_MSGS, msgTypeGame: "Adivina" };
            }

            if (idevType === 'quick-questions' || idevType === 'quick-questions-multiple-choice') {
                const rawQuestions = idev.questions || idev.items || [];
                const questionsGame = (Array.isArray(idev.questionsGame) && idev.questionsGame.length > 0) ? idev.questionsGame : rawQuestions.map((q, idx) => {
                    const rawOptions = q.options || ["Opción A", "Opción B", "Opción C", "Opción D"];
                    const options = rawOptions.map(opt => typeof opt === 'string' ? opt : (opt.text || opt.option || ""));
                    let solutionIdx = 0;
                    if (typeof q.solution === 'number') {
                        solutionIdx = q.solution;
                    } else if (q.correct_index !== undefined) {
                        solutionIdx = q.correct_index;
                    } else if (typeof q.solution === 'string' && q.solution.length === 1) {
                        const code = q.solution.toUpperCase().charCodeAt(0);
                        if (code >= 65 && code <= 90) solutionIdx = code - 65;
                    }
                    return {
                        type: 0, time: 0, numberOptions: options.length, typeSelect: 0,
                        x: 0, y: 0, author: "", alt: "", customScore: 1, url: "", audio: "",
                        hit: 1, error: -1, msgHit: q.feedback_right || "¡Correcto!", msgError: q.feedback_wrong || "¡Incorrecto!",
                        soundVideo: 1, imageVideo: 1, iVideo: 0, fVideo: 0, silentVideo: 0, tSilentVideo: 0,
                        eText: "",
                        question: q.question || q.text || `Pregunta ${idx + 1}`,
                        options: options,
                        solution: String(solutionIdx),
                        solutionQuestion: "",
                        percentageShow: 100
                    };
                });

                props.typeGame = idevType === 'quick-questions-multiple-choice' ? "Selecciona" : "Quext";
                props.id = ideviceId;
                props.instructions = ensureParagraph(idev.instructions || "Seleccionen la respuesta correcta para cada pregunta.");
                props.showMinimize = false;
                props.optionsRamdon = false;
                props.answersRamdon = false;
                props.showSolution = true;
                props.timeShowSolution = 3;
                props.useLives = true;
                props.numberLives = 3;
                props.itinerary = { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" };
                props.questionsGame = questionsGame;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.title = idev.title || "Preguntas Rápidas";
                props.customScore = false;
                props.textAfter = "";
                props.textFeedBack = "";
                props.gameMode = 1;
                props.feedBack = false;
                props.percentajeFB = 100;
                props.version = 2;
                props.customMessages = false;
                props.percentajeQuestions = 100;
                props.evaluation = false;
                props.evaluationID = evalId;
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'trueorfalse') {
                const questionsRaw = idev.questions || idev.items || [];
                const questionsGame = questionsRaw.map(q => {
                    const qText = typeof q === 'string' ? q : (q.question || q.text || "");
                    const isTrue = (q.solution === 1 || q.solution === true || q.answer === true || String(q.solution).toLowerCase() === 'verdadero');
                    return {
                        question: ensureParagraph(qText),
                        feedback: q.feedback || "",
                        suggestion: q.suggestion || q.hint || "",
                        solution: isTrue ? 1 : 0
                    };
                });

                props.typeGame = "TrueOrFalse";
                props.instructions = ensureParagraph(idev.instructions || "Indiquen si cada afirmación es verdadera o falsa.");
                props.eXeGameInstructions = props.instructions;
                props.questionsGame = questionsGame.length ? questionsGame : [{
                    question: "<p>Afirmación de ejemplo</p>",
                    feedback: "Retroalimentación",
                    suggestion: "",
                    solution: 1
                }];
                props.attempsNumber = idev.attempts || 2;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
            }

            if (idevType === 'form') {
                props.repeatActivity = true;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.weighted = 100;
                props.questionsRandom = false;
                props.percentageQuestions = "100";
                props.time = "0";
                props.eXeFormInstructions = ensureParagraph(idev.instructions || "Respondan a las cuestiones formuladas:");
                props.questionsData = (idev.questions || []).map((q, idx) => {
                    const qText = typeof q === 'string' ? q : (q.question || q.text || "");
                    return {
                        id: Date.now() + idx + "-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
                        activityType: q.type || "true-false",
                        baseText: ensureParagraph(qText),
                        feedbackRight: q.feedbackRight || "¡Correcto!",
                        feedbackWrong: q.feedbackWrong || "Incorrecto",
                        suggestion: q.suggestion || "",
                        wrongAnswersValue: "",
                        selectionType: "single",
                        answers: q.answers || [],
                        answer: q.answer !== undefined ? String(q.answer) : "0",
                        capitalization: false,
                        strict: false,
                        order: idx,
                        customScore: 1,
                        time: 0
                    };
                });
                props.passRate = Math.floor((props.questionsData || []).length / 2);
            }

            if (idevType === 'progress-report') {
                props.typeGame = "Progress Report";
                props.instructions = stripHtmlTags(idev.description || idev.instructions || "Informe general del avance en la Situación de Aprendizaje.");
                props.evaluationID = ideviceId;
                props.id = ideviceId;
                props.typeshow = 0;
                props.showDate = true;
                props.showTypeGame = true;
                props.activeLinks = true;
                props.userData = true;
            }

            if (idevType === 'complete') {
                props.typeGame = "Completa";
                props.msgs = { ...COMMON_GAME_MSGS, msgTypeGame: "Completa" };
                props.showSolution = true;
                props.timeShowSolution = 3;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
            }

            if (idevType === 'interactive-video') {
                props.videoURL = props.url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                props.videoType = "youtube";
            }

            // Construcción de contenido principal con imagen opcional
            let finalMainContent = props.main_text || props.textTextarea || props.story || props.content || "";
            if (props.image && !finalMainContent.includes(props.image)) {
                const imgHtml = `<p style="text-align:center;"><img src="${props.image}" alt="Imagen didáctica" style="max-width:100%; height:auto; border-radius:8px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);"></p>`;
                finalMainContent = imgHtml + finalMainContent;
            }

            if (idevType === 'text') {
                props.textTextarea = `<div class="exe-text-activity">${finalMainContent}</div>`;
            } else if (idevType === 'casestudy') {
                props.history = finalMainContent;
            }

            const instructionsInner = stripOuterParagraph(props.instructions || "Lean con atención y completen la actividad:");
            const casestudyActivity = (props.activities && props.activities[0]) ? props.activities[0].activity : "";
            const casestudyFeedback = (props.activities && props.activities[0]) ? props.activities[0].feedback : "";

            // 1. Reemplazo de marcadores en htmlView ANTES de serializar jsonProperties
            const placeholders = {
                '{{INSTRUCTIONS}}': instructionsInner,
                '{{CONTENT}}': finalMainContent,
                '{{UDL_EASY}}': props.easy_reading || props.easyReadingTextarea || "",
                '{{UDL_AUDIO}}': props.audio_script || props.audioScriptTextarea || "",
                '{{VIDEO_URL}}': props.videoURL || "",
                '{{VIDEO_TYPE}}': props.videoType || "youtube",
                '{{URL}}': props.url || "",
                '{{ACTIVITY}}': casestudyActivity,
                '{{FEEDBACK}}': idevType === 'casestudy' ? casestudyFeedback : feedbackHtmlView,
                '{{TITLE}}': props.rubricTitle || props.title || "",
                '{{INSTRUCTIONS_DATA}}': props.instructionsData || "",
                '{{DIGCOMPEDU_COUNT}}': String(props.digcompeduCount || 0),
                '{{DIGCOMPEDU_MODE}}': props.digcompeduDisplayMode || "table",
                '{{DIGCOMPEDU_TABLE}}': props.digcompeduSummaryTableHtml || "",
                '{{DIGCOMPEDU_TEXT}}': props.digcompeduSummaryTextHtml || "",
                '{{LOMLOE_HTML}}': props.lomloeSummaryHtml || "",
                '{{PACKAGE_TITLE}}': escapeXml(projectTitle),
                '{{PACKAGE_DESCRIPTION}}': escapeXml(projectDescription),
                '{{PACKAGE_AUTHOR}}': escapeXml(projectAuthor),
                '{{PACKAGE_LICENSE}}': escapeXml(projectLicense)
            };

            for (const [key, val] of Object.entries(placeholders)) {
                snippet = snippet.replaceAll(key, val);
            }

            // 2. Limpiar propiedades auxiliares y serializar jsonProperties con JSON.stringify seguro
            const cleanProps = { ...props };
            delete cleanProps.type;
            delete cleanProps.idevice;
            if (props.type !== undefined && ['sort', 'relate'].includes(idevType)) {
                cleanProps.type = props.type;
            }

            let mergedProps = { ...cleanProps };
            snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)([\s\S]*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                let originalJson = {};
                try {
                    if (p2 && p2.trim() !== "") originalJson = JSON.parse(p2);
                } catch (e) {}
                mergedProps = { ...originalJson, ...cleanProps };
                mergedProps.id = ideviceId;
                mergedProps.ideviceId = ideviceId;
                mergedProps.evaluationID = evalId;
                mergedProps.evaluation = Boolean(props.evaluation);
                if (props.title) mergedProps.title = props.title;
                return p1 + JSON.stringify(mergedProps) + p3;
            });

            // Codificación del contenedor DataGame en htmlView (eXeLearning v4.0.5)
            const dataGameTypes = [
                'checklist', 'guess', 'select-media-files', 'rubric', 'complete',
                'trueorfalse', 'quick-questions-multiple-choice', 'quick-questions',
                'quick-questions-video', 'progress-report', 'rosco', 'crossword',
                'sort', 'relate', 'word-search'
            ];

            if (dataGameTypes.includes(idevType)) {
                const dataGameRegex = /(<div[^>]*class="[^"]*DataGame[^"]*"[^>]*>)(.*?)(<\/div>)/i;
                if (dataGameRegex.test(snippet)) {
                    snippet = snippet.replace(dataGameRegex, (match, p1, p2, p3) => {
                        let encodedPayload = '';
                        if (idevType === 'rubric') {
                            // rubric.js decodifica DataGame con unescape()
                            encodedPayload = jsEscape(JSON.stringify(mergedProps));
                        } else if (idevType === 'progress-report' || idevType === 'relate') {
                            // progress-report y relate leen DataGame como JSON plano sin desencriptar
                            encodedPayload = JSON.stringify(mergedProps);
                        } else {
                            // Todos los demás juegos Nodex desencriptan con $exe.decrypt() (UTF-16 XOR 146 + unescape)
                            encodedPayload = exeEncrypt(JSON.stringify(mergedProps));
                        }
                        const cleanTag = p1.replace(/\s(data-id|id)="[^"]*"/g, '');
                        return cleanTag + encodedPayload + p3;
                    });
                }
            }

            // Propiedades del Bloque contenedor (odePagStructureProperties)
            const isTeacherOnly = !!(idev.teacher_only || idev.teacherOnly);
            const isVisible = idev.visibility !== false;

            xml += `
    <odePagStructure>
      <odePageId>${pageId}</odePageId>
      <odeBlockId>${blockId}</odeBlockId>
      <blockName>${escapeXml(blockName)}</blockName>
      <iconName>${escapeXml(iconName)}</iconName>
      <odePagStructureOrder>${componentOrder++}</odePagStructureOrder>
      <odePagStructureProperties>
        <odePagStructureProperty><key>visibility</key><value>${isVisible ? 'true' : 'false'}</value></odePagStructureProperty>
        <odePagStructureProperty><key>teacherOnly</key><value>${isTeacherOnly ? 'true' : 'false'}</value></odePagStructureProperty>
        <odePagStructureProperty><key>allowToggle</key><value>true</value></odePagStructureProperty>
        <odePagStructureProperty><key>minimized</key><value>false</value></odePagStructureProperty>
        <odePagStructureProperty><key>cssClass</key><value>${escapeXml(idev.cssClass || '')}</value></odePagStructureProperty>
      </odePagStructureProperties>
      <odeComponents>
${snippet}
      </odeComponents>
    </odePagStructure>`;
        }

        xml += `
  </odePagStructures>
</odeNavStructure>`;
    }

    xml += `
</odeNavStructures>
</ode>`;

    // Corrección de caracteres ampersand (&) que no formen parte de entidades válidas
    xml = xml.replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;");

    // 4. Agregar archivos al paquete ZIP
    jszip.file("content.xml", xml);
    jszip.file("content.dtd", OFFICIAL_ODE_DTD);

    // 5. Generar miniatura screenshot.png del proyecto
    const thumbnailBlob = await generateProjectThumbnail(projectTitle, projectAuthor, projectTheme);
    if (thumbnailBlob) {
        jszip.file("screenshot.png", thumbnailBlob);
        jszip.file("theme/screenshot.png", thumbnailBlob);
    }

    return await jszip.generateAsync({ type: "blob", compression: "DEFLATE" });
}

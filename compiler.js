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
 * Encriptación XOR utilizada por eXeLearning para los iDevices interactivos (Nodex/Quiddity).
 * Clave oficial: 146 (0x92)
 */
export function exeEncrypt(str) {
    if (!str || str === 'undefined' || str === 'null') str = '';
    try {
        const key = 146;
        const utf8Str = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        });
        
        let ostr = '';
        for (let i = 0; i < utf8Str.length; i++) {
            const xorByte = utf8Str.charCodeAt(i) ^ key;
            ostr += '%' + xorByte.toString(16).toUpperCase().padStart(2, '0');
        }
        return ostr;
    } catch (ex) {
        return '';
    }
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
 * Mensajes comunes estandarizados para juegos interactivos Nodex (v4.0.5)
 */
export const COMMON_GAME_MSGS = {
    msgHappen: "Pasar", msgReply: "Responder", msgSubmit: "Enviar",
    msgEnterCode: "Introduce el código de acceso", msgErrorCode: "El código de acceso no es correcto",
    msgGameOver: "¡Fin de la partida!", msgIndicateWord: "Proporciona una palabra o expresión",
    msgClue: "¡Genial! La pista es:", msgYouHas: "Tiene %1 aciertos y %2 fallos",
    msgCodeAccess: "Código de acceso", msgPlayAgain: "Jugar otra vez",
    msgRequiredAccessKey: "Es necesario el código de acceso",
    msgInformationLooking: "¡Genial! La información que estaba buscando",
    msgPlayStart: "Pulsa aquí para jugar", msgErrors: "Errores", msgMoveOne: "Pasar",
    msgHits: "Aciertos", msgScore: "Puntuación", msgWeight: "Peso", msgMinimize: "Minimizar",
    msgMaximize: "Maximizar", msgTime: "Límite de tiempo (mm:ss)", msgLive: "Vida",
    msgFullScreen: "Pantalla Completa", msgExitFullScreen: "Salir del modo pantalla completa",
    msgNumQuestions: "Número de preguntas", msgNoImage: "Pregunta sin imágenes", msgCool: "¡Bien!",
    msgLoseT: "Ha perdido 330 puntos", msgLoseLive: "Ha perdido una vida",
    msgLostLives: "¡Ha perdido todas sus vidas!", mgsAllQuestions: "¡Completadas las preguntas!",
    msgSuccesses: "¡Correcto! | ¡Excelente! | ¡Genial! | ¡Muy bien! | ¡Perfecto!",
    msgFailures: "¡No era eso! | ¡Incorrecto! | ¡No es correcto! | ¡Lo sentimos! | ¡Error!",
    msgTryAgain: "Necesitas al menos %s% de respuestas correctas para obtener la información. Inténtalo de nuevo.",
    msgWrote: "Escribe la palabra correcta y pulsa en Responder. Si dudas, pulsa en Seguir.",
    msgNotNetwork: "A este juego solo se puede jugar con conexión a internet.",
    msgEndGameScore: "Comience la partida antes de guardar la puntuación.",
    msgScoreScorm: "La puntuación no se puede guardar porque esta página no forma parte de un paquete SCORM.",
    msgQuestion: "Pregunta", msgAnswer: "Responder", msgOnlySaveScore: "¡Solo puede guardar la puntuación una vez!",
    msgOnlySave: "Solo puede guardar una vez", msgInformation: "Información", msgYouScore: "Su puntuación",
    msgAuthor: "Autoría", msgOnlySaveAuto: "Su puntuación se guardará después de cada pregunta. Solo puede jugar una vez.",
    msgSaveAuto: "Su puntuación se guardará automáticamente después de cada pregunta.",
    msgSeveralScore: "Puede guardar la puntuación tantas veces como quiera",
    msgYouLastScore: "La última puntuación guardada es", msgActityComply: "Ya ha realizado esta actividad.",
    msgPlaySeveralTimes: "Puede realizar esta actividad cuantas veces quiera", msgClose: "Cerrar",
    msgLoading: "Cargando. Espere, por favor...", msgPoints: "puntos", msgAudio: "Audio",
    msgCorrect: "Correcto", msgIncorrect: "Incorrecto", msgUncompletedActivity: "Actividad no completada",
    msgSuccessfulActivity: "Actividad superada. Puntuación: %s",
    msgUnsuccessfulActivity: "Actividad no superada. Puntuación: %s",
    msgSaveScore: "Guardar la puntuación", msgLookAnswer: "Mira la respuesta",
    msgTypeGame: "Juego", msgShowWords: "Mostrar las soluciones", msgAll: "Todas", msgUnanswered: "Sin contestar",
    msgShowRoulette: "Mostrar el rosco de palabras", msgHideRoulette: "Ocultar el rosco de palabras",
    msgStartWith: "Empieza por %1", msgContaint: "Contiene la letra %1",
    msgReady: "¿Preparado?", msgStartGame: "Pulsa aquí para empezar", msgPass: "Pasar a la siguiente palabra",
    msgNewWord: "Palabra nueva", msgNewGame: "Pulsa aquí para empezar otra partida",
    msgOneRound: "Una vuelta", msgTowRounds: "Dos vueltas", msgWhiteBoard: "Pizarra digital",
    msgImage: "Imagen",
    msgCheck: "Comprobar", msgShowSolution: "Mostrar las soluciones", msgReboot: "Jugar otra vez",
    msgSelectWord: "Haz clic en el cuadrado de cada palabra para ver la definición",
    msgHorizontals: "Horizontales", msgVerticals: "Verticales",
    msgShowDefinitions: "Mostrar/ocultar definiciones", msgShowBack: "Mostrar/ocultar imagen de fondo",
    msgSolutionWord: "Palabra",
    msgRestart: "Reiniciar", msgEndGameM: "Has completado el juego. Tu puntuación es %s.",
    msgPlayAgain: "Jugar otra vez", msgTimeOver: "Tu tiempo ha finalizado. Inténtalo de nuevo",
    msgAllAttemps: "¡Has agotado todos los intentos! Prueba de nuevo",
    mgsAllPhrases: "¡Has ordenado todas las actividades!", msgAttempts: "Intentos",
    msgNumbersAttemps: "Número de actividades pendientes", msgActivities: "Actividades",
    msgNextPhrase: "Próxima actividad", msgContinue: "Continuar",
    msgPositions: "Posiciones correctas", msgAllOK: "¡Genial! Todo correcto ¡A por otra!",
    msgAgain: "Inténtalo de nuevo", msgPhrases: "Frases",
    msgWordsFind: "Palabras que faltan por encontrar", msgTimeOver: "El tiempo ha finalizado",
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
    const projectAuthor = meta.author || "Norberto Martín Afonso";
    const projectLang = meta.lang || "es";
    const projectTheme = (meta.theme || "educablue").toLowerCase();
    const projectLicense = meta.license || "creative commons: attribution - share alike 4.0";
    const projectLicenseUrl = meta.licenseUrl || "https://creativecommons.org/licenses/by-sa/4.0/";

    // 2. Normalización de la jerarquía de páginas (Árbol didáctico eXeLearning)
    const pagesList = normalizePagesHierarchy(rawPages);

    // 3. Construcción del XML compatible con ODE Content DTD v2.0
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ode SYSTEM "content.dtd">
<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">
<userPreferences>
  <userPreference><key>theme</key><value>${projectTheme}</value></userPreference>
</userPreferences>
<odeResources>
  <odeResource><key>odeId</key><value>${PROJECT_ID}</value></odeResource>
  <odeResource><key>odeVersionId</key><value>${PROJECT_VERSION_ID}</value></odeResource>
  <odeResource><key>exe_version</key><value>${EXE_VERSION}</value></odeResource>
</odeResources>
<odeProperties>
  <odeProperty><key>pp_title</key><value>${projectTitle}</value></odeProperty>
  <odeProperty><key>pp_author</key><value>${projectAuthor}</value></odeProperty>
  <odeProperty><key>pp_lang</key><value>${projectLang}</value></odeProperty>
  <odeProperty><key>pp_license</key><value>${projectLicense}</value></odeProperty>
  <odeProperty><key>pp_licenseUrl</key><value>${projectLicenseUrl}</value></odeProperty>
  <odeProperty><key>pp_theme</key><value>${projectTheme}</value></odeProperty>
  <odeProperty><key>pp_exelearning_version</key><value>${EXE_VERSION}</value></odeProperty>
  <odeProperty><key>pp_modified</key><value>${MODIFIED_TIMESTAMP}</value></odeProperty>
  <odeProperty><key>pp_addExeLink</key><value>true</value></odeProperty>
  <odeProperty><key>pp_addPagination</key><value>false</value></odeProperty>
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
  <pageName>${page.page_name}</pageName>
  <odeNavStructureOrder>${pageOrder++}</odeNavStructureOrder>
  <odeNavStructureProperties>
    <odeNavStructureProperty><key>titlePage</key><value>${page.page_name}</value></odeNavStructureProperty>
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
            let iconName = 'activity';
            let blockName = idev.title || 'Contenido';
            if (['form', 'guess', 'select-media-files', 'checklist', 'trueorfalse', 'crossword', 'sort', 'relate', 'rosco', 'word-search', 'quick-questions', 'quick-questions-multiple-choice'].includes(idevType)) {
                iconName = 'interactive';
                blockName = idev.title || 'Actividad Interactiva';
            } else if (idevType === 'udl-content') {
                iconName = 'info';
                blockName = idev.title || 'Contenido Accesible DUA';
            } else if (idevType === 'rubric') {
                iconName = 'competencies';
                blockName = idev.title || 'Rúbrica de Evaluación';
            } else if (idevType === 'casestudy') {
                iconName = 'case';
                blockName = idev.title || 'Caso Práctico';
            } else if (idevType === 'interactive-video') {
                iconName = 'video';
                blockName = idev.title || 'Vídeo Interactivo';
            } else if (idevType === 'digcompedu') {
                iconName = 'technology';
                blockName = idev.title || 'Competencia Digital (DigCompEdu)';
            }

            // Normalización y mapeo de datos
            let props = { ...idev };
            if (idev.content && typeof idev.content === 'object') Object.assign(props, idev.content);

            // --- Adaptaciones por tipo de iDevice ---
            if (idevType === 'text' && props.summary) {
                const summaryHtml = `<div class="exe-summary" style="background:#f0f9ff; padding:1.2rem; border-radius:0.75rem; margin-bottom:1.2rem; border-left:5px solid #0284c7; box-shadow:0 2px 4px rgba(0,0,0,0.05);"><strong style="color:#0369a1; display:block; margin-bottom:0.4rem; font-size:1.05rem;">💡 Resumen / Ideas Clave:</strong> ${props.summary}</div>`;
                props.main_text = summaryHtml + (props.main_text || "");
            }

            if (idevType === 'digcompedu') {
                const indicators = props.indicators || props.competencies || props.digcompeduSelected || ["1.1", "2.1", "3.1"];
                props.digcompeduSelected = indicators;
                props.digcompeduDisplayMode = props.display_mode || "table";
                props.digcompeduDataLang = "es";
                props.digcompeduGranularity = "indicator";
                props.digcompeduCount = indicators.length;
                props.digcompeduTableHtml = buildDigcompeduTable(indicators);
                props.digcompeduSummaryTextHtml = props.content || props.main_text || "";
            }

            if (idevType === 'casestudy') {
                props.textTextarea = props.story || props.main_text || "";
                props.activities = [{
                    activity: props.activity || "Actividad del caso",
                    feedback: props.feedback || "Retroalimentación orientativa",
                    buttonCaption: props.button_show || "Mostrar retroalimentación"
                }];
            }

            if (idevType === 'rubric') {
                const instructions = idev.instructions || "Complete la siguiente rúbrica analítica";
                props.instructions = instructions;
                props.instructionsData = encodeURIComponent(`<p>${instructions}</p>`);
                props.rubricTitle = idev.title || "Rúbrica de Evaluación";

                props.typeGame = "Rubric";
                props.version = 2;
                props.id = ideviceId;
                const scores = ["4 Excelente", "3 Satisfactorio", "2 Mejorable", "1 Insuficiente"];
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
                props.instructions = `<p>${instructions}</p>`;
                props["visible-info"] = false;
                props.author = projectAuthor;
                props["author-url"] = "";
                props.license = "CC-BY-SA";
                props.weighted = 100;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
            }

            if (idevType === 'trueorfalse') {
                const questionsRaw = idev.questions || idev.items || [];
                const questionsGame = questionsRaw.map(q => {
                    const qText = typeof q === 'string' ? q : (q.question || q.text || "");
                    const isTrue = (q.solution === 1 || q.solution === true || q.answer === true || String(q.solution).toLowerCase() === 'verdadero');
                    return {
                        question: qText.startsWith('<p>') ? qText : `<p>${qText}</p>`,
                        feedback: q.feedback || "",
                        suggestion: q.suggestion || q.hint || "",
                        solution: isTrue ? 1 : 0
                    };
                });

                props.typeGame = "TrueOrFalse";
                props.instructions = idev.instructions || "Indique si cada afirmación es verdadera o falsa.";
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
                props.eXeFormInstructions = `<p>${idev.instructions || "Responda a las cuestiones formuladas:"}</p>`;
                props.questionsData = (idev.questions || []).map((q, idx) => {
                    const qText = typeof q === 'string' ? q : (q.question || q.text || "");
                    return {
                        id: Date.now() + idx + "-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
                        activityType: q.type || "true-false",
                        baseText: qText.startsWith("<p>") ? qText : `<p>${qText}</p>`,
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

            if (idevType === 'word-search') {
                const wordsList = idev.words || idev.terms || [];
                const wordsGame = wordsList.map(w => ({
                    word: (typeof w === 'string' ? w : (w.word || w.term || "")).toUpperCase().trim(),
                    definition: (typeof w === 'object' ? (w.definition || w.hint || "") : ""),
                    x: 0, y: 0, author: "", alt: "", url: "", audio: "",
                    percentageShow: 100
                }));

                props.typeGame = "Sopa";
                props.instructions = idev.instructions || "<p>Encuentre las palabras ocultas en la sopa de letras.</p>";
                props.wordsGame = wordsGame.length ? wordsGame : [{ word: "EDUCACION", definition: "Proceso formativo" }];
                props.hideTimeIcon = idev.hide_time_icon !== undefined ? idev.hide_time_icon : false;
                props.time = idev.time || 0;
                props.isScorm = 0;
                props.textButtonScorm = "Guardar la puntuación";
                props.repeatActivity = true;
                props.weighted = 100;
                props.version = 1;
                props.msgs = COMMON_GAME_MSGS;
            }

            if (idevType === 'progress-report') {
                props.typeGame = "Progress Report";
                props.instructions = idev.description || idev.instructions || "Informe general del avance en la Situación de Aprendizaje.";
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

            // Sincronizar jsonProperties
            let mergedProps = { ...props };
            snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)(.*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                let originalJson = {};
                try {
                    if (p2 && p2.trim() !== "") originalJson = JSON.parse(p2);
                } catch (e) {}
                mergedProps = { ...originalJson, ...props };
                mergedProps.id = ideviceId;
                mergedProps.ideviceId = ideviceId;
                mergedProps.evaluationID = evalId;
                mergedProps.evaluation = props.evaluation || false;
                if (props.title) mergedProps.title = props.title;
                return p1 + JSON.stringify(mergedProps) + p3;
            });

            // Reemplazo de marcadores en htmlView
            let finalMainContent = props.main_text || props.textTextarea || props.story || props.content || "";
            if (props.image && !finalMainContent.includes(props.image)) {
                const imgHtml = `<p style="text-align:center;"><img src="${props.image}" alt="Imagen didáctica" style="max-width:100%; height:auto; border-radius:8px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);"></p>`;
                finalMainContent = imgHtml + finalMainContent;
            }

            const placeholders = {
                '{{INSTRUCTIONS}}': props.instructions || "Lea con atención y complete la actividad:",
                '{{CONTENT}}': finalMainContent,
                '{{UDL_EASY}}': props.easy_reading || props.easyReadingTextarea || "",
                '{{UDL_AUDIO}}': props.audio_script || props.audioScriptTextarea || "",
                '{{VIDEO_URL}}': props.videoURL || "",
                '{{VIDEO_TYPE}}': props.videoType || "youtube",
                '{{URL}}': props.url || "",
                '{{ACTIVITY}}': (props.activities && props.activities[0]) ? props.activities[0].activity : "",
                '{{FEEDBACK}}': (props.activities && props.activities[0]) ? props.activities[0].feedback : "",
                '{{TITLE}}': props.rubricTitle || props.title || "",
                '{{INSTRUCTIONS_DATA}}': props.instructionsData || "",
                '{{DIGCOMPEDU_COUNT}}': String(props.digcompeduCount || 0),
                '{{DIGCOMPEDU_TABLE}}': props.digcompeduTableHtml || ""
            };

            for (const [key, val] of Object.entries(placeholders)) {
                snippet = snippet.replaceAll(key, val);
            }

            // Codificación XOR interactiva para juegos Nodex (v4.0.5)
            const uriEncodedTypes = [
                'checklist', 'guess', 'select-media-files', 'rubric', 'complete',
                'trueorfalse', 'quick-questions-multiple-choice', 'quick-questions',
                'quick-questions-video', 'progress-report', 'rosco', 'crossword',
                'sort', 'relate', 'word-search'
            ];

            if (uriEncodedTypes.includes(idevType)) {
                const dataGameRegex = /(<div[^>]*class="[^"]*DataGame[^"]*"[^>]*>)(.*?)(<\/div>)/i;
                if (dataGameRegex.test(snippet)) {
                    snippet = snippet.replace(dataGameRegex, (match, p1, p2, p3) => {
                        let encryptedData = '';
                        if (idevType === 'rubric') {
                            const jsonStr = JSON.stringify(mergedProps);
                            encryptedData = encodeURIComponent(jsonStr)
                                .replace(/%C3%A1/g, "%E1").replace(/%C3%A9/g, "%E9")
                                .replace(/%C3%AD/g, "%ED").replace(/%C3%B3/g, "%F3")
                                .replace(/%C3%BA/g, "%FA").replace(/%C3%B1/g, "%F1")
                                .replace(/%C3%81/g, "%C1").replace(/%C3%89/g, "%C9")
                                .replace(/%C3%8D/g, "%CD").replace(/%C3%93/g, "%D3")
                                .replace(/%C3%9A/g, "%DA").replace(/%C3%91/g, "%D1")
                                .replace(/%C2%BF/g, "%BF").replace(/%C2%A1/g, "%A1");
                        } else if (idevType === 'progress-report') {
                            encryptedData = JSON.stringify(mergedProps);
                        } else if (idevType === 'sort') {
                            const items = idev.items || [];
                            const phrasesGame = items.map((it, idx) => ({
                                cards: [{ id: Date.now() + idx, type: 2, x: 0, y: 0, author: "", alt: "", url: "", audio: "", eText: "", color: "#000000", backcolor: "#ffffff" }],
                                msgError: "", msgHit: "", definition: "", phrase: it.text || it || "", audioDefinition: "", audioHit: "", audioError: ""
                            }));
                            const dataGame = {
                                typeGame: "Ordena", author: projectAuthor,
                                instructions: `<p>${idev.instructions || "Arrastre cada tarjeta hasta su posición correcta."}</p>`,
                                showMinimize: false, showSolution: true,
                                itinerary: { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" },
                                phrasesGame: phrasesGame,
                                isScorm: 0, textButtonScorm: "Guardar la puntuación", repeatActivity: true, weighted: 100,
                                attempsNumber: idev.attempts || 2,
                                textFeedBack: "", textAfter: "", caseSensitive: false, feedBack: false, percentajeFB: 100,
                                customMessages: false, percentajeQuestions: 100, timeShowSolution: 3, time: 0, version: 1.5,
                                maxWidth: true, cardHeight: 200, startAutomatically: false, orderedColumns: false, gameColumns: 0,
                                evaluation: false, evaluationID: evalId, wordBorder: true, id: ideviceId, type: 0, msgs: COMMON_GAME_MSGS
                            };
                            encryptedData = exeEncrypt(JSON.stringify(dataGame));
                        } else if (idevType === 'relate') {
                            const pairs = idev.pairs || [];
                            const cardsGame = pairs.map(p => ({
                                url: p.image1 || "", x: 0, y: 0, author: "", alt: "", audio: "", color: "#000000", backcolor: "#ffffff", eText: p.text1 || "",
                                urlBk: p.image2 || "", xBk: 0, yBk: 0, authorBk: "", altBk: "", audioBk: "", colorBk: "#000000", backcolorBk: "#ffffff", eTextBk: p.text2 || ""
                            }));
                            const dataGame = {
                                typeGame: "Relaciona", author: projectAuthor, randomCards: true,
                                instructions: `<p>${idev.instructions || "Relacione cada elemento con su pareja correspondiente."}</p>`,
                                showMinimize: false,
                                itinerary: { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" },
                                cardsGame: cardsGame, isScorm: 0, textButtonScorm: "Guardar la puntuación", repeatActivity: true,
                                weighted: 100, textAfter: "", version: 2, percentajeCards: 100, type: 0, showSolution: true,
                                timeShowSolution: 3, time: 3, evaluation: false, evaluationID: evalId, id: ideviceId, msgs: COMMON_GAME_MSGS
                            };
                            encryptedData = exeEncrypt(JSON.stringify(dataGame));
                        } else if (idevType === 'crossword') {
                            const words = idev.terms || idev.words || [];
                            const wordsGame = words.map(w => ({
                                word: (w.word || w.term || "").toUpperCase().trim(),
                                definition: w.definition || w.description || "",
                                x: 0, y: 0, author: "", alt: "", url: "", audio: "", percentageShow: null
                            }));
                            const dataGame = {
                                typeGame: "Crucigrama",
                                instructions: `<p>${idev.instructions || "Complete el siguiente crucigrama educativo."}</p>`,
                                showMinimize: false, showSolution: true,
                                itinerary: { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" },
                                wordsGame: wordsGame, isScorm: 0, hasBack: true, urlBack: "", textButtonScorm: "Guardar la puntuación",
                                repeatActivity: true, weighted: 100, textFeedBack: "", textAfter: "", caseSensitive: false,
                                tilde: true, feedBack: false, percentajeFB: 100, version: 2, evaluation: false,
                                evaluationID: evalId, percentajeQuestions: "100", difficulty: "100", time: "0",
                                authorBackImage: "", id: ideviceId, msgs: COMMON_GAME_MSGS
                            };
                            encryptedData = exeEncrypt(JSON.stringify(dataGame));
                        } else if (idevType === 'word-search') {
                            const dataGame = {
                                typeGame: "Sopa",
                                instructions: `<p>${idev.instructions || "Encuentre las palabras ocultas en la sopa de letras."}</p>`,
                                showMinimize: false,
                                itinerary: { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" },
                                wordsGame: mergedProps.wordsGame || [],
                                isScorm: 0, textButtonScorm: "Guardar la puntuación", repeatActivity: true, weighted: 100,
                                textFeedBack: "", textAfter: "", feedBack: false, percentajeFB: 100, version: 1,
                                percentajeQuestions: 100, time: idev.time || 0, hideTimeIcon: !!idev.hide_time_icon,
                                diagonals: false, reverses: false, showResolve: true, evaluation: false,
                                evaluationID: evalId, id: ideviceId, msgs: COMMON_GAME_MSGS
                            };
                            encryptedData = exeEncrypt(JSON.stringify(dataGame));
                        } else if (idevType === 'rosco') {
                            const spanishLetters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
                            const wordsList = idev.words || idev.terms || [];
                            const wordsGame = [];
                            for (let i = 0; i < spanishLetters.length; i++) {
                                const letter = spanishLetters[i];
                                const found = wordsList.find(w => (w.letter || "").toUpperCase() === letter);
                                if (found) {
                                    wordsGame.push({
                                        letter, word: found.word || found.term || "",
                                        definition: found.definition || found.description || "",
                                        type: 0, time: 0, x: 0, y: 0, author: "", alt: "", url: "", audio: ""
                                    });
                                } else {
                                    wordsGame.push({
                                        letter, word: "", definition: "", type: 0,
                                        time: 0, x: 0, y: 0, author: "", alt: "", url: "", audio: ""
                                    });
                                }
                            }
                            const dataGame = {
                                typeGame: "Rosco",
                                instructions: idev.instructions || "<p>Observe las letras, identifique y rellene las palabras que faltan.</p>",
                                timeShowSolution: 3, durationGame: idev.time || 240, numberTurns: 1,
                                showSolution: true, showMinimize: false,
                                itinerary: { showClue: false, clueGame: "", percentageClue: 40, showCodeAccess: false, codeAccess: "", messageCodeAccess: "" },
                                wordsGame: wordsGame, isScorm: 0, textButtonScorm: "Guardar la puntuación", repeatActivity: true,
                                weighted: 100, letters: spanishLetters, textAfter: "", caseSensitive: false, version: 2,
                                modeBoard: false, evaluation: false, evaluationID: evalId, id: ideviceId, msgs: COMMON_GAME_MSGS
                            };
                            encryptedData = exeEncrypt(JSON.stringify(dataGame));
                        } else {
                            encryptedData = exeEncrypt(JSON.stringify(mergedProps));
                        }
                        const cleanTag = p1.replace(/\s(data-id|id)="[^"]*"/g, '');
                        return cleanTag + encryptedData + p3;
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
      <blockName>${blockName}</blockName>
      <iconName>${iconName}</iconName>
      <odePagStructureOrder>${componentOrder++}</odePagStructureOrder>
      <odePagStructureProperties>
        <odePagStructureProperty><key>visibility</key><value>${isVisible ? 'true' : 'false'}</value></odePagStructureProperty>
        <odePagStructureProperty><key>teacherOnly</key><value>${isTeacherOnly ? 'true' : 'false'}</value></odePagStructureProperty>
        <odePagStructureProperty><key>allowToggle</key><value>true</value></odePagStructureProperty>
        <odePagStructureProperty><key>minimized</key><value>false</value></odePagStructureProperty>
        <odePagStructureProperty><key>cssClass</key><value>${idev.cssClass || ''}</value></odePagStructureProperty>
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

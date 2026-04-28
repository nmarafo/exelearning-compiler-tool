import { SNIPPETS_DICT } from './snippets.js';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Encriptación XOR utilizada por eXeLearning para los iDevices de juegos (Quiddity/Nodex).
 * Clave: 146 (0x92)
 */
function exeEncrypt(str) {
    if (!str || str === 'undefined' || str === 'null') str = '';
    try {
        const key = 146;
        let ostr = '';
        for (let i = 0; i < str.length; i++) {
            ostr += String.fromCharCode(str.charCodeAt(i) ^ key);
        }
        // eXeLearning v4 Quasar/Nodex expects escape() style (non-UTF8) for DataGame
        return escape(ostr);
    } catch (ex) {
        return '';
    }
}

export async function compileExeProject(pagesConfig) {
    const snippetsDict = SNIPPETS_DICT;
    const jszip = new JSZip();

    // Construir la estructura content.xml
    const PROJECT_ID = uuidv4().replace(/-/g, '').substring(0, 20).toUpperCase();
    
    const PROJECT_VERSION_ID = uuidv4().replace(/-/g, '').substring(0, 20).toUpperCase();
    const MODIFIED_TIMESTAMP = Date.now();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ode SYSTEM "content.dtd">
<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">
<userPreferences>
  <userPreference><key>theme</key><value>base</value></userPreference>
</userPreferences>
<odeResources>
  <odeResource><key>odeId</key><value>${PROJECT_ID}</value></odeResource>
  <odeResource><key>odeVersionId</key><value>${PROJECT_VERSION_ID}</value></odeResource>
  <odeResource><key>exe_version</key><value>3.0</value></odeResource>
</odeResources>
<odeProperties>
  <odeProperty><key>pp_title</key><value>Situación de Aprendizaje REA</value></odeProperty>
  <odeProperty><key>pp_lang</key><value>es</value></odeProperty>
  <odeProperty><key>pp_license</key><value>creative commons: attribution - share alike 4.0</value></odeProperty>
  <odeProperty><key>pp_licenseUrl</key><value>https://creativecommons.org/licenses/by-sa/4.0/</value></odeProperty>
  <odeProperty><key>pp_theme</key><value>base</value></odeProperty>
  <odeProperty><key>pp_exelearning_version</key><value>v4.0.0-rc3</value></odeProperty>
  <odeProperty><key>pp_modified</key><value>${MODIFIED_TIMESTAMP}</value></odeProperty>
  <odeProperty><key>pp_addExeLink</key><value>true</value></odeProperty>
  <odeProperty><key>pp_addPagination</key><value>false</value></odeProperty>
  <odeProperty><key>pp_addSearchBox</key><value>false</value></odeProperty>
  <odeProperty><key>pp_addAccessibilityToolbar</key><value>false</value></odeProperty>
  <odeProperty><key>pp_addMathJax</key><value>false</value></odeProperty>
  <odeProperty><key>exportSource</key><value>true</value></odeProperty>
  <odeProperty><key>pp_globalFont</key><value>default</value></odeProperty>
</odeProperties>
<odeNavStructures>`;

    // Generar Páginas
    let pageOrder = 0;
    for (const page of pagesConfig) {
        const pageId = uuidv4();
        
        xml += `
<odeNavStructure>
  <odePageId>${pageId}</odePageId>
  <odeParentPageId></odeParentPageId>
  <pageName>${page.page_name}</pageName>
  <odeNavStructureOrder>${pageOrder++}</odeNavStructureOrder>
  <odeNavStructureProperties>
    <odeNavStructureProperty><key>titlePage</key><value>${page.page_name}</value></odeNavStructureProperty>
  </odeNavStructureProperties>
  <odePagStructures>`;
        
        // Generar iDevices para esta página
        let componentOrder = 0;
        for (const idev of page.idevices) {
            if (!snippetsDict[idev.type]) continue; 
            
            let snippet = snippetsDict[idev.type];
            const blockId = 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const ideviceId = 'idevice-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const evalId = uuidv4();

            snippet = snippet.replace(/UUID-PAGINA/g, pageId);
            snippet = snippet.replace(/UUID-BLOQUE/g, blockId);
            snippet = snippet.replace(/UUID-IDEVICE/g, ideviceId);
            snippet = snippet.replace(/UUID-EVALUACION/g, evalId);

            // Determinar Icono y Nombre de Bloque según tipo
            let iconName = 'activity';
            let blockName = 'Contenido';
            if (['form', 'guess', 'select-media-files', 'checklist'].includes(idev.type)) {
                iconName = 'interactive';
                blockName = 'Actividad Interactiva';
            } else if (idev.type === 'udl-content') {
                iconName = 'info';
                blockName = 'Contenido DUA';
            }

            // 3. Normalización y Mapeo de datos (IA -> eXeLearning)
            let props = { ...idev };
            if (idev.content && typeof idev.content === 'object') Object.assign(props, idev.content);

            // Mensajes comunes para juegos (Nodex v4.0)
            const COMMON_GAME_MSGS = {
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
                msgUnsuccessfulActivity: "Actividad no superada. Puntuación: %s"
            };

            // Ajustes específicos por tipo de iDevice
            if (idev.type === 'text' && props.summary) {
                const summaryHtml = `<div class="exe-summary" style="background:#f0f9ff; padding:1rem; border-radius:0.5rem; margin-bottom:1rem; border:1px solid #bae6fd;"><strong>Resumen:</strong> ${props.summary}</div>`;
                props.main_text = summaryHtml + (props.main_text || "");
            }

            if (idev.type === 'udl-content') {
                props.textTextarea = props.main_text || "";
                props.easyReadingTextarea = props.easy_reading || "";
                props.audioScriptTextarea = props.audio_script || "";
            }

            if (idev.type === 'casestudy') {
                props.textTextarea = props.story || props.main_text || "";
                props.activities = [{
                    activity: props.activity || "Actividad",
                    feedback: props.feedback || "Retroalimentación"
                }];
            }

            if (idev.type === 'select-media-files') {
                props.typeGame = "SeleccionaMedias";
                props.version = 1.5;
                props.author = "";
                props.instructions = `<p>${props.instructions || "Selecciona las tarjetas correctas"}</p>`;
                props.itinerary = {
                    showClue: false,
                    clueGame: "",
                    percentageClue: 40,
                    showCodeAccess: false,
                    codeAccess: "",
                    messageCodeAccess: ""
                };
                props.phrasesGame = [{
                    cards: (props.options || []).map((opt, idx) => ({
                        id: Date.now() + idx + Math.floor(Math.random() * 10000),
                        type: 2,
                        author: "",
                        alt: opt.description || "",
                        url: opt.url || "",
                        audio: "",
                        eText: "",
                        color: "#000000",
                        backcolor: "#ffffff",
                        state: !!opt.is_correct
                    })),
                    msgError: "",
                    msgHit: "",
                    definition: props.title || props.instructions || "Enunciado",
                    audioDefinition: "",
                    audioHit: "",
                    audioError: "",
                    url: (props.options && props.options[0]) ? props.options[0].url : "", 
                    alt: "", author: ""
                }];
                props.msgs = {
                    ...COMMON_GAME_MSGS,
                    msgChangeMode: "Cambiar modo de visualización",
                    msgTypeGame: "Selecciona (multimedia)",
                    msgTimeOver: "El tiempo ha finalizado",
                    mgsAllPhrases: "¡Has completado todas las actividades!",
                    msgNumbersAttemps: "Número de actividades pendientes",
                    msgActivities: "Actividades",
                    msgCheck: "Comprobar",
                    msgContinue: "Continuar",
                    msgAllOK: "¡Genial! Todo correcto ¡A por otra!",
                    msgAgain: "Inténtalo de nuevo"
                };
                props.showMinimize = false;
                props.showSolution = true;
                props.timeShowSolution = 4;
                props.numberMaxCards = "30";
                props.repeatActivity = true;
                props.weighted = 100;
                props.isScorm = 0;
            }

            if (idev.type === 'guess') {
                props.typeGame = "Adivina";
                props.version = 2;
                props.wordsGame = [{
                    word: props.term || "",
                    definition: props.hint || "",
                    msgHit: props.feedback || "¡Correcto!",
                    msgError: "¡Incorrecto!",
                    type: 0, time: 0, x: 0, y: 0, author: "", alt: "", url: "", audio: "",
                    percentageShow: 35
                }];
                props.msgs = { ...COMMON_GAME_MSGS, msgTypeGame: "Adivina" };
                // Parámetros por defecto para evitar errores de Nodex
                props.showMinimize = false;
                props.optionsRamdon = false;
                props.showSolution = true;
                props.useLives = true;
                props.numberLives = 3;
            }

            if (idev.type === 'complete') {
                props.typeGame = "Completa";
                props.msgs = { ...COMMON_GAME_MSGS, msgTypeGame: "Completa" };
                props.showSolution = true;
                props.timeShowSolution = 3;
            }

            if (idev.type === 'interactive-video') {
                props.videoURL = props.url || "";
                props.videoType = "youtube";
            }

            // A) Sincronización de jsonProperties (Metadatos del editor)
            let mergedProps = { ...props };
            snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)(.*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                let originalJson = {};
                try {
                    if (p2 && p2.trim() !== "") originalJson = JSON.parse(p2);
                } catch (e) {}
                mergedProps = { ...originalJson, ...props };
                mergedProps.ideviceId = ideviceId;
                if (mergedProps.id) mergedProps.id = ideviceId;
                if (props.title) mergedProps.title = props.title;
                return p1 + JSON.stringify(mergedProps) + p3;
            });

            // B) Construcción de contenido final con IMAGEN
            let finalMainContent = props.main_text || props.textTextarea || props.story || props.content || "";
            if (props.image && !finalMainContent.includes(props.image)) {
                const imgHtml = `<p style="text-align:center;"><img src="${props.image}" alt="Imagen" style="max-width:100%; height:auto; border-radius:8px;"></p>`;
                finalMainContent = imgHtml + finalMainContent;
            }

            // C) Reemplazo de marcadores en el htmlView (Vista del alumno)
            const placeholders = {
                '{{INSTRUCTIONS}}': props.instructions || mergedProps.instructions || "Lee y responde:",
                '{{CONTENT}}': finalMainContent,
                '{{UDL_EASY}}': props.easy_reading || props.easyReadingTextarea || "",
                '{{UDL_AUDIO}}': props.audio_script || props.audioScriptTextarea || "",
                '{{VIDEO_URL}}': props.videoURL || "",
                '{{VIDEO_TYPE}}': props.videoType || "youtube",
                '{{ACTIVITY}}': (props.activities && props.activities[0]) ? props.activities[0].activity : "",
                '{{FEEDBACK}}': (props.activities && props.activities[0]) ? props.activities[0].feedback : ""
            };

            for (const [key, val] of Object.entries(placeholders)) {
                snippet = snippet.replaceAll(key, val);
            }

            // D) Sincronizar el contenido procesado de vuelta a jsonProperties
            // Esto asegura que el editor de eXe vea las imágenes y el texto final
            snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)(.*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                try {
                    let obj = JSON.parse(p2);
                    if (obj.textTextarea && obj.textTextarea.includes('{{CONTENT}}')) {
                        obj.textTextarea = obj.textTextarea.replace('{{CONTENT}}', finalMainContent);
                    } else if (obj.history && obj.history.includes('{{CONTENT}}')) {
                        obj.history = obj.history.replace('{{CONTENT}}', finalMainContent);
                    }
                    mergedProps = obj; // Actualizamos mergedProps para el XOR
                    return p1 + JSON.stringify(obj) + p3;
                } catch (e) { return match; }
            });

            // E) Codificación XOR interactiva (Juegos v4.0.0-rc3)
            const uriEncodedTypes = ['checklist', 'guess', 'select-media-files', 'rubric', 'complete', 'trueorfalse', 'quick-questions-multiple-choice'];
            if (uriEncodedTypes.includes(idev.type)) {
                const dataGameRegex = /(<div[^>]*class="[^"]*DataGame js-hidden"[^>]*>)(.*?)(<\/div>)/i;
                if (dataGameRegex.test(snippet)) {
                    snippet = snippet.replace(dataGameRegex, (match, p1, p2, p3) => {
                        const encryptedData = exeEncrypt(JSON.stringify(mergedProps));
                        return p1 + encryptedData + p3;
                    });
                }
            }
            
            // F) Script de video interactivo
            if (idev.type === 'interactive-video') {
                snippet = snippet.replace(/(<script id="exe-interactive-video-contents" type="application\/json">)(.*?)(<\/script>)/, (match, p1, p2, p3) => {
                    const videoData = { ideviceID: ideviceId, slides: [], i18n: {} };
                    return p1 + JSON.stringify(videoData) + p3;
                });
            }

            xml += `
    <odePagStructure>
      <odePageId>${pageId}</odePageId>
      <odeBlockId>${blockId}</odeBlockId>
      <blockName>${props.title || blockName}</blockName>
      <iconName>${iconName}</iconName>
      <odePagStructureOrder>${componentOrder++}</odePagStructureOrder>
      <odePagStructureProperties></odePagStructureProperties>
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

    // Corrección crítica RC3: Asegurar que los caracteres & se conviertan en &amp;
    // Evitamos tocar los & que ya son parte de entidades como &amp; o &quot;
    // O mejor, aplicamos una sustitución selectiva que no rompa el XML
    xml = xml.replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;");

    jszip.file("content.xml", xml);
    jszip.file("content.dtd", "<!ELEMENT ode ANY>"); 

    return await jszip.generateAsync({ type: "blob" });
}

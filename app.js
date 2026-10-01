import { compileExeProject, EXE_VERSION } from './compiler.js';
import { SNIPPETS_DICT } from './snippets.js';

/**
 * Ejemplo completo de Situación de Aprendizaje (LOMLOE Canarias · DUA · Merrill)
 * adaptado a la arquitectura de eXeLearning v4.0.5.
 */
const SAMPLE_LOMLOE_PROJECT = {
    metadata: {
        title: "Ecosistemas de Canarias: Guardianes de la Biodiversidad",
        author: "Norberto Martín Afonso",
        theme: "educablue",
        lang: "es",
        license: "creative commons: attribution - share alike 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    pages: [
        {
            page_name: "1. Portada y Guía de la SA",
            idevices: [
                {
                    type: "text",
                    title: "Presentación del Reto Ecosistémico",
                    summary: "Investigar la biodiversidad de los ecosistemas canarios, comprender las amenazas sobre la flora y fauna endémica y diseñar una campaña de concienciación digital.",
                    duration: "4 sesiones de 55 minutos",
                    participants: "Equipos cooperativos (3-4 alumnos)",
                    main_text: "<p>¡Bienvenidos a la Situación de Aprendizaje <strong>Guardianes de la Biodiversidad</strong>! A lo largo de esta unidad didáctica, ustedes investigarán los singulares pisos de vegetación de nuestras islas, el impacto de las especies invasoras y la importancia ecológica de los vientos alisios en el fenómeno de la lluvia horizontal.</p>"
                },
                {
                    type: "digcompedu",
                    title: "Marco de Competencia Digital (DigCompEdu)",
                    indicators: ["1.1", "2.1", "3.1", "5.1", "6.2"],
                    display_mode: "table",
                    content: "<p>Esta Situación de Aprendizaje fomenta el desarrollo de la competencia digital del alumnado mediante la selección crítica de contenidos digitales, la colaboración en red y la resolución de problemas medioambientales con herramientas TIC.</p>"
                }
            ]
        },
        {
            page_name: "2. Fundamentación Curricular y DUA",
            idevices: [
                {
                    type: "udl-content",
                    title: "Marco Teórico Accesible: El Bosque de Laurisilva",
                    main_text: "<p>La <strong>Laurisilva</strong> es un bosque húmedo subtropical relicto de la Era Terciaria que sobrevive en la Macaronesia gracias al mar de nubes generado por los vientos alisios. Destaca por árboles de hojas lauriformes como el laurel, el til, el viñátigo y el barbusano.</p>",
                    easy_reading: "<p>La Laurisilva es una selva muy antigua. Solo existe en pocos lugares del mundo. En Canarias crece en las montañas donde hay niebla y lluvia suave que traen los vientos alisios.</p>",
                    audio_script: "<p>Pista de audio: Escuche la narración de cómo el mar de nubes alimenta los acuíferos de las islas y por qué debemos proteger los endemismos insulares.</p>"
                },
                {
                    type: "download-source-file",
                    title: "Recurso de Apoyo: Guía de Campo",
                    content: "Descarguen el archivo de trabajo para su edición offline o consulta en el aula."
                }
            ]
        },
        {
            page_name: "3. Secuencia Didáctica",
            idevices: [
                {
                    type: "text",
                    title: "Itinerario de Aprendizaje (Fases de Merrill)",
                    main_text: "<p>La secuencia didáctica se estructura en tres fases activas: <strong>Activación</strong> de conocimientos previos, <strong>Demostración y Aplicación</strong> práctica mediante retos gamificados, e <strong>Integración</strong> metacognitiva con evaluación formativa continua.</p>"
                }
            ]
        },
        {
            page_name: "Sesión 1: Exploración del Bosque Nublado",
            parent: "3. Secuencia Didáctica",
            idevices: [
                {
                    type: "casestudy",
                    title: "Caso Práctico: El Misterio de la Niebla de Garajonay",
                    story: "<p>Un equipo de guardas forestales ha detectado una reducción anómala de la humedad en una cuenca del Parque Nacional durante el verano. ¿Qué factores climáticos y antrópicos podrían estar alterando el aporte de la lluvia horizontal?</p>",
                    activity: "<p>Analicen en pequeños grupos las posibles causas y propongan al menos dos medidas de mitigación basadas en la conservación de la cubierta vegetal.</p>",
                    feedback: "<p>Excelente análisis. La disminución del mar de nubes puede deberse a alteraciones en la dinámica de los alisios combinadas con la fragmentación forestal. La reforestación con fayal-brezal actúa como barrera de captación hídrica fundamental.</p>"
                },
                {
                    type: "word-search",
                    title: "Sopa de Letras: Vocabulario de la Laurisilva",
                    instructions: "<p>Encuentren los términos clave relacionados con el ecosistema y la botánica de las islas Canarias:</p>",
                    words: [
                        { word: "LAURISILVA", definition: "Bosque húmedo subtropical" },
                        { word: "ALISIOS", definition: "Vientos húmedos constantes del noreste" },
                        { word: "GARAJONAY", definition: "Parque Nacional en La Gomera" },
                        { word: "ENDEMISMO", definition: "Especie exclusiva de una zona geográfica" },
                        { word: "FAYAL", definition: "Formación de fayas y brezos" },
                        { word: "TIL", definition: "Árbol emblemático de la laurisilva" }
                    ],
                    hide_time_icon: true,
                    time: 0
                }
            ]
        },
        {
            page_name: "Sesión 2: Adaptaciones y Flora Autóctona",
            parent: "3. Secuencia Didáctica",
            idevices: [
                {
                    type: "interactive-video",
                    title: "Vídeo Interactivo: Pisos de Vegetación de Canarias",
                    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                },
                {
                    type: "trueorfalse",
                    title: "Autoevaluación Formativa: Pisos de Vegetación",
                    instructions: "<p>Valoren la veracidad de las siguientes afirmaciones sobre la biogeografía canaria:</p>",
                    attempts: 2,
                    questions: [
                        {
                            question: "¿El pinar canario es especialmente resistente al fuego gracias a su corteza gruesa y su capacidad de rebrote?",
                            solution: true,
                            feedback: "¡Correcto! El Pinus canariensis posee adaptaciones pirófitas únicas.",
                            suggestion: "Recuerden las adaptaciones frente a incendios forestales."
                        },
                        {
                            question: "¿El cardón y la tabaiba crecen preferentemente en las cumbres más altas por encima de los 2.000 metros?",
                            solution: false,
                            feedback: "¡Correcto! El cardonal-tabaibal es característico del piso basal costero (0 - 300 m).",
                            suggestion: "Revisen qué vegetación soporta la aridez del nivel del mar."
                        }
                    ]
                }
            ]
        },
        {
            page_name: "Sesión 3: Gamificación y Reto Final",
            parent: "3. Secuencia Didáctica",
            idevices: [
                {
                    type: "rosco",
                    title: "Rosco de Biodiversidad Insular",
                    instructions: "<p>Demuestren sus conocimientos completando el rosco de palabras de la A a la Z sobre ciencia y medio ambiente:</p>",
                    time: 240,
                    words: [
                        { letter: "A", word: "ALISIOS", definition: "Vientos que transportan humedad hacia el norte de las islas." },
                        { letter: "B", word: "BIODIVERSIDAD", definition: "Variedad de seres vivos que habitan un ecosistema." },
                        { letter: "C", word: "CARDON", definition: "Planta cactiforme endémica del piso basal." },
                        { letter: "D", word: "DRAGO", definition: "Árbol emblemático de savia roja." },
                        { letter: "E", word: "ENDEMISMO", definition: "Especie que solo vive de forma natural en un área delimitada." },
                        { letter: "F", word: "FAYAL", definition: "Comunidad vegetal de sustitución de la laurisilva." },
                        { letter: "G", word: "GARAJONAY", definition: "Parque Nacional Patrimonio de la Humanidad en La Gomera." },
                        { letter: "L", word: "LAURISILVA", definition: "Bosque subtropical nublado de Canarias." },
                        { letter: "P", word: "PINAR", definition: "Bosque dominado por el pino canario en cotas medias y altas." },
                        { letter: "T", word: "TEIDE", definition: "Pico más alto de Canarias y de España." }
                    ]
                }
            ]
        },
        {
            page_name: "4. Evaluación y Metacognición",
            idevices: [
                {
                    type: "checklist",
                    title: "Lista de Cotejo: Evidencias del Producto Final",
                    tasks: [
                        "Hemos identificado los 5 pisos de vegetación principales de las islas.",
                        "Hemos elaborado una infografía accesible con directrices DUA.",
                        "Hemos citado fuentes fiables y recursos con licencia Creative Commons.",
                        "Hemos participado de manera equilibrada en las tareas de equipo.",
                        "Hemos propuesto al menos una acción directa para prevenir incendios."
                    ]
                },
                {
                    type: "rubric",
                    title: "Rúbrica Analítica de Evaluación Competencial",
                    instructions: "Evalúen el desempeño del proyecto utilizando los 4 niveles de logro:",
                    rows: [
                        {
                            category: "Rigor Científico y Contenido",
                            level4: "Explica con precisión los pisos de vegetación, adaptaciones botánicas e interacciones ecológicas sin errores.",
                            level3: "Describe adecuadamente la mayoría de los pisos ecológicos con alguna imprecisión menor.",
                            level2: "Presenta definiciones básicas pero omite relaciones ecológicas relevantes.",
                            level1: "Muestra lagunas conceptuales significativas sobre los ecosistemas."
                        },
                        {
                            category: "Competencia Digital y Formato",
                            level4: "Crea un producto digital accesible, estructurado, con licencias abiertas correctas y diseño atractivo.",
                            level3: "El producto digital es funcional y ordenado con licencias reconocidas.",
                            level2: "El producto digital tiene fallos menores de accesibilidad o atribución de fuentes.",
                            level1: "El formato digital es deficiente o incumple los derechos de autor."
                        }
                    ]
                },
                {
                    type: "progress-report",
                    title: "Informe de Progreso del Alumnado",
                    description: "Consulte el resumen de todas las actividades evaluables realizadas en esta Situación de Aprendizaje."
                }
            ]
        }
    ]
};

/**
 * Catálogo detallado de iDevices para la sección informativa de la aplicación.
 */
const IDEVICES_CATALOG = [
    {
        type: "text",
        name: "Texto / Resumen DUA",
        category: "Presentación",
        desc: "Exposición de contenidos con resumen formativo DUA, imágenes, duración y agrupamientos.",
        example: '{\n  "type": "text",\n  "title": "Introducción",\n  "summary": "Resumen clave",\n  "main_text": "<p>Contenido explicativo...</p>",\n  "image": "https://commons.wikimedia.org/...",\n  "duration": "20 min",\n  "participants": "Individual"\n}'
    },
    {
        type: "udl-content",
        name: "Contenido DUA (Universal)",
        category: "Presentación",
        desc: "Bloque multinivel con texto principal, versión de lectura facilitada y guion de audio accesible.",
        example: '{\n  "type": "udl-content",\n  "title": "Lectura DUA",\n  "main_text": "<p>Texto base...</p>",\n  "easy_reading": "<p>Versión simple...</p>",\n  "audio_script": "<p>Guion de audio...</p>"\n}'
    },
    {
        type: "digcompedu",
        name: "DigCompEdu / Competencia Digital",
        category: "Competencias",
        desc: "Cuadro resumen oficial de las 6 áreas del Marco de Competencia Digital Docente y Alumnado.",
        example: '{\n  "type": "digcompedu",\n  "title": "Competencias Digitales",\n  "indicators": ["1.1", "2.1", "3.1", "5.1", "6.2"],\n  "content": "<p>Justificación curricular de la competencia digital...</p>"\n}'
    },
    {
        type: "casestudy",
        name: "Caso Práctico",
        category: "Metodologías Activas",
        desc: "Narración de un reto o situación real, planteamiento de actividad y retroalimentación desplegable.",
        example: '{\n  "type": "casestudy",\n  "title": "Dilema Real",\n  "story": "<p>Historia del caso...</p>",\n  "activity": "<p>¿Qué harían ustedes?...</p>",\n  "feedback": "<p>Solución pedagógica sugerida...</p>"\n}'
    },
    {
        type: "word-search",
        name: "Sopa de Letras (Novedad v4.0.5)",
        category: "Gamificación",
        desc: "Juego de sopa de letras interactivo con opción de ocultar el icono de tiempo y lista de pistas.",
        example: '{\n  "type": "word-search",\n  "title": "Sopa de Términos",\n  "instructions": "<p>Encuentren los conceptos:</p>",\n  "words": [\n    { "word": "TERMINO", "definition": "Definición o pista" }\n  ],\n  "hide_time_icon": true,\n  "time": 0\n}'
    },
    {
        type: "trueorfalse",
        name: "Verdadero o Falso (v4.0.5)",
        category: "Evaluación",
        desc: "Cuestionario de enunciados de verdadero/falso con intentos configurables y guardado de puntuación.",
        example: '{\n  "type": "trueorfalse",\n  "title": "Cuestionario VF",\n  "attempts": 2,\n  "questions": [\n    {\n      "question": "Enunciado...",\n      "solution": true,\n      "feedback": "Justificación..."\n    }\n  ]\n}'
    },
    {
        type: "rosco",
        name: "Rosco de Palabras (Pasapalabra)",
        category: "Gamificación",
        desc: "Rosco interactivo de la A a la Z con hasta 10-15 definiciones didácticas sin desbordamiento.",
        example: '{\n  "type": "rosco",\n  "title": "Rosco de Ciencias",\n  "time": 240,\n  "words": [\n    { "letter": "A", "word": "ALISIOS", "definition": "Vientos insulares" }\n  ]\n}'
    },
    {
        type: "rubric",
        name: "Rúbrica Analítica (v4.0.5)",
        category: "Evaluación",
        desc: "Rúbrica con 4 niveles ponderados (Excelente, Satisfactorio, Mejorable, Insuficiente) y soporte SCORM.",
        example: '{\n  "type": "rubric",\n  "title": "Rúbrica de Evaluación",\n  "rows": [\n    {\n      "category": "Criterio 1",\n      "level4": "Excelente",\n      "level3": "Satisfactorio",\n      "level2": "Mejorable",\n      "level1": "Insuficiente"\n    }\n  ]\n}'
    },
    {
        type: "checklist",
        name: "Lista de Cotejo",
        category: "Evaluación",
        desc: "Lista de verificación de tareas completadas o evidencias de aprendizaje esperadas.",
        example: '{\n  "type": "checklist",\n  "title": "Comprobación de Tareas",\n  "tasks": [\n    "He contrastado las fuentes de información.",\n    "He redactado la conclusión final."\n  ]\n}'
    },
    {
        type: "sort",
        name: "Ordena / Secuenciación (v4.0.5)",
        category: "Gamificación",
        desc: "Juego de arrastrar tarjetas en el orden correcto, con intentos configurables y guardado de puntuación.",
        example: '{\n  "type": "sort",\n  "title": "Ordena las Fases",\n  "attempts": 3,\n  "items": [\n    "1. Activación",\n    "2. Demostración",\n    "3. Aplicación",\n    "4. Integración"\n  ]\n}'
    },
    {
        type: "crossword",
        name: "Crucigrama Educativo",
        category: "Gamificación",
        desc: "Crucigrama interactivo generado automáticamente a partir de una lista de palabras y definiciones.",
        example: '{\n  "type": "crossword",\n  "title": "Crucigrama Didáctico",\n  "words": [\n    { "word": "ECOSISTEMA", "definition": "Comunidad biológica y su entorno" }\n  ]\n}'
    },
    {
        type: "relate",
        name: "Relaciona Parejas",
        category: "Gamificación",
        desc: "Juego de emparejar conceptos con sus definiciones o imágenes asociadas.",
        example: '{\n  "type": "relate",\n  "title": "Empareja Conceptos",\n  "pairs": [\n    { "text1": "Pino Canario", "text2": "Resistente al fuego (Pinus canariensis)" }\n  ]\n}'
    },
    {
        type: "form",
        name: "Formulario / Cuestionario (v4.0.5)",
        category: "Evaluación",
        desc: "Cuestionario de preguntas variadas con botón de guardar puntuación y estadísticas.",
        example: '{\n  "type": "form",\n  "title": "Cuestionario Reflexivo",\n  "questions": [\n    { "question": "¿Cuáles son las 3 R de la ecología?", "type": "true-false" }\n  ]\n}'
    },
    {
        type: "guess",
        name: "Adivina el Término",
        category: "Gamificación",
        desc: "Juego de deletreo con pista, número de vidas y porcentaje de letras mostradas.",
        example: '{\n  "type": "guess",\n  "title": "Adivina el Concepto",\n  "term": "LAURISILVA",\n  "hint": "Bosque nublado de Canarias",\n  "feedback": "¡Enhorabuena!"\n}'
    },
    {
        type: "interactive-video",
        name: "Vídeo Interactivo",
        category: "Multimedia",
        desc: "Vídeo de YouTube incrustado con paradas reflexivas o cuestiones asociadas.",
        example: '{\n  "type": "interactive-video",\n  "title": "Vídeo Didáctico",\n  "url": "https://www.youtube.com/watch?v=..."\n}'
    },
    {
        type: "progress-report",
        name: "Informe de Progreso",
        category: "Evaluación",
        desc: "Panel centralizado que recopila las calificaciones de todos los iDevices de la SA.",
        example: '{\n  "type": "progress-report",\n  "title": "Informe de Progreso",\n  "description": "Resumen de las actividades completadas."\n}'
    }
];

/**
 * Función generadora del Prompt Maestro para modelos de IA.
 */
const buildMasterPrompt = (stage, sessions, topic) => {
    return `Actúe como Asesor Tecnopedagógico experto en Situaciones de Aprendizaje (SA) LOMLOE (Canarias) y especialista en eXeLearning v${EXE_VERSION} estable.

Su cometido es diseñar una Situación de Aprendizaje COMPLETA y motivadora, estructurando la salida EXCLUSIVAMENTE en un único bloque de código JSON válido, listo para ser compilado a un paquete nativo .elpx de eXeLearning.

PARÁMETROS DEL PROYECTO:
- Etapa / Curso: ${stage || "Educación Secundaria Obligatoria"}
- Nº de sesiones: ${sessions || 4}
- Temática / Saberes Básicos / Criterios: ${topic || "Ecosistemas de Canarias, biodiversidad y sostenibilidad"}
- Marco Pedagógico: Principios DUA + Fases de Merrill (Activación, Demostración, Aplicación, Integración) + Evaluación Formativa Continua.
- Estilo y Accesibilidad: WCAG 2.2 nivel AA (compatible con el tema oficial EducaBlue de eXeLearning v${EXE_VERSION}).

ESTRUCTURA DIDÁCTICA DEL JSON:
{
  "metadata": {
    "title": "Título conciso y motivador de la SA",
    "author": "Nombre del docente o centro educativo",
    "theme": "educablue",
    "lang": "es",
    "license": "creative commons: attribution - share alike 4.0"
  },
  "pages": [
    // 1. Portada y Justificación: text con resumen DUA ("summary") + digcompedu con indicadores (ej. ["1.1", "2.1", "3.2"])
    // 2. Fundamentación Curricular y DUA: udl-content (texto base, lectura facilitada y guion de audio) + download-source-file
    // 3. Secuencia Didáctica: text con la hoja de ruta metodológica
    // 4 a ${3 + Number(sessions)}. Sesiones 1 a ${sessions} (especificar "parent": "Secuencia Didáctica" para anidarlas jerárquicamente en el árbol de navegación):
    //    Distribuir iDevices: casestudy, word-search, trueorfalse, rosco, interactive-video, sort, relate, guess
    // Final. Evaluación y Metacognición: checklist + rubric (rúbrica analítica de 4 niveles ponderados) + progress-report
  ]
}

ESPECIFICACIONES DE IDEVICES EN eXeLearning v${EXE_VERSION}:
1. 'word-search': "title", "instructions", "words": [{"word", "definition"}], "hide_time_icon": true.
2. 'trueorfalse': "title", "attempts": 2, "questions": [{"question", "solution": true/false, "feedback", "suggestion"}].
3. 'rosco': "title", "time": 240, "words": [{"letter", "word", "definition"}] (máximo 10-12 palabras; evitar Ñ, X, Y, Z).
4. 'rubric': "title", "instructions", "rows": [{"category", "level4", "level3", "level2", "level1"}].
5. 'sort': "title", "attempts": 3, "items": ["paso 1", "paso 2", ...].
6. 'relate': "title", "pairs": [{"text1", "text2"}].
7. 'casestudy': "title", "story", "activity", "feedback".
8. 'digcompedu': "title", "indicators": ["1.1", "2.1", "3.2"], "content".
9. 'udl-content': "title", "main_text", "easy_reading", "audio_script".
10. 'checklist': "title", "tasks": ["evidencia 1", ...].
11. 'text': "title", "main_text", "summary", "duration", "participants", opcional "teacher_only": true.

REGLAS MULTIMEDIA Y FORMATO DE SALIDA:
- Imágenes de Wikimedia Commons: Utilice formato directo oficial: https://commons.wikimedia.org/wiki/Special:FilePath/Nombre_Archivo.jpg
- Vídeos: Enlaces funcionales de YouTube.
- IMPORTANTE: Devuelva ÚNICAMENTE el bloque de código JSON sin ningún texto explicativo previo ni posterior.`;
};

document.addEventListener('DOMContentLoaded', () => {
    // Referencias UI - Formulario de Prompts
    const promptStageInput = document.getElementById('prompt-stage');
    const numSessionsInput = document.getElementById('num-sessions');
    const promptTopicInput = document.getElementById('prompt-topic');
    const promptDisplay = document.getElementById('prompt-display');
    const btnCopyPrompt = document.getElementById('btn-copy-prompt');
    const promptCharCount = document.getElementById('prompt-char-count');
    const copyStatus = document.getElementById('copy-status');

    // Referencias UI - Metadatos
    const metaTitleInput = document.getElementById('meta-title');
    const metaAuthorInput = document.getElementById('meta-author');
    const metaThemeSelect = document.getElementById('meta-theme');
    const metaLicenseSelect = document.getElementById('meta-license');

    // Referencias UI - Editor y Compilador
    const jsonInputMaster = document.getElementById('json-input-master');
    const btnCompile = document.getElementById('btn-compile');
    const errorDisplay = document.getElementById('error-display');
    const btnSampleProject = document.getElementById('btn-sample-project');
    const btnFormatJson = document.getElementById('btn-format-json');
    const btnCopyJson = document.getElementById('btn-copy-json');
    const btnClearJson = document.getElementById('btn-clear-json');

    // Diagnósticos en Vivo
    const diagBadge = document.getElementById('diag-badge');
    const diagPageCount = document.getElementById('diag-page-count');
    const diagIdeviceCount = document.getElementById('diag-idevice-count');
    const diagIdeviceTags = document.getElementById('diag-idevice-tags');

    // Gestión de Archivos (Guardar/Cargar)
    const btnSave = document.getElementById('btn-save-project');
    const btnLoad = document.getElementById('btn-load-project');
    const inputLoad = document.getElementById('input-load-project');

    // Modal
    const btnShowModal = document.getElementById('btn-show-instructions');
    const modal = document.getElementById('modal-instructions');
    const closeModal = document.getElementById('close-modal');

    // Catálogo
    const catalogContainer = document.getElementById('catalog-content');

    // 1. Actualización Dinámica del Prompt Maestro
    function updatePromptPreview() {
        const stage = promptStageInput ? promptStageInput.value.trim() : "ESO";
        const num = numSessionsInput ? (numSessionsInput.value || 4) : 4;
        const topic = promptTopicInput ? promptTopicInput.value.trim() : "Biodiversidad de Canarias";
        const promptText = buildMasterPrompt(stage, num, topic);
        if (promptDisplay) {
            promptDisplay.textContent = promptText;
        }
        if (promptCharCount) {
            const len = promptText.length;
            if (len <= 3800) {
                promptCharCount.className = "char-count-badge";
                promptCharCount.innerHTML = `✓ ${len.toLocaleString()} / 4.000 caracteres (Apto para NotebookLM)`;
            } else if (len <= 4000) {
                promptCharCount.className = "char-count-badge warning";
                promptCharCount.innerHTML = `⚠ ${len.toLocaleString()} / 4.000 caracteres (Próximo al límite de NotebookLM)`;
            } else {
                promptCharCount.className = "char-count-badge danger";
                promptCharCount.innerHTML = `✕ ${len.toLocaleString()} / 4.000 caracteres (Excede límite de NotebookLM)`;
            }
        }
    }

    [promptStageInput, numSessionsInput, promptTopicInput].forEach(inp => {
        if (inp) inp.addEventListener('input', updatePromptPreview);
    });
    updatePromptPreview();

    if (btnCopyPrompt) {
        btnCopyPrompt.addEventListener('click', () => {
            const stage = promptStageInput ? promptStageInput.value.trim() : "ESO";
            const num = numSessionsInput ? (numSessionsInput.value || 4) : 4;
            const topic = promptTopicInput ? promptTopicInput.value.trim() : "Biodiversidad de Canarias";
            const promptText = buildMasterPrompt(stage, num, topic);

            navigator.clipboard.writeText(promptText).then(() => {
                if (copyStatus) {
                    copyStatus.style.display = 'inline-block';
                    setTimeout(() => { copyStatus.style.display = 'none'; }, 2500);
                }
            });
        });
    }

    // 2. Limpieza de texto JSON (eliminar bloques de markdown ```json)
    function sanitizeJsonText(rawText) {
        if (!rawText) return "";
        return rawText
            .replace(/^```(?:json)?/gim, '')
            .replace(/```$/gm, '')
            .trim();
    }

    // 3. Diagnóstico en Tiempo Real
    function runLiveDiagnostics() {
        const raw = sanitizeJsonText(jsonInputMaster ? jsonInputMaster.value : "");
        if (!raw) {
            if (diagBadge) {
                diagBadge.className = "badge-status status-empty";
                diagBadge.textContent = "Esperando JSON...";
            }
            if (diagPageCount) diagPageCount.textContent = "0 páginas";
            if (diagIdeviceCount) diagIdeviceCount.textContent = "0 iDevices";
            if (diagIdeviceTags) diagIdeviceTags.innerHTML = "";
            if (errorDisplay) errorDisplay.style.display = 'none';
            return;
        }

        try {
            const parsed = JSON.parse(raw);
            const pages = Array.isArray(parsed) ? parsed : (parsed.pages || parsed.sections || []);
            
            if (!Array.isArray(pages)) {
                throw new Error("El JSON debe contener un array de páginas o un objeto con la propiedad 'pages'.");
            }

            const totalPages = pages.length;
            let totalIdevices = 0;
            const typeCounts = {};
            const unknownTypes = new Set();

            function inspectPage(p) {
                const devs = p.idevices || [];
                totalIdevices += devs.length;
                devs.forEach(d => {
                    const t = (d.type || d.idevice || 'text').toLowerCase();
                    typeCounts[t] = (typeCounts[t] || 0) + 1;
                    if (!SNIPPETS_DICT[t]) {
                        unknownTypes.add(t);
                    }
                });
                if (Array.isArray(p.subpages)) p.subpages.forEach(inspectPage);
                if (Array.isArray(p.children)) p.children.forEach(inspectPage);
            }

            pages.forEach(inspectPage);

            if (diagBadge) {
                diagBadge.className = "badge-status status-valid";
                diagBadge.textContent = "✓ JSON Válido";
            }
            if (diagPageCount) diagPageCount.textContent = `${totalPages} páginas`;
            if (diagIdeviceCount) diagIdeviceCount.textContent = `${totalIdevices} iDevices`;

            if (diagIdeviceTags) {
                let tagsHtml = '';
                for (const [t, count] of Object.entries(typeCounts)) {
                    const isUnknown = unknownTypes.has(t);
                    const tagClass = isUnknown ? 'tag-warn' : 'tag-valid';
                    tagsHtml += `<span class="diag-tag ${tagClass}">${t}: ${count}</span>`;
                }
                diagIdeviceTags.innerHTML = tagsHtml;
            }

            // Si el objeto JSON tiene metadatos, sincronizarlos con los campos
            if (parsed.metadata) {
                if (parsed.metadata.title && metaTitleInput && !metaTitleInput.dataset.userEdited) {
                    metaTitleInput.value = parsed.metadata.title;
                }
                if (parsed.metadata.author && metaAuthorInput && !metaAuthorInput.dataset.userEdited) {
                    metaAuthorInput.value = parsed.metadata.author;
                }
                if (parsed.metadata.theme && metaThemeSelect) {
                    metaThemeSelect.value = parsed.metadata.theme.toLowerCase();
                }
            }

            if (errorDisplay) {
                if (unknownTypes.size > 0) {
                    errorDisplay.innerHTML = `⚠️ <strong>Aviso:</strong> Se han detectado iDevices no estándar: <code>${Array.from(unknownTypes).join(', ')}</code>. Se procesarán como bloques de texto enriquecido.`;
                    errorDisplay.style.display = 'block';
                } else {
                    errorDisplay.style.display = 'none';
                }
            }

        } catch (err) {
            if (diagBadge) {
                diagBadge.className = "badge-status status-invalid";
                diagBadge.textContent = "✕ Error de sintaxis";
            }
            if (errorDisplay) {
                errorDisplay.innerHTML = `❌ <strong>Error en el JSON:</strong> ${err.message}`;
                errorDisplay.style.display = 'block';
            }
        }
    }

    if (jsonInputMaster) {
        jsonInputMaster.addEventListener('input', runLiveDiagnostics);
    }

    if (metaTitleInput) {
        metaTitleInput.addEventListener('input', () => { metaTitleInput.dataset.userEdited = "true"; });
    }
    if (metaAuthorInput) {
        metaAuthorInput.addEventListener('input', () => { metaAuthorInput.dataset.userEdited = "true"; });
    }

    // 4. Botón: Cargar SA de Ejemplo LOMLOE
    if (btnSampleProject) {
        btnSampleProject.addEventListener('click', () => {
            const formatted = JSON.stringify(SAMPLE_LOMLOE_PROJECT, null, 2);
            if (jsonInputMaster) {
                jsonInputMaster.value = formatted;
                runLiveDiagnostics();
            }
            if (metaTitleInput) metaTitleInput.value = SAMPLE_LOMLOE_PROJECT.metadata.title;
            if (metaAuthorInput) metaAuthorInput.value = SAMPLE_LOMLOE_PROJECT.metadata.author;
            if (metaThemeSelect) metaThemeSelect.value = SAMPLE_LOMLOE_PROJECT.metadata.theme;
            
            // Animación visual de confirmación en el botón
            const originalText = btnSampleProject.innerHTML;
            btnSampleProject.innerHTML = '<span>✅</span> ¡Ejemplo cargado!';
            setTimeout(() => { btnSampleProject.innerHTML = originalText; }, 2000);
        });
    }

    // 5. Herramientas Rápidas del Editor (Formatear, Copiar, Limpiar)
    if (btnFormatJson) {
        btnFormatJson.addEventListener('click', () => {
            try {
                const cleaned = sanitizeJsonText(jsonInputMaster.value);
                if (!cleaned) return;
                const parsed = JSON.parse(cleaned);
                jsonInputMaster.value = JSON.stringify(parsed, null, 2);
                runLiveDiagnostics();
            } catch (err) {
                alert("No se pudo formatear el JSON. Comprueben la sintaxis: " + err.message);
            }
        });
    }

    if (btnCopyJson) {
        btnCopyJson.addEventListener('click', () => {
            if (!jsonInputMaster.value.trim()) return;
            navigator.clipboard.writeText(jsonInputMaster.value).then(() => {
                const originalText = btnCopyJson.innerHTML;
                btnCopyJson.innerHTML = '<span>✅</span> ¡Copiado!';
                setTimeout(() => { btnCopyJson.innerHTML = originalText; }, 1500);
            });
        });
    }

    if (btnClearJson) {
        btnClearJson.addEventListener('click', () => {
            if (confirm("¿Desean limpiar el contenido del editor JSON?")) {
                jsonInputMaster.value = "";
                runLiveDiagnostics();
            }
        });
    }

    // 6. Proceso de Compilación (.elpx)
    if (btnCompile) {
        btnCompile.addEventListener('click', async () => {
            if (errorDisplay) errorDisplay.style.display = 'none';

            try {
                const cleaned = sanitizeJsonText(jsonInputMaster.value);
                if (!cleaned) throw new Error("El editor JSON está vacío. Peguen una estructura de Situación de Aprendizaje.");

                const data = JSON.parse(cleaned);

                // Opciones y metadatos recopilados de la UI
                const compileOptions = {
                    title: metaTitleInput ? metaTitleInput.value.trim() : "Situación de Aprendizaje REA",
                    author: metaAuthorInput ? metaAuthorInput.value.trim() : "Norberto Martín Afonso",
                    theme: metaThemeSelect ? metaThemeSelect.value : "educablue",
                    license: metaLicenseSelect ? metaLicenseSelect.value : "creative commons: attribution - share alike 4.0",
                    lang: "es"
                };

                btnCompile.disabled = true;
                const originalContent = btnCompile.innerHTML;
                btnCompile.innerHTML = '<span class="loader"></span> <span>Compilando paquete .elpx (v4.0.5)...</span>';

                const zipBlob = await compileExeProject(data, compileOptions);

                // Derivar nombre de archivo seguro
                const safeTitle = (compileOptions.title || "proyecto_sa")
                    .toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9_-]/g, "_")
                    .substring(0, 40);
                const filename = `${safeTitle}_v405_${Date.now()}.elpx`;

                const downloadUrl = window.URL.createObjectURL(zipBlob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(downloadUrl);

                btnCompile.disabled = false;
                btnCompile.innerHTML = '<span>✅</span> <span>¡Proyecto descargado con éxito!</span>';
                setTimeout(() => { btnCompile.innerHTML = originalContent; }, 3000);

            } catch (err) {
                console.error("Error en la compilación:", err);
                if (errorDisplay) {
                    errorDisplay.innerHTML = `❌ <strong>Error de compilación:</strong> ${err.message}`;
                    errorDisplay.style.display = 'block';
                }
                btnCompile.disabled = false;
            }
        });
    }

    // 7. Guardar y Cargar Proyecto en JSON
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const projectData = {
                metadata: {
                    title: metaTitleInput ? metaTitleInput.value : "",
                    author: metaAuthorInput ? metaAuthorInput.value : "",
                    theme: metaThemeSelect ? metaThemeSelect.value : "educablue",
                    license: metaLicenseSelect ? metaLicenseSelect.value : ""
                },
                content: jsonInputMaster.value,
                savedAt: new Date().toISOString()
            };
            const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sa_proyecto_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    if (btnLoad && inputLoad) {
        btnLoad.addEventListener('click', () => inputLoad.click());
        inputLoad.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const parsed = JSON.parse(ev.target.result);
                    if (parsed.content) {
                        jsonInputMaster.value = parsed.content;
                    } else {
                        jsonInputMaster.value = JSON.stringify(parsed, null, 2);
                    }
                    if (parsed.metadata) {
                        if (parsed.metadata.title && metaTitleInput) metaTitleInput.value = parsed.metadata.title;
                        if (parsed.metadata.author && metaAuthorInput) metaAuthorInput.value = parsed.metadata.author;
                        if (parsed.metadata.theme && metaThemeSelect) metaThemeSelect.value = parsed.metadata.theme;
                    }
                    runLiveDiagnostics();
                } catch (err) {
                    alert("El archivo seleccionado no contiene un JSON válido: " + err.message);
                }
            };
            reader.readAsText(file);
        });
    }

    // 8. Renderizado del Catálogo de iDevices
    if (catalogContainer) {
        let catalogHtml = '<div class="catalog-grid">';
        IDEVICES_CATALOG.forEach(idev => {
            catalogHtml += `
                <div class="catalog-card">
                    <div class="catalog-card-header">
                        <span class="catalog-card-tag">${idev.category}</span>
                        <span class="catalog-card-type"><code>${idev.type}</code></span>
                    </div>
                    <h5>${idev.name}</h5>
                    <p>${idev.desc}</p>
                    <div class="catalog-card-footer">
                        <button class="secondary-btn btn-xs btn-insert-snippet" data-type="${idev.type}">
                            Insertar plantilla
                        </button>
                    </div>
                </div>
            `;
        });
        catalogHtml += '</div>';
        catalogContainer.innerHTML = catalogHtml;

        catalogContainer.querySelectorAll('.btn-insert-snippet').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-type');
                const found = IDEVICES_CATALOG.find(i => i.type === type);
                if (found && jsonInputMaster) {
                    navigator.clipboard.writeText(found.example).then(() => {
                        const original = btn.innerText;
                        btn.innerText = "¡Copiado!";
                        setTimeout(() => { btn.innerText = original; }, 1800);
                    });
                }
            });
        });
    }

    // 9. Modal de Instrucciones Metodológicas
    if (modal && btnShowModal && closeModal) {
        btnShowModal.onclick = () => modal.style.display = "flex";
        closeModal.onclick = () => modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target === modal) modal.style.display = "none";
        };
    }

    document.querySelectorAll('.btn-copy-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const textToCopy = targetEl.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.innerText;
                    btn.innerText = "¡Copiado!";
                    setTimeout(() => { btn.innerText = originalText; }, 2000);
                });
            }
        });
    });

    // 10. Sincronización en el Modal
    const modalAge = document.getElementById('modal-prompt-age');
    const modalSessions = document.getElementById('modal-prompt-sessions');
    const modalTopic = document.getElementById('modal-prompt-topic');
    const modalResearchPrompt = document.getElementById('prompt-research');

    if (modalResearchPrompt) {
        modalResearchPrompt.dataset.original = modalResearchPrompt.innerHTML;
    }

    function updateModalPrompt() {
        if (!modalAge || !modalSessions || !modalTopic || !modalResearchPrompt) return;
        const age = modalAge.value || "[EDAD/CURSO]";
        const sessions = modalSessions.value || "[Nº SESIONES]";
        const topic = modalTopic.value || "[TEMÁTICA]";

        let text = modalResearchPrompt.dataset.original;
        text = text.replace("[EDAD/CURSO DEL ALUMNADO]", age);
        text = text.replace("[NÚMERO DE SESIONES]", sessions);
        text = text.replace("[TEMÁTICA, CRITERIOS O SABERES BÁSICOS]", topic);
        modalResearchPrompt.innerHTML = text;
    }

    [modalAge, modalSessions, modalTopic].forEach(inp => {
        if (inp) inp.addEventListener('input', updateModalPrompt);
    });
});

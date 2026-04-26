import { compileExeProject } from './compiler.js';

const SHARED_RULES = `REGLAS TÉCNICAS:
1. iDevice 'text': Usa "title" (obligatorio), "content", "image" (URL directa y válida), "duration" y "participants".
2. iDevice 'casestudy': Usa "title", "story", "activity" y "feedback".
3. iDevice 'form': Usa "title", "questions" (array).
4. iDevice 'image-gallery': Usa "title", "images" (array con url y caption).
5. FORMATO: Devuelve ÚNICAMENTE un objeto JSON de página: { "page_name": "...", "idevices": [...] }`;

const PHASED_PROMPTS = {
    1: `Eres un Arquitecto eXeLearning experto en DUA y DigCompEdu. FASE 1: INICIO Y FUNDAMENTACIÓN.
Genera el JSON para la portada y justificación de la SA.
IDEVICES RECOMENDADOS:
- 'text': Portada con imagen evocadora, resumen y metadatos (duración, participantes).
- 'digcompedu': Detalla las competencias digitales trabajadas.
- 'udl-content': Presenta los objetivos con versiones de audio/lectura fácil para inclusión.
- 'download-source-file': Adjunta guías o mapas en PDF.

${SHARED_RULES}`,

    2: (num) => `Eres un Arquitecto eXeLearning experto en Gamificación. FASE 2: SECUENCIA (Sesión/Bloque/Actividad nº${num}).
Céntrate EXCLUSIVAMENTE en generar el JSON para la Sesión o Bloque nº${num}.
IDEVICES RECOMENDADOS PARA VARIAR:
- 'udl-content' + 'interactive-video': Para motivar y presentar teoría.
- 'casestudy' + 'guess': Para exploración y retos rápidos de vocabulario.
- 'text' + 'external-website': Para profundizar con fuentes de National Geographic u otros.
- 'select-media-files' o 'form': Para práctica y evaluación formativa.
- 'image-gallery': Para mostrar mapas, grabados o paisajes históricos.

Asegúrate de que cada iDevice tenga un título ("title") descriptivo y motivador.
${SHARED_RULES}`,

    3: `Eres un Arquitecto eXeLearning. FASE 3: CIERRE Y METADATOS.
Genera el JSON para el cierre y la evaluación de la SA.
IDEVICES RECOMENDADOS:
- 'text': Resumen del legado, conclusiones y bibliografía.
- 'checklist': Lista de objetivos alcanzados (autoevaluación del alumno).
- 'rubric': Tabla de evaluación detallada (categorías y niveles 1-4).
- 'progress-report': Para que el alumno vea su resumen de trabajo.
- 'download-source-file': Para descargar el paquete .elpx fuente.

${SHARED_RULES}`
};

document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy-prompt');
    const btnCompile = document.getElementById('btn-compile');
    const copyStatus = document.getElementById('copy-status');
    const errorDisplay = document.getElementById('error-display');
    const phaseBtns = document.querySelectorAll('.phase-btn');
    
    // Controles de Prompt
    const promptExtraControls = document.getElementById('prompt-extra-controls');
    const promptSessionNumber = document.getElementById('prompt-session-number');

    // Inputs fijos
    const phase1Input = document.getElementById('json-phase-1');
    const phase3Input = document.getElementById('json-phase-3');

    // Configuración dinámica Fase 2
    const sessionCountInput = document.getElementById('session-count');
    const sessionsContainer = document.getElementById('sessions-container');

    let currentPhase = "1";

    // Función para renderizar textareas de sesiones
    function renderSessionInputs() {
        const count = parseInt(sessionCountInput.value) || 1;
        const currentData = {};
        
        // Guardar datos actuales para no perderlos al re-renderizar
        sessionsContainer.querySelectorAll('textarea').forEach(tx => {
            currentData[tx.id] = tx.value;
        });

        sessionsContainer.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const id = `json-phase-2-${i}`;
            const group = document.createElement('div');
            group.className = 'input-group';
            group.innerHTML = `
                <label>Sesión/Actividad/Bloque ${i}</label>
                <textarea id="${id}" class="phase-textarea" placeholder='Pega aquí el JSON de la Sesión ${i}...'>${currentData[id] || ''}</textarea>
            `;
            sessionsContainer.appendChild(group);
        }
    }

    // Inicializar y escuchar cambios
    renderSessionInputs();
    sessionCountInput.addEventListener('change', renderSessionInputs);
    sessionCountInput.addEventListener('keyup', renderSessionInputs);

    // Selección de Fase
    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            phaseBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPhase = btn.dataset.phase;

            if (currentPhase === "2") {
                promptExtraControls.classList.remove('js-hidden');
            } else {
                promptExtraControls.classList.add('js-hidden');
            }
        });
    });

    // Copiar Prompt
    btnCopy.addEventListener('click', () => {
        let prompt = "";
        if (currentPhase === "2") {
            const num = promptSessionNumber.value || 1;
            prompt = PHASED_PROMPTS[2](num);
        } else {
            prompt = PHASED_PROMPTS[currentPhase];
        }

        navigator.clipboard.writeText(prompt).then(() => {
            copyStatus.style.display = 'block';
            setTimeout(() => {
                copyStatus.style.display = 'none';
            }, 2000);
        });
    });

    // Compilar Proyecto Completo
    btnCompile.addEventListener('click', async () => {
        errorDisplay.style.display = 'none';
        let projectPages = [];

        try {
            if (phase1Input.value.trim()) {
                const p1 = JSON.parse(phase1Input.value);
                if (Array.isArray(p1)) projectPages = projectPages.concat(p1);
                else projectPages.push(p1);
            }

            const sessionInputs = sessionsContainer.querySelectorAll('textarea');
            sessionInputs.forEach(input => {
                if (input.value.trim()) {
                    const p = JSON.parse(input.value);
                    if (Array.isArray(p)) projectPages = projectPages.concat(p);
                    else projectPages.push(p);
                }
            });

            if (phase3Input.value.trim()) {
                const p3 = JSON.parse(phase3Input.value);
                if (Array.isArray(p3)) projectPages = projectPages.concat(p3);
                else projectPages.push(p3);
            }

            if (projectPages.length === 0) {
                throw new Error("Debes rellenar al menos un área de texto con un JSON válido.");
            }

            btnCompile.disabled = true;
            btnCompile.innerHTML = '<span class="loader"></span> Generando...';
            
            const zipBlob = await compileExeProject(projectPages);
            const url = window.URL.createObjectURL(zipBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sa_phased_v4_${Date.now()}.elpx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
            btnCompile.disabled = false;
            btnCompile.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Generar Proyecto Completo .elpx';
            
        } catch (e) {
            errorDisplay.textContent = "Error en los datos: " + e.message;
            errorDisplay.style.display = 'block';
            btnCompile.disabled = false;
        }
    });
});

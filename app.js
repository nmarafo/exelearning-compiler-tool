import { compileExeProject } from './compiler.js';

const SHARED_RULES = `REGLAS TÉCNICAS:
1. iDevice 'text': Usa "title", "main_text", "image" (SOLO si hay URL en el listado adjunto, si no déjalo vacío ""), "duration" y "participants".
2. iDevice 'udl-content': Usa "title", "main_text", "easy_reading" y "audio_script".
3. iDevice 'interactive-video': Usa "title" y "url" (URL de YouTube del listado).
4. iDevice 'casestudy': Usa "title", "story", "activity" y "feedback".
5. iDevice 'image-gallery': Usa "title", "images" (array de {url, caption} solo con fuentes del listado).
6. iDevice 'form': Usa "title", "questions" (array).
7. iDevice 'guess': Usa "title", "term", "instructions", "hint" y "feedback".
8. iDevice 'checklist': Usa "title" y "tasks" (array de strings).
9. iDevice 'rubric': Usa "title" y "rows" (array de {category, level1, level2, level3, level4}).
10. FORMATO: Devuelve ÚNICAMENTE un objeto JSON de página: { "page_name": "...", "idevices": [...] }`;

const PHASED_PROMPTS = {
    1: `Eres un Arquitecto eXeLearning. FASE 1: INICIO Y FUNDAMENTACIÓN.
Genera el JSON para las páginas iniciales.
- OBLIGATORIO: Usa solo imágenes y vídeos del listado de recursos multimedia adjunto. Si el listado de imágenes está vacío, el campo "image" DEBE ser "".
- Incluye: Portada (text), Justificación (text+digcompedu), Objetivos (udl-content) y Descarga (download-source-file).

${SHARED_RULES}`,

    2: (num) => `Eres un Arquitecto eXeLearning. FASE 2: SECUENCIA (Sesión/Bloque nº${num}).
Genera el JSON para la Sesión nº${num}.
- OBLIGATORIO: Usa las URLs de YouTube del listado que coincidan con la temática.
- No inventes URLs de imágenes. Si no hay en el listado, usa solo texto.
- Usa iDevices variados según la SA (casestudy, guess, interactive-video, select-media-files).

${SHARED_RULES}`,

    3: `Eres un Arquitecto eXeLearning. FASE 3: CIERRE Y EVALUACIÓN.
Genera el JSON final de cierre.
- OBLIGATORIO: Crea una 'rubric' profesional con 4 niveles de desempeño. Usa el campo "rows" con esta estructura: { "category": "...", "level1": "...", "level2": "...", "level3": "...", "level4": "..." }.
- Crea un 'checklist' con las tareas clave de la SA.
- Incluye Conclusiones (text) y el Informe de Progreso (progress-report).

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
    const phase1Input = document.getElementById('json-input-1');
    const phase3Input = document.getElementById('json-input-3');

    // Configuración dinámica Fase 2
    const btnAddSession = document.getElementById('btn-add-session');
    const sessionsContainer = document.getElementById('sessions-container');

    btnAddSession.addEventListener('click', () => {
        const currentSessions = sessionsContainer.querySelectorAll('.session-item').length;
        if (currentSessions >= 4) {
            alert("Máximo 4 sesiones permitidas.");
            return;
        }
        
        const sNum = currentSessions + 1;
        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'session-item glass-panel';
        sessionDiv.innerHTML = `
            <div class="panel-header">
                <div class="icon-box s-icon">S${sNum}</div>
                <div>
                    <h4>Sesión ${sNum}: Desarrollo</h4>
                    <p>Pega aquí el JSON de la Sesión ${sNum}.</p>
                </div>
            </div>
            <textarea id="json-s${sNum}" placeholder='[ { "page_name": "Sesión ${sNum}...", "idevices": [...] } ]'></textarea>
        `;
        sessionsContainer.appendChild(sessionDiv);
    });

    let currentPhase = "1";

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

    // 4. Gestión de Proyecto (Guardar/Cargar)
    document.getElementById('btn-save-project').addEventListener('click', () => {
        const projectData = {
            phase1: phase1Input.value,
            phase2: Array.from(sessionsContainer.querySelectorAll('textarea')).map(t => t.value),
            phase3: phase3Input.value,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `proyecto_exelearning_${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    document.getElementById('btn-load-project').addEventListener('click', () => {
        document.getElementById('input-load-project').click();
    });

    document.getElementById('input-load-project').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.phase1 !== undefined) phase1Input.value = data.phase1;
                if (data.phase3 !== undefined) phase3Input.value = data.phase3;
                
                if (data.phase2 && Array.isArray(data.phase2)) {
                    // Limpiamos las sesiones actuales
                    sessionsContainer.innerHTML = "";
                    
                    data.phase2.forEach((val, i) => {
                        const sNum = i + 1;
                        const sessionDiv = document.createElement('div');
                        sessionDiv.className = 'session-item glass-panel';
                        sessionDiv.innerHTML = `
                            <div class="panel-header">
                                <div class="icon-box s-icon">S${sNum}</div>
                                <div>
                                    <h4>Sesión ${sNum}: Desarrollo</h4>
                                    <p>Pega aquí el JSON de la Sesión ${sNum}.</p>
                                </div>
                            </div>
                            <textarea id="json-s${sNum}" placeholder='[ { "page_name": "Sesión ${sNum}...", "idevices": [...] } ]'>${val}</textarea>
                        `;
                        sessionsContainer.appendChild(sessionDiv);
                    });
                }
                alert("Proyecto cargado con éxito.");
            } catch (err) {
                alert("Error al cargar el proyecto: " + err.message);
            }
        };
        reader.readAsText(file);
    });

    // 5. Modal de Instrucciones
    const modal = document.getElementById('modal-instructions');
    const btnShowModal = document.getElementById('btn-show-instructions');
    const closeModal = document.getElementById('close-modal');

    btnShowModal.onclick = () => modal.style.display = "flex";
    closeModal.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
    };
});

import { compileExeProject } from './compiler.js';

const SHARED_RULES = `REGLAS TÉCNICAS:
1. iDevice 'text': Usa "title", "main_text", "image" (URL o ""), "duration" y "participants".
2. iDevice 'udl-content': Usa "title", "main_text", "easy_reading" y "audio_script".
3. iDevice 'interactive-video': Usa "title" y "url" (YouTube).
4. iDevice 'casestudy': Usa "title", "story", "activity" y "feedback".
5. iDevice 'image-gallery': Usa "title", "images" (array de {url, caption}).
6. iDevice 'form': Usa "title", "questions" (array).
7. iDevice 'guess': Usa "title", "term", "instructions", "hint" y "feedback".
8. iDevice 'checklist': Usa "title" y "tasks" (array).
9. iDevice 'rubric': Usa "title" y "rows" (array de {category, level1, level2, level3, level4}).
10. iDevice 'rosco': Genera un juego de pasapalabra. Usa las claves "words" (array de {letter, word, definition}) y "title". Proporciona un máximo de 10 términos, cada uno comenzando estrictamente por su letra correspondiente y evitando las letras 'Ñ', 'X', 'Y' y 'Z'.
11. iDevice 'crossword': Genera un crucigrama. Usa "title" y "words" (array de {word, definition}).
12. iDevice 'lista': Para listas de elementos o pasos.
13. FORMATO: Devuelve ÚNICAMENTE un ARRAY de objetos JSON de página: [ { "page_name": "...", "idevices": [...] }, ... ]`;

const MASTER_PROMPT = (numSessions) => `Eres un Arquitecto eXeLearning experto. Tu tarea es generar una Situación de Aprendizaje (SA) COMPLETA y profesional en un único bloque JSON.

ESTRUCTURA DEL PROYECTO A GENERAR:
1. PÁGINAS INICIALES: Portada (text), Justificación (text+digcompedu), Objetivos (udl-content).
2. SECUENCIA DIDÁCTICA: Genera exactamente ${numSessions} sesiones de desarrollo (Sesión 1 a ${numSessions}). Utiliza iDevices variados (casestudy, guess, interactive-video, image-gallery, select-media-files, rosco).
3. PÁGINAS FINALES: Conclusiones (text), Evaluación (checklist + rubric) e Informe de Progreso (progress-report).

REGLAS CRÍTICAS:
- Usa solo recursos del listado proporcionado.
- Para imágenes Wikimedia usa la redirección: https://commons.wikimedia.org/wiki/Special:FilePath/Nombre_Archivo.jpg
- El resultado final debe ser un ARRAY plano de objetos de página. No uses claves como "portada" o "sesiones" fuera del array.

${SHARED_RULES}`;

document.addEventListener('DOMContentLoaded', () => {
    // Referencias UI
    const numSessionsInput = document.getElementById('num-sessions');
    const btnCopyPrompt = document.getElementById('btn-copy-prompt');
    const copyStatus = document.getElementById('copy-status');
    const promptDisplay = document.getElementById('prompt-display');
    
    const jsonInputMaster = document.getElementById('json-input-master');
    const btnCompile = document.getElementById('btn-compile');
    const errorDisplay = document.getElementById('error-display');

    // Modal
    const btnShowModal = document.getElementById('btn-show-instructions');
    const modal = document.getElementById('modal-instructions');
    const closeModal = document.getElementById('close-modal');

    // 1. Lógica de Prompts
    function updatePromptPreview() {
        const num = numSessionsInput ? (numSessionsInput.value || 4) : 4;
        if (promptDisplay) promptDisplay.innerText = `Prompt configurado para ${num} sesiones. Listo para copiar.`;
    }

    if (numSessionsInput) {
        numSessionsInput.addEventListener('input', updatePromptPreview);
        updatePromptPreview();
    }

    if (btnCopyPrompt) {
        btnCopyPrompt.addEventListener('click', () => {
            const num = numSessionsInput ? (numSessionsInput.value || 4) : 4;
            const prompt = MASTER_PROMPT(num);
            
            navigator.clipboard.writeText(prompt).then(() => {
                if (copyStatus) {
                    copyStatus.style.display = 'block';
                    setTimeout(() => { copyStatus.style.display = 'none'; }, 2000);
                }
            });
        });
    }

    // 2. Compilación
    if (btnCompile) {
        btnCompile.addEventListener('click', async () => {
            if (errorDisplay) errorDisplay.style.display = 'none';
            
            try {
                let rawJson = jsonInputMaster.value.trim();
                if (!rawJson) throw new Error("El campo JSON está vacío.");

                // Limpieza agresiva de Markdown (fences)
                rawJson = rawJson
                    .replace(/^```(?:json)?/gi, '') // Quita el inicio: ``` o ```json
                    .replace(/```$/g, '')          // Quita el cierre: ```
                    .trim();

                const data = JSON.parse(rawJson);
                if (!Array.isArray(data)) {
                    throw new Error("El formato debe ser un ARRAY de páginas [ {...}, {...} ].");
                }

                btnCompile.disabled = true;
                const originalText = btnCompile.innerHTML;
                btnCompile.innerHTML = '<span class="loader"></span> Generando...';
                
                const zipBlob = await compileExeProject(data);
                const url = window.URL.createObjectURL(zipBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `sa_completa_${Date.now()}.elpx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                
                btnCompile.disabled = false;
                btnCompile.innerHTML = originalText;
                
            } catch (e) {
                if (errorDisplay) {
                    errorDisplay.textContent = "Error: " + e.message;
                    errorDisplay.style.display = 'block';
                }
                btnCompile.disabled = false;
            }
        });
    }

    // 3. Gestión de Proyecto (Guardar/Cargar)
    const btnSave = document.getElementById('btn-save-project');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const projectData = {
                json: jsonInputMaster.value,
                numSessions: numSessionsInput ? numSessionsInput.value : 4,
                timestamp: new Date().toISOString()
            };
            const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sa_proyecto_${Date.now()}.json`;
            a.click();
        });
    }

    const btnLoad = document.getElementById('btn-load-project');
    const inputLoad = document.getElementById('input-load-project');
    if (btnLoad && inputLoad) {
        btnLoad.addEventListener('click', () => inputLoad.click());
        inputLoad.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.json) jsonInputMaster.value = data.json;
                    if (data.numSessions && numSessionsInput) {
                        numSessionsInput.value = data.numSessions;
                        updatePromptPreview();
                    }
                    alert("Proyecto cargado.");
                } catch (err) { alert("Error al cargar archivo."); }
            };
            reader.readAsText(file);
        });
    }

    // 4. Modal de Instrucciones
    if (modal && btnShowModal && closeModal) {
        btnShowModal.onclick = () => modal.style.display = "flex";
        closeModal.onclick = () => modal.style.display = "none";
        window.onclick = (event) => {
            if (event.target == modal) modal.style.display = "none";
        };
    }

    // 5. Copia de Prompts en Modal
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
});

import { compileExeProject } from './compiler.js';

const SHARED_RULES = `REGLAS TÉCNICAS:
1. iDevice 'text': DEBE incluir "textInfoDurationInput" y "textInfoParticipantsInput".
2. iDevice 'udl-content': Úsalo para contenido inclusivo.
3. iDevice 'casestudy': Incluye retroalimentación.
4. iDevice 'form': Define preguntas claras.
5. FORMATO: Devuelve ÚNICAMENTE un array JSON válido [ { "page_name": "...", "idevices": [...] } ]`;

const PHASED_PROMPTS = {
    1: `Eres un Arquitecto eXeLearning. FASE 1: INICIO Y FUNDAMENTACIÓN.
Genera el JSON para las páginas iniciales de la Situación de Aprendizaje (SA) adjunta.

ESTRUCTURA REQUERIDA:
1. "Portada": iDevice 'text' con título llamativo, imagen y resumen + 'image-gallery'.
2. "Justificación": iDevice 'text' detallando el propósito pedagógico, área y nivel + 'digcompedu'.

${SHARED_RULES}`,

    2: `Eres un Arquitecto eXeLearning. FASE 2: SECUENCIA COMPETENCIAL.
Genera el JSON para los bloques centrales de la SA. Analiza la secuencia y crea páginas para cada sesión o bloque de contenido.

IDEVICES RECOMENDADOS (Variedad):
- 'udl-content' + 'interactive-video' para Motivación.
- 'casestudy' + 'guess' para Exploración.
- 'text' + 'external-website' para Estructuración.
- 'form' + 'checklist' para Aplicación.

Genera de 2 a 4 páginas detalladas según la SA adjunta.
${SHARED_RULES}`,

    3: `Eres un Arquitecto eXeLearning. FASE 3: CIERRE Y METADATOS.
Genera el JSON para las secciones finales de la SA.

ESTRUCTURA REQUERIDA:
1. "Evaluación": iDevice 'rubric' detallada.
2. "Guía Didáctica": iDevice 'text' con orientaciones para el docente.
3. "Fuentes y Créditos": iDevice 'text' con bibliografía.
4. "Descarga": iDevice 'download-source-file'.

${SHARED_RULES}`
};

document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy-prompt');
    const btnCompile = document.getElementById('btn-compile');
    const copyStatus = document.getElementById('copy-status');
    const errorDisplay = document.getElementById('error-display');
    const phaseBtns = document.querySelectorAll('.phase-btn');
    
    // Textareas por fases
    const phase1Input = document.getElementById('json-phase-1');
    const phase2Input = document.getElementById('json-phase-2');
    const phase3Input = document.getElementById('json-phase-3');

    let currentPhase = "1";

    // Selección de Fase
    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            phaseBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPhase = btn.dataset.phase;
        });
    });

    // Copiar Prompt
    btnCopy.addEventListener('click', () => {
        const prompt = PHASED_PROMPTS[currentPhase];
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
            // Procesar Fase 1
            if (phase1Input.value.trim()) {
                const p1 = JSON.parse(phase1Input.value);
                if (Array.isArray(p1)) projectPages = projectPages.concat(p1);
            }

            // Procesar Fase 2
            if (phase2Input.value.trim()) {
                const p2 = JSON.parse(phase2Input.value);
                if (Array.isArray(p2)) projectPages = projectPages.concat(p2);
            }

            // Procesar Fase 3
            if (phase3Input.value.trim()) {
                const p3 = JSON.parse(phase3Input.value);
                if (Array.isArray(p3)) projectPages = projectPages.concat(p3);
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
            a.download = `situacion_aprendizaje_completa_${Date.now()}.elpx`;
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

import { compileExeProject } from './compiler.js';

const MASTER_PROMPT = `Eres un Arquitecto de Software especializado en eXeLearning v4.
Tu tarea es generar un archivo JSON estricto que represente una Situación de Aprendizaje (SA).

FORMATO EXACTO DEL JSON (debe ser un array de páginas):
[
  {
    "page_name": "Nombre de la página",
    "idevices": [
      {
        "type": "text",
        "content": { "textTextarea": "<p>Contenido HTML aquí</p>" }
      },
      {
        "type": "casestudy",
        "content": {
          "history": "<p>Historia del caso</p>",
          "activities": [{"activity": "<p>Act 1</p>", "feedback": "<p>Feed</p>", "buttonCaption": "Mostrar"}]
        }
      }
    ]
  }
]

REGLAS:
1. Usa solo estos tipos: text, casestudy, digcompedu, download-source-file, external-website, image-gallery, udl-content, checklist, form, guess, interactive-video, progress-report, select-media-files, rubric.
2. Devuelve ÚNICAMENTE el array JSON válido. Sin explicaciones, sin bloques de código Markdown.`;

document.addEventListener('DOMContentLoaded', () => {
    const btnCopy = document.getElementById('btn-copy-prompt');
    const copyStatus = document.getElementById('copy-status');
    const jsonInput = document.getElementById('json-input');
    const btnCompile = document.getElementById('btn-compile');
    const errorDisplay = document.getElementById('error-display');

    btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(MASTER_PROMPT).then(() => {
            copyStatus.style.display = 'block';
            setTimeout(() => {
                copyStatus.style.display = 'none';
            }, 3000);
        });
    });

    btnCompile.addEventListener('click', async () => {
        const rawJson = jsonInput.value.trim();
        if (!rawJson) {
            showError("Por favor, pega el JSON generado por la IA.");
            return;
        }

        try {
            // Limpiar posibles bloques de markdown si el usuario los pegó
            let cleanJson = rawJson;
            if (cleanJson.includes('```')) {
                cleanJson = cleanJson.replace(/```json|```/g, '').trim();
            }

            const data = JSON.parse(cleanJson);
            
            if (!Array.isArray(data)) {
                throw new Error("El JSON debe ser un Array de páginas.");
            }

            btnCompile.disabled = true;
            btnCompile.textContent = "Procesando...";
            errorDisplay.style.display = 'none';

            const blob = await compileExeProject(data);
            
            // Descargar
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `proyecto_exelearning_${Date.now()}.elpx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            btnCompile.disabled = false;
            btnCompile.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Generar y Descargar .elpx
            `;

        } catch (err) {
            showError("Error al procesar el JSON: " + err.message);
            btnCompile.disabled = false;
            btnCompile.textContent = "Generar y Descargar .elpx";
        }
    });

    function showError(msg) {
        errorDisplay.textContent = msg;
        errorDisplay.style.display = 'block';
    }
});

import { compileExeProject } from './compiler.js';

const MASTER_PROMPT = `Eres un Arquitecto de Contenido Educativo especializado en eXeLearning v4 y la Guía de Estilo REA (Recursos Educativos Abiertos).
Tu tarea es generar un archivo JSON estricto que represente una Situación de Aprendizaje (SA) completa y profesional.

ESTRUCTURA OBLIGATORIA DE PÁGINAS:
1. "Portada": iDevice 'text' con título llamativo, imagen representativa (placeholder) y resumen.
2. "Justificación": iDevice 'text' detallando el propósito pedagógico, área y nivel.
3. "Secuencia Competencial": Página contenedora.
   - "Motivación": iDevice 'udl-content' para activar conocimientos previos.
   - "Exploración": iDevice 'casestudy' o 'text' para investigar el tema.
   - "Estructuración": iDevice 'text' o 'digcompedu' para formalizar conceptos.
   - "Aplicación": iDevice 'form' o 'checklist' para el producto final.
4. "Evaluación": iDevice 'rubric' o 'form' para los criterios de éxito.
5. "Créditos": iDevice 'download-source-file'.

REGLAS DE CONTENIDO (GUÍA DE ESTILO):
1. iDevice 'text': DEBE incluir los campos "textInfoDurationInput" (ej: "2 sesiones") y "textInfoParticipantsInput" (ej: "Parejas").
2. iDevice 'udl-content': Úsalo para contenido inclusivo con lectura facilitada y apoyos visuales.
3. iDevice 'casestudy': Siempre incluye retroalimentación constructiva.
4. iDevice 'form': Define preguntas claras con feedback inmediato.
5. Lenguaje: Usa un tono motivador, inclusivo y dirigido al alumnado.

FORMATO DEL JSON:
[
  {
    "page_name": "Nombre",
    "idevices": [
      {
        "type": "text",
        "content": {
          "textTextarea": "<div class=\\"exe-text-activity\\">...</div>",
          "textInfoDurationInput": "X sesiones",
          "textInfoParticipantsInput": "Individual/Parejas/Grupo"
        }
      }
    ]
  }
]

Devuelve ÚNICAMENTE el array JSON válido.`;

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

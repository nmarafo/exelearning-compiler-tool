import { compileExeProject } from './compiler.js';

const MASTER_PROMPT = `Eres un Arquitecto de Contenido Educativo especializado en eXeLearning v4 y la Guía de Estilo REA.
Tu tarea es generar un archivo JSON estricto que represente una Situación de Aprendizaje (SA) completa, profesional y visualmente rica.

CATÁLOGO DE IDEVICES DISPONIBLES (Úsalos con creatividad):
- 'text': Contenido base (incluye Duración y Agrupamiento).
- 'udl-content': Contenido DUA con lectura facilitada y apoyos.
- 'casestudy': Casos prácticos con actividades y retroalimentación.
- 'image-gallery': Para mostrar conjuntos de imágenes o infografías.
- 'external-website': Para embeber herramientas externas (Genially, Canva, etc.).
- 'interactive-video': Vídeo con preguntas integradas.
- 'digcompedu': Para reflejar competencias digitales.
- 'form': Cuestionarios y formularios de respuesta.
- 'checklist': Listas de cotejo para autoevaluación.
- 'rubric': Rúbricas de evaluación detalladas.
- 'guess': Juego de adivinanza de palabras.
- 'select-media-files': Juego de selección de imágenes/tarjetas.
- 'progress-report': Resumen de progreso para el alumno.
- 'download-source-file': Para descargar el archivo fuente o materiales.

ESTRUCTURA SUGERIDA (REA):
1. "Portada": 'text' (impacto) + 'image-gallery'.
2. "Justificación": 'text' (pedagogía) + 'digcompedu'.
3. "Secuencia Competencial":
   - "Motivación": 'udl-content' + 'interactive-video'.
   - "Exploración": 'casestudy' + 'guess' o 'select-media-files'.
   - "Estructuración": 'text' + 'external-website'.
   - "Aplicación": 'form' + 'checklist'.
4. "Evaluación": 'rubric'.
5. "Créditos": 'download-source-file'.

REGLAS DE ORO:
1. iDevice 'text': DEBE incluir "textInfoDurationInput" y "textInfoParticipantsInput".
2. Variedad: No te limites a texto. Usa juegos ('guess', 'select-media-files') y elementos visuales.
3. Retroalimentación: Enriquecida en todos los iDevices que la permitan.
4. Formato: Genera un JSON de alta calidad, coherente con la temática de la SA adjunta.

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

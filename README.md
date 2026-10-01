# eXeLearning Compiler Tool (v4.0.5)

🚀 **eXeLearning Compiler Tool** es una aplicación web standalone diseñada para tender un puente directo entre la Inteligencia Artificial (IA) y la autoría tecnopedagógica de contenidos educativos. Permite traducir diseños didácticos y Situaciones de Aprendizaje (SA) generadas en formato JSON (por modelos como NotebookLM, Gemini, ChatGPT o Claude) directamente a paquetes nativos de eXeLearning (**archivos .elpx**).

---

## ✨ Novedades y Mejoras (Versión Estable 4.0.5)

Esta versión incorpora todas las especificaciones y mejoras de la última versión estable de **eXeLearning (v4.0.5)**:

- 🎯 **Compatibilidad con eXeLearning v4.0.5**: Metadatos y recursos ajustados a `v4.0.5` con el estándar oficial **ODE Content DTD v2.0** integrado en `content.dtd`.
- 🖼️ **Generación Automática de Miniatura (`screenshot.png`)**: Inclusión de la imagen de portada requerida por eXeLearning 4 para la previsualización del proyecto en el catálogo y gestor de archivos.
- 🌳 **Navegación Jerárquica y Subpáginas (`odeParentPageId`)**: Soporte nativo para anidar sesiones y subtemas bajo páginas maestras didácticas (ej. `parent: "Secuencia Didáctica"` o arrays anidados `subpages`).
- 🎨 **Soporte del Nuevo Estilo Oficial `EducaBlue`**: Integración del tema azul accesible presentado en eXeLearning 4.0.5 (adaptado a WCAG 2.2 nivel AA y modo oscuro), además de `base`, `universal`, `neo` e `intef`.
- 👩‍🏫 **Soporte de Modo Docente (`teacher_only: true`)**: Permite marcar bloques o iDevices exclusivos para el profesorado con visualización diferenciada en el editor.
- 🧩 **Ampliación del Catálogo a 24 iDevices**:
  - **`word-search` (Sopa de Letras)**: Nueva actividad interactiva gamificada con soporte para la opción v4.0.5 de ocultar el icono de tiempo (`hide_time_icon`) y palabras clave.
  - **`trueorfalse` (Verdadero o Falso)**: Actualizado con número de intentos configurable (`attempts`), botón para guardar puntuación e idioma del proyecto.
  - **`form` (Formulario)**: Preguntas variadas con botón para guardar puntuación en paquetes evaluables.
  - **`sort` (Ordena / Secuenciación)**: Con intentos configurables, validación corregida y guardado de puntuación.
  - **`complete` (Completa)**: Cuestionario de rellenar huecos con botón para guardar puntuación.
  - **`rubric` (Rúbrica Analítica)**: Rúbrica de 4 niveles de desempeño con soporte para ponderación y exportación de calificaciones SCORM.
  - **`digcompedu` (Competencia Digital)**: Selección dinámica de indicadores (1.1 a 6.5) y renderizado de la tabla resumen con celdas activas.
  - **`rosco` (Pasapalabra)**: Rosco de la A a la Z optimizado con cifrado XOR Nodex y control de longitud.
  - **`casestudy` (Caso Práctico)**: Con etiquetas configurables para mostrar u ocultar la retroalimentación.
  - Y soporte completo para `udl-content` (DUA), `interactive-video`, `checklist`, `crossword`, `relate`, `guess`, `image-gallery`, `external-website`, `progress-report`, `text`, etc.
- 🩺 **Diagnóstico en Tiempo Real y Limpieza de JSON**: Validador de sintaxis en vivo con desglose de páginas, recuento de iDevices y botón para limpiar automáticamente bloques Markdown (````json````).
- ✨ **Carga Directa de SA de Ejemplo LOMLOE**: Botón de un solo clic para cargar una Situación de Aprendizaje completa y realista (Canarias LOMLOE, DUA, Merrill y Gamificación) para verificar el compilador de inmediato.
- 📚 **Catálogo Interactivo Integrado**: Documentación en pantalla de los 24 iDevices con botones para copiar plantillas JSON.

---

## 🛠️ Estructura Técnica del Archivo `.elpx`

- **Extensión**: `.elpx` (archivo ZIP estándar).
- **Esquema**: XML regido por `content.dtd` (ODE Content DTD v2.0, Namespace: `http://www.intef.es/xsd/ode`).
- **Arquitectura de Componentes**: Capa dual estricta:
  - `htmlView`: Vista renderizada para el alumnado.
  - `jsonProperties`: Estado editable por los motores de eXeLearning.
  - Contenedores interactivos `DataGame` con cifrado XOR (clave `146`) o codificación ISO-8859-1 según el motor del iDevice.
- **Activos**: Inclusión de `screenshot.png` y `theme/screenshot.png`.

---

## 🚀 Cómo Empezar

1. Abran `index.html` en cualquier navegador web moderno (no requiere servidor backend ni instalación previa).
2. En la sección **1. Generador de Prompt Maestro**, configuren la etapa educativa, el número de sesiones y la temática de su Situación de Aprendizaje. El prompt está calibrado (< 3.200 caracteres) para respetar el límite estricto de 4.000 caracteres de la ventana de chat de **NotebookLM**.
3. Copien el prompt y utilícenlo en su herramienta de IA de preferencia (**Google NotebookLM**, **Google Gemini** o **Claude**). En NotebookLM, también pueden adjuntar documentos curriculares como **Fuente (Source)** en el cuaderno para que la IA disponga de todo el contexto oficial.
4. O si lo desean, pulsen **"✨ Cargar SA de Ejemplo LOMLOE"** para probar el flujo de trabajo inmediatamente.
5. Peguen el JSON resultante en el **2. Compilador de Estructura JSON**.
6. Hagan clic en **"Generar y Descargar Proyecto .elpx"** y abran el archivo descargado directamente con eXeLearning v4.0.5.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **Apache 2.0 con reconocimiento a la autoría**.

> [!NOTE]
> eXeLearning Open Source se distribuye bajo la licencia **AGPL-3.0**. Este compilador es una herramienta de autoría independiente que genera contenidos conformes a las especificaciones abiertas de dicho estándar.

---

Desarrollado para el acompañamiento y diseño tecnopedagógico por [Norberto Martín Afonso](https://github.com/nmarafo).  
Perfil institucional: Asesor Pedagógico de Formación del Ámbito TIC · CEP de Las Palmas de Gran Canaria.

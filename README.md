# eXeLearning Compiler Tool

🚀 **eXeLearning Compiler Tool** es una aplicación web standalone diseñada para cerrar la brecha entre la Inteligencia Artificial (IA) y la autoría de contenidos educativos. Permite traducir diseños pedagógicos generados en formato JSON (por modelos como NotebookLM, ChatGPT o Claude) directamente a paquetes nativos de eXeLearning (** archivos .elpx**).

## ✨ Características Principales

- **Conversión Instantánea**: Transforma arrays de JSON estructurados en proyectos eXeLearning completos.
- **Soporte Multimodal**: Compatible con iDevices de texto, videos interactivos, galerías de imágenes, cuestionarios, rúbricas, contenido DUA (UDL) y más.
- **Metadatos v4.0**: Genera automáticamente los recursos y propiedades necesarios para la nueva arquitectura de eXeLearning.
- **Escapado de Seguridad**: Implementa reglas estrictas de escape de caracteres (como `&` a `&amp;`) para evitar la corrupción de archivos en versiones recientes.
- **Prompt Maestro Incluido**: Ofrece un sistema de prompts configurables para copiar y pegar en herramientas de IA, asegurando que la salida sea compatible con el compilador.

## 🛠️ Compatibilidad

Este compilador está actualizado y validado para ser **completamente operativo con eXeLearning v4.0.0-rc3**.

- **Extensión**: Genera archivos `.elpx`.
- **Estructura**: Implementa la capa dual `htmlView` + `jsonProperties` en todos los iDevices.
- **DTD**: Basado en el estándar ODE Content DTD v2.0.

## 🚀 Cómo empezar

1.  Abre `index.html` en cualquier navegador moderno.
2.  Utiliza la sección **"Obtener Prompt Maestro"** para configurar tu Situación de Aprendizaje (SA).
3.  Copia el prompt y úsalo en tu IA preferida (se recomienda NotebookLM con Deep Research).
4.  Pega el JSON resultante en el **"Compilador de Estructura"**.
5.  Haz clic en **"Generar Proyecto .elpx"** y descarga tu archivo listo para abrir en eXeLearning.

## 📄 Licencia

Este proyecto es Open Source y se distribuye bajo la misma filosofía que eXeLearning.

---
Creado por [Norberto Martín Afonso](https://github.com/nmarafo).

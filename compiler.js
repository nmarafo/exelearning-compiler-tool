import { SNIPPETS_DICT } from './snippets.js';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export async function compileExeProject(pagesConfig) {
    const snippetsDict = SNIPPETS_DICT;
    const jszip = new JSZip();

    // Construir la estructura content.xml
    const PROJECT_ID = uuidv4().replace(/-/g, '').substring(0, 20).toUpperCase();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ode SYSTEM "content.dtd">
<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">
<userPreferences>
  <userPreference><key>theme</key><value>intef</value></userPreference>
</userPreferences>
<odeResources>
  <odeResource><key>odeId</key><value>${PROJECT_ID}</value></odeResource>
  <odeResource><key>exe_version</key><value>3.0</value></odeResource>
</odeResources>
<odeProperties>
  <odeProperty><key>pp_title</key><value>Situación de Aprendizaje REA</value></odeProperty>
  <odeProperty><key>pp_lang</key><value>es</value></odeProperty>
  <odeProperty><key>pp_license</key><value>creative commons: attribution - share alike 4.0</value></odeProperty>
  <odeProperty><key>pp_licenseUrl</key><value>https://creativecommons.org/licenses/by-sa/4.0/</value></odeProperty>
</odeProperties>
<odeNavStructures>`;

    // Generar Páginas
    let pageOrder = 0;
    for (const page of pagesConfig) {
        const pageId = uuidv4();
        
        xml += `
<odeNavStructure>
  <odePageId>${pageId}</odePageId>
  <odeParentPageId></odeParentPageId>
  <pageName>${page.page_name}</pageName>
  <odeNavStructureOrder>${pageOrder++}</odeNavStructureOrder>
  <odeNavStructureProperties>
    <odeNavStructureProperty><key>titlePage</key><value>${page.page_name}</value></odeNavStructureProperty>
  </odeNavStructureProperties>
  <odePagStructures>`;
        
        // Generar iDevices para esta página
        let componentOrder = 0;
        for (const idev of page.idevices) {
            if (!snippetsDict[idev.type]) continue; 
            
            let snippet = snippetsDict[idev.type];
            const blockId = 'block-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const ideviceId = 'idevice-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const evalId = uuidv4();

            snippet = snippet.replace(/UUID-PAGINA/g, pageId);
            snippet = snippet.replace(/UUID-BLOQUE/g, blockId);
            snippet = snippet.replace(/UUID-IDEVICE/g, ideviceId);
            snippet = snippet.replace(/UUID-EVALUACION/g, evalId);

            // Determinar Icono y Nombre de Bloque según tipo
            let iconName = 'activity';
            let blockName = 'Contenido';
            if (['form', 'guess', 'select-media-files', 'checklist'].includes(idev.type)) {
                iconName = 'interactive';
                blockName = 'Actividad Interactiva';
            } else if (idev.type === 'udl-content') {
                iconName = 'info';
                blockName = 'Contenido DUA';
            }

            // 3. Normalización de datos (Mapeo de claves IA -> eXeLearning)
            // Extraemos todas las propiedades a un objeto plano 'props'
            let props = { ...idev };
            if (idev.content && typeof idev.content === 'object') {
                Object.assign(props, idev.content);
            }
            
            // Caso especial: si 'content' es una cadena, la movemos a la propiedad de texto
            if (typeof idev.content === 'string' && !props.textTextarea) {
                props.textTextarea = idev.content;
            }

            // Procesamiento específico por tipo
            if (idev.type === 'text') {
                let fullHtml = "";
                if (props.image) fullHtml += `<p style="text-align:center;"><img src="${props.image}" alt="Imagen" style="max-width:100%; height:auto;"></p>`;
                if (props.summary) fullHtml += `<div class="exe-summary" style="background:#f0f9ff; padding:1rem; border-radius:0.5rem; margin-bottom:1rem; border:1px solid #bae6fd;"><strong>Resumen:</strong> ${props.summary}</div>`;
                
                const mainText = props.content && typeof props.content === 'string' ? props.content : (props.textTextarea || "");
                fullHtml += `<div class="exe-text-content">${mainText}</div>`;
                
                props.textTextarea = `<div class="exe-text-activity">${fullHtml}</div>`;
            }
            
            if (props.duration) props.textInfoDurationInput = props.duration;
            if (props.participants) props.textInfoParticipantsInput = props.participants;

            if (idev.type === 'casestudy') {
                if (props.story) props.history = props.story;
                if (props.activity || props.feedback) {
                    props.activities = [{
                        activity: props.activity || "Actividad",
                        feedback: props.feedback || "Retroalimentación",
                        buttonCaption: props.buttonCaption || "Mostrar retroalimentación"
                    }];
                }
            }

            if (idev.type === 'digcompedu' && props.areas) {
                let digHtml = "<ul>";
                props.areas.forEach(a => {
                    digHtml += `<li><strong>${a.area}:</strong> ${a.description}</li>`;
                });
                digHtml += "</ul>";
                if (props.justification) digHtml += `<p><em>${props.justification}</em></p>`;
                props.digHtml = `<div class="digcompeduIdeviceContent"><h3>Resumen DigCompEdu</h3>${digHtml}</div>`;
            }

            if (idev.type === 'form' && props.questions) {
                props.questionsData = props.questions.map(q => ({
                    question: typeof q === 'string' ? q : (q.question || ""),
                    type: "textarea",
                    feedback: q.feedback || ""
                }));
            }

            if (idev.type === 'udl-content') {
                const udlText = (typeof props.content === 'string' ? props.content : null) || props.textTextarea || "";
                snippet = snippet.replace(/<p>Contenido principal<\/p>/g, udlText);
            }

            if (idev.type === 'image-gallery' && props.images) {
                let galleryHtml = '<div class="exe-image-gallery" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">';
                props.images.forEach(img => {
                    galleryHtml += `<figure style="margin:0;"><img src="${img.url}" alt="${img.caption}" style="width:100%; border-radius:8px;"><figcaption style="font-size:0.8rem; margin-top:0.5rem; text-align:center;">${img.caption}</figcaption></figure>`;
                });
                galleryHtml += '</div>';
                snippet = snippet.replace(/<div class="imageGallery-body"><\/div>/g, `<div class="imageGallery-body">${galleryHtml}</div>`);
            }

            // 4. Inyección en el XML
            // A) JSONProperties (Estado interno)
            snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)(.*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                if (!p2) return match;
                try {
                    let obj = JSON.parse(p2);
                    Object.assign(obj, props);
                    if (obj.ideviceId) obj.ideviceId = ideviceId;
                    if (obj.id) obj.id = ideviceId;
                    if (props.title) obj.title = props.title; // Asegurar título en el JSON
                    return p1 + JSON.stringify(obj) + p3;
                } catch (e) {
                    return match;
                }
            });
            
            // B) Marcadores HTML (Vista previa)
            if (props.textTextarea) snippet = snippet.replaceAll('{{CONTENT}}', props.textTextarea);
            if (props.history) snippet = snippet.replaceAll('{{HISTORY}}', props.history);
            if (props.activities && props.activities[0]) {
                snippet = snippet.replaceAll('{{ACTIVITY}}', props.activities[0].activity);
                snippet = snippet.replaceAll('{{FEEDBACK}}', props.activities[0].feedback);
            }
            if (props.digHtml) snippet = snippet.replaceAll('{{DIGCOMP_CONTENT}}', props.digHtml);

            // C) Limpieza de marcadores no usados
            snippet = snippet.replaceAll('{{CONTENT}}', '')
                             .replaceAll('{{HISTORY}}', '')
                             .replaceAll('{{ACTIVITY}}', '')
                             .replaceAll('{{FEEDBACK}}', '')
                             .replaceAll('{{DIGCOMP_CONTENT}}', '');

            // D) Codificación URI interactiva
            const uriEncodedTypes = ['checklist', 'guess', 'select-media-files', 'rubric'];
            if (uriEncodedTypes.includes(idev.type)) {
                snippet = snippet.replace(/(<div class=".*?DataGame js-hidden">)(.*?)(<\/div>)/, (match, p1, p2, p3) => {
                    return p1 + encodeURIComponent(JSON.stringify(props)) + p3;
                });
            }

            xml += `
    <odePagStructure>
      <odePageId>${pageId}</odePageId>
      <odeBlockId>${blockId}</odeBlockId>
      <blockName>${props.title || blockName}</blockName>
      <iconName>${iconName}</iconName>
      <odePagStructureOrder>${componentOrder++}</odePagStructureOrder>
      <odePagStructureProperties></odePagStructureProperties>
      <odeComponents>
${snippet}
      </odeComponents>
    </odePagStructure>`;
        }
        
        xml += `
  </odePagStructures>
</odeNavStructure>`;
    }

    xml += `
</odeNavStructures>
</ode>`;

    jszip.file("content.xml", xml);
    jszip.file("content.dtd", "<!ELEMENT ode ANY>"); 

    return await jszip.generateAsync({ type: "blob" });
}

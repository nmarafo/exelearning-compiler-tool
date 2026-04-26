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

            // Normalización de datos (Mapeo de claves IA -> eXeLearning)
            if (idev.content) {
                const c = idev.content;
                
                // Texto y metadatos (Soporte para image y summary inyectados en el cuerpo)
                if (idev.type === 'text') {
                    let fullHtml = "";
                    if (c.image) fullHtml += `<p style="text-align:center;"><img src="${c.image}" alt="Imagen decorativa" style="max-width:100%; height:auto;"></p>`;
                    if (c.summary) fullHtml += `<div class="exe-summary" style="background:#f0f9ff; padding:1rem; border-radius:0.5rem; margin-bottom:1rem; border:1px solid #bae6fd;"><strong>Resumen:</strong> ${c.summary}</div>`;
                    
                    const mainContent = c.content || c.textTextarea || "";
                    fullHtml += `<div class="exe-text-content">${mainContent}</div>`;
                    
                    c.textTextarea = `<div class="exe-text-activity">${fullHtml}</div>`;
                }
                
                if (c.duration) c.textInfoDurationInput = c.duration;
                if (c.participants) c.textInfoParticipantsInput = c.participants;

                // Caso práctico
                if (idev.type === 'casestudy') {
                    if (c.story) c.history = c.story;
                    if (c.activity || c.feedback) {
                        c.activities = [{
                            activity: c.activity || "Actividad",
                            feedback: c.feedback || "Retroalimentación",
                            buttonCaption: c.buttonCaption || "Mostrar retroalimentación"
                        }];
                    }
                }

                // DigCompEdu (Mapeo de áreas a texto)
                if (idev.type === 'digcompedu' && c.areas) {
                    let digHtml = "<ul>";
                    c.areas.forEach(a => {
                        digHtml += `<li><strong>${a.area}:</strong> ${a.description}</li>`;
                    });
                    digHtml += "</ul>";
                    if (c.justification) digHtml += `<p><em>${c.justification}</em></p>`;
                    c.digHtml = `<div class="digcompeduIdeviceContent"><h3>Resumen DigCompEdu</h3>${digHtml}</div>`;
                    c.content = c.digHtml; // Para compatibilidad con jsonProperties
                }

                // Formulario / Cuestionario
                if (idev.type === 'form' && c.questions) {
                    c.questionsData = c.questions.map(q => ({
                        question: typeof q === 'string' ? q : (q.question || ""),
                        type: "textarea",
                        feedback: q.feedback || ""
                    }));
                }

                // UDL / DUA
                if (idev.type === 'udl-content' && (c.content || c.textTextarea)) {
                    const text = c.content || c.textTextarea;
                    snippet = snippet.replace(/<p>Contenido principal<\/p>/g, text);
                }

                // Galería de imágenes
                if (idev.type === 'image-gallery' && c.images) {
                    let galleryHtml = '<div class="exe-image-gallery" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">';
                    c.images.forEach(img => {
                        galleryHtml += `<figure style="margin:0;"><img src="${img.url}" alt="${img.caption}" style="width:100%; border-radius:8px;"><figcaption style="font-size:0.8rem; margin-top:0.5rem; text-align:center;">${img.caption}</figcaption></figure>`;
                    });
                    galleryHtml += '</div>';
                    snippet = snippet.replace(/<div class="imageGallery-body"><\/div>/g, `<div class="imageGallery-body">${galleryHtml}</div>`);
                }
            }

            // Inyectar JSONProperties (ESTADO DEL EDITOR)
            if (idev.content) {
                snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)(.*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                    if (!p2) return match;
                    try {
                        let obj = JSON.parse(p2);
                        Object.assign(obj, idev.content);
                        if (obj.ideviceId) obj.ideviceId = ideviceId;
                        if (obj.id) obj.id = ideviceId;
                        return p1 + JSON.stringify(obj) + p3;
                    } catch (e) {
                        return match;
                    }
                });
                
                // Reemplazo de marcadores HTML (VISTA ESTÁTICA Y JSON)
                if (idev.content.textTextarea) {
                    snippet = snippet.replaceAll('{{CONTENT}}', idev.content.textTextarea);
                }
                if (idev.content.history) {
                    snippet = snippet.replaceAll('{{HISTORY}}', idev.content.history);
                }
                if (idev.content.activities && idev.content.activities[0]) {
                    snippet = snippet.replaceAll('{{ACTIVITY}}', idev.content.activities[0].activity);
                    snippet = snippet.replaceAll('{{FEEDBACK}}', idev.content.activities[0].feedback);
                }
                if (idev.content.digHtml) {
                    snippet = snippet.replaceAll('{{DIGCOMP_CONTENT}}', idev.content.digHtml);
                }

                // Codificación URI para iDevices de juegos/interactivos
                const uriEncodedTypes = ['checklist', 'guess', 'select-media-files', 'rubric'];
                if (uriEncodedTypes.includes(idev.type)) {
                    snippet = snippet.replace(/(<div class=".*?DataGame js-hidden">)(.*?)(<\/div>)/, (match, p1, p2, p3) => {
                        const encodedData = encodeURIComponent(JSON.stringify(idev.content));
                        return p1 + encodedData + p3;
                    });
                }
            }

            xml += `
    <odePagStructure>
      <odePageId>${pageId}</odePageId>
      <odeBlockId>${blockId}</odeBlockId>
      <blockName>${blockName}</blockName>
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

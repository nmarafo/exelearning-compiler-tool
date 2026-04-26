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

            // A) iDevices URI Encoded
            const uriEncodedTypes = ['checklist', 'guess', 'select-media-files', 'rubric'];
            if (uriEncodedTypes.includes(idev.type) && idev.content) {
                snippet = snippet.replace(/(<div class=".*?DataGame js-hidden">)(.*?)(<\/div>)/, (match, p1, p2, p3) => {
                    const encodedData = encodeURIComponent(JSON.stringify(idev.content));
                    return p1 + encodedData + p3;
                });
            } 
            // B) iDevices Regulares
            else if (idev.content) {
                snippet = snippet.replace(/(<jsonProperties><!\[CDATA\[)(.*?)(\]\]><\/jsonProperties>)/, (match, p1, p2, p3) => {
                    if (!p2) return match;
                    try {
                        let obj = JSON.parse(p2);
                        Object.assign(obj, idev.content);
                        // Asegurar que el ideviceId en el JSON sea el mismo que el estructural
                        if (obj.ideviceId) obj.ideviceId = ideviceId;
                        if (obj.id) obj.id = ideviceId;
                        return p1 + JSON.stringify(obj) + p3;
                    } catch (e) {
                        return match;
                    }
                });
                
                if (idev.content.textTextarea) {
                    snippet = snippet.replace(/<p>Mi texto<\/p>/g, idev.content.textTextarea);
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

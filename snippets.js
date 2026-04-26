export const SNIPPETS_DICT = {
    "text": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>text</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-text-template">
    <p>Mi texto</p>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","textTextarea":"<p>Mi texto</p>","textFeedbackInput":"Mostrar retroalimentación","textFeedbackTextarea":""}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "casestudy": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>casestudy</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-casestudy-container">
        <div class="caseStudyContent">            
            <div class="CSP-Info mb-3">
            <dl>
                <div class="inline"><dt><span title=""></span></dt><dd></dd></div>
                <div class="inline"><dt><span title=""></span></dt><dd></dd></div>
            </dl>
            </div>
            <div class="CSP-History mb-3" >
                <p>Mi historia</p>
            </div>
            <div class="CSP-Activities mb-3">
                <div class="CSP-ActivityDiv ">
                    <div class="CSP-Activity mb-3">
                        <p>Mi actividad</p>
                    </div>
                    <div class="iDevice_buttons feedback-button js-required">
                        <input type="button" class="CSP-FeedbackBtn feedbacktooglebutton" value="Mostrar retroalimentación">
                    </div>
                    <div class="CSP-FeedbackText feedback js-feedback js-hidden" style="display: none;">
                        <p>Mi retroalimentación</p>
                    </div>
                </div>
            </div>
        </div>
</div>
]]></htmlView>
          <jsonProperties><![CDATA[{"id":"UUID-IDEVICE","typeGame":"Case study","history":"<p>Mi historia</p>","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","activities":[{"activity":"<p>Mi actividad</p>","feedback":"<p>Mi retroalimentación</p>","buttonCaption":"Mostrar retroalimentación"}]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "digcompedu": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>digcompedu</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="digcompeduIdeviceContent">
<h3>Resumen DigCompEdu</h3><p>Selected indicators: 0</p><div class="digcompedu-summary-wrapper" data-lang="es" data-display="table"><table class="digcompedu-summary-table"><thead><tr><th scope="col" colspan="5" class="area1">1. Compromiso profesional</th><th scope="col" colspan="3" class="area2">2. Contenidos digitales</th><th scope="col" colspan="4" class="area3">3. Enseñanza y aprendizaje</th><th scope="col" colspan="3" class="area4">4. Evaluación y retroalimentación</th><th scope="col" colspan="3" class="area5">5. Empoderamiento del alumnado</th><th scope="col" colspan="5" class="area6">6. Desarrollo de la competencia digital del alumnado</th></tr><tr><th class="area1">1.1</th><th class="area1">1.2</th><th class="area1">1.3</th><th class="area1">1.4</th><th class="area1">1.5</th><th class="area2">2.1</th><th class="area2">2.2</th><th class="area2">2.3</th><th class="area3">3.1</th><th class="area3">3.2</th><th class="area3">3.3</th><th class="area3">3.4</th><th class="area4">4.1</th><th class="area4">4.2</th><th class="area4">4.3</th><th class="area5">5.1</th><th class="area5">5.2</th><th class="area5">5.3</th><th class="area6">6.1</th><th class="area6">6.2</th><th class="area6">6.3</th><th class="area6">6.4</th><th class="area6">6.5</th></tr></thead><tbody><tr><td class="a1c1 cell-level"></td><td class="a1c2 cell-level"></td><td class="a1c3 cell-level"></td><td class="a1c4 cell-level"></td><td class="a1c5 cell-level"></td><td class="a2c1 cell-level"></td><td class="a2c2 cell-level"></td><td class="a2c3 cell-level"></td><td class="a3c1 cell-level"></td><td class="a3c2 cell-level"></td><td class="a3c3 cell-level"></td><td class="a3c4 cell-level"></td><td class="a4c1 cell-level"></td><td class="a4c2 cell-level"></td><td class="a4c3 cell-level"></td><td class="a5c1 cell-level"></td><td class="a5c2 cell-level"></td><td class="a5c3 cell-level"></td><td class="a6c1 cell-level"></td><td class="a6c2 cell-level"></td><td class="a6c3 cell-level"></td><td class="a6c4 cell-level"></td><td class="a6c5 cell-level"></td></tr></tbody></table></div>
</div>
]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","digcompeduSelected":[],"digcompeduDisplayMode":"table","digcompeduDataLang":"es","digcompeduGranularity":"indicator","digcompeduSummaryTableHtml":"<table class=\\"digcompedu-summary-table\\"><thead><tr><th scope=\\"col\\" colspan=\\"5\\" class=\\"area1\\">1. Compromiso profesional</th><th scope=\\"col\\" colspan=\\"3\\" class=\\"area2\\">2. Contenidos digitales</th><th scope=\\"col\\" colspan=\\"4\\" class=\\"area3\\">3. Enseñanza y aprendizaje</th><th scope=\\"col\\" colspan=\\"3\\" class=\\"area4\\">4. Evaluación y retroalimentación</th><th scope=\\"col\\" colspan=\\"3\\" class=\\"area5\\">5. Empoderamiento del alumnado</th><th scope=\\"col\\" colspan=\\"5\\" class=\\"area6\\">6. Desarrollo de la competencia digital del alumnado</th></tr><tr><th class=\\"area1\\">1.1</th><th class=\\"area1\\">1.2</th><th class=\\"area1\\">1.3</th><th class=\\"area1\\">1.4</th><th class=\\"area1\\">1.5</th><th class=\\"area2\\">2.1</th><th class=\\"area2\\">2.2</th><th class=\\"area2\\">2.3</th><th class=\\"area3\\">3.1</th><th class=\\"area3\\">3.2</th><th class=\\"area3\\">3.3</th><th class=\\"area3\\">3.4</th><th class=\\"area4\\">4.1</th><th class=\\"area4\\">4.2</th><th class=\\"area4\\">4.3</th><th class=\\"area5\\">5.1</th><th class=\\"area5\\">5.2</th><th class=\\"area5\\">5.3</th><th class=\\"area6\\">6.1</th><th class=\\"area6\\">6.2</th><th class=\\"area6\\">6.3</th><th class=\\"area6\\">6.4</th><th class=\\"area6\\">6.5</th></tr></thead><tbody><tr><td class=\\"a1c1 cell-level\\"></td><td class=\\"a1c2 cell-level\\"></td><td class=\\"a1c3 cell-level\\"></td><td class=\\"a1c4 cell-level\\"></td><td class=\\"a1c5 cell-level\\"></td><td class=\\"a2c1 cell-level\\"></td><td class=\\"a2c2 cell-level\\"></td><td class=\\"a2c3 cell-level\\"></td><td class=\\"a3c1 cell-level\\"></td><td class=\\"a3c2 cell-level\\"></td><td class=\\"a3c3 cell-level\\"></td><td class=\\"a3c4 cell-level\\"></td><td class=\\"a4c1 cell-level\\"></td><td class=\\"a4c2 cell-level\\"></td><td class=\\"a4c3 cell-level\\"></td><td class=\\"a5c1 cell-level\\"></td><td class=\\"a5c2 cell-level\\"></td><td class=\\"a5c3 cell-level\\"></td><td class=\\"a6c1 cell-level\\"></td><td class=\\"a6c2 cell-level\\"></td><td class=\\"a6c3 cell-level\\"></td><td class=\\"a6c4 cell-level\\"></td><td class=\\"a6c5 cell-level\\"></td></tr></tbody></table>","digcompeduSummaryTextHtml":""}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "download-source-file": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>download-source-file</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-download-package-instructions"><table class="exe-table exe-package-info"><caption>Información general sobre este recurso educativo</caption>
<tbody>
<tr>
<th>Título</th>
<td class="mceNonEditable exe-prop-locked"><span class="exe-prop-title">Mi título</span></td>
</tr>
<tr>
<th>Descripción</th>
<td class="mceNonEditable exe-prop-locked"><span class="exe-prop-description">Mi descripción</span></td>
</tr>
<tr>
<th>Autoría</th>
<td class="mceNonEditable exe-prop-locked"><span class="exe-prop-author">Autor</span></td>
</tr>
<tr>
<th>Licencia</th>
<td class="mceNonEditable exe-prop-locked"><span class="exe-prop-license">creative commons: attribution - share alike 4.0</span></td>
</tr>
</tbody>
</table>
<p style="text-align: center;">Este contenido fue creado con <a href="https://exelearning.net/">eXeLearning</a>, el editor libre y de fuente abierta diseñado para crear recursos educativos.</p></div><p class="exe-download-package-link"><a download="exe-package:elp-name" href="exe-package:elp" style="background-color:#107275;color:#ffffff;">Descargar el archivo .elpx</a></p>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "external-website": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>external-website</odeIdeviceTypeName>
          <htmlView><![CDATA[      <div id="iframeWebsiteIdevice">       <iframe src="http://www.google.com" size="2" width="600" height="300" style="width:100%;">      </iframe>      <div class="iframe-error-message" style="display:none;">No se puede mostrar un iframe en HTTP en una web HTTPS.</div>       </div>      ]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "image-gallery": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>image-gallery</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-image-gallery-template">
            <div class="imageGallery-IDevice">
                <div class="imageGallery-body">
                </div>
            </div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "udl-content": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>udl-content</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-udlContent exe-udlContent-engagement"><section class="exe-udlContent-block"><div class="exe-udlContent-content"><div class="exe-udlContent-content-main"><p>Texto</p></div><article class="exe-udlContent-content-simplified js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Lectura facilitada</h2></header><p>Lectura</p><button class="exe-udlContent-alt-content-hide">Cerrar</button></article><article class="exe-udlContent-content-audio js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Audio</h2></header><p>Audio</p><button class="exe-udlContent-alt-content-hide">Cerrar</button></article><article class="exe-udlContent-content-visual js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Apoyo visual</h2></header><p>Apoyo visual</p><button class="exe-udlContent-alt-content-hide">Cerrar</button></article></div></section></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "checklist": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>checklist</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="listacotejo-IDevice"><div class="listacotejo-instructions CTJ-instructions"><p>Completa la lista de cotejo marcando las casillas al realizar las actividades correspondientes.</p></div><div class="listacotejo-DataGame js-hidden">%E9%B0%E6%EB%E2%F7%D5%F3%FF%F7%B0%A8%B0%D1%FD%E6%F7%F8%FD%B0%BE%B0%FB%F6%B0%A8%F4%F3%FE%E1%F7%BE%B0%E6%FB%E6%FE%F7%B0%A8%B0%DF%FB%B2%E6%7F%E6%E7%FE%FD%B0%BE%B0%E1%E7%F0%E6%FB%E6%FE%F7%B0%A8%B0%B0%BE%B0%FE%F7%E4%F7%FE%E1%B0%A8%C9%E9%B0%E6%EB%E2%F7%B0%A8%B0%A2%B0%BE%B0%FC%FB%E4%F7%FE%B0%A8%B0%A2%B0%BE%B0%FB%E6%F7%FF%B0%A8%B0%C2%D3%B0%BE%B0%E2%FD%FB%FC%E6%E1%B0%A8%B0%B0%EF%CF%BE%B0%FA%F3%E1%DE%FD%F5%FD%B0%A8%F4%F3%FE%E1%F7%BE%B0%E7%E0%FE%DE%FD%F5%FD%B0%A8%B0%B0%BE%B0%FA%F3%E1%D1%FD%FF%FF%E7%FC%FB%E6%EB%B0%A8%F4%F3%FE%E1%F7%BE%B0%E7%E0%FE%D1%FD%FF%FF%E7%FC%FB%E6%EB%B0%A8%B0%B0%BE%B0%FA%F3%E1%D6%F7%F1%FD%E0%F3%E6%FB%E4%F7%B0%A8%F4%F3%FE%E1%F7%BE%B0%E7%E0%FE%D6%F7%F1%FD%E0%F3%E6%FB%E4%F7%B0%A8%B0%B0%BE%B0%E1%F3%E4%F7%D6%F3%E6%F3%B0%A8%F4%F3%FE%E1%F7%BE%B0%E7%1F%F7%E0%D6%F3%E6%F3%B0%A8%F4%F3%FE%E1%F7%BE%B0%F4%FD%FD%E6%F7%E0%B0%A8%B0%D7%E1%E6%F3%B2%AE%F3%B2%FA%E0%F7%F4%AF%FA%E6%E6%E2%E1%A8%BD%BD%F7%E1%BC%E5%FB%F9%FB%E2%F7%F6%FB%F3%BC%FD%E0%F5%BD%E5%FB%F9%FB%BD%DE%FB%E1%E6%F3%CD%F6%F7%CD%F1%FD%FF%E2%E0%FD%F0%F3%F1%FB%B7%D1%A1%B7%D0%A1%FC%AC%FE%FB%E1%E6%F3%B2%F6%F7%B2%F1%FD%E6%F7%F8%FD%AE%BD%F3%AC%B2%E1%F7%B2%F7%FC%F1%E7%F7%FC%E6%E0%F3%B2%F0%F3%F8%FD%B2%E7%FC%F3%B2%FE%FB%F1%F7%FC%F1%FB%F3%AE%BD%F0%E0%AC%AE%F3%B2%FA%E0%F7%F4%AF%FA%E6%E6%E2%A8%BD%BD%F1%E0%F7%F3%E6%FB%E4%F7%F1%FD%FF%FF%FD%FC%E1%BC%FD%E0%F5%BD%FE%FB%F1%F7%FC%E1%F7%E1%BD%F0%EB%BF%E1%F3%BD%A6%BC%A2%AC%D1%E0%F7%F3%E6%FB%E4%F7%B2%D1%FD%FF%FF%FD%FC%E1%B2%C0%F7%F1%FD%FC%FD%F1%FB%FF%FB%F7%FC%E6%FD%BF%D1%FD%FF%E2%F3%E0%E6%FB%E0%B2%FB%F5%E7%F3%FE%B2%A6%BC%A2%B2%DB%FC%E6%F7%E0%FC%F3%E6%FB%FD%FC%F3%FE%B2%DE%FB%F1%F7%FC%E1%F7%AE%BD%F3%AC%B0%BE%B0%E7%E1%F7%C1%F1%FD%E0%F7%B0%A8%F4%F3%FE%E1%F7%BE%B0%FF%E1%F5%E1%B0%A8%E9%B0%FF%E1%F5%D1%FD%FF%E2%FE%FB%E6%B0%A8%B0%D1%FD%FF%E2%FE%F7%E6%F3%F6%F3%E1%B0%BE%B0%FF%E1%F5%D6%FD%FC%F7%B0%A8%B0%DA%F7%F1%FA%FD%B0%BE%B0%FF%E1%F5%DB%FC%C2%E0%FD%F5%E0%F7%E1%E1%B0%A8%B0%D7%FC%B2%E2%E0%FD%F1%F7%E1%FD%B0%BE%B0%FF%E1%F5%C7%FC%E0%F7%F3%FE%FB%E8%F7%F6%B0%A8%B0%C1%FB%FC%B2%F1%FD%FF%E2%FE%F7%E6%F3%E0%B0%BE%B0%FF%E1%F5%E6%F3%E1%F9%DC%E7%FF%F0%F7%E0%B0%A8%B0%DCh%FF%F7%E0%FD%B2%F6%F7%B2%E6%F3%E0%F7%F3%E1%B0%BE%B0%FF%E1%F5%DC%F3%FF%F7%B0%A8%B0%DC%FD%FF%F0%E0%F7%B0%BE%B0%FF%E1%F5%D6%F3%E6%F7%B0%A8%B0%D4%F7%F1%FA%F3%B0%BE%B0%FF%E1%F5%C1%F3%E4%F7%B0%A8%B0%D6%F7%E1%F1%F3%E0%F5%F3%E0%B0%BE%B0%FF%E1%F5%DE%FB%E1%E6%B0%A8%B0%FE%FB%E1%E6%F3%CD%F6%F7%CD%F1%FD%E6%F7%F8%FD%B0%BE%B0%FF%E1%F5%C1%F1%FD%E0%F7%B0%A8%B0%C2%E7%FC%E6%E7%F3%F1%FBa%FC%B0%BE%B0%FF%E1%F5%C5%F7%FB%F5%FA%E6%B0%A8%B0%C2%F7%E1%FD%B0%BE%B0%FF%E1%F5%C2%FD%FB%FC%E6%E1%B0%A8%B0%E2%E7%FC%E6%FD%E1%B0%BE%B0%FF%E1%F5%C2%FD%FB%FC%E6%B0%A8%B0%E2%E7%FC%E6%FD%B0%BE%B0%FF%E1%F5%C0%F7%F0%FD%FD%E6%B0%A8%B0%C0%F7%FB%FC%FB%F1%FB%F3%E0%B0%BE%B0%FF%E1%F5%D6%F7%FE%F7%E6%F7%B0%A8%B0-%C1%F7%F5%E7%E0%FD%B2%E3%E7%F7%B2%F6%F7%E1%F7%F3%B2%F0%FD%E0%E0%F3%E0%B2%E6%FD%F6%FD%E1%B2%FE%FD%E1%B2%F1%F3%FF%E2%FD%E1%B2%F6%F7%FE%B2%F4%FD%E0%FF%E7%FE%F3%E0%FB%FD%AD%B0%EF%EF</div><div class="listacotejo-bns js-hidden">Navegador incompatible</div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "form": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>form</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-form-container">
            <div id="frmMainContainer-UUID-IDEVICE" class="form-IDevice" data-id="UUID-IDEVICE">
                <div class="form-instructions"><p>Responde a las preguntas del cuestionario</p></div>
                <div class="form-body" id="frmBody-UUID-IDEVICE" style="display:block;">
                    <div class="FRMP-Questions">
                        <div id="form-questions-UUID-IDEVICE" > </div>
                    </div>
                </div>
            </div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","repeatActivity":true,"msgs":{"msgTypeGame":"Formulario","msgCheck":"Comprobar","msgReset":"Reiniciar","msgShowAnswers":"Mostrar respuestas"},"questionsData":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "guess": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>guess</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="adivina-IDevice"><div class="adivina-instructions gameQP-instructions"><p>Observa las letras, identifica y rellena las palabras que faltan.</p></div><div class="adivina-DataGame js-hidden">%E9%B0%E6%EB%E2%F7%D5%F3%FF%F7%B0%A8%B0%D3%F6%FB%E4%FB%FC%F3%B0%EF%EF</div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    "rubric": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>rubric</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="rubric-IDevice"><div class="exe-rubrics-instructions gameQP-instructions"><p>Completa la siguiente rúbrica</p></div><div class="rubric"><div class="exe-rubrics-DataGame js-hidden">{}</div></div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,
        
    "interactive-video": `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>interactive-video</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-interactive-video"><p id="exe-interactive-video-file" class="js-hidden"><a href=""></a></p><script id="exe-interactive-video-contents" type="application/json">{"slides":[],"scorm":{"isScorm":0},"scoreNIA":false,"evaluation":false,"ideviceID":"UUID-IDEVICE"}</script></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`
};

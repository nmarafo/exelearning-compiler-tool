export const SNIPPETS_DICT = {
    text: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>text</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-text-template">
    <div class="exe-text-activity">
        <p>Mi texto</p>
    </div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","textTextarea":"<div class=\\"exe-text-activity\\"><p>Mi texto</p></div>","textFeedbackInput":"Mostrar retroalimentación","textFeedbackTextarea":""}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    casestudy: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>casestudy</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-casestudy-container"><div class="caseStudyContent"><div class="CSP-History mb-3"><p>Mi historia</p></div><div class="CSP-Activities mb-3"><div class="CSP-Activity mb-3"><p>Mi actividad</p></div><div class="iDevice_buttons feedback-button js-required"><input type="button" class="CSP-FeedbackBtn feedbacktooglebutton" value="Mostrar retroalimentación"></div><div class="CSP-FeedbackText feedback js-feedback js-hidden" style="display: none;"><p>Mi retroalimentación</p></div></div></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"id":"UUID-IDEVICE","typeGame":"Case study","history":"<p>Mi historia</p>","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","activities":[{"activity":"<p>Mi actividad</p>","feedback":"<p>Mi retroalimentación</p>","buttonCaption":"Mostrar retroalimentación"}]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    digcompedu: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>digcompedu</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="digcompeduIdeviceContent"><h3>Resumen DigCompEdu</h3><p>Selected indicators: 0</p></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","digcompeduSelected":[],"digcompeduDisplayMode":"table","digcompeduDataLang":"es","digcompeduGranularity":"indicator"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'download-source-file': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>download-source-file</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-download-package-instructions"><p class="exe-download-package-link"><a download="exe-package:elp-name" href="exe-package:elp" style="background-color:#107275;color:#ffffff;">Descargar el archivo .elpx</a></p></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'external-website': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>external-website</odeIdeviceTypeName>
          <htmlView><![CDATA[<div id="iframeWebsiteIdevice"><iframe src="https://exelearning.net" width="600" height="300" style="width:100%;"></iframe></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'image-gallery': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>image-gallery</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-image-gallery-template"><div class="imageGallery-IDevice"><div class="imageGallery-body"></div></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'udl-content': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>udl-content</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-udlContent exe-udlContent-engagement"><section class="exe-udlContent-block"><div class="exe-udlContent-content"><div class="exe-udlContent-content-main"><p>Contenido principal</p></div><article class="exe-udlContent-content-simplified js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Lectura facilitada</h2></header><p>Lectura facilitada</p><button class="exe-udlContent-alt-content-hide">Cerrar</button></article><article class="exe-udlContent-content-audio js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Audio</h2></header><p>Audio</p><button class="exe-udlContent-alt-content-hide">Cerrar</button></article><article class="exe-udlContent-content-visual js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Apoyo visual</h2></header><p>Apoyo visual</p><button class="exe-udlContent-alt-content-hide">Cerrar</button></article></div></section></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    checklist: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>checklist</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="listacotejo-IDevice"><div class="listacotejo-instructions CTJ-instructions"><p>Completa la lista de cotejo marcando las casillas.</p></div><div class="listacotejo-DataGame js-hidden"></div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    form: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>form</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-form-container"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div id="frmMainContainer-UUID-IDEVICE" class="form-IDevice" data-id="UUID-IDEVICE"><div class="form-instructions"><p>Responde a las preguntas.</p></div></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","evaluation":false,"evaluationID":"UUID-EVALUACION","eXeFormInstructions":"<p>Responde a las preguntas.</p>","questionsData":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    guess: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>guess</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="adivina-IDevice"><div class="adivina-instructions gameQP-instructions"><p>Adivina las palabras.</p></div><div class="adivina-DataGame js-hidden"></div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'interactive-video': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>interactive-video</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-interactive-video"><p id="exe-interactive-video-file" class="js-hidden"><a href="https://www.youtube.com/watch?v=Jm9qT8yqZzw">youtube</a></p><script id="exe-interactive-video-contents" type="application/json">{"ideviceID":"UUID-IDEVICE","slides":[],"i18n":{}}</script></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'progress-report': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>progress-report</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="informe-IDevice"><div class="informe-DataGame js-hidden">{"typeGame":"Progress Report","sessionIdevices":[]}</div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'select-media-files': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>select-media-files</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="seleccionamedias-IDevice"><div class="seleccionamedias-instructions gameQP-instructions"><p>Selecciona las tarjetas correctas.</p></div><div class="seleccionamedias-DataGame js-hidden"></div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    rubric: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>rubric</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="rubric-IDevice"><div class="rubric"><div class="exe-rubrics-DataGame js-hidden"></div></div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`
};

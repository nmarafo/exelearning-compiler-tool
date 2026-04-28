export const SNIPPETS_DICT = {
    text: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>text</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-text-template">
    <div class="exe-text-activity">
        {{CONTENT}}
    </div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","textTextarea":"<div class=\\"exe-text-activity\\">{{CONTENT}}</div>","textFeedbackInput":"Mostrar retroalimentación","textFeedbackTextarea":""}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    casestudy: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>casestudy</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-casestudy-container"><div class="caseStudyContent"><div class="CSP-History mb-3">{{CONTENT}}</div><div class="CSP-Activities mb-3"><div class="CSP-Activity mb-3">{{ACTIVITY}}</div><div class="iDevice_buttons feedback-button js-required"><input type="button" class="CSP-FeedbackBtn feedbacktooglebutton" value="Mostrar retroalimentación"></div><div class="CSP-FeedbackText feedback js-feedback js-hidden" style="display: none;">{{FEEDBACK}}</div></div></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"id":"UUID-IDEVICE","typeGame":"Case study","history":"{{CONTENT}}","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","activities":[{"activity":"{{ACTIVITY}}","feedback":"{{FEEDBACK}}","buttonCaption":"Mostrar retroalimentación"}]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    digcompedu: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>digcompedu</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="digcompedu-container"><div class="digcompeduIdeviceContent">{{CONTENT}}</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"id":"UUID-IDEVICE","typeGame":"DigCompEdu","content":"{{CONTENT}}"}]]></jsonProperties>
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
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
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
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
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
          <htmlView><![CDATA[<div class="exe-udlContent exe-udlContent-engagement"><section class="exe-udlContent-block"><div class="exe-udlContent-content"><div class="exe-udlContent-content-main">{{CONTENT}}</div><article class="exe-udlContent-content-simplified js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Lectura facilitada</h2></header>{{UDL_EASY}}<button class="exe-udlContent-alt-content-hide">Cerrar</button></article><article class="exe-udlContent-content-audio js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Audio</h2></header>{{UDL_AUDIO}}<button class="exe-udlContent-alt-content-hide">Cerrar</button></article></div></section></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    checklist: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>checklist</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="listacotejo-IDevice">
  <div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div>
  <div class="listacotejo-feedback-game"></div>
  <div class="listacotejo-instructions CTJ-instructions"><p>{{INSTRUCTIONS}}</p></div>
  <div id="listacotejo-DataGame-UUID-IDEVICE" class="listacotejo-DataGame js-hidden" data-id="UUID-IDEVICE"></div>
  <div class="listacotejo-bns js-hidden">Su navegador no es compatible con esta herramienta.</div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    form: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>form</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-form-container">
  <div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div>
            <div id="frmMainContainer-UUID-IDEVICE" class="form-IDevice" data-id="UUID-IDEVICE">
                <div class="form-Data js-hidden">{}</div>
                <div class="form-instructions"><p>{{INSTRUCTIONS}}</p></div>
                <div class="FRMP-GameScoreBoard" style="display:none;">
                    <div>
                        <strong><span class="sr-av">Tiempo por pregunta:</span></strong>
                        <span id="frmPTime-UUID-IDEVICE">00:00</span>
                    </div>
                </div>
                <div class="FRMP-StartGame" id="frmStartGameDiv-UUID-IDEVICE" style="display:none;">
                      <button  id="frmStartGame-UUID-IDEVICE" type="button" class="btn btn-primary">Pulsa aquí para empezar</button>
                </div>
                <div class="form-body" id="frmBody-UUID-IDEVICE" style="display:block;">
                    <div class="FRMP-Questions">
                        <div id="form-questions-UUID-IDEVICE" > </div>
                        <div id="frmCover-UUID-IDEVICE" class="FRMP-Cover"> </div>
                    </div>
                    <div id="resultsContainer-UUID-IDEVICE" class="form-results-container inline">
                        <div id="form-score-UUID-IDEVICE" class="score-text">Puntuación.</div>
                        <div id="form-result-test-UUID-IDEVICE" class="score-text phrase-score"></div>
                    </div>
                    <div class="form-buttons-container inline">
                        <input id="form-button-check-UUID-IDEVICE" class="btn btn-primary" type="button" value="Comprobar"
                            data-id="UUID-IDEVICE" data-pass-rate="" />
                        <input id="form-button-reset-UUID-IDEVICE" type="button" value="Reiniciar"
                            data-id="UUID-IDEVICE" class="btn btn-primary"  style="display:none" />
                        <input id="form-button-show-answers-UUID-IDEVICE" class="btn btn-primary" type="button" value="Mostrar respuestas"
                            data-id="UUID-IDEVICE" style="display: " />
                    </div>
                </div>
                <div class="Games-BottonContainer">
                    <div class="Games-GetScore">
                        <input id="frmPSendScore-UUID-IDEVICE" type="button" value="Guardar la puntuación" class="feedbackbutton Games-SendScore" style="display:none"/> <span class="Games-RepeatActivity"></span>
                    </div>
                </div>
            </div>
            <div class="questionsMedia" style="display:none"></div>
</div>]]></htmlView>
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
          <htmlView><![CDATA[<div class="adivina-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="adivina-version js-hidden">2</div><div class="adivina-feedback-game"></div><div class="adivina-instructions gameQP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="adivina-DataGame js-hidden"></div><div class="adivina-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","typeGame":"Guess","instructions":"<p>Adivina las palabras.</p>","msgs":{"msgCorrect":"¡Correcto!","msgIncorrect":"¡Incorrecto!","msgLookAnswer":"Mira la respuesta","msgSubmit":"Comprobar"},"words":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'interactive-video': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>interactive-video</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-interactive-video"><p id="exe-interactive-video-file" class="js-hidden"><a href="{{VIDEO_URL}}">{{VIDEO_TYPE}}</a></p><script id="exe-interactive-video-contents" type="application/json">{"ideviceID":"UUID-IDEVICE","slides":[],"i18n":{}}</script></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","videoURL":"{{VIDEO_URL}}","videoType":"{{VIDEO_TYPE}}","activityToSave":{"slides":[],"i18n":{}},"ask":true}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'progress-report': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>progress-report</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="informe-IDevice"><div class="informe-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="informe-button" style="text-align:center;margin-top:10px;"><input type="button" value="Generar informe de progreso" class="feedbacktooglebutton"></div><div class="informe-DataGame js-hidden">{"typeGame":"Progress Report","sessionIdevices":[]}</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","typeGame":"Progress Report","instructions":"<p>{{INSTRUCTIONS}}</p>"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    complete: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>complete</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="completa-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="completa-feedback-game"></div><div class="completa-instructions"><p>Lee el texto y completa las palabras que faltan.</p></div><div id="completa-DataGame-UUID-IDEVICE" class="completa-DataGame js-hidden" data-id="UUID-IDEVICE"></div><div class="completa-text-game js-hidden">{{CONTENT}}</div><div class="cmpt-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'select-media-files': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>select-media-files</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="seleccionamedias-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="seleccionamedias-feedback-game"></div><div class="seleccionamedias-instructions gameQP-instructions"><p>Selecciona las tarjetas correctas.</p></div><div id="seleccionamedias-DataGame-UUID-IDEVICE" class="seleccionamedias-DataGame js-hidden" data-id="UUID-IDEVICE"></div><div class="seleccionamedias-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
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
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'quick-questions-multiple-choice': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>quick-questions-multiple-choice</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="quick-questions-multiple-choice-IDevice"><div class="quick-questions-multiple-choice-DataGame js-hidden"></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`,

    'trueorfalse': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>trueorfalse</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="true-false-IDevice"><div class="true-false-DataGame js-hidden"></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties>
          </odeComponentsProperties>
        </odeComponent>`
};

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
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    casestudy: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>casestudy</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-casestudy-container"><div class="caseStudyContent"><div class="CSP-History mb-3">{{CONTENT}}</div><div class="CSP-Activities mb-3"><div class="CSP-Activity mb-3">{{ACTIVITY}}</div><div class="iDevice_buttons feedback-button js-required"><input type="button" class="CSP-FeedbackBtn feedbacktooglebutton" value="Mostrar retroalimentación"></div><div class="CSP-FeedbackText feedback js-feedback js-hidden" style="display: none;">{{FEEDBACK}}</div></div></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"id":"UUID-IDEVICE","typeGame":"Case study","history":"{{CONTENT}}","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","activities":[{"activity":"{{ACTIVITY}}","feedback":"{{FEEDBACK}}","buttonCaption":"Mostrar retroalimentación"}]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    digcompedu: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>digcompedu</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="digcompeduIdeviceContent">
<div class="digcompedu-instructions">{{CONTENT}}</div>
<h3>Resumen DigCompEdu</h3><p>Indicadores seleccionados: {{DIGCOMPEDU_COUNT}}</p><div class="digcompedu-summary-wrapper" data-lang="es" data-display="table">{{DIGCOMPEDU_TABLE}}</div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","digcompeduSelected":[],"digcompeduDisplayMode":"table","digcompeduDataLang":"es","digcompeduGranularity":"indicator","digcompeduSummaryTableHtml":"","digcompeduSummaryTextHtml":""}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'download-source-file': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>download-source-file</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-download-package-instructions"><p class="exe-download-package-link"><a download="exe-package:elp-name" href="exe-package:elp" style="background-color:#107275;color:#ffffff;">Descargar el archivo .elpx</a></p></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'external-website': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>external-website</odeIdeviceTypeName>
          <htmlView><![CDATA[<div id="iframeWebsiteIdevice"><iframe src="{{URL}}" width="100%" height="450" style="width:100%; border:0; border-radius:8px;"></iframe></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","url":"{{URL}}"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'image-gallery': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>image-gallery</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-image-gallery-template"><div class="imageGallery-IDevice"><div class="imageGallery-body">{{CONTENT}}</div></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","images":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'udl-content': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>udl-content</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-udlContent exe-udlContent-engagement"><section class="exe-udlContent-block"><div class="exe-udlContent-content"><div class="exe-udlContent-content-main">{{CONTENT}}</div><article class="exe-udlContent-content-simplified js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Lectura facilitada</h2></header>{{UDL_EASY}}<button class="exe-udlContent-alt-content-hide">Cerrar</button></article><article class="exe-udlContent-content-audio js-hidden"><header class='exe-udlContent-alt-content-title'><h2>Audio</h2></header>{{UDL_AUDIO}}<button class="exe-udlContent-alt-content-hide">Cerrar</button></article></div></section></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
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
          <odeComponentsProperties></odeComponentsProperties>
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
          <button id="frmStartGame-UUID-IDEVICE" type="button" class="btn btn-primary">Pulsa aquí para empezar</button>
      </div>
      <div class="form-body" id="frmBody-UUID-IDEVICE" style="display:block;">
          <div class="FRMP-Questions">
              <div id="form-questions-UUID-IDEVICE"></div>
              <div id="frmCover-UUID-IDEVICE" class="FRMP-Cover"></div>
          </div>
          <div id="resultsContainer-UUID-IDEVICE" class="form-results-container inline">
              <div id="form-score-UUID-IDEVICE" class="score-text">Puntuación.</div>
              <div id="form-result-test-UUID-IDEVICE" class="score-text phrase-score"></div>
          </div>
          <div class="form-buttons-container inline">
              <input id="form-button-check-UUID-IDEVICE" class="btn btn-primary" type="button" value="Comprobar" data-id="UUID-IDEVICE" data-pass-rate="" />
              <input id="form-button-reset-UUID-IDEVICE" type="button" value="Reiniciar" data-id="UUID-IDEVICE" class="btn btn-primary" style="display:none" />
              <input id="form-button-show-answers-UUID-IDEVICE" class="btn btn-primary" type="button" value="Mostrar respuestas" data-id="UUID-IDEVICE" style="display:" />
          </div>
      </div>
      <div class="Games-BottonContainer">
          <div class="Games-GetScore">
              <input id="frmPSendScore-UUID-IDEVICE" type="button" value="Guardar la puntuación" class="feedbackbutton Games-SendScore" style="display:none"/>
              <span class="Games-RepeatActivity"></span>
          </div>
      </div>
  </div>
  <div class="questionsMedia" style="display:none"></div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","evaluation":false,"evaluationID":"UUID-EVALUACION","eXeFormInstructions":"<p>{{INSTRUCTIONS}}</p>","questionsData":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    guess: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>guess</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="adivina-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="adivina-version js-hidden">2</div><div class="adivina-feedback-game"></div><div class="adivina-instructions gameQP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="adivina-DataGame js-hidden"></div><div class="adivina-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","typeGame":"Guess","instructions":"<p>{{INSTRUCTIONS}}</p>","msgs":{"msgCorrect":"¡Correcto!","msgIncorrect":"¡Incorrecto!","msgLookAnswer":"Mira la respuesta","msgSubmit":"Comprobar"},"words":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'interactive-video': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>interactive-video</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-interactive-video"><p id="exe-interactive-video-file" class="js-hidden"><a href="{{VIDEO_URL}}">{{VIDEO_TYPE}}</a></p><script id="exe-interactive-video-contents" type="application/json">{"ideviceID":"UUID-IDEVICE","slides":[],"i18n":{}}</script></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","videoURL":"{{VIDEO_URL}}","videoType":"{{VIDEO_TYPE}}","activityToSave":{"slides":[],"i18n":{}},"ask":true}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'progress-report': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>progress-report</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="informe-IDevice"><div class="informe-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="informe-button" style="text-align:center;margin-top:10px;"><input type="button" value="Generar informe de progreso" class="feedbacktooglebutton"></div><div class="informe-DataGame js-hidden">{"typeGame":"Progress Report","sessionIdevices":[]}</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","typeGame":"Progress Report","instructions":"<p>{{INSTRUCTIONS}}</p>"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    complete: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>complete</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="completa-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="completa-feedback-game"></div><div class="completa-instructions"><p>{{INSTRUCTIONS}}</p></div><div id="completa-DataGame-UUID-IDEVICE" class="completa-DataGame js-hidden" data-id="UUID-IDEVICE"></div><div class="completa-text-game js-hidden">{{CONTENT}}</div><div class="cmpt-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'select-media-files': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>select-media-files</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="seleccionamedias-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="seleccionamedias-feedback-game"></div><div class="seleccionamedias-instructions gameQP-instructions"><p>{{INSTRUCTIONS}}</p></div><div id="seleccionamedias-DataGame-UUID-IDEVICE" class="seleccionamedias-DataGame js-hidden" data-id="UUID-IDEVICE"></div><div class="seleccionamedias-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    rubric: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>rubric</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="rubric-IDevice"><div class="exe-rubrics-instructions gameQP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="rubric"><div class="exe-rubrics-DataGame js-hidden"></div><p class="exe-rubrics-authorship sr-av"><a href="http://cedec.intef.es/" target="_blank" class="author" rel="noopener">CEDEC</a>. <span class="title"><em>{{TITLE}}</em></span> <span class="license">(<a href="https://creativecommons.org/licenses/" rel="license nofollow noopener" target="_blank" title="Creative Commons CC-BY-SA">CC BY-SA</a>)</span></p><ul class="exe-rubrics-strings"><li class="rubric">Rúbrica</li><li class="activity">Actividad</li><li class="name">Nombre</li><li class="date">Fecha</li><li class="score">Puntuación</li><li class="notes">Notas</li><li class="download">Descargar</li><li class="msgDelete">¿Seguro que desea borrar todos los campos del formulario?</li><li class="reset">Reiniciar</li><li class="print">Imprimir</li><li class="apply">Aplicar</li><li class="newWindow">Ventana nueva</li><li class="msgEndGameScore">Completa la rúbrica antes de guardar tu puntuación.</li><li class="msgScoreScorm">La puntuación no se puede guardar porque esta página no forma parte de un paquete SCORM.</li><li class="msgOnlySaveScore">¡Solo puede guardar la puntuación una vez!</li><li class="msgYouScore">Su puntuación</li><li class="msgOnlySaveAuto">Tu puntuación se guardará después de cada cambio. Solo puedes completarla una vez.</li><li class="msgSaveAuto">Tu puntuación se guardará automáticamente después de cada cambio.</li><li class="msgSeveralScore">Puede guardar la puntuación tantas veces como quiera</li><li class="msgYouLastScore">La última puntuación guardada es</li><li class="msgActityComply">Ya ha realizado esta actividad.</li><li class="msgPlaySeveralTimes">Puede realizar esta actividad cuantas veces quiera</li><li class="msgScore">Puntuación</li><li class="msgWeight">Peso</li></ul></div><div class="exe-rubrics-richtext-data sr-av"><span class="exe-rubrics-instructions-data">{{INSTRUCTIONS_DATA}}</span><span class="exe-rubrics-text-after-data"></span></div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'quick-questions-multiple-choice': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>quick-questions-multiple-choice</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="selecciona-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="selecciona-instructions SLCNP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="selecciona-version js-hidden">2</div><div class="selecciona-feedback-game"></div><div class="selecciona-DataGame js-hidden"></div><div class="selecciona-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'quick-questions': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>quick-questions</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="quext-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="quext-instructions QXTP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="quext-version js-hidden">2</div><div class="quext-feedback-game"></div><div class="quext-DataGame js-hidden"></div><div class="quext-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'quick-questions-video': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>quick-questions-video</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="vquext-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="vquext-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="vquext-version js-hidden">2</div><div class="vquext-DataGame js-hidden"></div><a href="#" class="js-hidden vquext-LinkLocalVideo">0</a><div class="vquext-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    trueorfalse: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>trueorfalse</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-trueorfalse-container">
    <div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div>
    <div class="TOFP-instructions"><p>{{INSTRUCTIONS}}</p></div>
    <div class="TOFP-MainContainer" data-instance="UUID-IDEVICE" id="tofPMainContainer-UUID-IDEVICE">
        <div class="TOFP-GameContainer" id="tofPGameContainer-UUID-IDEVICE">
            <div class="TOFP-GameScoreBoard TOFP-EHidden">
                <div class="TOFP-TimeNumber">
                    <strong><span class="sr-av">Tiempo por pregunta:</span></strong>
                    <p id="tofPPTime-UUID-IDEVICE" class="TOFP-PTime">00:00:</p>
                </div>
            </div>
            <div class="TOFP-MessgeDiv" id="tofPMessageDiv-UUID-IDEVICE">
                <div class="TOFP-Message" id="tofPMessage-UUID-IDEVICE"></div>
            </div>
            <div class="TOFP-StartGameDiv TOFP-EHidden" id="tofPStartGameDiv-UUID-IDEVICE">
                <button id="tofPStartGame-UUID-IDEVICE" type="button" class="btn btn-primary">Pulsa aquí para empezar</button>
            </div>
            <div class="TOFP-Multimedia" id="tofPMultimedia-UUID-IDEVICE"></div>
            <div class="TOFP-CheckTestDiv TOFP-EHidden" id="tofPCheckTestDiv-UUID-IDEVICE">
                <button id="tofPCheckTest-UUID-IDEVICE" type="button" class="btn btn-primary">Comprobar</button>
                <button id="tofRebootTest-UUID-IDEVICE" type="button" class="btn btn-primary TOFP-EHidden">¡Prueba otra vez!</button>
            </div>
        </div> 
        <div class="Games-BottonContainer">
            <div class="Games-GetScore">
                <input id="tofPSendScore-UUID-IDEVICE" type="button" value="Guardar la puntuación" class="feedbackbutton Games-SendScore" style="display:none"/>
                <span class="Games-RepeatActivity"></span>
            </div>
        </div>
        <div class="TOFP-After"></div>
        <div class="questionsMedia" style="display:none"></div>
    </div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"id":"UUID-IDEVICE","typeGame":"TrueOrFalse","eXeGameInstructions":"<p>{{INSTRUCTIONS}}</p>","eXeIdeviceTextAfter":"","questionsRandom":false,"percentageQuestions":100,"isTest":false,"time":0,"questionsGame":[],"isScorm":0,"textButtonScorm":"Guardar la puntuación","repeatActivity":true,"weighted":100,"evaluation":false,"evaluationID":"UUID-EVALUACION","showSlider":false,"attempsNumber":2,"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    crossword: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>crossword</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="crucigrama-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="crucigrama-version js-hidden">1</div><div class="crucigrama-feedback-game"></div><div class="crucigrama-instructions gameQP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="crucigrama-DataGame js-hidden"></div><div class="crucigrama-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,
    
    sort: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>sort</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="ordena-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="ordena-feedback-game"></div><div class="ordena-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="ordena-DataGame js-hidden"></div><div class="ordena-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    relate: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>relate</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="relaciona-IDevice"><div class="relaciona-instructions gameQP-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="relaciona-DataGame js-hidden"></div><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="relaciona-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    rosco: `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>az-quiz-game</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="rosco-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="rosco-version js-hidden">2</div><div class="rosco-feedback-game"></div><div class="rosco-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="rosco-DataGame js-hidden"></div><a href="#" class="js-hidden rosco-LinkImages">0</a><a href="#" class="js-hidden rosco-LinkImages">1</a><a href="#" class="js-hidden rosco-LinkImages">2</a><a href="#" class="js-hidden rosco-LinkImages">3</a><a href="#" class="js-hidden rosco-LinkImages">4</a><a href="#" class="js-hidden rosco-LinkImages">5</a><a href="#" class="js-hidden rosco-LinkImages">6</a><a href="#" class="js-hidden rosco-LinkImages">7</a><a href="#" class="js-hidden rosco-LinkImages">8</a><a href="#" class="js-hidden rosco-LinkImages">9</a><a href="#" class="js-hidden rosco-LinkImages">10</a><a href="#" class="js-hidden rosco-LinkImages">11</a><a href="#" class="js-hidden rosco-LinkImages">12</a><a href="#" class="js-hidden rosco-LinkImages">13</a><a href="#" class="js-hidden rosco-LinkImages">14</a><a href="#" class="js-hidden rosco-LinkImages">15</a><a href="#" class="js-hidden rosco-LinkImages">16</a><a href="#" class="js-hidden rosco-LinkImages">17</a><a href="#" class="js-hidden rosco-LinkImages">18</a><a href="#" class="js-hidden rosco-LinkImages">19</a><a href="#" class="js-hidden rosco-LinkImages">20</a><a href="#" class="js-hidden rosco-LinkImages">21</a><a href="#" class="js-hidden rosco-LinkImages">22</a><a href="#" class="js-hidden rosco-LinkImages">23</a><a href="#" class="js-hidden rosco-LinkImages">24</a><a href="#" class="js-hidden rosco-LinkImages">25</a><a href="#" class="js-hidden rosco-LinkImages">26</a><a href="#" class="js-hidden rosco-LinkAudios">0</a><a href="#" class="js-hidden rosco-LinkAudios">1</a><a href="#" class="js-hidden rosco-LinkAudios">2</a><a href="#" class="js-hidden rosco-LinkAudios">3</a><a href="#" class="js-hidden rosco-LinkAudios">4</a><a href="#" class="js-hidden rosco-LinkAudios">5</a><a href="#" class="js-hidden rosco-LinkAudios">6</a><a href="#" class="js-hidden rosco-LinkAudios">7</a><a href="#" class="js-hidden rosco-LinkAudios">8</a><a href="#" class="js-hidden rosco-LinkAudios">9</a><a href="#" class="js-hidden rosco-LinkAudios">10</a><a href="#" class="js-hidden rosco-LinkAudios">11</a><a href="#" class="js-hidden rosco-LinkAudios">12</a><a href="#" class="js-hidden rosco-LinkAudios">13</a><a href="#" class="js-hidden rosco-LinkAudios">14</a><a href="#" class="js-hidden rosco-LinkAudios">15</a><a href="#" class="js-hidden rosco-LinkAudios">16</a><a href="#" class="js-hidden rosco-LinkAudios">17</a><a href="#" class="js-hidden rosco-LinkAudios">18</a><a href="#" class="js-hidden rosco-LinkAudios">19</a><a href="#" class="js-hidden rosco-LinkAudios">20</a><a href="#" class="js-hidden rosco-LinkAudios">21</a><a href="#" class="js-hidden rosco-LinkAudios">22</a><a href="#" class="js-hidden rosco-LinkAudios">23</a><a href="#" class="js-hidden rosco-LinkAudios">24</a><a href="#" class="js-hidden rosco-LinkAudios">25</a><a href="#" class="js-hidden rosco-LinkAudios">26</a><div class="rosco-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","typeGame":"Rosco","instructions":"<p>{{INSTRUCTIONS}}</p>","words":[]}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,

    'word-search': `<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>word-search</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="sopa-IDevice">
    <div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div>
    <div class="sopa-version js-hidden">2</div>
    <div class="sopa-instructions"><p>{{INSTRUCTIONS}}</p></div>
    <div class="sopa-feedback-game"></div>              
    <div class="sopa-DataGame js-hidden"></div>
    <div class="sopa-bns js-hidden">Su navegador no es compatible con esta herramienta.</div>
</div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE"}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`
};

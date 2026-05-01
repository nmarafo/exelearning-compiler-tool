const snippets = {
    header: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ode SYSTEM "content.dtd">
<ode xmlns="http://www.intef.es/xsd/ode" version="2.0">
<userPreferences>
  <userPreference><key>theme</key><value>base</value></userPreference>
</userPreferences>
<odeResources>
  <odeResource><key>odeId</key><value>UUID-PROYECTO</value></odeResource>
  <odeResource><key>odeVersionId</key><value>UUID-VERSION</value></odeResource>
  <odeResource><key>exe_version</key><value>4.0.0</value></odeResource>
</odeResources>
<odeProperties>
  <odeProperty><key>pp_title</key><value>{{TITLE}}</value></odeProperty>
  <odeProperty><key>pp_lang</key><value>es</value></odeProperty>
  <odeProperty><key>pp_license</key><value>creative commons: attribution - share alike 4.0</value></odeProperty>
  <odeProperty><key>pp_licenseUrl</key><value>https://creativecommons.org/licenses/by-sa/4.0/</value></odeProperty>
  <odeProperty><key>pp_theme</key><value>base</value></odeProperty>
  <odeProperty><key>pp_exelearning_version</key><value>4.0.0</value></odeProperty>
  <odeProperty><key>pp_modified</key><value>\${MODIFIED_TIMESTAMP}</value></odeProperty>
  <odeProperty><key>pp_addExeLink</key><value>true</value></odeProperty>
  <odeProperty><key>pp_addPagination</key><value>false</value></odeProperty>
  <odeProperty><key>pp_addSearchBox</key><value>false</value></odeProperty>
  <odeProperty><key>pp_addAccessibilityToolbar</key><value>false</value></odeProperty>
  <odeProperty><key>pp_addMathJax</key><value>false</value></odeProperty>
  <odeProperty><key>exportSource</key><value>true</value></odeProperty>
  <odeProperty><key>pp_globalFont</key><value>default</value></odeProperty>
</odeProperties>
<odeNavStructures>`,
    navStructureStart: `
<odeNavStructure>
  <odePageId>UUID-PAGINA</odePageId>
  <odeParentPageId></odeParentPageId>
  <pageName>{{PAGENAME}}</pageName>
  <odeNavStructureOrder>{{ORDER}}</odeNavStructureOrder>
  <odeNavStructureProperties>
    <odeNavStructureProperty><key>titlePage</key><value>{{PAGENAME}}</value></odeNavStructureProperty>
  </odeNavStructureProperties>
  <odePagStructures>`,
    pagStructure: `
    <odePagStructure>
      <odePageId>UUID-PAGINA</odePageId>
      <odeBlockId>UUID-BLOQUE</odeBlockId>
      <blockName>{{BLOCKNAME}}</blockName>
      <iconName>{{ICONNAME}}</iconName>
      <odePagStructureOrder>0</odePagStructureOrder>
      <odePagStructureProperties></odePagStructureProperties>
      <odeComponents>`,
    text: `
<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>text</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-text-template"><div class="exe-text-activity">{{CONTENT}}</div></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","textInfoDurationInput":"","textInfoDurationTextInput":"Duración","textInfoParticipantsInput":"","textInfoParticipantsTextInput":"Agrupamiento","textTextarea":"<div class=\\"exe-text-activity\\">{{CONTENT}}</div>","textFeedbackInput":"Mostrar retroalimentación","textFeedbackTextarea":"","type":"text","title":"{{TITLE}}","main_text":"{{RAW_CONTENT}}","image":"","duration":"","participants":"","id":"UUID-IDEVICE","evaluationID":"UUID-EVALUACION","evaluation":false}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,
    form: `
<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>az-quiz-game</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="rosco-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="rosco-version js-hidden">2</div><div class="rosco-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="rosco-DataGame js-hidden"></div><a href="#" class="js-hidden rosco-LinkImages">0</a><a href="#" class="js-hidden rosco-LinkImages">1</a><a href="#" class="js-hidden rosco-LinkImages">2</a><a href="#" class="js-hidden rosco-LinkImages">3</a><a href="#" class="js-hidden rosco-LinkImages">4</a><a href="#" class="js-hidden rosco-LinkImages">5</a><a href="#" class="js-hidden rosco-LinkImages">6</a><a href="#" class="js-hidden rosco-LinkImages">7</a><a href="#" class="js-hidden rosco-LinkImages">8</a><a href="#" class="js-hidden rosco-LinkImages">9</a><a href="#" class="js-hidden rosco-LinkImages">10</a><a href="#" class="js-hidden rosco-LinkImages">11</a><a href="#" class="js-hidden rosco-LinkImages">12</a><a href="#" class="js-hidden rosco-LinkImages">13</a><a href="#" class="js-hidden rosco-LinkImages">14</a><a href="#" class="js-hidden rosco-LinkImages">15</a><a href="#" class="js-hidden rosco-LinkImages">16</a><a href="#" class="js-hidden rosco-LinkImages">17</a><a href="#" class="js-hidden rosco-LinkImages">18</a><a href="#" class="js-hidden rosco-LinkImages">19</a><a href="#" class="js-hidden rosco-LinkImages">20</a><a href="#" class="js-hidden rosco-LinkImages">21</a><a href="#" class="js-hidden rosco-LinkImages">22</a><a href="#" class="js-hidden rosco-LinkImages">23</a><a href="#" class="js-hidden rosco-LinkImages">24</a><a href="#" class="js-hidden rosco-LinkImages">25</a><a href="#" class="js-hidden rosco-LinkImages">26</a><a href="#" class="js-hidden rosco-LinkAudios">0</a><a href="#" class="js-hidden rosco-LinkAudios">1</a><a href="#" class="js-hidden rosco-LinkAudios">2</a><a href="#" class="js-hidden rosco-LinkAudios">3</a><a href="#" class="js-hidden rosco-LinkAudios">4</a><a href="#" class="js-hidden rosco-LinkAudios">5</a><a href="#" class="js-hidden rosco-LinkAudios">6</a><a href="#" class="js-hidden rosco-LinkAudios">7</a><a href="#" class="js-hidden rosco-LinkAudios">8</a><a href="#" class="js-hidden rosco-LinkAudios">9</a><a href="#" class="js-hidden rosco-LinkAudios">10</a><a href="#" class="js-hidden rosco-LinkAudios">11</a><a href="#" class="js-hidden rosco-LinkAudios">12</a><a href="#" class="js-hidden rosco-LinkAudios">13</a><a href="#" class="js-hidden rosco-LinkAudios">14</a><a href="#" class="js-hidden rosco-LinkAudios">15</a><a href="#" class="js-hidden rosco-LinkAudios">16</a><a href="#" class="js-hidden rosco-LinkAudios">17</a><a href="#" class="js-hidden rosco-LinkAudios">18</a><a href="#" class="js-hidden rosco-LinkAudios">19</a><a href="#" class="js-hidden rosco-LinkAudios">20</a><a href="#" class="js-hidden rosco-LinkAudios">21</a><a href="#" class="js-hidden rosco-LinkAudios">22</a><a href="#" class="js-hidden rosco-LinkAudios">23</a><a href="#" class="js-hidden rosco-LinkAudios">24</a><a href="#" class="js-hidden rosco-LinkAudios">25</a><a href="#" class="js-hidden rosco-LinkAudios">26</a><div class="rosco-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>]]></htmlView>
          <jsonProperties></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,
    rosco: `<div class="rosco-IDevice"><div class="game-evaluation-ids js-hidden" data-id="UUID-IDEVICE" data-evaluationb="false" data-evaluationid="UUID-EVALUACION"></div><div class="rosco-version js-hidden">2</div><div class="rosco-instructions"><p>{{INSTRUCTIONS}}</p></div><div class="rosco-DataGame js-hidden"></div><a href="#" class="js-hidden rosco-LinkImages">0</a><a href="#" class="js-hidden rosco-LinkImages">1</a><a href="#" class="js-hidden rosco-LinkImages">2</a><a href="#" class="js-hidden rosco-LinkImages">3</a><a href="#" class="js-hidden rosco-LinkImages">4</a><a href="#" class="js-hidden rosco-LinkImages">5</a><a href="#" class="js-hidden rosco-LinkImages">6</a><a href="#" class="js-hidden rosco-LinkImages">7</a><a href="#" class="js-hidden rosco-LinkImages">8</a><a href="#" class="js-hidden rosco-LinkImages">9</a><a href="#" class="js-hidden rosco-LinkImages">10</a><a href="#" class="js-hidden rosco-LinkImages">11</a><a href="#" class="js-hidden rosco-LinkImages">12</a><a href="#" class="js-hidden rosco-LinkImages">13</a><a href="#" class="js-hidden rosco-LinkImages">14</a><a href="#" class="js-hidden rosco-LinkImages">15</a><a href="#" class="js-hidden rosco-LinkImages">16</a><a href="#" class="js-hidden rosco-LinkImages">17</a><a href="#" class="js-hidden rosco-LinkImages">18</a><a href="#" class="js-hidden rosco-LinkImages">19</a><a href="#" class="js-hidden rosco-LinkImages">20</a><a href="#" class="js-hidden rosco-LinkImages">21</a><a href="#" class="js-hidden rosco-LinkImages">22</a><a href="#" class="js-hidden rosco-LinkImages">23</a><a href="#" class="js-hidden rosco-LinkImages">24</a><a href="#" class="js-hidden rosco-LinkImages">25</a><a href="#" class="js-hidden rosco-LinkImages">26</a><a href="#" class="js-hidden rosco-LinkAudios">0</a><a href="#" class="js-hidden rosco-LinkAudios">1</a><a href="#" class="js-hidden rosco-LinkAudios">2</a><a href="#" class="js-hidden rosco-LinkAudios">3</a><a href="#" class="js-hidden rosco-LinkAudios">4</a><a href="#" class="js-hidden rosco-LinkAudios">5</a><a href="#" class="js-hidden rosco-LinkAudios">6</a><a href="#" class="js-hidden rosco-LinkAudios">7</a><a href="#" class="js-hidden rosco-LinkAudios">8</a><a href="#" class="js-hidden rosco-LinkAudios">9</a><a href="#" class="js-hidden rosco-LinkAudios">10</a><a href="#" class="js-hidden rosco-LinkAudios">11</a><a href="#" class="js-hidden rosco-LinkAudios">12</a><a href="#" class="js-hidden rosco-LinkAudios">13</a><a href="#" class="js-hidden rosco-LinkAudios">14</a><a href="#" class="js-hidden rosco-LinkAudios">15</a><a href="#" class="js-hidden rosco-LinkAudios">16</a><a href="#" class="js-hidden rosco-LinkAudios">17</a><a href="#" class="js-hidden rosco-LinkAudios">18</a><a href="#" class="js-hidden rosco-LinkAudios">19</a><a href="#" class="js-hidden rosco-LinkAudios">20</a><a href="#" class="js-hidden rosco-LinkAudios">21</a><a href="#" class="js-hidden rosco-LinkAudios">22</a><a href="#" class="js-hidden rosco-LinkAudios">23</a><a href="#" class="js-hidden rosco-LinkAudios">24</a><a href="#" class="js-hidden rosco-LinkAudios">25</a><a href="#" class="js-hidden rosco-LinkAudios">26</a><div class="rosco-bns js-hidden">Su navegador no es compatible con esta herramienta.</div></div>`,
    udlContent: `
<odeComponent>
          <odePageId>UUID-PAGINA</odePageId>
          <odeBlockId>UUID-BLOQUE</odeBlockId>
          <odeIdeviceId>UUID-IDEVICE</odeIdeviceId>
          <odeIdeviceTypeName>udl-content</odeIdeviceTypeName>
          <htmlView><![CDATA[<div class="exe-udlContent exe-udlContent-engagement"><section class="exe-udlContent-block"><div class="exe-udlContent-content"><div class="exe-udlContent-content-main">{{CONTENT}}</div></div></section></div>]]></htmlView>
          <jsonProperties><![CDATA[{"ideviceId":"UUID-IDEVICE","type":"udl-content","title":"{{TITLE}}","main_text":"{{RAW_CONTENT}}","easy_reading":"","audio_script":"","id":"UUID-IDEVICE","evaluationID":"UUID-EVALUACION","evaluation":false}]]></jsonProperties>
          <odeComponentsOrder>0</odeComponentsOrder>
          <odeComponentsProperties></odeComponentsProperties>
        </odeComponent>`,
    footer: `
      </odeComponents>
    </odePagStructure>
  </odePagStructures>
</odeNavStructure>
</odeNavStructures>
</ode>`
};
if (typeof module !== 'undefined') module.exports = snippets;

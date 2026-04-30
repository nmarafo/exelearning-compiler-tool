
import { SNIPPETS_DICT } from '../snippets.js';
import { compileExeProject } from '../compiler.js';
import fs from 'fs';

// Mock JSZip
global.JSZip = function() {
    this.files = {};
    this.file = function(name, content) {
        this.files[name] = content;
    };
    this.generateAsync = async function() {
        return this.files["content.xml"];
    };
};

const testConfig = [
    {
        page_name: "Prueba Rosco",
        idevices: [
            {
                type: "rosco",
                title: "El Rosco de Saint-Saëns",
                instructions: "Observa las letras, identifica y rellena las palabras que faltan.",
                time: 300,
                words: [
                    { letter: "A", word: "Acuario", definition: "Pieza del Carnaval de los Animales.", type: "starts" },
                    { letter: "B", word: "Barco", definition: "Vehículo marino.", type: "starts" }
                ]
            }
        ]
    }
];

async function runTest() {
    const xml = await compileExeProject(testConfig);
    fs.writeFileSync('scratch/output_content.xml', xml);
    console.log("Archivo generado en scratch/output_content.xml");
}

runTest();

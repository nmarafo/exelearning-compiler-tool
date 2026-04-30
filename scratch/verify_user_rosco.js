
import { compileExeProject } from '../compiler.js';
import fs from 'fs';

const userJson = [
  {
    "page_name": "Sesión 3",
    "idevices": [
      {
        "type": "rosco",
        "title": "El Rosco de Saint-Saëns",
        "time": 300,
        "words": [
          {
            "letter": "A",
            "word": "ASCANIO",
            "definition": "Nombre de la ópera que Saint-Saëns trajo a Canarias.",
            "type": "starts"
          },
          {
            "letter": "C",
            "word": "CANDELARIA",
            "definition": "Nombre de la joven pianista a quien dedicó el Vals.",
            "type": "starts"
          },
          {
            "letter": "F",
            "word": "FILARMÓNICA",
            "definition": "Entidad musical de la que fue Socio de Mérito.",
            "type": "starts"
          },
          {
            "letter": "O",
            "word": "ÓRGANO",
            "definition": "Instrumento que inauguró en la iglesia de los Claretianos.",
            "type": "starts"
          },
          {
            "letter": "S",
            "word": "SANNOIS",
            "definition": "Seudónimo de incógnito como comerciante de vinos.",
            "type": "starts"
          },
          {
            "letter": "V",
            "word": "VALSE",
            "definition": "Nombre de la danza (canariote) dedicada a la isla.",
            "type": "starts"
          }
        ]
      }
    ]
  }
];

// Mock JSZip
global.JSZip = class {
    file() {}
    async generateAsync() { return "mock-blob"; }
};

async function test() {
    try {
        const result = await compileExeProject(userJson);
        console.log("Compilación exitosa.");
    } catch (e) {
        console.error("Error:", e);
    }
}

test();

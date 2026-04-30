
import { compileExeProject } from '../compiler.js';
import fs from 'fs';
import path from 'path';

const testConfig = [
    {
        page_name: "Prueba Rosco",
        idevices: [
            {
                type: "rosco",
                title: "Mi Rosco de Prueba",
                instructions: "Adivina las palabras del rosco.",
                time: 300,
                words: [
                    { letter: "A", word: "Árbol", definition: "Planta con tronco leñoso.", type: "starts" },
                    { letter: "B", word: "Barco", definition: "Vehículo que flota en el agua.", type: "starts" },
                    { letter: "C", word: "Coche", definition: "Vehículo de cuatro ruedas.", type: "starts" }
                ]
            }
        ]
    }
];

// Mock JSZip and window for Node environment if needed, but compileExeProject expects JSZip to be global or imported
// In our compiler.js it seems JSZip is expected to be available.
// Let's see if we can run it.

async function runTest() {
    try {
        const blob = await compileExeProject(testConfig);
        console.log("Compilación exitosa. Blob generado.");
    } catch (e) {
        console.error("Error en test:", e);
    }
}

runTest();

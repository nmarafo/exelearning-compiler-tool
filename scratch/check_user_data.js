const fs = require('fs');

function exeDecrypt(str) {
    if (!str) return "";
    const key = 146;
    let bytes = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '%') {
            const hex = str.substring(i + 1, i + 2 + 1); // 2 chars
            const byte = parseInt(hex, 16);
            bytes.push(byte ^ key);
            i += 2;
        } else {
            bytes.push(str.charCodeAt(i) ^ key);
        }
    }
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(bytes));
}

const xml = fs.readFileSync('c:\\Users\\norbe\\Documents\\Exelearning compilator\\v400rc3Samples\\content.xml', 'utf8');
const match = xml.match(/<div class="rosco-DataGame js-hidden">([^<]*)<\/div>/);
if (match) {
    const encrypted = match[1];
    console.log("Encrypted length:", encrypted.length);
    const decrypted = exeDecrypt(encrypted);
    console.log("Decrypted start:", decrypted.substring(0, 200));
    try {
        const data = JSON.parse(decrypted);
        console.log("Success! WordsGame length:", data.wordsGame.length);
        data.wordsGame.forEach(w => {
            if (w.word) console.log(`Letter: ${w.letter}, Word: ${w.word}`);
        });
    } catch (e) {
        console.error("JSON parse failed:", e.message);
    }
} else {
    console.log("DataGame div not found in user's content.xml");
}

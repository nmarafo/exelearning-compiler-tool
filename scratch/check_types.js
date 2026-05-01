
import fs from 'fs';

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

const xml = fs.readFileSync('c:\\Users\\norbe\\Documents\\Exelearning compilator\\v400rc3Samples\\ejemplo-rosco\\content.xml', 'utf8');
const match = xml.match(/<div class="rosco-DataGame js-hidden">([^<]*)<\/div>/);
if (match) {
    const encrypted = match[1];
    console.log("Encrypted length:", encrypted.length);
    console.log("Encrypted end:", encrypted.substring(encrypted.length - 20));
    const decrypted = exeDecrypt(encrypted);
    console.log("Raw decrypted 1000 chars:", decrypted.substring(0, 1000));
    const count0 = (decrypted.match(/"type":0/g) || []).length;
    const count1 = (decrypted.match(/"type":1/g) || []).length;
    console.log("Found type 0 count:", count0);
    console.log("Found type 1 count:", count1);
    
    // Find all occurrences of "word" and "letter" near "type":1
    const regex = /"letter":"([^"]*)","word":"([^"]*)","definition":"[^"]*","type":1/g;
    let m;
    while ((m = regex.exec(decrypted)) !== null) {
        console.log(`Contains Example - Letter: ${m[1]}, Word: ${m[2]}`);
    }
}

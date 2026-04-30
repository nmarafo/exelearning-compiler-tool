
import fs from 'fs';

function exeDecrypt(str) {
    if (!str) return "";
    const key = 146;
    let ostr = "";
    for (let i = 0; i < str.length; i += 3) {
        if (str[i] === '%') {
            const hex = str.substring(i + 1, i + 3);
            const byte = parseInt(hex, 16);
            ostr += String.fromCharCode(byte ^ key);
        }
    }
    try {
        return decodeURIComponent(escape(ostr));
    } catch (e) {
        return ostr;
    }
}

const xml = fs.readFileSync('scratch/output_content.xml', 'utf8');
const match = xml.match(/<div class="rosco-DataGame js-hidden">(.*?)<\/div>/);
if (match) {
    const encrypted = match[1];
    console.log("Decrypted data:");
    console.log(JSON.stringify(JSON.parse(exeDecrypt(encrypted)), null, 2));
} else {
    console.log("No DataGame found");
}


const spanishLetters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
console.log("Length:", spanishLetters.length);
for (let i = 0; i < spanishLetters.length; i++) {
    console.log(`Pos ${i}: ${spanishLetters[i]} (code: ${spanishLetters.charCodeAt(i)})`);
}

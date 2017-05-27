'use strict';

const fs = require('fs');

const fontBaseDir = __dirname + '/../fonts/';

function genLetterShape(letter, fontName) {
    fontName = fontName || 'Doom';
    letter = letter.toUpperCase();
    let fileBaseDir = fontBaseDir + fontName + '/';
    let filePath = fileBaseDir + letter;
    if (!fs.existsSync(filePath)) {
        filePath = fileBaseDir + '-';
    }
    let buffer = fs.readFileSync(filePath);
    return buffer.toString().split('\n');
}

module.exports = {
    genWords: function(words, fontName) {
        let shapes = [];
        for (let i = 0; i < words.length; i++) {
            if (!shapes[i]) {
                shapes[i] = genLetterShape(words[i], fontName);
            }
        }
        let matrix = [];
        for (let row = 0; row < 6; row++) {
            for (let i = 0; i < shapes.length; i++) {
                matrix[row] = matrix[row] || '';
                matrix[row] += shapes[i][row];
            }
        }
        return matrix;
    }
}
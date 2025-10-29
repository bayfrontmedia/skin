const path = require('path');

const skinJs = {
    entry: path.resolve(__dirname, 'src/js/skin.js'),
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'skin.js'
    }
}

const skinDocsJs = {
    entry: path.resolve(__dirname, 'src/js/skin.js'),
    output: {
        path: path.resolve(__dirname, 'docs/assets/js'),
        filename: 'skin.js'
    }
}

module.exports = [skinJs, skinDocsJs];
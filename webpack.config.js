const path = require('path');

const skinJs = {
    entry: path.resolve(__dirname, 'src/js/skin.js'),
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'skin.js'
    }
}

const skinLibJs = {
    entry: path.resolve(__dirname, 'src/js/skin-lib.js'),
    output: {
        path: path.resolve(__dirname, 'docs/assets/js'),
        filename: 'skin-lib.js'
    }
}

module.exports = [skinJs, skinLibJs];
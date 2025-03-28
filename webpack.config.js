const path = require('path');

const appJs = {
    entry: path.resolve(__dirname, 'src/js/skin.js'),
    output: {
        path: path.resolve(__dirname, 'docs/assets/js'),
        filename: 'skin.js'
    }
}

module.exports = [appJs];
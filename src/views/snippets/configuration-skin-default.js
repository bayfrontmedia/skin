// tailwind.config.js

const colors = require('tailwindcss/colors')

module.exports = {
    skin: {
        borderRadius: '.25rem',
        borderWidth: '1px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
        themes: {
            light: {
                bgDefault: colors.gray["100"],
                bgContent: colors.white,
                borderDefault: colors.gray["300"],
                textDefault: colors.gray["700"],
                textLight: colors.gray["500"],
                textCode: colors.red["600"]
            },
            dark: {
                bgDefault: colors.gray["900"],
                bgContent: colors.gray["800"],
                borderDefault: colors.gray["700"],
                textDefault: colors.gray["300"],
                textLight: colors.gray["500"],
                textCode: colors.red["400"]
            }
        }
    }
}
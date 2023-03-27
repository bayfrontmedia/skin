const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.{html,js}", "./src/js/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'theme-primary': colors.blue["500"],
                'theme-secondary': colors.green["500"]
            },
            fontFamily: {
                'sans': ['Inter', ...defaultTheme.fontFamily.sans],
                'serif': ["'Roboto Slab'", ...defaultTheme.fontFamily.serif],
                'mono': ["'Noto Sans Mono'", ...defaultTheme.fontFamily.mono]
            },
        },
    },
    skin: {
        borderRadius: '.25rem',
        borderWidth: '1px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);',
        themes: { //  Valid themes: light/dark
            light: { // Default theme values can be overwritten
                //textDefault: colors.red["500"]
            },
            dark: {
                //bgDefault: colors.gray["900"]
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('./lib')
    ]
}

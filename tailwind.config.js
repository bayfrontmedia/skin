const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./docs/**/*.{html,js}"],
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
                'mono': ["'Menlo'", ...defaultTheme.fontFamily.mono]
            },
        },
    },
    skin: {
        borderRadius: '0.25rem',
        borderRadiusSm: '0.25rem',
        borderWidth: '1px',
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('./lib')
    ]
}

// tailwind.config.js

const colors = require("tailwindcss/colors");

module.exports = {
    theme: {
        extend: {
            colors: {
                'theme-primary': colors.blue["500"],
                'theme-secondary': colors.green["500"]
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@bayfrontmedia/skin'),
    ]
}
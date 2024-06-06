const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const fileDocs = { // JS for Skin documentation
    entry: path.resolve(__dirname, 'src/js/build-scripts.js'),
    output: {
        path: path.resolve(__dirname, 'docs/assets/js'),
        filename: 'scripts.js'
    }
}

const fileCdn = { // Generic JS for Skin CDN
    entry: path.resolve(__dirname, 'src/js/build-skin.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'skin.min.js'
    }
}

const sidebarItems = [
    {
        heading: 'Getting started',
        items: [
            {
                title: 'Introduction',
                href: 'index.html'
            },
            {
                title: 'Installation',
                href: 'start-installation.html'
            },
            {
                title: 'Configuration',
                href: 'start-configuration.html'
            },
            {
                title: 'JavaScript',
                href: 'start-javascript.html'
            },
            {
                title: 'Application',
                href: 'start-app.html'
            },
        ]
    },
    {
        heading: 'Theme',
        items: [
            {
                title: 'Utilities',
                href: 'theme-utilities.html'
            },
            {
                title: 'Variables',
                href: 'theme-variables.html'
            },
        ]
    },
    {
        heading: 'Components',
        items: [
            {
                title: 'Alert',
                href: 'skin-alert.html'
            },
            {
                title: 'Badge',
                href: 'skin-badge.html'
            },
            {
                title: 'Button',
                href: 'tc-btn.html'
            },
            {
                title: 'Code',
                href: 'skin-code.html'
            },
            {
                title: 'Form',
                href: 'tc-form.html'
            },
            {
                title: 'Icon',
                href: 'skin-icon.html'
            },
            {
                title: 'Line',
                href: 'tc-line.html'
            },
            {
                title: 'List',
                href: 'tc-list.html'
            },
            {
                title: 'Modal',
                href: 'tc-modal.html'
            },
            {
                title: 'Popup',
                href: 'skin-popup.html'
            },
            {
                title: 'Progress',
                href: 'tc-progress.html'
            },
            {
                title: 'Blockquote',
                href: 'tc-blockquote.html'
            },
            {
                title: 'Style',
                href: 'tc-style.html'
            },
            {
                title: 'Table',
                href: 'tc-table.html'
            },
            {
                title: 'Toast',
                href: 'skin-toast.html'
            },
        ]
    },
    {
        heading: 'Examples',
        items: [
            {
                title: 'Card',
                href: 'example-card.html'
            },
            {
                title: 'Dark mode',
                href: 'example-dark-mode.html'
            },
            {
                title: 'Forms',
                href: 'example-forms.html'
            },
            {
                title: 'Images',
                href: 'example-images.html'
            },
            {
                title: 'Tabs',
                href: 'example-tabs.html'
            },
            {
                title: 'Toggle',
                href: 'example-toggle.html'
            },
        ]
    },
    {
        heading: 'Templates',
        items: [
            {
                title: 'Container',
                href: 'templates/template-container.html'
            },
            {
                title: 'Full width',
                href: 'templates/template-full.html'
            },
            {
                title: 'Two column',
                href: 'templates/template-2col.html'
            },
            {
                title: 'Three column',
                href: 'templates/template-3col.html'
            },
            {
                title: 'Login',
                href: 'templates/template-login.html'
            },
            {
                title: 'Login alt',
                href: 'templates/template-login-alt.html'
            },
            {
                title: 'Dashboard',
                href: 'templates/template-dashboard.html'
            },
        ]
    },
];

// noinspection JSUnusedGlobalSymbols
const fileTemplates = {
    //watch: process.env.NODE_ENV === 'development', // See: https://webpack.js.org/configuration/watch/#watch. Currently set using --watch flag
    output: {
        path: path.resolve(__dirname, 'docs'),
    },
    plugins: [
        new HtmlBundlerPlugin({
            entry: { // Define templates here
                'index': { // docs/index.html
                    import: 'src/views/pages/index.html',
                    data: {
                        title: "Introduction",
                    },
                },
                'example-card': {
                    import: 'src/views/pages/example-card.html',
                    data: {
                        title: "Card",
                    },
                },
                'example-dark-mode': {
                    import: 'src/views/pages/example-dark-mode.html',
                    data: {
                        title: "Dark mode",
                    },
                },
                'example-forms': {
                    import: 'src/views/pages/example-forms.html',
                    data: {
                        title: "Forms",
                    },
                },
                'example-images': {
                    import: 'src/views/pages/example-images.html',
                    data: {
                        title: "Images",
                    },
                },
                'example-tabs': {
                    import: 'src/views/pages/example-tabs.html',
                    data: {
                        title: "Tabs",
                    },
                },
                'example-toggle': {
                    import: 'src/views/pages/example-toggle.html',
                    data: {
                        title: "Toggle",
                    },
                },
                'start-configuration': {
                    import: 'src/views/pages/start-configuration.html',
                    data: {
                        title: "Configuration",
                    },
                },
                'start-installation': {
                    import: 'src/views/pages/start-installation.html',
                    data: {
                        title: "Installation",
                    },
                },
                'start-javascript': {
                    import: 'src/views/pages/start-javascript.html',
                    data: {
                        title: "JavaScript",
                    },
                },
                'start-app': {
                    import: 'src/views/pages/start-app.html',
                    data: {
                        title: "Application",
                    },
                },
                'skin-alert': {
                    import: 'src/views/pages/skin-alert.html',
                    data: {
                        title: "Alert",
                    },
                },
                'skin-badge': {
                    import: 'src/views/pages/skin-badge.html',
                    data: {
                        title: "Badge",
                    },
                },
                'tc-blockquote': {
                    import: 'src/views/pages/tc-blockquote.html',
                    data: {
                        title: "Blockquote",
                    },
                },
                'tc-btn': {
                    import: 'src/views/pages/tc-btn.html',
                    data: {
                        title: "Button",
                    },
                },
                'skin-code': {
                    import: 'src/views/pages/skin-code.html',
                    data: {
                        title: "Code",
                    },
                },
                'tc-form': {
                    import: 'src/views/pages/tc-form.html',
                    data: {
                        title: "Form",
                    },
                },
                'skin-icon': {
                    import: 'src/views/pages/skin-icon.html',
                    data: {
                        title: "Icon",
                    },
                },
                'tc-line': {
                    import: 'src/views/pages/tc-line.html',
                    data: {
                        title: "Line",
                    },
                },
                'tc-list': {
                    import: 'src/views/pages/tc-list.html',
                    data: {
                        title: "List",
                    },
                },
                'tc-modal': {
                    import: 'src/views/pages/tc-modal.html',
                    data: {
                        title: "Modal",
                    },
                },
                'skin-popup': {
                    import: 'src/views/pages/skin-popup.html',
                    data: {
                        title: "Popup",
                    },
                },
                'tc-progress': {
                    import: 'src/views/pages/tc-progress.html',
                    data: {
                        title: "Progress",
                    },
                },
                'tc-style': {
                    import: 'src/views/pages/tc-style.html',
                    data: {
                        title: "Style",
                    },
                },
                'tc-table': {
                    import: 'src/views/pages/tc-table.html',
                    data: {
                        title: "Table",
                    },
                },
                'skin-toast': {
                    import: 'src/views/pages/skin-toast.html',
                    data: {
                        title: "Toast",
                    },
                },
                'theme-utilities': {
                    import: 'src/views/pages/theme-utilities.html',
                    data: {
                        title: "Utilities",
                    },
                },
                'theme-variables': {
                    import: 'src/views/pages/theme-variables.html',
                    data: {
                        title: "Variables",
                    },
                },
                'templates/template-2col': {
                    import: 'src/views/pages/templates/template-2col.html',
                    data: {
                        title: "Two column",
                    },
                },
                'templates/template-3col': {
                    import: 'src/views/pages/templates/template-3col.html',
                    data: {
                        title: "Three column",
                    },
                },
                'templates/template-container': {
                    import: 'src/views/pages/templates/template-container.html',
                    data: {
                        title: "Container",
                    },
                },
                'templates/template-dashboard': {
                    import: 'src/views/pages/templates/template-dashboard.html',
                    data: {
                        title: "Dashboard",
                    },
                },
                'templates/template-full': {
                    import: 'src/views/pages/templates/template-full.html',
                    data: {
                        title: "Full width",
                    },
                },
                'templates/template-login': {
                    import: 'src/views/pages/templates/template-login.html',
                    data: {
                        title: "Login",
                    },
                },
                'templates/template-login-alt': {
                    import: 'src/views/pages/templates/template-login-alt.html',
                    data: {
                        title: "Login alt",
                    },
                },
            },
            loaderOptions: {
                preprocessor: 'nunjucks',
                data: {
                    sidebarItems
                },
                sources: false, // Ignore js/css source references in the templates
            },
            minify: 'auto',
            minifyOptions: {
                removeRedundantAttributes: false, // Prevents styling bug when input "type=text" is removed
            }
        })
    ]
}

module.exports = [fileDocs, fileCdn, fileTemplates];
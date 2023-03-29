const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const Nunjucks = require('nunjucks');

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
                href: 'tc-alert.html'
            },
            {
                title: 'Badge',
                href: 'tc-badge.html'
            },
            {
                title: 'Blockquote',
                href: 'tc-blockquote.html'
            },
            {
                title: 'Button',
                href: 'tc-btn.html'
            },
            {
                title: 'Code',
                href: 'tc-code.html'
            },
            {
                title: 'Form',
                href: 'tc-form.html'
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
                title: 'Popper',
                href: 'tc-popper.html'
            },
            {
                title: 'Progress',
                href: 'tc-progress.html'
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
                href: 'tc-toast.html'
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
                        sidebarItems: sidebarItems
                    },
                },
                'example-card': {
                    import: 'src/views/pages/example-card.html',
                    data: {
                        title: "Card",
                        sidebarItems: sidebarItems
                    },
                },
                'example-dark-mode': {
                    import: 'src/views/pages/example-dark-mode.html',
                    data: {
                        title: "Dark mode",
                        sidebarItems: sidebarItems
                    },
                },
                'example-forms': {
                    import: 'src/views/pages/example-forms.html',
                    data: {
                        title: "Forms",
                        sidebarItems: sidebarItems
                    },
                },
                'example-images': {
                    import: 'src/views/pages/example-images.html',
                    data: {
                        title: "Images",
                        sidebarItems: sidebarItems
                    },
                },
                'example-tabs': {
                    import: 'src/views/pages/example-tabs.html',
                    data: {
                        title: "Tabs",
                        sidebarItems: sidebarItems
                    },
                },
                'example-toggle': {
                    import: 'src/views/pages/example-toggle.html',
                    data: {
                        title: "Toggle",
                        sidebarItems: sidebarItems
                    },
                },
                'start-configuration': {
                    import: 'src/views/pages/start-configuration.html',
                    data: {
                        title: "Configuration",
                        sidebarItems: sidebarItems
                    },
                },
                'start-installation': {
                    import: 'src/views/pages/start-installation.html',
                    data: {
                        title: "Installation",
                        sidebarItems: sidebarItems
                    },
                },
                'start-javascript': {
                    import: 'src/views/pages/start-javascript.html',
                    data: {
                        title: "JavaScript",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-alert': {
                    import: 'src/views/pages/tc-alert.html',
                    data: {
                        title: "Alert",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-badge': {
                    import: 'src/views/pages/tc-badge.html',
                    data: {
                        title: "Badge",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-blockquote': {
                    import: 'src/views/pages/tc-blockquote.html',
                    data: {
                        title: "Blockquote",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-btn': {
                    import: 'src/views/pages/tc-btn.html',
                    data: {
                        title: "Button",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-code': {
                    import: 'src/views/pages/tc-code.html',
                    data: {
                        title: "Code",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-form': {
                    import: 'src/views/pages/tc-form.html',
                    data: {
                        title: "Form",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-line': {
                    import: 'src/views/pages/tc-line.html',
                    data: {
                        title: "Line",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-list': {
                    import: 'src/views/pages/tc-list.html',
                    data: {
                        title: "List",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-modal': {
                    import: 'src/views/pages/tc-modal.html',
                    data: {
                        title: "Modal",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-popper': {
                    import: 'src/views/pages/tc-popper.html',
                    data: {
                        title: "Popper",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-progress': {
                    import: 'src/views/pages/tc-progress.html',
                    data: {
                        title: "Progress",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-style': {
                    import: 'src/views/pages/tc-style.html',
                    data: {
                        title: "Style",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-table': {
                    import: 'src/views/pages/tc-table.html',
                    data: {
                        title: "Table",
                        sidebarItems: sidebarItems
                    },
                },
                'tc-toast': {
                    import: 'src/views/pages/tc-toast.html',
                    data: {
                        title: "Toast",
                        sidebarItems: sidebarItems
                    },
                },
                'theme-utilities': {
                    import: 'src/views/pages/theme-utilities.html',
                    data: {
                        title: "Utilities",
                        sidebarItems: sidebarItems
                    },
                },
                'theme-variables': {
                    import: 'src/views/pages/theme-variables.html',
                    data: {
                        title: "Variables",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-2col': {
                    import: 'src/views/pages/templates/template-2col.html',
                    data: {
                        title: "Two column",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-3col': {
                    import: 'src/views/pages/templates/template-3col.html',
                    data: {
                        title: "Three column",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-container': {
                    import: 'src/views/pages/templates/template-container.html',
                    data: {
                        title: "Container",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-dashboard': {
                    import: 'src/views/pages/templates/template-dashboard.html',
                    data: {
                        title: "Dashboard",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-full': {
                    import: 'src/views/pages/templates/template-full.html',
                    data: {
                        title: "Full width",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-login': {
                    import: 'src/views/pages/templates/template-login.html',
                    data: {
                        title: "Login",
                        sidebarItems: sidebarItems
                    },
                },
                'templates/template-login-alt': {
                    import: 'src/views/pages/templates/template-login-alt.html',
                    data: {
                        title: "Login alt",
                        sidebarItems: sidebarItems
                    },
                },
            },
            loaderOptions: {
                preprocessor: (template, { data }) => Nunjucks.renderString(template, data),
                sources: false, // Ignore js/css source references in the templates
            },
            minify: 'auto' // Minify when mode = production
        }),
    ]
}

module.exports = [fileDocs, fileCdn, fileTemplates];
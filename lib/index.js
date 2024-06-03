const plugin = require('tailwindcss/plugin')

const twPlugin = plugin(function ({addUtilities, addComponents, addBase, theme, config}) {

    /**
     * Get value from Tailwind config file else return default value.
     *
     * @param value
     * @param defaultValue
     * @returns {Config|*}
     */

    function skinConfig(value, defaultValue) {
        let configValue = config('skin.' + value);
        if (configValue === undefined) {
            return defaultValue;
        }
        return configValue;
    }

    /**
     * Get object of all theme values.
     *
     * @returns {{}}
     */

    function skinThemes() {

        let skinThemes = {
            light: {
                bgDefault: theme('colors.gray.100'),
                bgContent: theme('colors.white'),
                borderDefault: theme('colors.gray.300'),
                textDefault: theme('colors.gray.700'),
                textLight: theme('colors.gray.500'),
                textCode: theme('colors.red.600'),
            },
            dark: {
                bgDefault: theme('colors.gray.900'),
                bgContent: theme('colors.gray.800'),
                borderDefault: theme('colors.gray.700'),
                textDefault: theme('colors.gray.300'),
                textLight: theme('colors.gray.500'),
                textCode: theme('colors.red.400'),
            },
        }

        const configThemes = skinConfig('themes', false);

        if (typeof configThemes === "object") {

            if (configThemes.hasOwnProperty("light") && typeof configThemes.light === "object") {
                skinThemes.light = {...skinThemes.light, ...configThemes.light};
            }

            if (configThemes.hasOwnProperty("dark") && typeof configThemes.dark === "object") {
                skinThemes.dark = {...skinThemes.dark, ...configThemes.dark};
            }

        }

        return skinThemes;

    }

    const themes = skinThemes();

    for (let theme in themes) {

        if (theme === "light") {

            addBase({
                [":root"]: {
                    '--skin-bg-default': themes[theme].bgDefault,
                    '--skin-bg-content': themes[theme].bgContent,
                    '--skin-border-default': themes[theme].borderDefault,
                    '--skin-text-default': themes[theme].textDefault,
                    '--skin-text-light': themes[theme].textLight,
                    '--skin-text-code': themes[theme].textCode,
                    color: themes[theme].textDefault,
                    backgroundColor: themes[theme].bgDefault
                }
            });

        } else if (theme === "dark") {

            addBase({
                [".dark"]: {
                    '--skin-bg-default': themes[theme].bgDefault,
                    '--skin-bg-content': themes[theme].bgContent,
                    '--skin-border-default': themes[theme].borderDefault,
                    '--skin-text-default': themes[theme].textDefault,
                    '--skin-text-light': themes[theme].textLight,
                    '--skin-text-code': themes[theme].textCode,
                    color: themes[theme].textDefault,
                    backgroundColor: themes[theme].bgDefault
                }
            });

        }

    }

    addComponents({

        /* Styles */

        '.tc-style-default': {
            '@apply tu-bg-default tu-border-default tu-text-default': {}
        },
        '.tc-style-default-o': {
            '@apply hover:tu-bg-default tu-border-default tu-text-default': {}
        },
        '.tc-style-content': {
            '@apply tu-bg-content tu-border-default tu-text-default': {}
        },
        '.tc-style-inverse': {
            '@apply tu-bg-inverse tu-border-inverse tu-text-inverse': {}
        },
        '.tc-style-primary': {
            '@apply bg-theme-primary border-theme-primary text-white': {}
        },
        '.tc-style-primary-o': {
            '@apply hover:bg-theme-primary border-theme-primary text-theme-primary hover:text-white': {}
        },
        '.tc-style-secondary': {
            '@apply bg-theme-secondary border-theme-secondary text-white': {}
        },
        '.tc-style-secondary-o': {
            '@apply hover:bg-theme-secondary border-theme-secondary text-theme-secondary hover:text-white': {}
        },
        '.tc-style-info': {
            '@apply tu-bg-info tu-border-info tu-text-info': {}
        },
        '.tc-style-info-o': {
            '@apply hover:tu-bg-info tu-border-info text-blue-500 hover:tu-text-info': {}
        },
        '.tc-style-info-light': {
            '@apply tu-bg-info-light tu-border-info-light tu-text-info-light': {}
        },
        '.tc-style-warning': {
            '@apply tu-bg-warning tu-border-warning tu-text-warning': {}
        },
        '.tc-style-warning-o': {
            '@apply hover:tu-bg-warning tu-border-warning tu-text-warning-light hover:tu-text-warning': {}
        },
        '.tc-style-warning-light': {
            '@apply tu-bg-warning-light tu-border-warning-light tu-text-warning-light': {}
        },
        '.tc-style-error': {
            '@apply tu-bg-error tu-border-error tu-text-error': {}
        },
        '.tc-style-error-o': {
            '@apply hover:tu-bg-error tu-border-error text-red-600 hover:tu-text-error': {}
        },
        '.tc-style-error-light': {
            '@apply tu-bg-error-light tu-border-error-light tu-text-error-light': {}
        },
        '.tc-style-success': {
            '@apply tu-bg-success tu-border-success tu-text-success': {}
        },
        '.tc-style-success-o': {
            '@apply hover:tu-bg-success tu-border-success text-green-500 hover:tu-text-success': {}
        },
        '.tc-style-success-light': {
            '@apply tu-bg-success-light tu-border-success-light tu-text-success-light': {}
        },

        /* skin-alert */

        'skin-alert': {
            '@apply flex items-center px-3 py-2 border-t-4': {},
            borderRadius: skinConfig('borderRadius', '.5rem'),
            borderWidth: skinConfig('borderWidth', '1px'),
            boxShadow: skinConfig('boxShadow', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);')
        },
        'skin-alert[data-style="bt"]': {
            '@apply border-t-4': {}
        },
        'skin-alert[data-style="br"]': {
            '@apply border-r-4': {}
        },
        'skin-alert[data-style="bb"]': {
            '@apply border-b-4': {}
        },
        'skin-alert[data-style="bl"]': {
            '@apply border-l-4': {}
        },

        /* Badge */

        'skin-badge': {
            '@apply inline-flex items-center px-2 py-0.5 me-2': {},
            borderRadius: skinConfig('borderRadius', '.5rem'),
            borderWidth: skinConfig('borderWidth', '1px')
        },
        'skin-badge[data-style="pill"]': {
            '@apply rounded-full': {}
        },

        /* skin-quote */

        'skin-quote': {
            '@apply p-6 my-12 text-xl border-l-4': {},
            borderColor: 'var(--skin-border-default)'
        },
        'skin-quote[data-float="left"],skin-quote[data-float="right"],skin-quote[data-float="left"][data-style="quote"]': {
            '@apply mr-4 my-12 md:my-6 md:float-left md:max-w-xs xl:max-w-md': {}
        },
        'skin-quote[data-float="center"]': {
            '@apply md:text-center': {}
        },
        'skin-quote[data-float="right"]': {
            '@apply md:ml-4 md:mr-0 md:float-right text-right border-l-0 border-r-4': {}
        },
        'skin-quote[data-style="quote"]': {
            '@apply relative border-0 px-16 my-12': {}
        },
        'skin-quote[data-style="quote"]:before': {
            content: "'“'",
            '@apply absolute top-2 left-0 mr-4 text-8xl text-inherit font-serif': {}
        },
        'skin-quote[data-style="quote"][data-float="right"]:before': {
            '@apply left-6': {}
        },
        'skin-quote footer': {
            '@apply text-base': {},
            color: 'var(--skin-text-light)'
        },
        'skin-quote cite': {
            '@apply italic': {}
        },

        /*
        Button
         */

        '.tc-btn': {
            '@apply inline-flex items-center text-center px-3 py-2 cursor-pointer filter hover:brightness-95 active:brightness-90 disabled:pointer-events-none disabled:opacity-60 transition-all duration-100': {},
            borderColor: 'var(--skin-border-default)',
            borderRadius: skinConfig('borderRadius', '.5rem'),
            borderWidth: skinConfig('borderWidth', '1px')
        },
        '.tc-btn-sm': {
            '@apply px-2 py-1': {}
        },
        '.tc-btn *': {
            '@apply cursor-pointer': {}
        },
        '.tc-btn-row': {
            '@apply flex': {}
        },
        '.tc-btn-row *': {
            '@apply inline-flex': {}
        },
        '.tc-btn-row .tc-btn:not(:last-child)': {
            '@apply border-r-0 rounded-r-none': {}
        },
        '.tc-btn-row .tc-btn:not(:first-child):not(:last-child)': {
            '@apply rounded-none': {}
        },
        '.tc-btn-row .tc-btn:last-child': {
            '@apply rounded-l-none': {}
        },
        '.tc-btn-col': {
            '@apply inline-flex flex-col': {}
        },
        '.tc-btn-col *': {
            '@apply flex-1': {}
        },
        '.tc-btn-col *:not(:last-child)': {
            '@apply border-b-0': {}
        },
        '.tc-btn-col *:not(:first-child):not(:last-child)': {
            '@apply rounded-none': {}
        },
        '.tc-btn-col *:first-child': {
            '@apply rounded-b-none': {}
        },
        '.tc-btn-col *:last-child': {
            '@apply rounded-t-none': {}
        },

        /*
        Code
         */

        'skin-code': {
            '@apply block p-4 text-sm overflow-x-scroll': {},
            backgroundColor: 'var(--skin-bg-default)',
            borderColor: 'var(--skin-border-default)',
            color: 'var(--skin-text-default)',
            borderRadius: skinConfig('borderRadius', '.5rem'),
            borderWidth: skinConfig('borderWidth', '1px'),
            boxShadow: skinConfig('boxShadow', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);')
        },
        'skin-code[data-style="bt"]': {
            '@apply border-t-4': {}
        },
        'skin-code[data-style="br"]': {
            '@apply border-r-4': {}
        },
        'skin-code[data-style="bb"]': {
            '@apply border-b-4': {}
        },
        'skin-code[data-style="bl"]': {
            '@apply border-l-4': {}
        },
        'skin-code[data-style="terminal"]': {
            '@apply tc-style-inverse dark:tc-style-default': {},
        },
        'skin-code pre,skin-code code': {
            '@apply whitespace-pre-line': {}
        },
        'skin-code .circles,skin-code .circles:before,skin-code .circles:after': {
            '@apply block h-3 w-3 rounded-full': {},
        },
        'skin-code .circles:before,skin-code .circles:after': {
            '@apply absolute': {},
            content: "''"
        },
        'skin-code .circles:before': {
            '@apply -translate-x-5 bg-red-500': {}
        },
        'skin-code .circles': {
            '@apply ml-5 mb-6 bg-yellow-500': {}
        },
        'skin-code .circles + div.code-toolbar > .toolbar': { /* Prism position fix */
            '@apply -top-8': {}
        },
        'skin-code .circles:after': {
            '@apply translate-x-5 bg-green-500': {}
        },




        '.tc-code': {
            '@apply p-4 text-sm tc-style-default tu-border-radius tu-border-width tu-box-shadow overflow-x-scroll': {}
        },
        '.tc-code pre,.tc-code code': {
            '@apply whitespace-pre-line': {}
        },
        '.tc-code-alt': {
            '@apply border-l-4': {}
        },
        '.tc-code-terminal': {
            '@apply tc-style-inverse dark:tc-style-default': {}
        },
        '.tc-code-circles,.tc-code-circles:before,.tc-code-circles:after': {
            '@apply block h-3 w-3 rounded-full': {},
        },
        '.tc-code-circles:before,.tc-code-circles:after': {
            '@apply absolute': {},
            content: "''"
        },
        '.tc-code-circles:before': {
            '@apply -translate-x-5 bg-red-500': {}
        },
        '.tc-code-circles': {
            '@apply ml-5 mb-6 bg-yellow-500': {}
        },
        '.tc-code-circles + div.code-toolbar > .toolbar': { /* Prism position fix */
            '@apply -top-8': {}
        },
        '.tc-code-circles:after': {
            '@apply translate-x-5 bg-green-500': {}
        },

        /*
        Divider
         */

        /*
        Form
         */

        '.tc-form-group': {
            '@apply flex': {}
        },
        '.tc-form-group-text': {
            '@apply inline-flex items-center px-3 py-2 tc-style-default border tu-border-radius': {}
        },
        '.tc-form-group input': {
            '@apply z-0': {}
        },
        '.tc-form-group *:first-child': {
            '@apply border-r-0 rounded-r-none': {}
        },
        '.tc-form-group *:nth-child(2)': {
            '@apply rounded-l-none': {}
        },
        '.tc-form-group *:nth-child(2):not(:last-child)': {
            '@apply rounded-r-none': {}
        },
        '.tc-form-group *:nth-child(3)': {
            '@apply border-l-0 rounded-l-none': {}
        },
        '.tc-form-label': {
            '@apply block': {}
        },
        '.tc-form-input,.tc-form-file,.tc-form-textarea,.tc-form-select,.tc-form-checkbox,.tc-form-radio': {
            '@apply p-2 border tu-border-radius tc-style-content dark:tu-bg-default placeholder:tu-text-light disabled:brightness-90 dark:disabled:brightness-75 focus:tu-ring-info': {}
        },
        '.tc-form-input,.tc-form-file,.tc-form-textarea,.tc-form-select': {
            '@apply block w-full': {}
        },
        '.tc-form-file': {
            '@apply focus:outline-none file:mr-4 file:-ml-1 file:-my-2 file:p-2 file:border-0 file:cursor-pointer file:tc-style-default file:text-sm file:font-semibold': {}
        },
        '.tc-form-checkbox,.tc-form-radio': {
            '@apply h-5 w-5 text-blue-500 checked:bg-blue-500 tu-border-radius-sm': {}
        },
        '.tc-form-radio': {
            '@apply rounded-full': {}
        },
        '.tc-form-toggle-label': {
            '@apply relative inline-flex items-center cursor-pointer': {}
        },
        '.tc-form-toggle-label input[type=checkbox]': {
            '@apply sr-only': {}
        },
        '.tc-form-toggle,.tc-form-toggle-sm': {
            '@apply tu-bg-default tu-border-default border rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-blue-500 peer-checked:border-blue-500 after:content-[\'\'] after:absolute after:bg-white after:tu-border-default after:border after:rounded-full after:transition-all peer-focus:tu-ring-info': {}
        },
        '.tc-form-toggle': {
            '@apply w-14 h-8 after:top-1 after:left-1 after:h-6 after:w-6': {}
        },
        '.tc-form-toggle-sm': {
            '@apply w-11 h-6 after:top-0.5 after:left-[2px] after:h-5 after:w-5': {}
        },
        '.tc-form-toggle-text': {
            '@apply ml-4': {}
        },
        '.tc-form-status-info': {
            '@apply tc-style-info-light': {}
        },
        '.tc-form-status-warning': {
            '@apply tc-style-warning-light': {}
        },
        '.tc-form-status-error': {
            '@apply tc-style-error-light': {}
        },
        '.tc-form-status-success': {
            '@apply tc-style-success-light': {}
        },

        /*
        Form: PristineJS
        See: https://pristine.js.org/
         */

        '.form-group.has-danger .tc-form-input, .form-group.has-danger .tc-form-file, .form-group.has-danger .tc-form-textarea, .form-group.has-danger .tc-form-select, .form-group.has-danger .tc-form-checkbox, .form-group.has-danger .tc-form-radio': {
            '@apply tc-form-status-error': {}
        },
        '.form-group.has-success .tc-form-input, .form-group.has-success .tc-form-file, .form-group.has-success .tc-form-textarea, .form-group.has-success .tc-form-select, .form-group.has-success .tc-form-checkbox, .form-group.has-success .tc-form-radio': {
            '@apply tc-form-status-success': {}
        },
        '.form-group .text-help': {
            '@apply text-sm font-semibold mt-1 tu-text-error-light': {}
        },

        /*
        Line
         */

        '.tc-line': {
            '@apply my-6 h-0.5': {},
            backgroundColor: 'var(--skin-border-default)'
        },

        /*
        List
         */

        '.tc-list': {
            '@apply list-disc': {}
        },
        '.tc-list-horizontal,.tc-list-breadcrumb': {
            '@apply flex list-none': {}
        },
        '.tc-list-ordered': {
            '@apply list-decimal': {}
        },
        '.tc-list li,.tc-list-ordered li,.tc-list-outline li': {
            '@apply ml-6 mb-1 pl-1': {}
        },
        '.tc-list-horizontal li,.tc-list-breadcrumb li': {
            '@apply inline': {}
        },
        '.tc-list-horizontal li:not(:last-of-type)': {
            '@apply pr-4': {}
        },
        '.tc-list ol,.tc-list ul': {
            listStyleType: 'circle'
        },
        '.tc-list ol ol,.tc-list ul ul': {
            listStyleType: 'square'
        },
        '.tc-list-ordered ol,.tc-list-ordered ul': {
            '@apply list-decimal': {}
        },
        '.tc-list-outline': {
            listStyle: 'upper-roman'
        },
        '.tc-list-outline li ul': {
            listStyle: 'upper-alpha'
        },
        '.tc-list-outline li ul li ul': {
            '@apply list-decimal': {}
        },
        '.tc-list-outline li ul li ul li ul': {
            listStyle: 'lower-roman'
        },
        '.tc-list-outline li ul li ul li ul li ul': {
            listStyle: 'lower-alpha'
        },

        /*
        Modal
         */

        'body[data-modal-id]': {
            '@apply h-screen overflow-x-hidden overflow-y-hidden !important': {}
        },
        '.tc-modal': {
            '@apply fixed w-full h-full top-0 left-0 flex items-center justify-center pointer-events-none z-40 print:hidden': {},
        },
        '.tc-modal-content': {
            '@apply overflow-y-auto overflow-x-hidden z-50 ease-in-out duration-200': {}
        },
        '.tc-modal-box': {
            '@apply w-11/12 md:max-w-lg max-h-[90%] tu-border-radius relative scale-95 data-[active=true]:scale-100': {},
            boxShadow: '0 20px 10px -10px rgba(0,0,0,0.3)'
        },
        '.tc-modal-drawer-l,.tc-modal-drawer-r': {
            '@apply w-80 absolute h-screen': {}
        },
        '.tc-modal-drawer-l': {
            '@apply top-0 left-0 -translate-x-full data-[active=true]:translate-x-0': {},
            boxShadow: '20px 0px 10px -10px rgba(0,0,0,0.3)'
        },
        '.tc-modal-drawer-r': {
            '@apply top-0 right-0 translate-x-full data-[active=true]:translate-x-0': {},
            boxShadow: '-20px 0px 10px -10px rgba(0,0,0,0.3)'
        },
        '.tc-modal-drawer-t,.tc-modal-drawer-b': {
            '@apply w-screen h-60 absolute -translate-y-full data-[active=true]:translate-y-0': {}
        },
        '.tc-modal-drawer-t': {
            '@apply top-0 left-0': {},
            boxShadow: '0 20px 10px -10px rgba(0,0,0,0.3)'
        },
        '.tc-modal-drawer-b': {
            '@apply bottom-0 left-0 translate-y-full data-[active=true]:translate-y-0': {},
            boxShadow: '0 -20px 10px -10px rgba(0,0,0,0.3)'
        },
        '.tc-modal-screen': {
            '@apply w-screen h-screen relative': {}
        },
        '.tc-modal-overlay': {
            '@apply absolute w-full h-full bg-gray-900/70 dark:bg-gray-600/95': {}
        },

        /*
        Popper
         */

        '.tc-popper': {
            '@apply z-20 hidden opacity-0 transition-opacity duration-100': {}
        },
        '[data-popper-arrow],[data-popper-arrow]::before': {
            '@apply absolute w-[8px] h-[8px] bg-inherit': {}
        },
        '[data-popper-arrow]': {
            '@apply invisible': {}
        },
        '[data-popper-arrow]::before': {
            '@apply visible rotate-45 content-[""]': {}
        },
        '[data-popper-placement^="top"] > [data-popper-arrow]': {
            '@apply bottom-[-4px]': {}
        },
        '[data-popper-placement^="bottom"] > [data-popper-arrow]': {
            '@apply top-[-4px]': {}
        },
        '[data-popper-placement^="left"] > [data-popper-arrow]': {
            '@apply right-[-4px]': {}
        },
        '[data-popper-placement^="right"] > [data-popper-arrow]': {
            '@apply left-[-4px]': {}
        },

        /*
        Progress
         */

        '.tc-progress': {
            '@apply w-full overflow-hidden': {},
            backgroundColor: 'var(--skin-bg-default)',
            borderRadius: skinConfig('borderRadius', '.5rem')
        },
        '.tc-progress-bar': {
            '@apply float-left h-full flex items-center justify-center': {}
        },

        /*
        Table
         */

        '.tc-table': {
            '@apply border-spacing-0 border-separate overflow-hidden tu-border-default tu-border-radius': {}
        },
        '.tc-table th': {
            '@apply tu-bg-default font-semibold': {}
        },
        '.tc-table th,.tc-table td': {
            '@apply p-2': {}
        },
        '.tc-table-row th,.tc-table-row tr:not(:last-of-type) td': {
            '@apply border-b tu-border-default': {}
        },
        '.tc-table-border': {
            '@apply border': {}
        },
        '.tc-table-border th,.tc-table-border td': {
            '@apply border-l tu-border-default': {}
        },
        '.tc-table-border th:first-of-type,.tc-table-border td:first-of-type': {
            '@apply border-l-0': {}
        },
        '.tc-table-border td': {
            '@apply border-t tu-border-default': {}
        },
        '.tc-table-zebra tr:nth-child(even)': {
            '@apply tu-bg-default': {}
        },
        '.tc-table-hover tr:hover': {
            '@apply tu-bg-default': {}
        },

        /*
        Toast
         */

        '.tc-toast-container': {
            '@apply flex flex-col fixed w-auto px-4 sm:px-8 opacity-90 z-20': {}
        },
        '.tc-toast-container.tc-toast-container-tl': {
            '@apply items-start top-4 left-0': {}
        },
        '.tc-toast-container.tc-toast-container-tr': {
            '@apply items-end top-4 right-0': {}
        },
        '.tc-toast-container.tc-toast-container-bl': {
            '@apply items-start bottom-4 left-0': {}
        },
        '.tc-toast-container.tc-toast-container-br': {
            '@apply items-end bottom-4 right-0': {}
        },
        '.tc-toast': {
            '@apply w-96 flex items-center px-3 py-2 tu-border-radius tu-border-width tu-box-shadow': {}
        },
        '.tc-toast-alt': {
            '@apply border-l-4': {}
        },

    })

    addUtilities({

        /* Typography */

        '.tu-typo, .tu-typo-apply': {
            '@apply text-lg print:text-base leading-relaxed print:leading-normal': {}
        },
        '.tu-typo h1:not(.tu-typo-omit),.tu-typo h2:not(.tu-typo-omit),.tu-typo h3:not(.tu-typo-omit),.tu-typo h4:not(.tu-typo-omit),.tu-typo h5:not(.tu-typo-omit),.tu-typo h6:not(.tu-typo-omit),h1.tu-typo-apply,h2.tu-typo-apply,h3.tu-typo-apply,h4.tu-typo-apply,h5.tu-typo-apply,h6.tu-typo-apply': {
            '@apply font-semibold': {}
        },
        '.tu-typo h1:not(.tu-typo-omit),.tu-typo h2:not(.tu-typo-omit),.tu-typo h3:not(.tu-typo-omit),h1.tu-typo-apply,h2.tu-typo-apply,h3.tu-typo-apply': {
            '@apply mb-6': {}
        },
        '.tu-typo h4:not(.tu-typo-omit),.tu-typo h5:not(.tu-typo-omit),.tu-typo h6:not(.tu-typo-omit),h4.tu-typo-apply,h5.tu-typo-apply,h6.tu-typo-apply': {
            '@apply mb-4': {}
        },
        '.tu-typo h1:not(.tu-typo-omit),h1.tu-typo-apply': {
            '@apply text-5xl': {}
        },
        '.tu-typo h2:not(.tu-typo-omit),h2.tu-typo-apply': {
            '@apply text-4xl': {}
        },
        '.tu-typo h3:not(.tu-typo-omit),h3.tu-typo-apply': {
            '@apply text-3xl': {}
        },
        '.tu-typo h4:not(.tu-typo-omit),h4.tu-typo-apply': {
            '@apply text-2xl': {}
        },
        '.tu-typo h5:not(.tu-typo-omit),h5.tu-typo-apply': {
            '@apply text-xl': {}
        },
        '.tu-typo a:not(.tu-typo-omit),a.tu-typo-apply': {
            '@apply hover:underline text-theme-primary': {},
        },
        '.tu-typo p:not(.tu-typo-omit),p.tu-typo-apply': {
            '@apply mb-6': {}
        },

        '.tu-typo code:not(.tu-typo-omit),code.tu-typo-apply,.tu-typo kbd:not(.tu-typo-omit),kbd.tu-typo-apply,.tu-typo samp:not(.tu-typo-omit),samp.tu-typo-apply': {
            '@apply text-sm font-mono': {}
        },
        '.tu-typo code:not(pre *):not(.tu-typo-omit),code:not(pre *).tu-typo-apply,.tu-typo kbd:not(.tu-typo-omit),kbd.tu-typo-apply,.tu-typo samp:not(.tu-typo-omit),samp.tu-typo-apply,.tu-typo mark:not(.tu-typo-omit),mark.tu-typo-apply': {
            '@apply px-1 py-0 tu-border-radius-sm': {}
        },
        '.tu-typo pre:not(.tu-typo-omit),pre.tu-typo-apply': {
            '@apply whitespace-pre-line': {}
        },

        '.tu-typo code:not(pre *):not(.tu-typo-omit),code.tu-typo-apply:not(pre *)': {
            '@apply tu-text-code tu-bg-default': {}
        },
        '.tu-typo kbd:not(.tu-typo-omit),kbd.tu-typo-apply': {
            '@apply tc-style-default tu-border-width': {}
        },
        '.tu-typo samp:not(.tu-typo-omit),samp.tu-typo-apply': {
            '@apply tc-style-inverse': {}
        },
        '.tu-typo mark:not(.tu-typo-omit),mark.tu-typo-apply': {
            '@apply bg-yellow-300': {}
        },

        '.tu-typo figcaption:not(.tu-typo-omit),figcaption.tu-typo-apply': {
            '@apply text-sm tu-text-light': {}
        },
        '.tu-typo q:not(.tu-typo-omit),q.tu-typo-apply': {
            '@apply italic': {}
        },

        /* Theme */

        '.tu-border-radius': {
            borderRadius: skinConfig('borderRadius', '.5rem')
        },
        '.tu-border-radius-sm': {
            borderRadius: skinConfig('borderRadiusSm', '.25rem')
        },
        '.tu-border-width': {
            borderWidth: skinConfig('borderWidth', '1px')
        },
        '.tu-box-shadow': {
            boxShadow: skinConfig('boxShadow', '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);')
        },
        '.tu-bg-default': {
            backgroundColor: 'var(--skin-bg-default)'
        },
        '.tu-bg-inverse': {
            backgroundColor: 'var(--skin-text-default)'
        },
        '.tu-bg-content': {
            backgroundColor: 'var(--skin-bg-content)'
        },
        '.tu-border-default': {
            borderColor: 'var(--skin-border-default)'
        },
        '.tu-border-inverse': {
            borderColor: 'var(--skin-text-default)'
        },
        '.tu-ring-default,.tu-ring-primary,.tu-ring-secondary,.tu-ring-info,.tu-ring-warning,.tu-ring-error,.tu-ring-success': {
            '@apply outline-none ring-offset-0 ring-2': {}
        },
        '.tu-ring-default': {
            '@apply ring-[var(--skin-border-default)] border-[var(--skin-border-default)]': {},
        },
        '.tu-ring-primary': {
            '@apply ring-theme-primary border-theme-primary': {},
        },
        '.tu-ring-secondary': {
            '@apply ring-theme-secondary border-theme-secondary': {},
        },
        '.tu-text-default': {
            color: 'var(--skin-text-default)'
        },
        '.tu-text-inverse': {
            color: 'var(--skin-bg-content)'
        },
        '.tu-text-light': {
            color: 'var(--skin-text-light)'
        },
        '.tu-text-code': {
            color: 'var(--skin-text-code)'
        },

        /* Status */

        '.tu-bg-info': {
            '@apply bg-blue-500': {}
        },
        '.tu-border-info': {
            '@apply border-blue-500': {}
        },
        '.tu-ring-info': {
            '@apply ring-blue-400 dark:ring-blue-700 border-blue-400 dark:border-blue-700': {}
        },
        '.tu-text-info': {
            '@apply text-white': {}
        },
        '.tu-bg-info-light': {
            '@apply bg-blue-100 dark:bg-blue-600 dark:bg-opacity-10': {}
        },
        '.tu-border-info-light': {
            '@apply border-blue-400 dark:border-blue-700': {}
        },
        '.tu-text-info-light': {
            '@apply text-blue-600 dark:text-blue-300': {}
        },
        '.tu-bg-warning': {
            '@apply bg-yellow-300': {}
        },
        '.tu-border-warning': {
            '@apply border-yellow-300': {}
        },
        '.tu-ring-warning': {
            '@apply ring-yellow-400 dark:ring-yellow-700 border-yellow-400 dark:border-yellow-700': {}
        },
        '.tu-text-warning': {
            '@apply text-yellow-900': {}
        },
        '.tu-bg-warning-light': {
            '@apply bg-yellow-100 dark:bg-yellow-400 dark:bg-opacity-10': {}
        },
        '.tu-border-warning-light': {
            '@apply border-yellow-400 dark:border-yellow-700': {}
        },
        '.tu-text-warning-light': {
            '@apply text-yellow-700 dark:text-yellow-400': {}
        },
        '.tu-bg-error': {
            '@apply bg-red-600': {}
        },
        '.tu-border-error': {
            '@apply border-red-600': {}
        },
        '.tu-ring-error': {
            '@apply ring-red-400 dark:ring-red-700 border-red-400 dark:border-red-700': {}
        },
        '.tu-text-error': {
            '@apply text-white': {}
        },
        '.tu-bg-error-light': {
            '@apply bg-red-100 dark:bg-red-400 dark:bg-opacity-10': {}
        },
        '.tu-border-error-light': {
            '@apply border-red-400 dark:border-red-700': {}
        },
        '.tu-text-error-light': {
            '@apply text-red-700 dark:text-red-400': {}
        },
        '.tu-bg-success': {
            '@apply bg-green-500': {}
        },
        '.tu-border-success': {
            '@apply border-green-500': {}
        },
        '.tu-ring-success': {
            '@apply ring-green-400 dark:ring-green-700 border-green-400 dark:border-green-700': {}
        },
        '.tu-text-success': {
            '@apply text-white': {}
        },
        '.tu-bg-success-light': {
            '@apply bg-green-100 dark:bg-green-400 dark:bg-opacity-10': {}
        },
        '.tu-border-success-light': {
            '@apply border-green-400 dark:border-green-700': {}
        },
        '.tu-text-success-light': {
            '@apply text-green-700 dark:text-green-400': {}
        },

        /*
        JS
         */

        '[data-hidden="true"]': { // show/hide/toggle (includes modal)
            '@apply hidden transition-opacity opacity-0': {}
        },

    })

})

module.exports = twPlugin
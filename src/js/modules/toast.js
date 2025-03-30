import Toastify from 'toastify-js';

/*
See: https://github.com/apvarun/toastify-js/tree/master
 */

/**
 * Queue a toast to be shown with showQueue method by saving to localStorage.
 *
 * @param config {Object}
 * @param lang {Object}
 */
export function queue(config = {}, lang = {}) {

    let toasts = [];

    if ("toasts" in localStorage) {

        if (Array.isArray(JSON.parse(localStorage.toasts))) {
            toasts = JSON.parse(localStorage.toasts);
        }

    }

    toasts.push({config: config, lang: lang});
    localStorage.toasts = JSON.stringify(toasts);

}

/**
 * Show queued toasts from localStorage.
 */
export function showQueue() {

    if ("toasts" in localStorage) {

        if (Array.isArray(JSON.parse(localStorage.toasts))) {

            const toasts = JSON.parse(localStorage.toasts);

            for (const toast of toasts) {

                if (typeof toast === "object" && typeof toast.config === "object" && typeof toast.lang === "object") {
                    show(toast.config, toast.lang);

                }
            }

        }

        localStorage.removeItem("toasts");

    }

}

/**
 * Show Toastify toast.
 * See: https://github.com/apvarun/toastify-js/blob/master/README.md#api
 *
 * @param config
 * @param lang
 */
export function show(config = {}, lang = {}) {

    const defaultConfig = {
        text: "",
        className: "",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        offset: {
            x: 0,
            y: 0
        },
        escapeMarkup: false,
        stopOnFocus: true,
        oldestFirst: true
    }

    const defaultLang = {
        close: "Close"
    }

    config = {...defaultConfig, ...config};

    lang = {...defaultLang, ...lang};

    if (config.close === true) {
        config.text += '<button onclick="Skin.Toast.close(this)" type="button" class="tc-toast-close" aria-label="' + lang.close + '"><span class="sr-only">' + lang.close + '</span><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></span></button>';
    }

    config.className = config.className + " tc-toast";

    Toastify(config).showToast();

}

/**
 * Close Toastify toast.
 * See: https://preline.co/docs/toast-notifications.html
 *
 * @param el {Element}
 */
export function close(el) {
    const parent = el.closest('.toastify');
    const close = parent.querySelector('.toast-close');
    close.click();
}
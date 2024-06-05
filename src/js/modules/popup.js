import {arrow, autoUpdate, computePosition, flip, offset, shift} from "@floating-ui/dom";

/**
 * Show popup.
 *
 * @param referenceEl
 * @param floatingEl
 * @param config
 *
 * For valid placements, see:
 * https://floating-ui.com/docs/computePosition#placement
 */
export function show(referenceEl, floatingEl, config = {}) {

    const defaultConfig = {
        unique: false,
        placement: "bottom",
        offset: {
            mainAxis: 0, // top
            crossAxis: 0 // left
        },
        shift: {},
        flip: {}
    };

    config = {...defaultConfig, ...config};

    if (config.unique === true) {
        this.hideAllVisible();
    }

    // TODO: How to cleanup
    /*
    const cleanup = autoUpdate(referenceEl, floatingEl, () => {

    });

     */

    computePosition(referenceEl, floatingEl, {
        middleware: [
            shift(config.shift),
            offset(config.offset),
            flip(config.flip),
        ],
        placement: config.placement
    }).then(({x, y}) => {

        Object.assign(floatingEl.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

        floatingEl.setAttribute("data-popup-visible", "true");

    });

    floatingEl.style.display = 'block';
    //floatingEl.style.opacity = "1";
}

/**
 * Is popup visible?
 *
 * @param el
 * @returns {boolean}
 */
export function isVisible(el) {
    return el.getAttribute("data-popup-visible") === "true";
}

/**
 * Hide popup.
 *
 * @param el
 */
export function hide(el) {

    el.removeAttribute("data-popup-visible");

    window.setTimeout(() => { // Match CSS duration
        el.style.display = '';
    }, 200);

    //el.style.display = '';

}

/**
 * Hide all visible popups.
 */
export function hideAllVisible() {

    const visiblePopups = document.querySelectorAll("[data-popup-visible]");

    visiblePopups.forEach(popup => {

        if (this.isVisible(popup)) {
            this.hide(popup);
        }

    });

}
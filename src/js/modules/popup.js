import {arrow, autoUpdate, computePosition, flip, offset, shift} from "@floating-ui/dom";

let autoUpdated = {};

/**
 * Show popup.
 *
 * @param referenceEl
 * @param floatingEl
 * @param config
 *
 * If the floatingEl has an ID, the popup will be autoUpdated.
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

    config = {...defaultConfig, ...config}

    function renderPopup() {

        /*
        const arrowEl = floatingEl.querySelector('.tc-popup-arrow');

        computePosition(referenceEl, floatingEl, {
            middleware: [
                shift(config.shift),
                offset(config.offset),
                flip(config.flip),
                arrow({
                    element: arrowEl
                })
            ],
            placement: config.placement
        }).then(({x, y, middlewareData}) => {

            if (middlewareData.arrow) {
                const {x, y} = middlewareData.arrow;

                Object.assign(arrowEl.style, {
                    left: x != null ? `${x}px` : '',
                    top: y != null ? `${y}px` : '',
                });
            }

            Object.assign(floatingEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            floatingEl.setAttribute("data-popup-visible", "true");

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

    }

        floatingEl.style.display = 'block';
        //floatingEl.style.opacity = "1";

        if (config.unique === true) {
            hideAllVisible();
        }

        renderPopup();

        /*
        if (floatingEl.hasAttribute('id')) {

            autoUpdated[floatingEl.getAttribute("id")] = autoUpdate(referenceEl, floatingEl, () => {
                renderPopup();
            });

        } else {
            renderPopup();
        }

         */


        // TODO: How to cleanup
        /*
        const cleanup = autoUpdate(referenceEl, floatingEl, () => {

        });

         */


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

        /*
        if (el.hasAttribute('id') && typeof autoUpdated[el.getAttribute("id")] === "undefined") {
            autoUpdated[el.getAttribute("id")]();
            delete autoUpdated[el.getAttribute("id")];
        }

         */

        el.removeAttribute("data-popup-visible");

        window.setTimeout(() => { // Match CSS duration

            el.style.display = '';

        }, 200);

    }

    /**
     * Hide all visible popups.
     */
    export function hideAllVisible() {

        const visiblePopups = document.querySelectorAll("[data-popup-visible]");

        visiblePopups.forEach(popup => {

            if (isVisible(popup)) {
                hide(popup);
            }

        });

    }
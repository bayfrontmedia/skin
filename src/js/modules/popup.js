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

    /**
     * See: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
     */
    function renderPopup() {


        const arrowEl = floatingEl.querySelector('.tc-popup-arrow');
        const arrowLen = arrowEl.offsetWidth;
        const floatingOffset = Math.sqrt(2 * arrowLen ** 2) / 2;

        const mainAxisOffset = floatingOffset + parseInt(String(config.offset.mainAxis));

        // Ensure integer
        config.offset.mainAxis = parseInt(String(mainAxisOffset));
        config.offset.crossAxis = parseInt(String(config.offset.crossAxis));

        computePosition(referenceEl, floatingEl, {
            middleware: [
                shift(config.shift),
                //offset(mainAxisOffset),
                offset(config.offset.mainAxis),
                flip(config.flip),
                arrow({
                    element: arrowEl,
                    padding: 5
                })
            ],
            placement: config.placement
        }).then(({x, y, middlewareData, placement}) => {

            Object.assign(floatingEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });

            if (middlewareData.arrow) {

                /*
                const {x, y} = middlewareData.arrow;

                Object.assign(arrowEl.style, {
                    left: x != null ? `${x}px` : '',
                    top: y != null ? `${y}px` : '',
                });

                 */

                const side = placement.split("-")[0];

                const staticSide = {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right"
                }[side];

                if (middlewareData.arrow) {

                    const { x, y } = middlewareData.arrow;

                    Object.assign(arrowEl.style, {
                        left: x != null ? `${x}px` : "",
                        top: y != null ? `${y}px` : "",
                        // Ensure the static side gets unset when
                        // flipping to other placements' axes.
                        right: "",
                        bottom: "",
                        [staticSide]: `${-arrowLen / 2}px`
                    });

                }

            }



            floatingEl.setAttribute("data-popup-visible", "true");

        });


        /*
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

         */

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
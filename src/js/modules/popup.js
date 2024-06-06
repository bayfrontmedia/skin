import {arrow, autoUpdate, computePosition, flip, offset, shift} from "@floating-ui/dom";

let autoUpdated = {};

/**
 * Render popup without arrow (menu).
 *
 * @param referenceEl
 * @param floatingEl
 * @param config
 */
function renderWithoutArrow(referenceEl, floatingEl, config) {

    computePosition(referenceEl, floatingEl, {
        placement: config.placement,
        middleware: [
            shift(config.shift),
            offset(config.offset),
            flip(config.flip),
        ]
    }).then(({x, y}) => {

        Object.assign(floatingEl.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

    });

}

/**
 * Render popup with menu (tooltip).
 * See: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
 *
 * @param referenceEl
 * @param floatingEl
 * @param config
 */
function renderWithArrow(referenceEl, floatingEl, config) {

    const arrowEl = floatingEl.querySelector('skin-popup-arrow');

    if (!arrowEl) {
        config.offset = config.offset.mainAxis; // Tooltips only use main axis
        renderWithoutArrow(referenceEl, floatingEl, config);
        return;
    }

    const arrowLen = arrowEl.offsetWidth;
    const floatingOffset = Math.sqrt(2 * arrowLen ** 2) / 2;
    const mainAxisOffset = parseInt(String(floatingOffset + config.offset.mainAxis));

    computePosition(referenceEl, floatingEl, {
        placement: config.placement,
        middleware: [
            shift(config.shift),
            offset(mainAxisOffset), // Only the main axis is offset when an arrow is used
            flip(config.flip),
            arrow({
                element: arrowEl,
                padding: 5
            })
        ]
    }).then(({x, y, middlewareData, placement}) => {

        Object.assign(floatingEl.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

        if (middlewareData.arrow) {

            const side = placement.split("-")[0];

            const staticSide = {
                top: "bottom",
                right: "left",
                bottom: "top",
                left: "right"
            }[side];

            const {x, y} = middlewareData.arrow;

            Object.assign(arrowEl.style, {
                left: x != null ? `${x}px` : "",
                top: y != null ? `${y}px` : "",
                // Ensure the static side gets unset when flipping to other placements' axes
                right: "",
                bottom: "",
                [staticSide]: `${-arrowLen / 2}px`
            });

        }

    });

}

/**
 * Show popup.
 *
 * @param referenceEl
 * @param floatingEl
 * @param config
 *
 * If the floatingEl has an ID, the popup will be autoUpdated.
 */
export function show(referenceEl, floatingEl, config = {}) { // TODO: Hide on document click

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

    // Ensure integer
    config.offset.mainAxis = parseInt(String(config.offset.mainAxis));
    config.offset.crossAxis = parseInt(String(config.offset.crossAxis));

    if (config.unique === true) {
        hideAllVisible();
    }

    if (floatingEl.dataset.type === "tooltip") {
        floatingEl.style.display = 'block';
        renderWithArrow(referenceEl, floatingEl, config);
    } else { // "menu"/default
        floatingEl.style.display = 'block';
        renderWithoutArrow(referenceEl, floatingEl, config);
    }

    floatingEl.setAttribute("data-popup-visible", "true");

    // Event

    const popupShow = new CustomEvent("popupShow", {
        detail: {
            referenceEl: referenceEl,
            config: config
        }
    });

    floatingEl.dispatchEvent(popupShow);


    // TODO: How to cleanup
    /*
    if (floatingEl.hasAttribute('id')) {

        autoUpdated[floatingEl.getAttribute("id")] = autoUpdate(referenceEl, floatingEl, () => {
            renderPopup();
        });

    } else {
        renderPopup();
    }

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

    // Event

    const popupHide = new CustomEvent("popupHide");

    el.dispatchEvent(popupHide);

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
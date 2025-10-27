// noinspection JSUnusedGlobalSymbols

import Avow from "./modules/avow";
import * as Console from "./modules/console";
import Form from "./modules/form";
import * as Http from "./modules/http";
import * as Object from "./modules/object";
import SaneDate from "./modules/saneDate";
import * as String from "./modules/string";
import * as Theme from "./modules/theme";
import * as Toast from "./modules/toast";
import * as Visibility from "./modules/visibility";

window.Skin = {
    Avow,
    Console,
    Form,
    Http,
    Object,
    SaneDate,
    String,
    Theme,
    Toast,
    Visibility,
    getConfig,
    init
}

let skinConfig = {};

/**
 * Get config object key, or return value if not existing.
 *
 * @param key
 * @param defaultValue
 * @returns {*}
 */
export function getConfig(key, defaultValue) {
    return Object.getProp(skinConfig, key, defaultValue);
}

/**
 * Initialize Skin.
 *
 * @param config
 */
export function init(config = {}) {

    skinConfig = Object.merge({
        debug: false
    }, config);

    window.addEventListener('load', () => {

        if (getConfig('debug', false) === true) {
            console.log('✅ Skin initialized (v3.0.0)');
        }

        handleDataAttributes();
        Theme.detect();
        Toast.showQueue();

    });

}

/**
 * Handle all Skin-related data attributes.
 */
function handleDataAttributes() {

    // Lazy load

    const dataSrc = document.querySelectorAll("[data-skin-src]");

    dataSrc.forEach(el => {
        el.src = el.getAttribute("data-skin-src");
    });

    // Add classes to hyperlinks for current URL

    const currentEls = document.querySelectorAll("a[data-skin-current-class]");
    const currentUrl = window.location.origin + window.location.pathname;

    currentEls.forEach((el) => {

        const href = el.href.split('#')[0];

        if (currentUrl === href.split('?')[0]) {
            const classList = el.getAttribute('data-skin-current-class').split(' ');
            el.classList.add(...classList);
        }

    });

    // Hide elements

    const dataHide = document.querySelectorAll("[data-skin-hide]");

    dataHide.forEach(el => {

        // Check if it should be hidden

        let toHide = document.getElementById(el.getAttribute("data-skin-hide"));

        if (toHide === null) {
            if (getConfig('debug', true) === true) {
                Skin.Console.logWarning("data-skin-hide element does not exist: " + el.getAttribute("data-skin-hide"));
            }
            return;
        }

        let storage = localStorage.getItem("skin-hide-" + el.getAttribute("data-skin-hide"));

        if (storage !== null) { // Already dismissed

            // Check for expiration

            // Parse the JSON string back to JS object

            let storageObj = JSON.parse(storage);

            if (storageObj.expires === null || Date.now() > storageObj.expires) { // If expires key does not exist, or it has already expired (needs to be shown)

                localStorage.removeItem("skin-hide-" + el.getAttribute("data-skin-hide")); // Remove it

            } else { // Not yet expired (needs to be hidden)

                toHide.remove();

            }

        }

        // Listen for click (save to localStorage and hide)

        if (!el.hasClickListener) { // Keep from being processed twice

            el.addEventListener('click', () => {

                if (el.getAttribute("data-skin-hide-duration")) { // If the dismissal should be persistent

                    let expTime = Date.now() + (parseInt(el.getAttribute("data-skin-hide-duration")) * 60000); // Duration in minutes

                    // Save to localStorage

                    let dismissObj = {dismissed: true, expires: expTime};

                    localStorage.setItem("skin-hide-" + el.getAttribute('data-skin-hide'), JSON.stringify(dismissObj));

                } else { // Expire immediately

                    let expTime = Date.now();

                    // Save to localStorage

                    let dismissObj = {dismissed: true, expires: expTime};

                    localStorage.setItem("skin-hide-" + el.getAttribute('data-skin-hide'), JSON.stringify(dismissObj));

                }

                // Hide target element

                let target = document.getElementById(el.getAttribute('data-skin-hide'));

                let transition = 0;

                if (el.getAttribute("data-skin-hide-transition")) {
                    transition = parseInt(el.getAttribute("data-skin-hide-transition"));
                }

                Visibility.hideThenRemove(target, transition);

            });

        }

        el.hasClickListener = true;

    });

    // Show elements which are hidden via data-skin-hidden=true attribute

    const dataShow = document.querySelectorAll("[data-skin-show]");

    dataShow.forEach(el => {

        let toShow = document.getElementById(el.getAttribute("data-skin-show"));

        if (toShow === null) {
            if (getConfig('debug', true) === true) {
                Skin.Console.logWarning("data-skin-show element does not exist: " + el.getAttribute("data-skin-show"));
            }
            return;
        }

        // Listen for click

        if (!el.hasClickListener) { // Keep from being processed twice

            el.addEventListener('click', () => {

                // Show target element

                let transition = 0;

                if (el.getAttribute("data-skin-show-transition")) {
                    transition = parseInt(el.getAttribute("data-skin-show-transition"));
                }

                Visibility.show(toShow, transition);

            });

        }

        el.hasClickListener = true;

    });

}
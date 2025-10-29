// noinspection JSUnusedGlobalSymbols

import {getConfig} from "../skin";
import {logWarning} from "./utils/console-utils";
import * as Visibility from "./visibility";

/**
 * Handle all Skin-related data attributes.
 */
export function handleDataAttributes() {

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
            if (getConfig('debug', false) === true) {
                logWarning("data-skin-hide element does not exist: " + el.getAttribute("data-skin-hide"));
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
            if (getConfig('debug', false) === true) {
                logWarning("data-skin-show element does not exist: " + el.getAttribute("data-skin-show"));
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

    // Toggle element visibility

    const dataToggle = document.querySelectorAll("[data-skin-toggle]");

    dataToggle.forEach(el => {

        let toToggle = document.getElementById(el.getAttribute("data-skin-toggle"));

        if (toToggle === null) {
            if (getConfig('debug', false) === true) {
                logWarning("data-skin-toggle element does not exist: " + el.getAttribute("data-skin-toggle"));
            }
            return;
        }

        // Listen for click

        if (!el.hasClickListener) { // Keep from being processed twice

            el.addEventListener('click', () => {

                // Toggle target element

                let transition = 0;

                if (el.getAttribute("data-skin-toggle-transition")) {
                    transition = parseInt(el.getAttribute("data-skin-toggle-transition"));
                }

                Visibility.toggle(toToggle, transition);

            });

        }

        el.hasClickListener = true;

    });

}
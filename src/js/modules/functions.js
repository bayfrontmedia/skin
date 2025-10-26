// noinspection JSUnusedGlobalSymbols

import {getConfig} from "../skin";
import {show, hideThenRemove} from "./visibility";

/**
 * Add classes to all hyperlinks as defined in the data-skin-current-class attribute
 * when current URL matches.
 */
export function handleCurrentClass() {

    const currentEls = document.querySelectorAll("a[data-skin-current-class]");
    const currentUrl = window.location.origin + window.location.pathname;

    currentEls.forEach((el) => {

        const href = el.href.split('#')[0];

        if (currentUrl === href.split('?')[0]) {
            const classList = el.getAttribute('data-skin-current-class').split(' ');
            el.classList.add(...classList);
        }

    });

}

/**
 * Handle all Skin-related data attributes.
 */
export function handleDataAttributes() {

    // Hide elements

    const dataHide = document.querySelectorAll("[data-skin-hide]");

    dataHide.forEach(el => {

        // Check if it should be hidden

        let toDismiss = document.getElementById(el.getAttribute("data-skin-hide"));

        if (toDismiss === null) {
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

                //toDismiss.dataset.skinHidden = "false";

            } else { // Not yet expired (needs to be hidden)

                //toDismiss.dataset.skinHidden = "true";
                toDismiss.remove();

            }

        } else { // No interaction yet

            //toDismiss.dataset.skinHidden = "false";

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

                hideThenRemove(target, transition);

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

                show(toShow, transition);

            });

        }

        el.hasClickListener = true;

    });

}
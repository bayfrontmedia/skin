// noinspection JSUnusedGlobalSymbols

import {show, showThenHide} from "./Visibility";

/**
 * Create and show a toast component.
 *
 * @param config
 */

export function create(config = {}) {

    const defaultConfig = {
        containerId: "tc-toast-container", // ID of toast container (parent element)
        removeExisting: false, // Remove any existing toasts which exist inside the container
        toastId: "", // ID of toast (blank for none)
        classes: "tc-style-default", // Class(es) to add in addition to "tc-toast"
        duration: 250, // Animation duration in milliseconds
        hideAfter: 3000, // Hide after duration in milliseconds (0 to not hide)
        innerHTML: "", // Toast inner HTML
        role: "alert", // ARIA alert role
        aria: { // ARIA attributes : values
            "atomic": "true",
            "live": "assertive"
        },
        data: {} // data-* attributes
    }

    // Overwrite default config with passed config object

    config = {...defaultConfig, ...config};

    if (config.containerId === "") {

        // ...logDebug
        return;

    }

    let container = document.getElementById(config.containerId);

    if (!container) {

        // ...logDebug
        return;

    }

    let toast = document.createElement("div"); // Toast placeholder

    toast.setAttribute("role", String(config.role));

    toast.dataset.hidden = "true";

    toast.classList.add("tc-toast");

    toast.classList.add(...config.classes.split(" "));

    // aria-

    if (config.aria) {

        Object.keys(config.aria).forEach(key => {

            toast.setAttribute("aria-" + key, String(config.aria[key]));

        });

    }

    // data-

    if (config.data) {

        Object.keys(config.data).forEach(key => {

            toast.setAttribute("data-" + key, String(config.data[key]));

        });

    }

    toast.innerHTML = config.innerHTML;

    if (config.toastId !== "") {
        toast.id = config.toastId;
    }

    if (config.removeExisting) {
        container.innerHTML = "";
    }

    container.appendChild(toast);

    if (config.hideAfter <= 0) {
        show(toast, config.duration);
    } else {
        showThenHide(toast, config.hideAfter, config.duration);

        window.setTimeout(() => { // Remove from DOM
            toast.remove();
        }, config.hideAfter + (config.hideAfter / 2)); // Needs extra time or else the fade out is buggy

    }

}
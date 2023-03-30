import {show as VisShow, hide as VisHide} from "./Visibility";
import * as focusTrap from 'focus-trap';

/**
 * Focus traps.
 *
 * @type {{}}
 */

let traps = {};

/**
 * Show a modal component.
 *
 * @param id
 * @param config
 */

export function show(id, config = {}) {

    const defaultConfig = {
        strict: false // Restrict modal to only close from a tc-modal-close click
    }

    // Overwrite default config with passed config object

    config = {...defaultConfig, ...config};

    if (document.getElementById(id)) { // If target exists

        if (document.body.hasAttribute('data-modal-id')) { // Close any modal already open
            hide(document.body.getAttribute('data-modal-id'));
        }

        let body = document.querySelector('body')
        let modal = document.getElementById(id);
        let content = modal.querySelector(".tc-modal-content");

        VisShow(modal, 250);

        if (content) {

            window.setTimeout(() => { // Used for CSS animations
                content.dataset.active = "true";
            }, 5);

        }

        modal.style.pointerEvents = "auto";

        body.dataset.modalId = id;
        body.dataset.modalStrict = String(config.strict);

        traps[id] = focusTrap.createFocusTrap(modal, {
            escapeDeactivates: false,
            clickOutsideDeactivates: false,
            allowOutsideClick: false
        });

        traps[id].activate();

    }
    // ...else logDebug

}

/**
 * Hide a modal component.
 *
 * @param id
 */

export function hide(id) {

    if (document.getElementById(id)) { // If target exists

        let body = document.querySelector('body')
        let modal = document.getElementById(id);
        let content = modal.querySelector(".tc-modal-content");

        if (content) {
            content.dataset.active = "false"; // Used for CSS animations
        }

        window.setTimeout(() => {
            VisHide(modal, 250);
        }, 5);

        modal.style.pointerEvents = null;

        delete body.dataset.modalId;
        delete body.dataset.modalStrict;

        if (traps[id]) {
            traps[id].deactivate();
        }

    }
    // ...else logDebug

}
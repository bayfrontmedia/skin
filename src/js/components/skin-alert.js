// noinspection JSUnusedGlobalSymbols

/**
 * Alert.
 *
 * Required attributes:
 *
 *   - id (If dismissible)
 *
 * Optional attributes:
 *   - data-msg (Message to be displayed)
 *   - data-icon (Any valid skin-icon name)
 *   - data-dismiss-duration (Minutes to keep alert hidden after dismissed)
 */
export class SkinAlert extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() { return ['data-icon', 'data-dismiss-duration', 'data-msg']; }

    attributeChangedCallback() {
        this.connectedCallback(); // Redraw
    }

    connectedCallback() {

        this.classList.add("tc-alert", "tc-alert-alt");
        this.setAttribute("role", "alert");

        if (typeof this.dataset.dismissDuration != "undefined") {
            this.dataset.hidden = "true";
        }

        let alertHtml = '<div class="w-full flex items-center gap-4">';

        if (typeof this.dataset.icon != "undefined") {
            alertHtml += '<div class="flex-none"><skin-icon name="' + this.dataset.icon + '" class="flex-none pt-0.5" data-class="w-6 h-6"></skin-icon></div>';
        }

        alertHtml += '<div class="grow">' + this.dataset.msg + '</div>';

        if (typeof this.dataset.dismissDuration != "undefined") {
            alertHtml += '<button class="flex-none p-0.5 rounded-full hover:backdrop-brightness-95 dark:hover:backdrop-brightness-50" data-hide="' + this.id + '" data-hide-transition="250" data-hide-duration="' + this.dataset.dismissDuration + '" aria-label="Close">';
            alertHtml += '<skin-icon name="x-mark" class="inline" data-class="w-5 h-5"></skin-icon>';
            alertHtml += '</button>';
        }

        alertHtml += '</div>';

        this.innerHTML = alertHtml;

    }
}

customElements.define('skin-alert', SkinAlert);
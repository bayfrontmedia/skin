// noinspection JSUnusedGlobalSymbols

/**
 * Alert.
 *
 * Required attributes:
 *
 *   - id (If dismissible)
 *
 * Optional attributes:
 *   - data-icon (Any valid skin-icon name)
 *   - data-dismiss-duration (Minutes to keep alert hidden after dismissed)
 *   - data-style (Alternate style: bt, br, bb, bl)
 */
export class SkinAlert extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const contents = this.innerHTML;

        this.setAttribute("role", "alert");

        if (typeof this.dataset.dismissDuration != "undefined") {
            this.dataset.hidden = "true";
        }

        let innerHtml = '<div class="w-full flex items-center gap-3">';

        if (typeof this.dataset.icon != "undefined") {
            innerHtml += '<div class="flex-none"><skin-icon name="' + this.dataset.icon + '" class="flex-none pt-0.5" data-class="w-6 h-6"></skin-icon></div>';
        }

        innerHtml += '<div class="grow">' + contents + '</div>';

        if (typeof this.dataset.dismissDuration != "undefined") {
            innerHtml += '<button class="flex-none p-0.5 rounded-full hover:backdrop-brightness-95 dark:hover:backdrop-brightness-50" data-hide="' + this.id + '" data-hide-transition="250" data-hide-duration="' + this.dataset.dismissDuration + '" aria-label="Close">';
            innerHtml += '<skin-icon name="x-mark" class="inline" data-class="w-5 h-5"></skin-icon>';
            innerHtml += '</button>';
        }

        innerHtml += '</div>';

        this.innerHTML = innerHtml;

    }
}

customElements.define('skin-alert', SkinAlert);
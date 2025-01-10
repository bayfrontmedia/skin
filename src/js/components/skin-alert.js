// noinspection JSUnusedGlobalSymbols

/**
 * Alert.
 *
 * Required attributes:
 *
 *   - id (If dismissible)
 *
 * Optional attributes:
 *   - data-hide-duration: Duration (in minutes) to keep the alert hidden after dismissed
 *   - data-hide-transition: Duration (in milliseconds) of the dismissal transition, 250 by default
 *   - data-icon: Any valid skin-icon name
 *   - data-style: Alternate style (bt, br, bb, bl)
 */
export class SkinAlert extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const contents = this.innerHTML;

        this.setAttribute("role", "alert");

        // noinspection DuplicatedCode
        if (typeof this.dataset.hideDuration != "undefined") {
            this.dataset.hidden = "true";
        }

        let innerHtml = '<div class="w-full flex items-center gap-3">';

        if (typeof this.dataset.icon != "undefined") {
            innerHtml += '<div class="flex-none"><skin-icon name="' + this.dataset.icon + '" data-class="w-6 h-6"></skin-icon></div>';
        }

        innerHtml += '<div class="grow">' + contents + '</div>';

        if (typeof this.dataset.hideDuration != "undefined") {

            let transition = '250';
            if (typeof this.dataset.hideTransition != "undefined") {
                transition = this.dataset.hideTransition;
            }

            innerHtml += '<button class="flex-none p-0.5 rounded-full hover:backdrop-brightness-95 dark:hover:backdrop-brightness-50" data-hide="' + this.id + '" data-hide-transition="' + transition + '" data-hide-duration="' + this.dataset.hideDuration + '" aria-label="Close">';
            innerHtml += '<skin-icon name="x-mark" class="inline" data-class="w-5 h-5"></skin-icon>';
            innerHtml += '</button>';
        }

        innerHtml += '</div>';

        this.innerHTML = innerHtml;

    }
}

customElements.define('skin-alert', SkinAlert);
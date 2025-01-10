// noinspection JSUnusedGlobalSymbols

/**
 * Toast.
 *
 * Required attributes:
 *
 *   - id (If dismissible)
 *
 * Optional attributes:
 *   - data-hide-duration: Duration (in minutes) to keep the toast hidden after dismissed
 *   - data-hide-transition: Duration (in milliseconds) of the dismissal transition, 250 by default
 *   - data-icon: Any valid skin-icon name
 *   - data-location: Location of the toast appearance in the window (tl, tr, bl, br)
 *   - data-location-id: Unique ID for the generated toast container (can be used to programmatically show toast)
 *   - data-style: Alternate style (bt, br, bb, bl)
 */
export class SkinToast extends HTMLElement {
    constructor() {

        super();

        // Container
        if (typeof this.dataset.location != "undefined" && this.parentNode) {

            let container = document.createElement("skin-toast-container");

            if (typeof this.dataset.locationId != "undefined") {
                container.id = this.dataset.locationId;
            }

            container.dataset.style = this.dataset.location;
            container.dataset.hidden = 'true';

            // Insert before this in the DOM tree
            this.parentNode.insertBefore(container, this);

            // Move into container
            container.appendChild(this);

        }

    }

    connectedCallback() {

        const contents = this.innerHTML;

        this.setAttribute("role", "alert");
        this.setAttribute("aria-live", "assertive");
        this.setAttribute("aria-atomic", "true");

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

customElements.define('skin-toast', SkinToast);
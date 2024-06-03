// noinspection JSUnusedGlobalSymbols

/**
 * Toast.
 *
 * Required attributes:
 *
 *   - id (If dismissible)
 *
 * Optional attributes:
 *   - data-icon (Any valid skin-icon name)
 *   - data-dismiss-duration (Minutes to keep toast hidden after dismissed)
 */
export class SkinToast extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const contents = this.innerHTML;

        this.classList.add("tc-toast", "tc-toast-alt");
        this.setAttribute("role", "alert");
        this.setAttribute("aria-live", "assertive");
        this.setAttribute("aria-atomic", "true");

        if (typeof this.dataset.dismissDuration != "undefined") {
            this.dataset.hidden = "true";
        }

        let innerHtml = '<div class="w-full flex items-center gap-3">';

        if (typeof this.dataset.icon != "undefined") {
            innerHtml += '<div class="flex-none"><skin-icon name="' + this.dataset.icon + '" data-class="w-6 h-6"></skin-icon></div>';
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

window.addEventListener('load', () => { // Ensure this.innerHTML is available to gather
    customElements.define('skin-toast', SkinToast);
});
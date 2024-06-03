// noinspection JSUnusedGlobalSymbols

/**
 * Badge.
 *
 * Required attributes:
 *
 *   - None
 *
 * Optional attributes:
 *   - data-icon (Any valid skin-icon name)
 *   - data-style (Alternate style: pill)
 */
export class SkinBadge extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const contents = this.innerHTML;

        this.classList.add("inline-flex", "items-center", "px-2", "py-0.5", "me-2", "tu-border-radius", "tu-border-width");

        if (typeof this.dataset.style != "undefined") {
            this.classList.add(this.dataset.style);
        }

        let innerHtml = '';

        if (typeof this.dataset.icon != "undefined") {
            innerHtml += '<skin-icon name="' + this.dataset.icon + '" class="flex-none pt-0.5 pr-1" data-class="w-4 h-4"></skin-icon>';
        }

        innerHtml += contents;

        this.innerHTML = innerHtml;

    }
}

customElements.define('skin-badge', SkinBadge);
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

        let innerHtml = '';

        if (typeof this.dataset.icon != "undefined") {
            innerHtml += '<skin-icon name="' + this.dataset.icon + '" class="flex-none pt-0.5 pr-1" data-class="w-4 h-4"></skin-icon>';
        }

        innerHtml += contents;

        this.innerHTML = innerHtml;

    }
}

customElements.define('skin-badge', SkinBadge);
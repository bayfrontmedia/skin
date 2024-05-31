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
 */
export class SkinBadge extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const badgeContents = this.innerHTML;

        this.classList.add("tc-badge");

        let badgeHtml = '';

        if (typeof this.dataset.icon != "undefined") {
            badgeHtml += '<skin-icon name="' + this.dataset.icon + '" class="flex-none pt-0.5 pr-1" data-class="w-4 h-4"></skin-icon>';
        }

        badgeHtml += badgeContents;

        this.innerHTML = badgeHtml;

    }
}

customElements.define('skin-badge', SkinBadge);
// noinspection JSUnusedGlobalSymbols

/**
 * Quote.
 *
 * Required attributes:
 *
 *   - None
 *
 * Optional attributes:
 *   - data-float (Float: left, center, right)
 *   - data-style (Alternate style: quote)
 */
export class SkinQuote extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        if (typeof this.dataset.style != "undefined" && this.dataset.style ==="quote") {
            this.classList.add("block", "relative", "px-16", "my-12", "border-0");
        } else {
            this.classList.add("block", "p-6", "my-12", "text-xl", "border-l-4");
        }

    }
}

customElements.define('skin-quote', SkinQuote);
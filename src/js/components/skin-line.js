// noinspection JSUnusedGlobalSymbols

/**
 * Line.
 *
 * Required attributes:
 *
 *   - None
 *
 * Optional attributes:
 *   - None
 */
export class SkinLine extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add("block", "my-6", "h-0.5");
    }
}

customElements.define('skin-line', SkinLine);
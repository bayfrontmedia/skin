// noinspection JSUnusedGlobalSymbols

/**
 * Code.
 *
 * Required attributes:
 *
 *   - None
 *
 * Optional attributes:
 *   - data-class-code (Class(es) to add to code tag)
 *   - data-circles (Show circles? true/false)
 *   - data-style (Alternate style: bt, br, bb, bl, terminal)
 */
export class SkinCode extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        const contents = this.innerHTML;

        let innerHtml = '';

        if (typeof this.dataset.circles != "undefined" && this.dataset.circles === "true") {
            innerHtml += '<span class="circles"></span>';
        }

        if (typeof this.dataset.classCode != "undefined") {
            innerHtml += '<pre><code class="' + this.dataset.classCode + '">' + contents + '</code></pre>';
        } else {
            innerHtml += '<pre><code>' + contents + '</code></pre>';
        }

        this.innerHTML = innerHtml;

    }
}

customElements.define('skin-code', SkinCode);
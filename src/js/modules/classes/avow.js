// noinspection JSUnusedGlobalSymbols

export default class Avow {

    /**
     * @param formEl {Element}
     * @param config {Object} (errorClass, errorTextClass)
     */
    constructor(formEl, config = {}) {

        this.formEl = formEl;
        this.config = Object.assign({
            errorClass: "",
            errorTextClass: ""
        }, config);

        const types = [
            Avow.#TYPE_REQUIRED,
            Avow.#TYPE_EMAIL,
            Avow.#TYPE_NUMBER,
            Avow.#TYPE_INTEGER,
            Avow.#TYPE_MINLENGTH,
            Avow.#TYPE_MAXLENGTH,
            Avow.#TYPE_MIN,
            Avow.#TYPE_MAX,
            Avow.#TYPE_PATTERN,
            Avow.#TYPE_EQUALS
        ];

        types.forEach((type) => {

            const els = this.formEl.querySelectorAll(`[data-avow-type-${type}]`);

            els.forEach(el => {

                if (!this.#elements.hasOwnProperty(type)) {
                    this.#elements[type] = [];
                }

                this.#elements[type].push(el);

            });

        });

    }

    // Types

    static #TYPE_REQUIRED = "required";
    static #TYPE_EMAIL = "email";
    static #TYPE_NUMBER = "number";
    static #TYPE_INTEGER = "integer";
    static #TYPE_MINLENGTH = "minlength";
    static #TYPE_MAXLENGTH = "maxlength";
    static #TYPE_MIN = "min";
    static #TYPE_MAX = "max";
    static #TYPE_PATTERN = "pattern";
    static #TYPE_EQUALS = "equals";

    #elements = {};

    #isValid = true;

    /**
     * Get elements object.
     *
     * @returns {Object}
     */
    getElements() {
        return this.#elements;
    }

    /**
     * Is form valid?
     *
     * @returns {boolean}
     */
    isValid() {
        return this.#isValid;
    }

    /**
     * Validate form.
     */
    validate() {

        this.reset();

        Object.entries(this.#elements).forEach(([key, value]) => {


            if (key === Avow.#TYPE_REQUIRED) {
                value.forEach(el => {
                    this.#validateRequired(el);
                });
            } else if (key === Avow.#TYPE_EMAIL) {
                value.forEach(el => {
                    this.#validateEmail(el);
                });
            } else if (key === Avow.#TYPE_NUMBER) {
                value.forEach(el => {
                    this.#validateNumber(el);
                });
            } else if (key === Avow.#TYPE_INTEGER) {
                value.forEach(el => {
                    this.#validateInteger(el);
                });
            } else if (key === Avow.#TYPE_MINLENGTH) {
                value.forEach(el => {
                    this.#validateMinLength(el, el.dataset.avowTypeMinlength);
                })
            } else if (key === Avow.#TYPE_MAXLENGTH) {
                value.forEach(el => {
                    this.#validateMaxLength(el, el.dataset.avowTypeMaxlength);
                })
            } else if (key === Avow.#TYPE_MIN) {
                value.forEach(el => {
                    this.#validateMin(el, el.dataset.avowTypeMin);
                })
            } else if (key === Avow.#TYPE_MAX) {
                value.forEach(el => {
                    this.#validateMax(el, el.dataset.avowTypeMax);
                })
            } else if (key === Avow.#TYPE_PATTERN) {
                value.forEach(el => {
                    this.#validatePattern(el, el.dataset.avowTypePattern);
                })
            } else if (key === Avow.#TYPE_EQUALS) {
                value.forEach(el => {
                    this.#validateEquals(el, el.dataset.avowTypeEquals);
                })
            }

        });

    }

    /**
     * Reset form validation errors.
     */
    reset() {

        this.#isValid = true;

        const els = document.querySelectorAll(".avow-has-error");

        els.forEach(el => {
            this.#resetField(el);
        });

    }

    #resetField(el) {

        // Reset field

        el.classList.remove("avow-has-error");
        el.classList.remove(...this.config.errorClass.split(" "));

        // Remove errors

        let toRemove = [];

        let parent = el.parentNode;

        if ('avowErrorContainer' in el.dataset) {
            parent = document.getElementById(el.dataset.avowErrorContainer).parentNode;
        }

        for (let sibling of parent.children) {

            if (sibling.classList.contains("avow-error")) {
                toRemove.push(sibling);
            }
        }

        toRemove.forEach(el => {
            el.remove();
        });

    }

    /**
     * Set field as invalid.
     *   - Update class
     *   - Add error
     *
     * @param el {HTMLElement}
     * @param msg {string}
     */
    #setFieldInvalid(el, msg) {

        this.#isValid = false;

        el.classList.add("avow-has-error");
        el.classList.add(...this.config.errorClass.split(" "));

        let msgContainer = document.createElement("div");
        msgContainer.classList.add("avow-error");
        msgContainer.classList.add(...this.config.errorTextClass.split(" "));
        msgContainer.innerText = msg;

        //el.after(msgContainer);

        let parent = el.parentNode;

        if ('avowErrorContainer' in el.dataset) {
            parent = document.getElementById(el.dataset.avowErrorContainer).parentNode;
        }

        parent.appendChild(msgContainer);

    }

    /**
     * Get field message.
     *
     * @param type {string}
     * @param msg {string}
     * @returns {string}
     */
    #getMsg(type, msg) {

        const defaults = {
            required: "This field is required",
            email: "Value must be a valid email address",
            number: "Value must be a number",
            integer: "Value must be an integer",
            minlength: "Value does not meet minimum length",
            maxlength: "Value exceeds maximum length",
            min: "Value does not meet minimum value",
            max: "Value exceeds maximum value",
            pattern: "Value does not meet required definition",
            equals: "Value does not equal"
        };

        if (typeof msg === "undefined") {
            return defaults[type];
        }

        return msg;

    }

    // ------------------------- Validators -------------------------

    #validateRequired(el) {

        if (el.value === "") {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_REQUIRED, el.dataset.avowRequiredMsg));
        }

    }

    #validateEmail(el) {

        if (el.value === "") {
            return;
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(el.value)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_EMAIL, el.dataset.avowEmailMsg));
        }

    }

    #validateNumber(el) {

        if (el.value === "") {
            return;
        }

        if ((typeof el.value !== "number" && isNaN(el.value))) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_NUMBER, el.dataset.avowNumberMsg));
        }

    }

    #validateInteger(el) {

        if (el.value === "") {
            return;
        }

        const regex = /^-?\d+$/;

        if (!regex.test(el.value)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_INTEGER, el.dataset.avowIntegerMsg));
        }

    }

    #validateMinLength(el, val) {

        if (el.value.length < parseInt(val)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_MINLENGTH, el.dataset.avowMinlengthMsg));
        }

    }

    #validateMaxLength(el, val) {

        if (el.value.length > parseInt(val)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_MAXLENGTH, el.dataset.avowMaxlengthMsg));
        }

    }

    #validateMin(el, val) {

        if (el.value === "") {
            return;
        }

        if (isNaN(parseFloat(el.value)) || parseFloat(el.value) < parseFloat(val)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_MIN, el.dataset.avowMinMsg));
        }

    }

    #validateMax(el, val) {

        if (el.value === "") {
            return;
        }

        if (isNaN(parseFloat(el.value)) || parseFloat(el.value) > parseFloat(val)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_MAX, el.dataset.avowMaxMsg));
        }

    }

    #validatePattern(el, val) {

        if (el.value === "") {
            return;
        }

        const match = val.match(new RegExp('^/(.*?)/([gimy]*)$'));

        if (!match) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_PATTERN, el.dataset.avowPatternMsg));
            return;
        }

        const regex = new RegExp(match[1], match[2]);

        if (!regex.test(el.value)) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_PATTERN, el.dataset.avowPatternMsg));
        }

    }

    #validateEquals(el, eqId) {

        const eqEl = document.getElementById(eqId);

        if (!eqEl || el.value !== eqEl.value) {
            this.#setFieldInvalid(el, this.#getMsg(Avow.#TYPE_EQUALS, el.dataset.avowEqualsMsg));
        }

    }

}
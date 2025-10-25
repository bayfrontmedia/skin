// noinspection JSUnusedGlobalSymbols

import {dot, undot, getChanges, isEmpty} from "./object";

export default class Form {

    constructor(formEl, submitEl, existingData = {}) {
        this.formEl = formEl;
        this.submitEl = submitEl;
        this.existingData = existingData;
    }

    #formData = {};

    /**
     * Get form data as object.
     *
     * @param el {Element} (Form element)
     * @returns {Object}
     */
    #getFormData(el) {

        const formData = new FormData(el);
        const data = {};

        formData.forEach((value, key) => {

            if (key.endsWith("[]")) { // Handle arrays
                const newKey = key.slice(0, -2);
                data[newKey] = formData.getAll(key);
            } else {
                data[key] = value;
            }

        });

        return data;

    }

    /**
     * Get submitted form data.
     * This must be called before evaluating changed data.
     *
     * @returns {Object}
     */
    getData() {
        this.#formData = undot(this.#getFormData(this.formEl));
        return this.#formData;
    }

    /**
     * Get changes between existing data and form data.
     *
     * @returns {Object}
     */
    getChangedData() {

        const changes =  dot(getChanges(this.existingData, this.#formData));

        const existing = dot(this.existingData);

        for (let key in changes) {

            // Do not submit empty values if not yet existing

            if (changes[key] === "" && (!existing.hasOwnProperty(key) || existing[key] === null)) {
                delete changes[key];
            }

        }

        return undot(changes);

    }

    /**
     * Has form data changed from existing data?
     *
     * @returns {Boolean}
     */
    hasChangedData() {
        return !isEmpty(this.getChangedData());
    }

}
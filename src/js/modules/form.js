// noinspection JSUnusedGlobalSymbols

import {dot, undot, getFormData, getChanges, objIsEmpty} from "./helpers";

export default class Form {

    constructor(formEl, submitEl, existingData = {}) {
        this.formEl = formEl;
        this.submitEl = submitEl;
        this.existingData = existingData;
    }

    #formData = {};

    /**
     * Get submitted form data.
     * This must be called before evaluating changed data.
     *
     * @returns {Object}
     */
    getData() {
        this.#formData = undot(getFormData(this.formEl));
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
        return !objIsEmpty(this.getChangedData());
    }

}
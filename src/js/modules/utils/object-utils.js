// noinspection JSUnusedGlobalSymbols

/**
 * Get object property in dot notation or default value if not existing.
 *
 * @param obj {Object}
 * @param key {string}
 * @param defaultValue
 * @returns {*|null}
 */
export function getProp(obj, key, defaultValue = null) {
    return key.split('.').reduce((acc, key) => acc?.[key], obj) ?? defaultValue;
}

/**
 * Is object empty?
 *
 * @param obj {Object}
 * @returns {Boolean}
 */
export function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
}

/**
 * Flatten an object into dot notation.
 *
 * @param obj {Object}
 * @param parentKey {String}
 * @returns {Object}
 */
export function dot(obj, parentKey = '') {

    const result = {};

    for (const key in obj) {

        if (obj.hasOwnProperty(key)) {

            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(result, dot(obj[key], newKey));
            } else {
                result[newKey] = obj[key];
            }

        }

    }

    return result;

}

/**
 * Undot object.
 *
 * @param obj {Object}
 * @returns {Object}
 */
export function undot(obj) {

    const result = {};

    for (const key in obj) {
        const value = obj[key];
        let current = result;
        const path = key.split('.');

        for (let i = 0; i < path.length - 1; i++) {
            const segment = path[i];
            if (!current[segment]) {
                current[segment] = {};
            }
            current = current[segment];
        }

        current[path[path.length - 1]] = value;
    }

    return result;

}

/**
 * Merge objects.
 *
 * @param obj1 {Object}
 * @param obj2 {Object}
 * @returns {Object}
 */
export function merge(obj1, obj2) {
    return undot({...dot(obj1), ...dot(obj2)});
}

/**
 * Get difference between two objects.
 *
 * If differences exist, the returned object will contain the changed properties
 * in dot notation as an object with the following properties:
 * - newValue
 * - oldValue
 * - status (One of: added, modified, removed)
 *
 * @param obj1 {Object} (Original object)
 * @param obj2 {Object} (Updated object)
 * @returns {Object}
 */
export function getDiff(obj1, obj2) {

    obj1 = dot(obj1);
    obj2 = dot(obj2);

    let diff = {};

    // Iterate over keys in the first object
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (!obj1.hasOwnProperty(key)) {
                // Key exists in obj1 but not in obj2
                diff[key] = {status: 'added', value: obj2[key]};
            } else if (obj2[key] !== obj1[key]) {
                // Key exists in both objects but values are different
                diff[key] = {status: 'modified', oldValue: obj1[key], newValue: obj2[key]};
            }
        }
    }

    // Iterate over keys in the second object to find keys that are in obj2 but not in obj1

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
            diff[key] = {status: 'removed', value: obj1[key]};
        }
    }

    return diff;

}

/**
 * Get changes between two objects.
 *
 * @param obj1 {Object} (Original object)
 * @param obj2 {Object} (Updated object)
 * @returns {Object}
 */
export function getChanges(obj1, obj2) {

    obj1 = dot(obj1);
    obj2 = dot(obj2);

    let diff = {};

    // Iterate over keys in the first object
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key)) {

            if (!obj1.hasOwnProperty(key)) {
                // Key exists in obj1 but not in obj2
                diff[key] = obj2[key];

            } else if (obj2[key] !== obj1[key]) {
                // Key exists in both objects but values are different
                diff[key] = obj2[key];
            }

        }
    }

    return undot(diff);

}
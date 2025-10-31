// noinspection JSUnusedGlobalSymbols

/**
 * Sort an array of objects by a nested property value.
 *
 * @param arr {Array}
 * @param prop {String} (Property in dot notation)
 * @param ascending {boolean} (Sort ascending or descending)
 * @returns {Array}
 */
export function sortByProperty(arr, prop, ascending = true) {

    const keys = prop.split('.'); // Dot notation

    return arr.sort((a, b) => {
        const valA = keys.reduce((obj, key) => obj?.[key], a);
        const valB = keys.reduce((obj, key) => obj?.[key], b);

        // Handle undefined/null values
        if (valA == null && valB == null) return 0;
        if (valA == null) return ascending ? 1 : -1;
        if (valB == null) return ascending ? -1 : 1;

        // String comparison
        if (typeof valA === 'string' && typeof valB === 'string') {
            return ascending
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        // Numeric comparison
        if (typeof valA === 'number' && typeof valB === 'number') {
            return ascending ? valA - valB : valB - valA;
        }

        // Fallback: convert to string for mixed types
        const strA = String(valA);
        const strB = String(valB);
        return ascending
            ? strA.localeCompare(strB)
            : strB.localeCompare(strA);
    });

}
// noinspection JSUnusedGlobalSymbols

/**
 * Convert string "true" and "false" to boolean value.
 * Unknown values default to "false".
 *
 * @param str {String}
 * @returns {boolean}
 */
export function toBool(str) {
    return str === "true";
}

/**
 * Parse a string value as an integer.
 * Empty strings and strings which are not numbers return 0.
 *
 * @param str {String}
 * @returns {number}
 */
export function toInt(str) {
    if (str === '' || Number.isNaN(Number(str))) {
        return 0;
    }
    return parseInt(str);
}

/**
 * Replace new lines with a <br> within a string.
 *
 * @param str {String}
 * @returns {String}
 */
export function nl2br(str) {
    return str.replace(/\n/g, '<br>');
}

/**
 * Escape HTML characters.
 *
 * @param str {String}
 * @returns {String}
 */
export function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
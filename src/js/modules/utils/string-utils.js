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

/**
 * Create URL-friendly slug.
 *
 * @param str {String}
 * @return {String}
 */
export function slug(str) {
    return str
        .normalize("NFD") // Separate accents from letters
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // Non-alphanumeric → hyphen
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Check if a string is a valid UUID.
 *
 * @param str {String}
 * @param version {Number|null}: (1-8) to check for a specific version, null to check for any version.
 * @param allowPlaceholder {boolean}: Allow nil and max UUIDs.
 * @return {boolean}
 */
export function isUUID(str, version = null, allowPlaceholder = false) {

    if (typeof str !== 'string') return false;

    // Nil and Max UUIDs (RFC 9562)
    if (/^0{8}-0{4}-0{4}-0{4}-0{12}$/i.test(str) || /^f{8}-f{4}-f{4}-f{4}-f{12}$/i.test(str)) {
        return allowPlaceholder === true && version === null;
    }

    // Versions 1–8, RFC 4122 / 9562 variant (8, 9, a, b)
    const match = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.exec(str);
    if (!match) return false;

    return version === null || Number(match[1]) === version;

}
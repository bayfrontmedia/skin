/**
 * General message.
 *
 * @param message
 */
export function logMessage(message) {
    console.log('%cMESSAGE', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:grey;color:black;', message);
}

/**
 * Info message.
 *
 * @param message
 */
export function logInfo(message) {
    console.log('%cINFO', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:blue;color:white;', message);
}

/**
 * Warning message.
 *
 * @param message
 */
export function logWarning(message) {
    console.log('%cWARNING', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:orange;color:black;', message);
}

/**
 * Error message.
 *
 * @param message
 */
export function logError(message) {
    console.log('%cERROR', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:red;color:white;', message);
}

/**
 * Success message.
 *
 * @param message
 */
export function logSuccess(message) {
    console.log('%cSUCCESS', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:green;color:white;', message);
}
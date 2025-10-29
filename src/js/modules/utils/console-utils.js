// noinspection JSUnusedGlobalSymbols

/**
 * General message.
 *
 * @param message
 * @param optionalParams
 */
export function logMessage(message, ...optionalParams) {
    console.log('%cMESSAGE', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:grey;color:black;', message, ...optionalParams);
}

/**
 * Info message.
 *
 * @param message
 * @param optionalParams
 */
export function logInfo(message, ...optionalParams) {
    console.log('%cINFO', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:blue;color:white;', message, ...optionalParams);
}

/**
 * Warning message.
 *
 * @param message
 * @param optionalParams
 */
export function logWarning(message, ...optionalParams) {
    console.log('%cWARNING', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:orange;color:black;', message, ...optionalParams);
}

/**
 * Error message.
 *
 * @param message
 * @param optionalParams
 */
export function logError(message, ...optionalParams) {
    console.log('%cERROR', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:red;color:white;', message, ...optionalParams);
}

/**
 * Success message.
 *
 * @param message
 * @param optionalParams
 */
export function logSuccess(message, ...optionalParams) {
    console.log('%cSUCCESS', 'font-weight:bold;border-radius:3px;padding: 0 2px 0 2px;background-color:green;color:white;', message, ...optionalParams);
}
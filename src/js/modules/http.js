import {logError} from "./console";

/**
 * Make HTTP request using fetch.
 *
 * @param url {string}
 * @param method {string}
 * @param body {object|null}
 * @param headers {object}
 * @param includeCredentials {boolean}
 */
export async function request(url, method, body = null, headers = {}, includeCredentials = false) {

    try {

        const init = {
            method: method,
            body: body,
            headers: headers
        }

        if (includeCredentials === true) {
            init.credentials = true;
        }

        const response = await fetch(url, init);

        const json = await response.json();

        return {
            status: response.status,
            body: json
        }

    } catch (error) {
        logError('Request error');
        logError(error);
    }

}
import {logError} from "./console";

/**
 * Make HTTP request using fetch.
 *
 * @param url {string}
 * @param method {string}
 * @param body {object|null}
 * @param headers {object}
 */
export async function request(url, method, body = null, headers = {}) {

    try {

        const response = await fetch(url, {
            method: method,
            body: body,
            headers: headers
        });

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
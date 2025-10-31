// noinspection JSUnusedGlobalSymbols

import {logError} from "./utils/console-utils";

let pageUnloading = false;

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

    window.addEventListener('beforeunload', () => {
        pageUnloading = true;
    });

    try {

        const init = {
            method: method,
            body: body,
            headers: headers
        }

        if (includeCredentials === true) {
            init.credentials = 'include';
        }

        const response = await fetch(url, init);

        const json = await response.json();

        return {
            headers: response.headers,
            body: json,
            status: response.status
        }

    } catch (error) {

        if (pageUnloading === false) {
            logError('Request error');
            logError(error);
        }

    }

}
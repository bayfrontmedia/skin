/**
 * Return a Promise object for an expected JSON response from fetch() using the form action, method and data.
 *
 * @param formEl
 * @param config
 * @returns {Promise<any>}
 */

export function getPromise(formEl, config = {}) {

    const data = new FormData(formEl);

    if (config.hasOwnProperty("data")) {

        for (let [key, value] of Object.entries(config.data)) {
            data.set(key, String(value));
        }

    }

    let headers = {
        'Accept': 'application/json'
    }

    if (config.hasOwnProperty("headers")) {
        headers = {...headers, ...config.headers};
    }

    return fetch(formEl.action, {
        method: formEl.method,
        body: data,
        headers: headers
    }).then(response => {

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        return response.json();

    }).then(json => (json)).catch(err => {
        console.error("Fetch error in getPromise function:", err);
    });

}
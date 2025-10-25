// noinspection JSUnusedGlobalSymbols

import Avow from "./modules/avow";
import * as Console from "./modules/console";
import Form from "./modules/form";
import * as Functions from "./modules/functions";
import * as Http from "./modules/http";
import * as Object from "./modules/object";
import SaneDate from "./modules/saneDate";
import * as String from "./modules/string";
import * as Theme from "./modules/theme";
import * as Toast from "./modules/toast";
import * as Visibility from "./modules/visibility";

window.Skin = {
    Avow,
    Console,
    Form,
    Http,
    Object,
    SaneDate,
    String,
    Theme,
    Toast,
    Visibility,
    getConfig,
    init
}

let skinConfig = {};

/**
 * Get config object key, or return value if not existing.
 *
 * @param key
 * @param defaultValue
 * @returns {*}
 */
export function getConfig(key, defaultValue) {
    return Object.getProp(skinConfig, key, defaultValue);
}

/**
 * Initialize Skin.
 *
 * @param config
 */
export function init(config = {}) {

    skinConfig = Object.merge({
        debug: false
    }, config);

    window.addEventListener('load', () => {

        if (getConfig('debug', false) === true) {
            console.log('✅ Skin initialized (v3.0.0)');
        }

        Theme.detect();
        Functions.handleCurrentClass();
        Functions.handleDataAttributes();
        Toast.showQueue();

    });

}
// noinspection JSUnusedGlobalSymbols

import Avow from "./modules/avow";
import * as Console from "./modules/console";
import Form from "./modules/form";
import * as Helpers from "./modules/helpers";
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
    Helpers,
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

/**
 * Default Skin config object.
 */
let skinConfig = {
    debug: false,
    themeParam: {
        enabled: true,
        name: "theme"
    }
};

/**
 * Get config object key, or return value if not existing.
 *
 * @param key {string}
 * @param defaultValue
 * @returns {*}
 */
export function getConfig(key, defaultValue) {
    return Object.getProp(skinConfig, key, defaultValue);
}

/**
 * Set config by merging with existing config object.
 *
 * @param config
 */
export function setConfig(config) {
    skinConfig = Object.merge(skinConfig, config);
}

/**
 * Initialize Skin.
 *
 * @param config
 */
export function init(config = {}) {

    setConfig(config);

    window.addEventListener('load', () => {

        if (getConfig('debug', false) === true) {
            console.log('✅ Skin initialized (v3.0.0)');
        }

        Helpers.handleDataAttributes();
        Theme.detect();
        Toast.showQueue();

    });

}
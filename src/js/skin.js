// noinspection JSUnusedGlobalSymbols

import * as ArrayUtils from "./modules/utils/array-utils";
import Avow from "./modules/classes/avow";
import * as ConsoleUtils from "./modules/utils/console-utils";
import Form from "./modules/classes/form";
import * as Helpers from "./modules/helpers";
import * as Http from "./modules/http";
import * as ObjectUtils from "./modules/utils/object-utils";
import SaneDate from "./modules/classes/sane-date";
import * as StringUtils from "./modules/utils/string-utils";
import * as Theme from "./modules/theme";
import * as Toast from "./modules/toast";
import * as Visibility from "./modules/visibility";

window.Skin = {
    ArrayUtils,
    Avow,
    ConsoleUtils,
    Form,
    Helpers,
    Http,
    ObjectUtils,
    SaneDate,
    StringUtils,
    Theme,
    Toast,
    Visibility,
    getVersion,
    getConfig,
    setConfig,
    init
}

Theme.defineFromSettings(); // Prevent dark mode flash waiting init() to be called

const version = '3.2.0';

/**
 * Get Skin version.
 *
 * @returns {string}
 */
export function getVersion() {
    return version;
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
export function getConfig(key, defaultValue = null) {
    return ObjectUtils.getProp(skinConfig, key, defaultValue);
}

/**
 * Set config by merging with existing config object.
 *
 * @param config {Object}
 */
export function setConfig(config) {
    skinConfig = ObjectUtils.merge(skinConfig, config);
}

/**
 * Initialize Skin.
 *
 * @param config {Object}
 */
export function init(config = {}) {

    setConfig(config);

    if (getConfig('debug', false) === true) {
        console.log('✅ Skin initialized (v' + version + ')');
    }

    Helpers.handleDataAttributes();
    Theme.detect();
    Toast.showQueue();

}
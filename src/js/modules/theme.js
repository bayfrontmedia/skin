import {getConfig} from "../skin";
import {logError} from "./utils/console-utils";

/**
 * Define theme from local settings.
 */
export function defineFromSettings() {

    if ('skin-theme' in localStorage) {
        try {
            let theme = JSON.parse(localStorage.getItem('skin-theme'));
            set(theme.name);
            return;
        } catch (e) {
            localStorage.removeItem("skin-theme");
            // Do not check for debug mode- config may not have been set yet
            logError("Unable to set theme: Invalid localStorage format");
        }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        set("dark");
        return;
    }

    set("light");

}

/**
 * Define theme from URL query parameter and add event listener to theme toggles.
 */
export function detect() {

    if (getConfig('themeParam.enabled', false) === true) {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const themeName = urlParams.get(getConfig('themeParam.name', 'theme'));

        if (themeName !== null) {
            set(themeName);
        }

    }

    const themeToggles = document.querySelectorAll("[data-skin-theme-toggle]");

    themeToggles.forEach(toggle => {

        toggle.addEventListener("click", () => {

            let theme = toggle.getAttribute("data-skin-theme-toggle");
            set(theme);

        });

    });

}

/**
 * Set theme.
 *
 * @param {string} value
 */
export function set(value) {

    if (value === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
    } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
    }

    localStorage.setItem("skin-theme", JSON.stringify({
        name: value
    }));

}
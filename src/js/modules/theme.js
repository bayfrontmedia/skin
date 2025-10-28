import {getConfig} from "../skin";
import {logError} from "./console";

/**
 * Detect theme.
 */
export function detect() {

    let detected = false;

    if (getConfig('themeParam.enabled', false) === true) {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const themeName = urlParams.get(getConfig('themeParam.name', 'theme'));

        if (themeName !== null) {
            set(themeName);
            detected = true;
        }

    }

    if (detected === false && "skin-theme" in localStorage) {

        try {

            let theme = JSON.parse(localStorage.getItem("skin-theme"));
            set(theme.name);
            detected = true;

        } catch (e) {
            localStorage.removeItem("skin-theme");

            if (getConfig('debug', false) === true) {
                logError("Unable to detect theme: Invalid localStorage format");
            }

        }

    }

    if (detected === false) {

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            set("dark");
        } else {
            set("light");
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
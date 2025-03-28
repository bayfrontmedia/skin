import {logError} from "./console";

/**
 * Detect theme.
 */
export function detect() {

    if ("theme" in localStorage) {

        try {

            let theme = JSON.parse(localStorage.theme);
            set(theme.name);

        } catch (e) {
            localStorage.removeItem("theme");
            logError("Unable to detect theme: Invalid localStorage format");
        }

    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        set("dark");
    } else {
        set("light");
    }

    const themeToggles = document.querySelectorAll("[data-theme-toggle]");

    themeToggles.forEach(toggle => {

        toggle.addEventListener("click", () => {

            let theme = toggle.getAttribute("data-theme-toggle");
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

    localStorage.theme = JSON.stringify({
        name: value
    });

}
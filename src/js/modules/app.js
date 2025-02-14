// noinspection JSUnusedGlobalSymbols

import * as Modal from "./Modal";
import * as Popup from "./Popup";
import * as Visibility from "./Visibility";

export function init(config = {}) {

    const defaultConfig = {
        debug: false,
        urlTheme: {
            enabled: true,
            paramName: "theme"
        },
        theme: {
            enabled: true,
        },
        hide: {
            enabled: true,
        },
        show: {
            enabled: true,
        },
        toggle: {
            enabled: true,
        },
        loadSrc: {
            enabled: true,
        },
        modal: {
            enabled: true,
        },
        popup: {
            enabled: true
        },
        tabs: {
            enabled: true,
            updateHash: true
        },
    };

    config = {...defaultConfig, ...config};

    // ------------------------- Initialize -------------------------

    if (config.debug === true) {
        console.log("Debug mode is active");
    }

    // Set theme

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const themeName = urlParams.get(config.urlTheme.paramName);

    if (config.urlTheme.enabled === true && themeName !== null) {

        setTheme(themeName, true);

    } else if ('theme' in localStorage) {

        try {

            let theme = JSON.parse(localStorage.theme);
            setTheme(theme.name, false);

        } catch (e) {
            if (config.debug === true) {
                console.log("Unable to set theme: invalid localStorage format");
            }
        }

    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme("dark", false);
    }

    // Toggle theme

    if (config.theme.enabled === true) {

        const themeTrigger = document.querySelectorAll("[data-theme-toggle]");

        themeTrigger.forEach(trigger => {

            trigger.addEventListener('click', () => {

                // Set theme

                let theme = trigger.getAttribute("data-theme-toggle");

                setTheme(theme, true);

            });

        });

    }

    // Hide

    if (config.hide.enabled === true) {

        const dataHide = document.querySelectorAll("[data-hide]");

        dataHide.forEach(el => {

            // Check if it should be hidden

            let toDismiss = document.getElementById(el.getAttribute("data-hide"));

            if (toDismiss === null) {
                if (config.debug === true) {
                    console.log("data-hide element does not exist: " + el.getAttribute("data-hide"));
                }
                return;
            }

            let storage = localStorage.getItem("hide-" + el.getAttribute("data-hide"));

            if (storage !== null) { // Already dismissed

                // Check for expiration

                // Parse the JSON string back to JS object

                let storageObj = JSON.parse(storage);

                if (storageObj.expires === null || Date.now() > storageObj.expires) { // If expires key does not exist, or it has already expired (needs to be shown)

                    localStorage.removeItem("hide-" + el.getAttribute("data-hide")); // Remove it

                    toDismiss.dataset.hidden = "false";

                } else { // Not yet expired (needs to be hidden)

                    toDismiss.dataset.hidden = "true";

                }

            } else { // No interaction yet

                toDismiss.dataset.hidden = "false";

            }

            // Listen for click (save to localStorage and hide)

            el.addEventListener('click', () => {

                if (el.getAttribute("data-hide-duration")) { // If the dismissal should be persistent

                    let expTime = Date.now() + (parseInt(el.getAttribute("data-hide-duration")) * 60000); // Duration as minutes

                    // Save to localStorage

                    let dismissObj = {dismissed: true, expires: expTime};

                    localStorage.setItem("hide-" + el.getAttribute('data-hide'), JSON.stringify(dismissObj));

                } else { // Expire immediately

                    let expTime = Date.now();

                    // Save to localStorage

                    let dismissObj = {dismissed: true, expires: expTime};

                    localStorage.setItem("hide-" + el.getAttribute('data-hide'), JSON.stringify(dismissObj));

                }

                // Hide target element

                let target = document.getElementById(el.getAttribute('data-hide'));

                let transition = 250;

                if (el.getAttribute("data-hide-transition")) {
                    transition = parseInt(el.getAttribute("data-hide-transition"));
                }

                Visibility.hide(target, transition);

            });

        });

    }

    // Show

    if (config.show.enabled === true) {

        const dataShow = document.querySelectorAll("[data-show]");

        dataShow.forEach(el => {

            let toShow = document.getElementById(el.getAttribute("data-show"));

            if (toShow === null) {
                if (config.debug === true) {
                    console.log("data-show element does not exist: " + el.getAttribute("data-show"));
                }
                return;
            }

            el.addEventListener('click', () => {

                let transition = 250;

                if (el.getAttribute("data-show-transition")) {
                    transition = parseInt(el.getAttribute("data-show-transition"));
                }

                if (el.getAttribute("data-show-duration")) { // If a duration is given

                    let duration = parseInt(el.getAttribute("data-show-duration"));

                    Visibility.showThenHide(toShow, duration, transition);

                } else { // Show indefinitely

                    Visibility.show(toShow, transition);

                }

            });

        });

    }

    // Toggle

    if (config.toggle.enabled === true) {

        const toggleTriggerOpen = document.querySelectorAll("[data-toggle]");

        toggleTriggerOpen.forEach((trigger) => {

            trigger.addEventListener('click', (event) => {

                event.preventDefault();

                let el = document.getElementById(trigger.getAttribute("data-toggle"));

                if (el) {

                    let toggleDuration = 250;

                    if (trigger.hasAttribute("data-toggle-transition")) {
                        toggleDuration = parseInt(trigger.getAttribute("data-toggle-transition"));
                    }

                    Visibility.toggle(el, toggleDuration);

                } else {
                    if (config.debug === true) {
                        console.log("Unable to toggle: element ID does not exist (" + trigger.getAttribute("data-toggle") + ")");
                    }
                }

            });

        });

    }

    // loadSrc

    if (config.loadSrc.enabled === true) {

        const srcToLoad = document.querySelectorAll("[data-load-src]");

        srcToLoad.forEach((el) => {

            if (el.getAttribute("data-load-src")) {
                el.src = el.getAttribute("data-load-src");
            }

        });

    }

    if (config.modal.enabled === true) {

        // Modal open

        const modalTriggerOpen = document.querySelectorAll("[data-modal-open]");

        modalTriggerOpen.forEach((trigger) => {

            trigger.addEventListener('click', (event) => {

                event.preventDefault();

                let config = {};

                if (trigger.getAttribute("data-modal-strict") === "true") {
                    config.strict = true;
                }

                if (document.getElementById(trigger.getAttribute("data-modal-open"))) {

                    Modal.show(trigger.getAttribute("data-modal-open"), config);

                } else {
                    if (config.debug === true) {
                        console.log('Modal ID does not exist: ' + trigger.getAttribute("data-modal-open"));
                    }
                }

            });

        });

        // Modal close

        const modalTriggerClose = document.querySelectorAll("[data-modal-close]");

        modalTriggerClose.forEach((trigger) => {

            trigger.addEventListener('click', (event) => {

                event.preventDefault();

                if (document.getElementById(trigger.getAttribute("data-modal-close"))) {

                    Modal.hide(trigger.getAttribute("data-modal-close"));

                } else {
                    if (config.debug === true) {
                        console.log('Modal ID does not exist: ' + trigger.getAttribute("data-modal-close"));
                    }
                }

            });

        });

    }

    // These modal functions always need to work... modal may be opened using Modal.show()

    // Modal overlay

    const modalOverlay = document.querySelectorAll('.tc-modal-overlay');

    modalOverlay.forEach((trigger) => {

        trigger.addEventListener('click', () => {

            if (document.body.hasAttribute('data-modal-id')
                && document.body.getAttribute('data-modal-strict') !== 'true') {

                if (document.getElementById(document.body.getAttribute('data-modal-id'))) {

                    Modal.hide(document.body.getAttribute('data-modal-id'));

                } else {
                    if (config.debug === true) {
                        console.log('Modal ID does not exist: ' + document.body.getAttribute('data-modal-id'));
                    }
                }

            }

        });

    });

    // Modal Esc

    document.onkeydown = (event) => {

        let isEscape = false;

        if ("key" in event && (event.key === "Escape" || event.key === "Esc")) {
            isEscape = true;
        }

        if (isEscape && document.body.hasAttribute('data-modal-id')) {

            if (document.body.getAttribute('data-modal-strict') === 'true') {
                event.preventDefault();

            } else {

                if (document.getElementById(document.body.getAttribute('data-modal-id'))) {
                    Modal.hide(document.body.getAttribute('data-modal-id'));
                } else {
                    if (config.debug === true) {
                        console.log('Modal ID does not exist: ' + document.body.getAttribute('data-modal-id'));
                    }
                }

            }

        }

    };

    // Popup

    if (config.popup.enabled === true) {

        const popupReferences = document.querySelectorAll("[data-popup]");

        popupReferences.forEach((ref) => {

            let floatingId = ref.getAttribute("data-popup");

            let floatingEl = document.getElementById(floatingId);

            if (!floatingEl) {
                if (config.debug === true) {
                    console.log("Popup ID does not exist (" + floatingId + ")");
                }
                return; // Continue to next iteration
            }

            // Set aria-describedby

            ref.setAttribute("aria-describedby", floatingId);

            // Placement

            let placement = ref.getAttribute("data-popup-placement");

            if (!placement) {
                placement = "bottom";
            }

            // Offset

            let offset = ref.getAttribute("data-popup-offset");

            if (!offset) {
                offset = "0,0";
            }

            offset = offset.split(",", 2);

            // Unique

            let unique = false;

            if (ref.hasAttribute("data-popup-unique")) {
                if (ref.getAttribute("data-popup-unique") === "true") {
                    unique = true;
                }
            }

            // Trigger

            if (ref.hasAttribute("data-popup-trigger")) {

                let trigger = ref.getAttribute("data-popup-trigger");

                if (trigger === "click") {

                    ref.addEventListener("click", function () {

                        if (Popup.isVisible(floatingEl)) {

                            Popup.hide(floatingEl);

                        } else {

                            Popup.show(ref, floatingEl, {
                                unique: unique,
                                placement: placement,
                                offset: {
                                    mainAxis: offset[0],
                                    crossAxis: offset[1]
                                },
                                shift: {
                                    padding: 5
                                }
                            });

                        }

                    });

                } else if (trigger === "hover") {

                    const showEvents = ['mouseenter', 'focus'];
                    const hideEvents = ['mouseleave', 'blur'];

                    showEvents.forEach((event) => {

                        ref.addEventListener(event, function () {

                            Popup.show(ref, floatingEl, {
                                unique: unique,
                                placement: placement,
                                offset: {
                                    mainAxis: offset[0],
                                    crossAxis: offset[1]
                                },
                                shift: {
                                    padding: 5
                                }
                            });

                        });

                    });

                    hideEvents.forEach((event) => {
                        ref.addEventListener(event, function () {
                            Popup.hide(floatingEl);
                        });
                    });

                } else { // Always

                    Popup.show(ref, floatingEl, {
                        unique: unique,
                        placement: placement,
                        offset: {
                            mainAxis: offset[0],
                            crossAxis: offset[1]
                        },
                        shift: {
                            padding: 5
                        }
                    });

                }

            }

        });

    }

    // Tabs

    if (config.tabs.enabled === true) {

        const tabLists = document.querySelectorAll('[role="tablist"]');

        tabLists.forEach(tabList => {

            const tabs = tabList.querySelectorAll('[role="tab"]');

            tabs.forEach(tab => {

                // Show tab

                tab.addEventListener("click", function () {

                    const grandparent = tabList.parentNode;

                    // Toggle active/inactive

                    let activeTabs = tabList.querySelectorAll('[aria-selected="true"]');

                    activeTabs.forEach(tab => {
                        tab.setAttribute("aria-selected", "false");
                    });

                    this.setAttribute("aria-selected", "true");

                    // Toggle aria-selected

                    tabList
                        .querySelectorAll('[aria-selected="true"]')
                        .forEach((t) => t.setAttribute("aria-selected", "false"));

                    // Set this tab as selected
                    this.setAttribute("aria-selected", "true");

                    // Toggle visibility of tab panels

                    // Get only direct descendants (omit tabpanel inside tabpanel)

                    grandparent
                        .querySelectorAll(':scope > [role="tabpanel"]')
                        .forEach((div) => div.setAttribute("hidden", "true"));

                    grandparent.parentNode
                        .querySelector(`#${this.getAttribute("aria-controls")}`)
                        .removeAttribute("hidden");

                    if (config.tabs.updateHash === true) {

                        let tabLink = tab.getAttribute('aria-controls');

                        if (tabLink !== null) {
                            window.location.hash = tabLink;
                        }

                    }

                });

                // Enable arrow navigation between tabs in the tab list
                let tabFocus = 0;

                tabList.addEventListener("keydown", (e) => {

                    // Move right

                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {

                        tabs[tabFocus].setAttribute("tabindex", "-1");

                        if (e.key === "ArrowRight") {

                            tabFocus++;

                            // If we're at the end, go to the start
                            if (tabFocus >= tabs.length) {
                                tabFocus = 0;
                            }


                        } else if (e.key === "ArrowLeft") {

                            tabFocus--;

                            // If we're at the start, move to the end
                            if (tabFocus < 0) {
                                tabFocus = tabs.length - 1;
                            }

                        }

                        tabs[tabFocus].setAttribute("tabindex", "0");
                        tabs[tabFocus].focus();

                    }
                });

            });

        });

        if (config.tabs.updateHash === true) {

            // Show tab panel based on hash

            const urlHash = window.location.hash.substring(1);

            if (urlHash !== "") {

                const tabPanels = document.querySelectorAll('[role="tabpanel"]');

                tabPanels.forEach(panel => {

                    if (panel.id === urlHash) {

                        let labelledBy = panel.getAttribute('aria-labelledby');

                        if (labelledBy !== null) {

                            setTimeout(function () {
                                document.getElementById(labelledBy).click();
                                panel.blur();
                            }, 100); // Give time to load completely


                        }

                    }

                });

            }

        }

    }

}

/**
 * Get current theme. (light/dark)
 * @returns {string}
 */

export function getTheme() {
    if (document.documentElement.classList.contains("dark")) {
        return "dark";
    }
    return "light";
}

/**
 * Set theme and optionally save to local storage.
 *
 * @param theme
 * @param save
 */

export function setTheme(theme, save = false) {

    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
    } else {
        return;
    }

    if (save === true) {

        localStorage.theme = JSON.stringify({
            name: theme
        });

    }

}
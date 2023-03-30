// noinspection JSUnusedGlobalSymbols

import * as Modal from "./Modal";
import * as Visibility from "./Visibility";
import {createPopper} from "@popperjs/core";

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
        popper: {
            enabled: true
        },
        tabs: {
            enabled: true,
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

            let storage = localStorage.getItem("dismiss-" + el.getAttribute("data-hide"));

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

    // Popper

    if (config.popper.enabled === true) {

        function hideVisiblePopper(event) {

            const visiblePoppers = document.querySelectorAll("[data-popper-visible]");

            const closestTrigger = event.target.closest("[data-popper]");

            let insideVisiblePopper = false;

            if (event.target.closest("[data-popper-visible]") !== null) {
                insideVisiblePopper = true;
            }

            visiblePoppers.forEach(visiblePopper => {

                /*
                If click not from visible trigger (let Popper handle it)
                and if click not from inside visible popper
                 */

                if ((closestTrigger === null
                        || closestTrigger.getAttribute("data-popper") !== visiblePopper.id)
                    && insideVisiblePopper === false) {

                    // Mimic hidePopper()
                    visiblePopper.removeAttribute("data-popper-visible");
                    visiblePopper.style.opacity = "0";

                    window.setTimeout(() => {
                        visiblePopper.style.display = "none";
                    }, 150);

                    document.removeEventListener("click", hideVisiblePopper);

                }

            });

        }

        const popperButtons = document.querySelectorAll("[data-popper]");

        popperButtons.forEach((btn) => {

            const tooltip = document.getElementById(btn.getAttribute("data-popper"));

            if (tooltip) {

                // See: https://popper.js.org/docs/v2/constructors/#placement

                let placement = "top";

                if (btn.hasAttribute("data-popper-placement")) {
                    placement = btn.getAttribute("data-popper-placement");
                }

                // See: https://popper.js.org/docs/v2/modifiers/offset/

                let offset = btn.getAttribute("data-popper-offset");

                if (!offset) {
                    offset = "0,0";
                }

                offset = offset.split(",");

                offset = offset.map(function (x) {
                    return parseInt(x, 10);
                });

                const popperInstance = createPopper(btn, tooltip, {
                    placement: placement,
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: offset,
                            },
                        },
                        {
                            name: "flip",
                            options: {
                                allowedAutoPlacements: ["right", "left", "top", "bottom"],
                                rootBoundary: "viewport"
                            }
                        },

                    ],
                });

                function showPopper() {

                    tooltip.setAttribute("data-popper-visible", "true");
                    tooltip.style.display = "block";

                    window.setTimeout(async () => {
                        tooltip.style.opacity = "1";
                        //popperInstance.update();
                        await popperInstance.update(); // This seems to be working fine


                    }, 5);

                }

                function hidePopper() {

                    tooltip.removeAttribute("data-popper-visible");
                    tooltip.style.opacity = "0";

                    window.setTimeout(() => {
                        tooltip.style.display = "none";

                    }, 150);

                }

                let trigger = btn.getAttribute("data-popper-trigger");

                if (trigger === "click") { // Click

                    btn.addEventListener("click", function() {

                        if (tooltip.getAttribute("data-popper-visible") !== "true") {

                            showPopper();

                            window.setTimeout(() => {
                                document.addEventListener("click", hideVisiblePopper);
                            }, 5);

                        } else {

                            hidePopper();

                            window.setTimeout(() => {
                                document.removeEventListener("click", hideVisiblePopper);
                            }, 5);

                        }

                    });

                } else { // Hover

                    const showEvents = ['mouseenter', 'focus'];
                    const hideEvents = ['mouseleave', 'blur'];

                    showEvents.forEach((event) => {
                        btn.addEventListener(event, showPopper);
                    });

                    hideEvents.forEach((event) => {
                        btn.addEventListener(event, hidePopper);
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

                tab.addEventListener("click", function() {

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
// noinspection JSUnusedGlobalSymbols

/**
 * Hide element with a given animation duration.
 *
 * @param el (Element to hide)
 * @param duration (Animation duration in milliseconds)
 */

export function hide(el, duration = 250) {

    el.style.transition = duration + 'ms';
    el.style.opacity = '1';

    window.setTimeout(() => {
        el.style.opacity = '0';
    }, 5);

    window.setTimeout(() => {
        el.dataset.skinHidden = "true";
    }, duration + 5);

}

/**
 * Show element with a given animation duration.
 *
 * @param el (Element to show)
 * @param duration (Animation duration in milliseconds)
 */

export function show(el, duration = 250) {

    el.style.transition = duration + 'ms';
    el.style.opacity = '0';
    el.removeAttribute("data-skin-hidden");

    window.setTimeout(() => {
        el.style.opacity = '1';
    }, 5);

}

/**
 * Show element for an amount of time with a given animation duration.
 * @param el
 * @param hideAfter (Hide after duration in milliseconds)
 * @param duration (Animation duration in milliseconds)
 */

export function showThenHide(el, hideAfter = 3000, duration = 250) {

    show(el, duration);

    window.setTimeout(() => {

        hide(el, duration);

    }, hideAfter);

}

/**
 * Hide element with a given animation duration, then remove from the DOM.
 *
 * @param el
 * @param duration
 */
export function hideThenRemove(el, duration = 250) {

    hide(el, duration);

    window.setTimeout(() => {
        el.remove();
    }, duration + 50);

}

/**
 * Toggle element visibility with a given animation duration.
 *
 * @param el (Element to toggle)
 * @param duration (Animation duration in milliseconds)
 */

export function toggle(el, duration = 250) {

    if (el.hasAttribute('data-skin-hidden')) {
        show(el, duration);
    } else {
        hide(el, duration);
    }

}
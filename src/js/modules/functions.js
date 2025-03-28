/**
 * Add classes to all hyperlinks as defined in the data-skin-current-class attribute
 * when current URL matches.
 */
export function handleCurrentClass() {

    const currentEls = document.querySelectorAll("a[data-skin-current-class]");
    const currentUrl = window.location.origin + window.location.pathname;

    currentEls.forEach((el) => {

        const href = el.href.split('#')[0];

        if (currentUrl === href.split('?')[0]) {
            const classList = el.getAttribute('data-skin-current-class').split(' ');
            el.classList.add(...classList);
        }

    });

}
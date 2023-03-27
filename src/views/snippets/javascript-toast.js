{
    containerId: "tc-toast-container", // ID of toast container (parent element)
    toastId: "", // ID of toast (blank for none)
    classes: "tc-style-default", // Class(es) to add in addition to "tc-toast"
    duration: 250, // Animation duration in milliseconds
    hideAfter: 3000, // Hide after duration in milliseconds (0 to not hide)
    innerHTML: "", // Toast inner HTML
    role: "alert", // ARIA role
    aria: { // ARIA attributes : values
        "atomic": "true",
        "live": "assertive"
    },
    data: {} // data-* attributes
}
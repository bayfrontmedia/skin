/*
Used to build the docs/assets/js/scripts.js file for use by Skin documentation.
 */

import * as App from "./modules/App";
import * as Modal from "./modules/Modal";
import * as Toast from "./modules/Toast";
import * as Visibility from "./modules/Visibility";

export {App, Modal, Toast, Visibility};

window.Skin = {
    App,
    Modal,
    Toast,
    Visibility
}
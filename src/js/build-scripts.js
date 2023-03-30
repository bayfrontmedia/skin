/*
Used to build the docs/assets/js/scripts.js file for use by Skin documentation.
 */

import * as App from "./modules/App";
import * as Form from "./modules/Form";
import * as Modal from "./modules/Modal";
import * as Toast from "./modules/Toast";
import * as Visibility from "./modules/Visibility";

export {App, Form, Modal, Toast, Visibility};

window.Skin = {
    App,
    Form,
    Modal,
    Toast,
    Visibility
}
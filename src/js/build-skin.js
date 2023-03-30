/*
Used to build the dist/skin.min.js file for use via CDN.
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
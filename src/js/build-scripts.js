/*
Used to build the docs/assets/js/scripts.js file for use by Skin documentation.
 */

// Modules

import * as App from "./modules/App";
import * as Form from "./modules/Form";
import * as Modal from "./modules/Modal";
import * as Toast from "./modules/Toast";
import * as Visibility from "./modules/Visibility";

// Components

import {SkinAlert} from "./components/skin-alert";
import {SkinIcon} from "./components/skin-icon";
import {SkinToast} from "./components/skin-toast";

export {App, Form, Modal, Toast, Visibility, SkinAlert, SkinIcon, SkinToast};

window.Skin = {
    App,
    Form,
    Modal,
    Toast,
    Visibility
}
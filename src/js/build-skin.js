/*
Used to build the dist/skin.min.js file for use via CDN.
 */

// Modules

import * as App from "./modules/App";
import * as Form from "./modules/Form";
import * as Modal from "./modules/Modal";
import * as Popup from "./modules/Popup";
import * as Toast from "./modules/Toast";
import * as Visibility from "./modules/Visibility";

// Components

import {SkinAlert} from "./components/skin-alert";
import {SkinBadge} from "./components/skin-badge";
import {SkinCode} from "./components/skin-code";
import {SkinIcon} from "./components/skin-icon";
import {SkinToast} from "./components/skin-toast";

export {App, Form, Modal, Popup, Toast, Visibility, SkinAlert, SkinBadge, SkinCode, SkinIcon, SkinToast};

window.Skin = {
    App,
    Form,
    Modal,
    Popup,
    Toast,
    Visibility
}
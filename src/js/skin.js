import Avow from "./modules/avow";
import * as Console from "./modules/console";
import Form from "./modules/form";
import * as Functions from "./modules/functions";
import * as Helpers from "./modules/helpers";
import * as Http from "./modules/http";
import * as Theme from "./modules/theme";
import * as Toast from "./modules/toast";

exports.init = function() {

    Theme.detect();

    Functions.handleCurrentClass();

    Toast.showQueue();

    window.Skin = {
        Avow,
        Console,
        Form,
        Helpers,
        Http,
        Theme,
        Toast
    }

}
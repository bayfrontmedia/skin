import Avow from "./modules/avow";
import * as Console from "./modules/console";
import Form from "./modules/form";
import * as Helpers from "./modules/helpers";
import * as Http from "./modules/http";
import * as Theme from "./modules/theme";

exports.init = function() {

    Theme.detect();

    window.Skin = {
        Avow,
        Console,
        Form,
        Helpers,
        Http,
        Theme
    }

}
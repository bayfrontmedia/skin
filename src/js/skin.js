import Avow from "./modules/avow";
import * as Console from "./modules/console";
import * as Helpers from "./modules/helpers";
import * as Http from "./modules/http";
import * as Theme from "./modules/theme";

exports.init = function() {

    Theme.detect();

    window.Skin = {
        Avow,
        Console,
        Helpers,
        Http,
        Theme
    }

}
import Avow from "./modules/avow";
import * as Console from "./modules/console";
import * as Helpers from "./modules/helpers";
import * as Http from "./modules/http";
import * as Theme from "./modules/theme";

export function init() {

    Theme.detect();

}

window.Skin = {
    init,
    Avow,
    Console,
    Helpers,
    Http,
    Theme
}
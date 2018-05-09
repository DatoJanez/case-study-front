import { Subject } from "rxjs";
import { Dom } from "./dom";

/**
 * Online class listens to network and fires stream on network status changes.
 * @class
 */
export class Online {
   /**
    * Stream that fires whenever network status changes.
    * @public
    */
    public online$ = new Subject<string>();

   /**
    * @constructor
    * Addes network event listeners
    */
    constructor(){
        window.addEventListener("online", () => this.updateOnlineStatus());
        window.addEventListener("offline", () => this.updateOnlineStatus());
        this.updateOnlineStatus();
    }

   /**
    * @method
    * Fires event in stream
    */
    private updateOnlineStatus() {
        this.online$.next(navigator.onLine ? "online" : "offline");
    }
}

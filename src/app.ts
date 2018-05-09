import { Annyang } from "./annyang";
import { Converter } from "./converter";
import { DataCollector } from "./data-collector";
import { Dexye } from "./dexye";
import { Dom } from "./dom";
import { Online } from "./online";
import { ServiceWorkerController } from "./service-worker-controller";

/**
 * Application Bootstrap class
 * Declares all clases
 * @class
 */
class AppClass {
    public serviceWorkerController = new ServiceWorkerController();
    public dexye = new Dexye();
    public dataCollector = new DataCollector(this.dexye);
    public annyang = new Annyang();
    public online = new Online();
    public dom = new Dom(this.annyang, this.online);
    public converter = new Converter(this.dom, this.annyang, this.dataCollector);
}

window.addEventListener("load", () => new AppClass());

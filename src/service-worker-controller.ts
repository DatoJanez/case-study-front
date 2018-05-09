/**
 * A class for registering and controlling service worker.
 * @class
 */
export class ServiceWorkerController {
   /**
    * List of service workers that needs to be registered
    * @type Array<string>
    * @private
    */
    private serviceWorkers = [
        "/data-synchroniser.service.js",
    ];

   /**
    * @constructor
    * Checks existing worker and registers new on if it"s unregistered
    */
    constructor() {
        if (!("serviceWorker" in navigator)) return;
        navigator.serviceWorker.getRegistrations()
            .then((registrations: ServiceWorkerRegistration[]) => {
                if (registrations.length) return;
                this.serviceWorkers.forEach((serviceWorker: string) => navigator.serviceWorker
                        .register(serviceWorker));
            });
    }
}

import { Observable } from "rxjs";
import { Dexye } from "./dexye";

/**
 * Fetches data and decides which source to use.
 * @class
 */
export class DataCollector {
    /**
     * Object that stores latest fetched rates in application
     * @public
     */
    public rates;

   /**
    * @constructor
    */
    constructor(private dexye: Dexye) {
        this.fetchRates();
    }

   /**
    * First method gets data from iDB, checks it's validity
    * and performes fetch if data is expired
    * if fetch action fails or returns older version, application would skip with existing Rates data
    * @method
    */
    public fetchRates() {
        this.dexye.getLatestResponce()
            .then((lastResponce) => ({ last: lastResponce, isValid: this.dexye.isCachedDataValid(lastResponce)}))
            .then((dataParams) => {
                if (dataParams.isValid) return this.rates = dataParams.last.rates;

                fetch("http://data.fixer.io/api/latest?access_key=8d981abfaca9f2e4162521b9ecf540db")
                    .then((response) => response.json())
                    .then((response) => {
                        this.rates = this.dexye.latestResponce(response, dataParams.last).rates;
                    })
                    .catch(() => {
                        this.rates = dataParams.last.rates;
                    });
            });
    }
}

import { Annyang, IConvertData } from "./annyang";
import { DataCollector } from "./data-collector";
import { Dom } from "./dom";

/**
 * Converts correncies and subscribes to convert streams
 * @class
 */
export class Converter {

   /**
    * @constructor
    * initial subscription to convert streams
    */
    constructor(private dom: Dom, private annyang: Annyang, private dataCollector: DataCollector) {
        this.annyang.convertRequst$.subscribe((convertData: IConvertData) => this.convert(convertData));
        this.dom.convertRequst$.subscribe((convertData: IConvertData) => this.convert(convertData));
    }

   /**
    * Converts correncies
    * @method
    * @param convertData: IConvertData
    */
    public convert(convertData: IConvertData) {
        const rate1 = this.dataCollector.rates[convertData.currencyFrom];
        const rate2 = this.dataCollector.rates[convertData.currencyTo];
        const result = convertData.amount * (rate2 / rate1);

        this.dom.elements.get("result").innerHTML = result.toFixed(2);
        return result;
    }
}

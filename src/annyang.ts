import { BehaviorSubject, Subject } from "rxjs";

/**
 * Wrapper class for Annyang library
 * Handles speech recognition and command matching tasks.
 * @class
 */
export class Annyang {
   /**
    * Stream that fires whenever speech fragment had been detected.
    * @public
    */
    public convertRequst$ = new Subject<IConvertData>();

   /**
    * Stream that triggers speech recognition activatin events.
    * @public
    */
    public activated$ = new BehaviorSubject<boolean>(false);

   /**
    * Stores annyang library scope.
    * @private
    */
    // tslint:disable-next-line:no-string-literal
    private annyang = window["annyang"];

   /**
    * Annyang library commands.
    * Patterns that matches activates coresponding callback
    * @private
    */
    private commands = {
        "*one *currencyFrom to *currencyTo": () => this.CommandMatch1,
        "*one *two *currencyFrom to *currencyTo": () => this.CommandMatch2,
        "*one *two *two *currencyFrom to *currencyTo": () => this.CommandMatch3,
        "*one_and_currencyFrom to *currencyTo": (oneAndCur, currencyTo) => this.CommandMatch0(oneAndCur, currencyTo),
    };

   /**
    * @constructor
    * Addes initial commands to listen to
    */
    constructor() {
        this.annyang.addCommands(this.commands);
        this.annyang.addCallback("error", () => this.abort());
        this.annyang.addCallback("errorNetwork", () => this.abort());
        this.annyang.addCallback("errorPermissionBlocked", () => this.abort());
        this.annyang.addCallback("errorPermissionDenied", () => this.abort());
        this.annyang.addCallback("end", () => this.abort());
        this.annyang.addCallback("result", () => this.abort());
        this.annyang.addCallback("resultMatch", () => this.abort());
    }

   /**
    * @method
    * @public
    * Starts speech recognition
    * And stops it at first match
    */
    public start() {
        if (!this.annyang) return; // throw
        if (this.annyang.isListening()) {
            this.abort();
        }
        this.annyang.start({ autoRestart: true, continuous: false });
        this.activated$.next(true);
    }

   /**
    * @method
    * @public
    * Aborts speech recognition
    */
    public abort() {
        if (!this.annyang) return; // throw
        this.annyang.abort();
        this.activated$.next(false);
    }

   /**
    * @method
    * @private
    * This method handles result from speech recognition
    * with pattern *one_and_currencyFrom to *currencyTo
    *
    * @todo Needs update to understand more variations of spelling,
    *       and pronounced names of currencies
    */
    private CommandMatch0(oneAndCur, currencyToValue) {
        let clearValue: string;
        let amountValue: number;
        let currencyFromValue: string;

        if (oneAndCur.indexOf("$") === 0) {
            clearValue = oneAndCur.replace("$", "");
            amountValue = parseInt(clearValue, 2);
            currencyFromValue = "USD";
        } else if (oneAndCur.indexOf("€") === 0) {
            clearValue = oneAndCur.replace("€", "");
            amountValue = parseInt(clearValue, 2);
            currencyFromValue = "EUR";
        } else {
            return;
        }
        if (amountValue.toString() !== clearValue) return;

        const convertData: IConvertData = {
            amount: amountValue,
            currencyFrom: currencyFromValue,
            currencyTo: currencyToValue,
        };
        convertData.currencyTo = convertData.currencyTo === "euro" ? "EUR" : convertData.currencyTo;

        this.convertRequst$.next(convertData);
    }

   /**
    * @method
    * @private
    * This method handles result from speech recognition
    * with pattern *one *currencyFrom to *currencyTo
    *
    * @todo Needs implementation
    */
    private CommandMatch1(one, currencyFrom, currencyTo) {
        // console.log(1, one, currencyFrom, currencyTo);
    }

   /**
    * @method
    * @private
    * This method handles result from speech recognition
    * with pattern *one *two *currencyFrom to *currencyTo
    *
    * @todo Needs implementation
    */
    private CommandMatch2(one, two, currencyFrom, currencyTo) {
        // console.log(2, one, two, currencyFrom, currencyTo);
    }

   /**
    * @method
    * @private
    * This method handles result from speech recognition
    * with pattern *one *two *two *currencyFrom to *currencyTo
    *
    * @todo Needs implementation
    */
    private CommandMatch3(one, two, three, currencyFrom, currencyTo) {
        // console.log(3, one, two, three, currencyFrom, currencyTo);
    }
}

/**
 * @interface
 * Describes data for converting action
 * @prop currencyFrom: string;
 * @prop currencyTo: string;
 * @prop amount: number;
 * @prop result?: Subject<number>;
 */
export interface IConvertData {
    currencyFrom: string;
    currencyTo: string;
    amount: number;
    result?: Subject<number>;
}

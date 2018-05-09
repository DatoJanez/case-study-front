import { Subject } from "rxjs";
import { Annyang, IConvertData } from "./annyang";
import { Online } from "./online";

/**
 * Dom manipulation class
 * @class
 */
export class Dom {
    public elements: Map<HTMLElement> = new Map<HTMLElement>();
    public convertRequst$ = new Subject<IConvertData>()

    constructor(private annyang: Annyang, private online: Online){
        this.parseDom();
        this.addEventListeners();
        this.annyang.activated$.subscribe((activated: boolean) => this.activateListenButton(activated));
        this.annyang.convertRequst$.subscribe((convertData: IConvertData) => this.setValues(convertData));
        this.online.online$.subscribe((status: string) => this.setOnlineStatus(status));
    }
    
    private parseDom(){
        this.elements.add("listen", document.getElementById("listen"));
        this.elements.add("currency-from", document.getElementById("currency-from"));
        this.elements.add("currency-to", document.getElementById("currency-to"));
        this.elements.add("amount", document.getElementById("amount"));
        this.elements.add("result", document.getElementById("result"));
        this.elements.add("online", document.getElementById("online"));
    }
    
    private addEventListeners(){
        this.elements.get("listen").addEventListener("click", () => this.annyang.start());
        this.elements.get("currency-from").addEventListener("change", () => this.convertFromDom()) 
        this.elements.get("currency-to").addEventListener("change", () => this.convertFromDom())
        this.elements.get("amount").addEventListener("keyup", () => this.convertFromDom())
    }
    
    public convertFromDom(){
        if(!(<HTMLInputElement>this.elements.get("amount")).value || !(<HTMLInputElement>this.elements.get("currency-from")).value || !(<HTMLInputElement>this.elements.get("currency-to")).value) return;
        this.convertRequst$.next({
            amount: parseInt((<HTMLInputElement>this.elements.get("amount")).value),
            currencyFrom: (<HTMLInputElement>this.elements.get("currency-from")).value, 
            currencyTo: (<HTMLInputElement>this.elements.get("currency-to")).value
        })
    }

    public setValues(convertData){
        if((<HTMLInputElement>this.elements.get("currency-from")).value != convertData.currencyFrom){
            (<HTMLInputElement>this.elements.get("currency-from")).value = convertData.currencyFrom;
        }
        if((<HTMLInputElement>this.elements.get("currency-to")).value != convertData.currencyTo){
            (<HTMLInputElement>this.elements.get("currency-to")).value = convertData.currencyTo;
        }
        if((<HTMLInputElement>this.elements.get("amount")).value != convertData.amount.toFixed(2)){
            (<HTMLInputElement>this.elements.get("amount")).value = convertData.amount.toFixed(2);
        }
    }

    private activateListenButton(activated: boolean){
        activated 
            ? (<HTMLInputElement>this.elements.get("listen")).classList.add("bg-success")
            : (<HTMLInputElement>this.elements.get("listen")).classList.remove("bg-success");
    }

    private setOnlineStatus(status: string){
        status != "online" 
            ? (<HTMLInputElement>this.elements.get("online")).classList.add("bg-danger")
            : (<HTMLInputElement>this.elements.get("online")).classList.remove("bg-danger");
        
        this.elements.get("online").innerHTML = status.toUpperCase();
    }
}

class Map<T> {
    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    add(key: string, value: T): void {
        this.items[key] = value;
    }

    has(key: string): boolean {
        return key in this.items;
    }

    get(key: string): T {
        return this.items[key];
    }
}
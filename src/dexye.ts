import Dexie from "dexie";

/**
 * Wrapper class for Dexie.
 * With methods for indexedDb
 * @class
 */
export class Dexye extends Dexie {
    private responses: Dexie.Table<IRatesResponce, number>;

    constructor() {
        super("ratesDB");
        this.version(1).stores({
            responses: "++id, base, date, rates, success, timestamp",
        });
    }

    public getLatestResponce() {
        return this.table("responses")
            .orderBy("id")
            .last();
    }

    public latestResponce(responceOne, responceTwo): IRatesResponce {
        const latest = responceTwo || responceOne;
        this.table("responses").put(latest);
        return latest;
    }

    public isCachedDataValid(responce) {
        // todo decide fetch or not to max valid time
        return responce;
    }
}

interface IRatesResponce {
    // todo refine types
    id: number;
    base: number;
    date: number;
    rates: number;
    success: boolean;
    timestamp: number;
}

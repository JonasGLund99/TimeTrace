import { extractTimeStamp } from "./helpers/extractTimeStamp";
import { LogFormatter } from "./LogFormatter";
import { MonaaZone } from "./MonaaZone";
import { SearchInterval } from "./SearchInterval";
import { HashMap } from "./Types/hashMap";

export abstract class LogSearcher {
    private static _hashMap = new HashMap();
    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    public static get hashMap() {
        return this._hashMap;
    }

    public static findZones(logFile: string[], searchIntervals: SearchInterval[]): MonaaZone[] {
        console.time("newfindZones");
        const MonaaZoneMatches: MonaaZone[] = [];
        for (let i = 0; i < searchIntervals.length; i++) {
            let match = new MonaaZone();
            let start: number | undefined = this.hashMap.get(Math.round(searchIntervals[i].start).toString());
            let end: number | undefined = this.hashMap.get(Math.round(searchIntervals[i].end).toString());
            if (start !== undefined && end !== undefined)
                match.lineMatches = Array.from({ length: end - start + 1 }, (_, index) => start! + index); //array containing numbers from start to end
            MonaaZoneMatches.push(match)
        }
        console.timeEnd("newfindZones");
        return MonaaZoneMatches
        
    }
}

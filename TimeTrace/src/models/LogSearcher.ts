import { extractTimeStamp } from "./helpers/extractTimeStamp";
import { LogFormatter } from "./LogFormatter";
import { MonaaZone } from "./MonaaZone";
import { SearchInterval } from "./SearchInterval";
import { HashMap } from "./Types/hashMap";

export abstract class LogSearcher {
    private static _hashMap = new HashMap();
    private static timestamps: number[];
    private static averageGrowth: number;

    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    public static get hashMap() {
        return this._hashMap;
    }

    /**
     * Finds the indices in the logfile where there is a match
     */
    public static findZones(searchIntervals: SearchInterval[]): MonaaZone[] {
        console.time("findZones");
        let binaryTime = 0, binaryCount = 0
        let hashTime = 0, hashCount = 0
        let startOfLastFoundMatch = 0;
        const MonaaZoneMatches: MonaaZone[] = [];

        for (let i = 0; i < searchIntervals.length; i++) {
            let match = new MonaaZone();
            let hashTimeStart = performance.now()
            let start: number | null = this.hashMap.get(Math.round(searchIntervals[i].start).toString());
            let end: number | null = this.hashMap.get(Math.round(searchIntervals[i].end).toString());

            // Start and end could be looked up in the hashmap.
            if (start !== null && end !== null) {
                match.lineMatches = Array.from({ length: end - start + 1 }, (_, index) => start! + index); //array containing numbers from start to end
                hashTime += performance.now() - hashTimeStart;
                hashCount++;
            }
            // Start or end may be null. We will use binary search
            else {
                let binaryTimeStart = performance.now()
                match = this.findNearestZone(searchIntervals[i], start != null ? start : startOfLastFoundMatch);
                binaryTime += performance.now() - binaryTimeStart;
                binaryCount++;
            }
            startOfLastFoundMatch = match.lineMatches[0]
            MonaaZoneMatches.push(match)
            
        }
        console.timeEnd("findZones");
        let hashAvg = hashCount === 0 ? 0 : hashTime/hashCount
        let binaryAvg = binaryCount === 0 ? 0 : binaryTime/hashCount
        console.log("Averagehashzonetime: " + hashAvg + " \nAveragebinaryzonetime: " + binaryAvg)
        return MonaaZoneMatches
    }

    /**
     * Finds an individual match in the case where the start or end could not be found via the hashmap. 
     */
    public static findNearestZone(searchInterval: SearchInterval, startOfLastMatch: number): MonaaZone {
        let foundmatch = new MonaaZone();
        let startingIndex = this.findNearestIndex(startOfLastMatch, searchInterval);

        let j: number = startingIndex;
        while (this.timestamps[j] >= searchInterval.start && this.timestamps[j] <= searchInterval.end) {
            foundmatch.lineMatches.push(j)
            j++;
        }
        
        return foundmatch;
    }

    /**
     * 
     * Converts the timestamps to ms when a file is uploaded
     */
    public static updateTimestampInfo(logFile: string[]) {
        const timestamps: number[] = [];

        logFile.forEach((line: string) => {
            const eventTimeStamp = parseInt(LogFormatter.convertDateToMs(extractTimeStamp(line)));
            timestamps.push(eventTimeStamp);
        });

        let averageTimegrowth: number = (timestamps[timestamps.length - 1] - timestamps[0]) / timestamps.length

        this.timestamps = timestamps;
        this.averageGrowth = averageTimegrowth;
    }

    /** Used to find the starting index.  */
    private static findNearestIndex(lastFoundIndex: number, searchInterval: SearchInterval): number {
        const firstTimestamp = this.timestamps[0];
        const difference = searchInterval.start - firstTimestamp;
        const multiplum = difference / this.averageGrowth;
        let startingIndex = Math.floor(multiplum);

        // search in left side if we overshot estimation
        if (searchInterval.start < this.timestamps[startingIndex]) { 
            startingIndex = this.binarySearch(searchInterval.start, lastFoundIndex, startingIndex);
        } 
        // search in right side of array if we undershot estimation
        else if (searchInterval.start > this.timestamps[startingIndex]) {
            startingIndex = startingIndex < lastFoundIndex ? lastFoundIndex : startingIndex;
            startingIndex = this.binarySearch(searchInterval.start, startingIndex, this.timestamps.length - 1);
        }else {
            console.log("Direct binary hit!")
        }

        return startingIndex;
    }

    // Binary search function to find the first index in the log to search from
    private static binarySearch(target: number, left: number, right: number): number {
        let resultIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (this.timestamps[mid] >= target) {
                resultIndex = mid; // Update result index, as we found an element greater than or equal to the target
                right = mid - 1; // Continue searching in the left half
            } else {
                left = mid + 1; // Continue searching in the right half
            }
        }

        return resultIndex;
    }
}

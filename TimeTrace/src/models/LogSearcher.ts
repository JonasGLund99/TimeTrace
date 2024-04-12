import { extractTimeStamp } from "./helpers/extractTimeStamp";
import { LogFormatter } from "./LogFormatter";
import { MonaaZone } from "./MonaaZone";
import { SearchInterval } from "./SearchInterval";

export abstract class LogSearcher {
    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    public static findZones(logFile: string[], searchIntervals: SearchInterval[]): MonaaZone[] {
        console.time("findZones");
        const MonaaZoneMatches: MonaaZone[] = [];
        const [timestamps, averageTimegrowth] = this.getTimestampInfo(logFile);

        for (let i = 0; i < searchIntervals.length; i++) {
            let foundmatch = new MonaaZone();
            let startingIndex = this.findStartingIndex(timestamps, searchIntervals[i], averageTimegrowth);

            for (let j = startingIndex; j < timestamps.length; j++) {
                const timestamp = timestamps[j];

                if (timestamp >= searchIntervals[i].start && timestamp <= searchIntervals[i].end) {
                    foundmatch.lineMatches.push(j);
                } else if (timestamp > searchIntervals[i].end) {
                    break;
                }
            }

            if(foundmatch.lineMatches.length > 0) {
                MonaaZoneMatches.push(foundmatch);
            }
        }
        console.timeEnd("findZones");
        console.log(MonaaZoneMatches);
        return MonaaZoneMatches;
    }

    private static getTimestampInfo(logFile: string[]): [number[], number] {
        let prevLineTime: number = 0;
        let averageTimegrowth: number = 0;
        const timestamps: number[] = [];

        logFile.forEach((line: string) => {
            const eventTimeStamp = parseInt(LogFormatter.convertDateToMs(extractTimeStamp(line)));
            timestamps.push(eventTimeStamp);
            averageTimegrowth = (averageTimegrowth + (eventTimeStamp - prevLineTime)) / 2;
            prevLineTime = eventTimeStamp;
        });

        return [timestamps, averageTimegrowth];
    }

    private static findStartingIndex(timestamps: number[], searchInterval: SearchInterval, averageTimegrowth: number): number {
        const firstTimestamp = timestamps[0];
        const difference = searchInterval.start - firstTimestamp;
        const multiplum = difference / averageTimegrowth;
        let startingIndex = Math.floor(multiplum);

        // Binary search to correct an overshot starting index due to mulitplum calculation
        startingIndex = this.binarySearch(timestamps, searchInterval.start, startingIndex, true);

        // The starting index may be greater than what was found within the [0] - [Math.floor(multiplum)] range
        startingIndex = this.binarySearch(timestamps, searchInterval.start, startingIndex, false);

        return startingIndex;
    }

    // Binary search function to find the first index in the log to search from
    private static binarySearch(timestamps: number[], target: number, startingIndex: number, isOvershot: boolean): number {
        let left = isOvershot ? 0 : startingIndex;
        let right = isOvershot ? startingIndex : timestamps.length - 1;
        let resultIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (timestamps[mid] >= target) {
                resultIndex = mid; // Update result index, as we found an element greater than or equal to the target
                right = mid - 1; // Continue searching in the left half
            } else {
                left = mid + 1; // Continue searching in the right half
            }
        }

        return resultIndex;
    }
}

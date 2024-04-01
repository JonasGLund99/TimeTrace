import { extractTimeStamp } from "./helpers/extractTimeStamp";
import { MonaaZone } from "./MonaaZone";
import { SearchInterval } from "./SearchInterval";

export class LogSearcher {
    findZones(logFile: string[], searchIntervals: SearchInterval[]): MonaaZone[] {
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
            MonaaZoneMatches.push(foundmatch);
        }
        return MonaaZoneMatches;
    }

    getTimestampInfo(logFile: string[]): [number[], number] {
        let prevLineTime: number = 0;
        let averageTimegrowth: number = 0;
        const timestamps: number[] = [];

        logFile.forEach((line: string) => {
            const timestampISO: string = extractTimeStamp(line);
            const eventTimeStamp = new Date(timestampISO).getTime();
            timestamps.push(eventTimeStamp);
            averageTimegrowth = (averageTimegrowth + (eventTimeStamp - prevLineTime)) / 2;
            prevLineTime = eventTimeStamp;
        });

        return [timestamps, averageTimegrowth];
    }

    findStartingIndex(timestamps: number[], searchInterval: SearchInterval, averageTimegrowth: number): number {
        const firstTimestamp = timestamps[0];
        const difference = searchInterval.start - firstTimestamp;
        const multiplum = difference / averageTimegrowth;
        let startingIndex = Math.floor(multiplum);

        // Using binary search to find the correct starting index
        startingIndex = this.binarySearch(timestamps, searchInterval.start, startingIndex);

        return startingIndex;
    }

    // Binary search function to find the first index in the log to search from
    binarySearch(timestamps: number[], target: number, startingIndex: number): number {
        let left = startingIndex;
        let right = timestamps.length - 1;
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

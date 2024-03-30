import { MonaaZone } from './MonaaZone';
import { SearchInterval } from './SearchInterval';
import { extractTimeStamp } from "./helpers/extractTimeStamp";

export class LogSearcher {

    findZones(logFile: string[], SearchIntervals: SearchInterval[]): MonaaZone[] {
        console.time("findZones");
        const MonaaZoneMatches: MonaaZone[] = [];
        // const timestamps: number[] = [];
        // let averageTimegrowth: number = 0;
        // let prevLineTime: number = 0;

        // logFile.forEach((line: string, lineIndex: number) => {
        //     const timestampISO: string = extractTimeStamp(line);
        //     const eventTimeStamp = new Date(timestampISO).getTime();
        //     timestamps.push(eventTimeStamp);
        //     averageTimegrowth = (averageTimegrowth + (eventTimeStamp - prevLineTime))/2;
        //     prevLineTime = eventTimeStamp;
        // });

        for (let i = 0; i < SearchIntervals.length; i++) {
            let foundmatch = new MonaaZone();
        //     const firstTimestamp = timestamps[0]; 
        //     const difference = SearchIntervals[i].start - firstTimestamp;
        //     const multiplum = (SearchIntervals[i].start - firstTimestamp) / averageTimegrowth;
        //     let startingIndex = Math.floor(multiplum); 
        //     while (timestamps[startingIndex] > SearchIntervals[i].start) {
        //         console.log("startingIndex was past the start of the interval, moving back one step.")
        //         startingIndex--;
        //     }

        //     for (let j = startingIndex; j < timestamps.length; j++) {
        //         const element = timestamps[j];

        //         if (element >= SearchIntervals[i].start && element <= SearchIntervals[i].end) {
        //             foundmatch.lineMatches.push(j);
        //         }
        //         else if (element > SearchIntervals[i].end) {
        //             break;
        //         }
        //     }

            for (let j = 0; j < logFile.length; j++) {
                const element = logFile[j];
                let timestampISO: string = extractTimeStamp(element);
                const eventTimeStamp = new Date(timestampISO).getTime();
                if (eventTimeStamp >= SearchIntervals[i].start && eventTimeStamp <= SearchIntervals[i].end) {
                    foundmatch.lineMatches.push(j)
                }
                else if (eventTimeStamp > SearchIntervals[i].end) {
                    break;
                }
                
            }
            // logFile.forEach((line: string, lineIndex: number) => {
            //     let timestampISO: string = extractTimeStamp(line);
            //     const eventTimeStamp = new Date(timestampISO).getTime();
            //     if (eventTimeStamp >= SearchIntervals[i].start && eventTimeStamp <= SearchIntervals[i].end) {
            //         foundmatch.lineMatches.push(lineIndex)
            //     }
            //     else if (eventTimeStamp > SearchIntervals[i].end) {
            //         break;
            //     }
            // });
            MonaaZoneMatches.push(foundmatch);
        }
        console.timeEnd("findZones");
        console.log("MonaaZoneMatches", MonaaZoneMatches)
        return MonaaZoneMatches
    };
}

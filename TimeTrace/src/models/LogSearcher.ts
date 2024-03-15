import { error } from "console";
import { MonaaZone } from './MonaZone';
import { SearchInterval } from './SearchInterval';
import { extractTimeStamp } from "./helpers/extractTimeStamp";

export class LogSearcher {
   
    findZones(logFile: string[] , SearchIntervals: SearchInterval[]): MonaaZone[]{
    // Regex to match timestamps in ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
        const TimestampRegex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/g;
        let MonaaZoneMatches: MonaaZone[] = []
            for (let i = 0; i < SearchIntervals.length; i++) {
                let foundmatch = new MonaaZone()  
                  logFile.forEach((line, lineIndex) => {
                    let timestampISO = extractTimeStamp(line);
                    const eventTimeStamp = new Date(timestampISO).getTime()
                    if ( eventTimeStamp >= SearchIntervals[i].start  && eventTimeStamp <= SearchIntervals[i].end) {
                        foundmatch.match.push(lineIndex)
                    }
                  });
            }
                return MonaaZoneMatches
            };
    }

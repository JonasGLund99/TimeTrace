import { extractEventFromLine } from "./extractEventFromLine";
import { extractTimeStamp } from "./extractTimeStamp";

export function extractEventsFromFileLines(fileLines: string[], timeStampRegex: RegExp): string[] {

    let events = fileLines.map((line, i) => {
        let timestamp: string = extractTimeStamp(line, timeStampRegex);
        if (!line.startsWith(timestamp)) {
            throw new Error("Fileline in file was not formatted correctly. <br /> <br />Time of event must be first part of each line in the file. <br /> <br/>Fileline with error: "+(i+1) + " " + line);
        }
        let event = extractEventFromLine(line, timestamp);
        return event;
    })
    
    return events;
}


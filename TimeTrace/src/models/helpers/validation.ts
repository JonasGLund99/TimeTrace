import { LogFormatter } from "../LogFormatter";
import { extractTimeStamp } from "./extractTimeStamp";

export function fileLinesAreValid(lines: string[]): string | null {
    try {
        FileIsInAscendingOrder(lines); //throws errors if not valid
        DuplicateEventsAtSameTimestampCheck(lines); //throws errors if not valid
    } catch (e) {
        if (typeof e === 'string') { //typescript needs to be sure it is a string
            return e;
        }
        throw e; //if not string, something uncaught happened
    }
    return null
}

function DuplicateEventsAtSameTimestampCheck(lines: string[]): void {
    //loops throgh file once. for each line, compare with the lines after until timestamp changes.
    for (let i = 0; i < lines.length - 1; i++) {
        let j = i + 1;
        //check lines in file until timestamp canges or eof
        while (j < lines.length && extractTimeStamp(lines[i]) === extractTimeStamp(lines[j])) {
            let line1: string = lines[i];
            let line2: string = lines[j];
            let lineContents = `<br /><br /><pre>Line ${i + 1}: ${line1}\nLine ${j + 1}: ${line2}</pre>`

            if (line1 === line2)
                throw new Error(`Duplicate events at same timestamp.${lineContents}`);
            j++;
        }
    }
}

function FileIsInAscendingOrder(lines: string[]): void {
    //compare timestamp of current line with next line. if next >= current, then all good
    for (let i = 0; i < lines.length - 1; i++) {
        let line1: string = lines[i];
        let line2: string = lines[i + 1];
        let date1 = new Date();
        let date2 = new Date();
        let lineContents = `<br /><br /><pre>Line ${i + 1}: ${line1}\nLine ${i + 2}: ${line2}</pre>`
        try {
            date1 = LogFormatter.convertToDate(extractTimeStamp(line1));
            date2 = LogFormatter.convertToDate(extractTimeStamp(line2));
        } catch (e) {
            throw new Error(`Could not parse timestamp in line ${i + 1} or ${i + 2}.${lineContents}`);
        }
        
        if (date1 > date2) //if line1 >= than line2 it is not sorted
            throw new Error(`File must be in strictly ascending order. Ordering failed at:${lineContents}`);
    }
}
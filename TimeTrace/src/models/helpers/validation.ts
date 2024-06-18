import { LogFormatter } from "../LogFormatter";
import { extractTimeStamp } from "./extractTimeStamp";

/**
 * Asserts that the logfile is validly structured, it is in ascending order and 
 * checks whether two identical events happen at the same timestamp
 * @returns Either an error as a string or null.  
 */
export function fileLinesAreValid(lines: string[]): string | null {
    try {
        //throws errors if not valid
        FileIsInAscendingOrder(lines); 
        //throws errors if not valid
        DuplicateEventsAtSameTimestampCheck(lines); 
    } catch (e) {
        //typescript needs to be sure it is a string
        if (typeof e === 'string') { 
            return e;
        }
        //if not string, something uncaught happened
        throw e; 
    }
    return null
}

/**
 * Iterates the log file and will throw an error if two identical event strings happen to have the same time stamp
 * @returns throws an error if two event strings are identical and have the same timestamp.
 */
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

/**
 * Validates that the lines in the log file are in ascending order.
 */
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
        
        if (date1 > date2) //if line2 < than line1 it is not sorted
            throw new Error(`File must be in ascending order. Ordering failed at:${lineContents}`);
    }
}

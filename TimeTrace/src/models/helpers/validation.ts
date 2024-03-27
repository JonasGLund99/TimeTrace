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
            if (line1 === line2)
                throw new Error(`Duplicate events at same timestamp.<br />Line ${i} ${line1}<br/>Line ${j} ${line1}`);
        }
    }
}

function FileIsInAscendingOrder(lines: string[]): void {
    //compare timestamp of current line with next line. if next >= current, then all good
    for (let i = 0; i < lines.length - 1; i++) {
        let line1: string = lines[i];
        let line2: string = lines[i + 1];
        if (new Date(extractTimeStamp(line1)) > new Date(extractTimeStamp(line2))) //if line1 > than line2 it is not sorted
            throw new Error(`File is not in ascending order. Ordering failed at:<br />Line ${i} ${line1}<br/>Line ${i + 1} ${line1}`);
    }
}
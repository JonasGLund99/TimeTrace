import { extractEventFromLine } from "./helpers/extractEventFromLine";
import { DateFormat, dateFormats } from "./helpers/dateFormats";
import { extractTimeStamp } from "./helpers/extractTimeStamp";
import { getFileLines } from "./helpers/getFileLines";
import { CustomMap } from "./Types/EventMapping";

export abstract class LogFormatter {
    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    public static dateFormat = DateFormat.ISO_8601;

    public static async formatLog(originalLog: File, mappings: CustomMap): Promise<File> {
        try {
            let lines: string[] = await getFileLines(originalLog); //convert file to array of strings. Has format <time> <event>
            let mappedLines: string[] = this.convertLines(lines, mappings) //map all events and format to <event> <time>
            let f: File = new File([mappedLines.join("\n")], "mapped.txt", { type: "text/plain" }) //return file object with mapped and formatted events
            return f;
        } catch (error) { //readfile might throw error
            throw new Error("Error formatting the log." + error);
        }
    }

    public static convertLines(lines: string[], mappings: CustomMap): string[] {
        let mappedRows: string[] = [];
        let mappedValue: string;
        lines.forEach(line => {
            let timestamp: string = extractTimeStamp(line);
            let event = extractEventFromLine(line, timestamp);

            mappedValue = this.getMappedValue(event, mappings, line)
            mappedRows.push(mappedValue + " " + this.convertDateToMs(timestamp)) //format data for MONAA <mapped_event> <timestamp>
        });
        return mappedRows;
    }

    public static getMappedValue(event: string, mappings: CustomMap, line:string): string {
        event = event.replace(/(\r\n|\n|\r)/gm, "") //remove carriage returns
        let mappedValue: string = "Z" //Mapped value is always Z if not found in mappings
        const foundMapValue = mappings.get(event)
        if (foundMapValue !== undefined && foundMapValue !== "") {
            mappedValue = foundMapValue;
        }
        return mappedValue
    }

    public static convertDateToMs(timestamp: string): string {
        let date: Date;
        
        if (timestamp === "") {
            throw new Error("Timestamp is empty")
        }

        date = this.convertToDate(timestamp);

        let miliseconds = date.getTime();
        return miliseconds.toString()
    }

    public static convertToDate(dateString: string): Date {
        let date: Date;

        if (dateFormats["ISO 8601"].test(dateString)) {
            date = new Date(dateString);
        }
        else if (dateFormats["YYMMDD HH.MM.SS"].test(dateString)) {
            const [datePart, timePart] = dateString.split(' ');

            // Extract year, month, day from the date part
            const year = parseInt(datePart.substring(0, 2)) + 2000; // Assuming 2000 is the base year
            const month = parseInt(datePart.substring(2, 4));
            const day = parseInt(datePart.substring(4, 6));

            // Extract hours, minutes, seconds from the time part
            const [hours, minutes, seconds] = timePart.split('.').map(part => parseInt(part));

            date = new Date(year, month - 1, day, hours, minutes, seconds);
        }
        else if (dateFormats["DD/MM/YYYY HH:MM:SS"].test(dateString)) {
            const [datePart, timePart] = dateString.split(' ');

            // Extract day, month, year from the date part
            const [day, month, year] = datePart.split('/').map(part => parseInt(part));

            // Extract hours, minutes, seconds from the time part
            const [hours, minutes, seconds] = timePart.split(':').map(part => parseInt(part));

            date = new Date(year, month - 1, day, hours, minutes, seconds);
        }
        else if (dateFormats["YYYY-DD-MM HH:MM:SS.MMM"].test(dateString)) {
            const [datePart, timePart] = dateString.split(' ');

            // Extract day, month, year from the date part
            const [day, month, year] = datePart.split('-').map(part => parseInt(part));

            // Extract hours, minutes, seconds and milliseconds from the time part
            const [hours, minutes, secondsAndMilliseconds] = timePart.split(':');
            
            // Extract seconds and milliseconds
            const [seconds, milliseconds] = secondsAndMilliseconds.split('.').map(part => parseInt(part));

            date = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes), seconds, milliseconds);
        } else {
            throw new Error('Unsupported date format');
        }

        return date;
    }
}
import { getFileLines } from "./helpers/getFileLines";

export class LogFormatter {

    // file: File;
    // constructor() { //ONLY TO CREATE FAKE IN MEMORY FILE FOR TESTING
    //     this.file = new File(["2024-02-06T09:45:24.3100333Z login\n2024-02-06T09:45:26.3100333Z logout\n2024-02-06T09:47:24.3100333Z login\n2024-02-06T09:55:24.3100333Z logout\n2024-02-06T19:45:24.3100333Z singin\n"], "original_log.txt");
    // }
    

    async getFileLines(originalLog: File): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => { //must return promise because reader is async
            let reader = new FileReader();
            reader.onload = async (event) => {
                let textLines = (reader.result as string).split("\n"); //split file on newlines
                resolve(textLines); //all went well, return textLines
            };
            reader.onerror = async (e) => { //on error reject
                console.error("Unable to read file", originalLog.name, e);
                reject(e);
            };
            reader.readAsText(originalLog); //call reader
        });
    }
    
    async formatLog(originalLog: File, mappings: Map<string, string>): Promise<File> {
        try {
            let lines: string[] = await getFileLines(originalLog); //convert file to array of strings. Has format <time> <event>
            let mappedLines: string[] = this.convertLines(lines, mappings) //map all events and format to <event> <time>
            console.log({"mappedLines": mappedLines})
            let f: File = new File([mappedLines.join("\n")], "mapped.txt") //return file object with mapped and formatted events
            return f;
        } catch (error) { //readfile might throw error
            console.log("Error formatting the log.", error);
            throw error;
        } 
    }

    convertLines(lines: string[], mappings: Map<string, string>): string[] {
        let mappedRows: string[] = [];
        let mapValue: string;
        lines.forEach(line => {
            let lineElements: string[] = line.split(" ")
            if (lineElements.length === 2) { //only map rows that has two elements (ignore newlines at bottom etc)
                let event: string = lineElements[1]; //event is second element
                let timestamp: string = lineElements[0]; // timestamp is first element
                mapValue = this.getMapValue(event, mappings)
                mappedRows.push(mapValue+ " " + this.convertDateformat(timestamp)) //format data <mapped_event> <timestamp>
            }
        });
        return mappedRows;
    }

    getMapValue(event: string, mappings: Map<string, string>): string {
        let mapValue: string | undefined = mappings.get(event) //try to map value
        if (mapValue === undefined) { //if value was not mapped then map to Z
            mapValue = "Z"
        }
        return mapValue
    }

    convertDateformat(timestamp: string): string {
        let miliseconds: number = Date.parse(timestamp)
        return miliseconds.toString()
    }
}
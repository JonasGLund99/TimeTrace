

export class LogFormatter {
    file: File;

    constructor() { //ONLY TO CREATE FAKE IN MEMORY FILE FOR TESTING
        this.file = new File(["1 login\n2 logout\n3 login\n4 logout\n"], "original_log.txt");
    }

    async getFileLines(original_log: File): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => { //must return promise because reader is async
            let reader = new FileReader();
            reader.onload = async (event) => {
                let textLines = (reader.result as string).split("\n"); //split file on newlines
                resolve(textLines); //all went well, return textLines
            };
            reader.onerror = async (e) => { //on error reject
                console.error("Unable to read file", original_log.name, e);
                reject(e);
            };
            reader.readAsText(original_log); //call reader
        });
    }
    
    async formatLog(original_log: File, mappings: Map<string, string>): Promise<File> {
        console.log("formatLog");
        try {
            let lines: string[] = await this.getFileLines(original_log); //convert file to array of strings. Has format <time> <event>
            let mapped_lines: string[] = this.mapEvents(lines, mappings) //map all events and format to <event> <time>
            console.log({"mapped_lines": mapped_lines})
            let f: File = new File([mapped_lines.join("\n")], "mapped.txt") //return file object with mapped and formatted events
            return f;
        } catch (error) { //readfile might throw error
            console.log("Error formatting the log.", error);
            throw error;
        } 
    }

    mapEvents(lines: string[], mappings: Map<string, string>): string[] {
        let mapped_rows: string[] = [];
        lines.forEach(line => {
            let line_elements: string[] = line.split(" ")
            if (line_elements.length === 2) { //only map rows that has two elements (ignore newlines at bottom etc)
                let event: string = line_elements[1]; //event is second element
                let timestamp: string = line_elements[0]; // timestamp is first element
                mapped_rows.push(mappings.get(event)+ " " + timestamp) //format data <mapped_event> <timestamp>
            }
        });
        return mapped_rows;
    }

    removeUnmappedEvents(log: any): any {
        throw new Error("Not implemented yet");
    }
}
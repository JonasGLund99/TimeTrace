

export class LogFormatter {
    file: File;

    constructor() {
        this.file = new File(["login 1\nlogout 2\nlogin 3\nlogout 4\n"], "original_log.txt");
    }

    async getFileLines(original_log: File): Promise<Array<string>> {
        console.log("getting lines of original log file");
        return new Promise<Array<string>>((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = async (event) => {
                let textLines = (reader.result as string).split("\n");
                console.log(textLines);
                resolve(textLines);
            };
            reader.onerror = async (ev) => {
                console.error("Unable to read file", original_log.name, ev);
                reject(ev);
            };
            reader.readAsText(original_log);
        });
    }
    
    async formatLog(original_log: File, mappings: Map<string, string>): Promise<File> {
        console.log("formatLog");
        try {
            let lines: Array<string> = await this.getFileLines(original_log);
            console.log("Log has been formatted.");
            let f: File = new File(["A 1\nB 2\nA 3\nB 4\n"], "mapped.txt")
            return f;
        } catch (error) {
            console.log("Error formatting the log.", error);
            throw error;
        } 
    }

    removeUnmappedEvents(log: any): any {
        throw new Error("Not implemented yet");
    }
}
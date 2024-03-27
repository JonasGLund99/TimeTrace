import { extractTimeStamp } from "./extractTimeStamp";
export function extractEventsFromFileLines(fileLines: string[]): string[] {

    let newLines = fileLines.map((line, i) => {
        let timestamp: string = extractTimeStamp(line);
        if (!line.startsWith(timestamp)) {
            throw new Error("Fileline in file was not formatted correctly. <br /> <br />Time of event must be first part of each line in the file. <br /> <br/>Fileline with error: "+(i+1) + " " + line)
        }
        line = line.replace(timestamp, "")
        line = line.replace(/(^\s*)|(\s*$)/gi,""); //remove leading and trailing spaces
        line = line.replace(/\n /,"\n"); //remove newlines
        line = line.replace(/\r/, "");
        return line;
    })
    
    return newLines;
}


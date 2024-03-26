import { extractTimeStamp } from "./extractTimeStamp";
export function extractEventsFromFileLines(fileLines: string[]): string[] {

    let newLines = fileLines.map((line) => {
        let timestamp: string = extractTimeStamp(line);
        line = line.replace(timestamp, "")
        line = line.replace(/(^\s*)|(\s*$)/gi,""); //remove leading and trailing spaces
        line = line.replace(/\n /,"\n"); //remove newlines
        line = line.replace(/\r/, "");
        return line;
    })
    
    return newLines;
}


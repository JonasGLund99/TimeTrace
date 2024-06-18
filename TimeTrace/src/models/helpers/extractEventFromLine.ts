
/**
 * @returns a string that is only an event string from the log file 
 */
export function extractEventFromLine(line: string, timestamp: string): string {
    line = line.replace(timestamp, "")
    //remove leading and trailing spaces
    line = line.replace(/(^\s*)|(\s*$)/gi,"");
    //remove newlines 
    line = line.replace(/\n /,"\n");
    line = line.replace(/\r/, "");
    return line;
}
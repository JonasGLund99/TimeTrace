export function extractEventFromLine(line: string, timestamp: string): string {
    line = line.replace(timestamp, "")
    line = line.replace(/(^\s*)|(\s*$)/gi,""); //remove leading and trailing spaces
    line = line.replace(/\n /,"\n"); //remove newlines
    line = line.replace(/\r/, "");
    return line;
}
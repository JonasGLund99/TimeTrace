export function extractTimeStamp(line: string): string {
    const timeStampRegex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}(Z|[+-]\d{2}:\d{2})\b/g;
    let timestamp: string | undefined;

    let timestampMatch = line.match(timeStampRegex);
    timestamp = timestampMatch ? timestampMatch[0] : undefined;
    if (timestamp === undefined) {
        throw new Error("Could not find a timestamp in log file line: '"+line+"'");
    }

    return timestamp;
}
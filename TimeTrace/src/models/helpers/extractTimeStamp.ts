export function extractTimeStamp(line: string, timeStampRegex: RegExp): string {
    let timestamp: string | undefined;

    let timestampMatch = line.match(timeStampRegex);
    timestamp = timestampMatch ? timestampMatch[0] : undefined;
    if (timestamp === undefined) {
        throw new Error(`Could not find a timestamp in log file line: '${line}'`);
    }

    return timestamp;
}
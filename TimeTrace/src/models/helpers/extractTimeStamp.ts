export function extractTimeStamp(line: string) : string {
    const TimestampRegex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/g;
    let timestamp: string | undefined;

    let timestampMatch = line.match(TimestampRegex);
    timestamp = timestampMatch? timestampMatch[0] : undefined;
    if(timestamp === undefined) {
        throw new Error("Could not find a timestamp for the event");
    }

    return timestamp
}
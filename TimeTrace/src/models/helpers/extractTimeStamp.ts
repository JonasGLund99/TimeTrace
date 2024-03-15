export function extractTimeStamp(line: string): string {
    // Regex to match timestamps the format YYYY-MM-DDTHH:MM:SS.SSSZ or YYYY-MM-DDTHH:MM:SS.SSS[+-]HH:MM
    const timeStampRegex = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{*}(Z|[+-]\d{2}:\d{2})\b/g;
    let timestamp: string | undefined;

    let timestampMatch = line.match(timeStampRegex);
    timestamp = timestampMatch ? timestampMatch[0] : undefined;
    if (timestamp === undefined) {
        throw new Error("Could not find a timestamp for the event");
    }

    return timestamp
}
export type FileLine = {
    text: string;
    line: number;
}

export function mapEventsToFileLine(events: string[]): FileLine[] {
    return events.map((event, fileLine) => { return { text: event, line: fileLine } as FileLine })
}

export function mapFileLineToEvents(fileLines: FileLine[]): string[] {
    return fileLines.map((fileLine) => fileLine.text);
}
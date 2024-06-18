export type FileLine = {
    text: string;
    line: number;
}

export function mapEventsToFileLine(events: string[]): FileLine[] {
    return events.map((event, fileLine) => { return { text: event, line: fileLine } as FileLine })
}
import { LogFormatter } from "../LogFormatter";
import { dateFormats } from "./dateFormats";


/**
 * @returns a timestamp extracted via {@link dateFormats} and the currently selected dateFormat {@link LogFormatter.dateFormat}
 */
export function extractTimeStamp(line: string): string {
    let timestamp: string | undefined;

    let timestampMatch = line.match(dateFormats[LogFormatter.dateFormat]);
    timestamp = timestampMatch ? timestampMatch[0] : undefined;
    if (timestamp === undefined) {
        throw new Error(`Could not find a timestamp in log file line: '${line}'`);
    }

    return timestamp;
}
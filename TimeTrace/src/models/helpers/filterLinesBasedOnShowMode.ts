import { ShowLinesMode } from "../../context/LogTableContext";
import { FileLine } from "../FileLine";
import { CustomMap } from "../Types/EventMapping";
import { extractEventFromLine } from "./extractEventFromLine";
import { extractTimeStamp } from "./extractTimeStamp";


export function filterAllMappedUnmappedLines(lines: FileLine[], mode: ShowLinesMode, mappings: CustomMap): FileLine[] {
    let validator: (line: FileLine) => boolean;

    switch (mode) {
        case ShowLinesMode.ALL:
            return lines;
        case ShowLinesMode.MAPPED:
            validator = (line: FileLine): boolean => {
                return mappings.get(line.text, line.text) !== undefined;
            };
            break;
        case ShowLinesMode.UNMAPPED:
            validator = (line: FileLine): boolean => {
                return mappings.get(line.text, line.text) === undefined;
            };
            break;
    }

    const filtered = lines.filter(validator)
    return filtered;

}
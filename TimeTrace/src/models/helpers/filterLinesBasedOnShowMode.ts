import { ShowLinesMode } from "../../context/LogTableContext";
import { FileLine } from "../FileLine";
import { CustomMap } from "../Types/EventMapping";
import { extractEventFromLine } from "./extractEventFromLine";
import { extractTimeStamp } from "./extractTimeStamp";


export function filterAllMappedUnmappedLines(lines: FileLine[], mode: ShowLinesMode, mappings: CustomMap): FileLine[] {
    const filtered = lines.filter((line: FileLine) => { //filter that either returns all lines, lines where mapping!==undefined (mapped) or mapping===undefined (unmapped)
        switch (mode) {
            case ShowLinesMode.ALL:
                return true;
            case ShowLinesMode.MAPPED:
                return mappings.get(line.text, line.text) !== undefined;
            case ShowLinesMode.UNMAPPED:
                return mappings.get(line.text, line.text) === undefined;
            default:
                return false;
        }
    });

    return filtered;

}
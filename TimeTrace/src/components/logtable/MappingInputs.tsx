import { useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { FileLine } from '../../models/Types/FileLine';
import { cn } from "../../models/helpers/cn";
import Trashcan from "../svgs/Trashcan";
import { CustomMap } from "../../models/Types/EventMapping";
import Button from "../button/Button";
import { ButtonStyle } from "../button/IButtonProps";
import Tooltip from "../tooltip/ToolTip";

interface MappingInputsProps {
    lineIsHighlighted: (line: number) => boolean;
    eventIsMapped: (fileLine: FileLine) => boolean;
    mappingsAreEditable: boolean;
    shownLines: FileLine[];
    fileLines: string[];
}

function MappingInputs({ lineIsHighlighted, eventIsMapped, mappingsAreEditable, shownLines, fileLines }: MappingInputsProps) {
    const { mappings, setMappings } = useContext(AppdataContext);
    const { events } = useContext(AppdataContext);

    function handleMappingChange(eventText: string, mappingIndex: number): void {
        const inputValue = eventText;

        // Filter out characters that are not in the range of 'a' to 'y' || 'A' to 'Y'
        const lastChar = inputValue.slice(-1);
        const filteredValue = lastChar.search(/[a-yA-Y]/gi) === 0 ? lastChar : "";

        // EventText is empty when the user has removed the mapping.
        if (filteredValue === "" && eventText !== "") return;
        const mapKey = events[mappingIndex];
        mappings.setString(mapKey, filteredValue);
        const newMappings = new CustomMap(mappings);
        if (mappingsAreEditable) {
            setMappings(newMappings);
        }
    }

    function removeMapping(eventIndex: number): void {
        handleMappingChange("", eventIndex);
    }

    return (
        <div className="sticky right-0 flex flex-col mapping-container">
            {shownLines.map((fileLine: FileLine) => (
                <div key={"mappinginput" + fileLine.line} className={cn(
                    lineIsHighlighted(fileLine.line)
                        ? eventIsMapped(fileLine) ? "bg-yellow-200" : "bg-yellow-100"
                        : "even:bg-white odd:bg-gray-100",
                    "flex items-center justify-end gap-1 py-2 pl-2 pr-1")}>
                        <input
                            key={"input" + fileLine.line}
                            className="w-6 h-6 text-center border-2 border-gray-300 rounded-md"
                            type="text"
                            readOnly={mappingsAreEditable ? false : true}
                            value={mappings.get(fileLine.text, fileLines[fileLine.line]) || ''}
                            onChange={(event) => {
                                handleMappingChange(event.target.value, fileLine.line);
                            }}
                        />
                    {mappingsAreEditable &&
                        <Button tooltip={`${(mappings.get(fileLine.text, fileLines[fileLine.line]) || '') ? 'Remove mapping ' + (mappings.get(fileLine.text, fileLines[fileLine.line]) || '') + '.' : ''}`} buttonStyle={ButtonStyle.None} onClick={() => {removeMapping(fileLine.line)}}>
                            <Trashcan />
                        </Button>
                    }
                </div>
            ))}
        </div>
    );
}

export default MappingInputs;
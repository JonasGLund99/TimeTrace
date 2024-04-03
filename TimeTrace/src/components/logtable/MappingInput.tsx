import { useState, useEffect, useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { LogTableContext } from "../../context/LogTableContext";
import { FileLine } from '../../models/Types/FileLine';

interface Props {
    lineIsHighlighted:(line: number) => boolean;
    eventIsMapped:(event: string) => boolean;
    linesPerPage: number;
    classNames:(...classes: String[]) => string;
    mappingsAreEditable: boolean;
    shownLines: FileLine[];
}

function MappingInput(props: Props) {
    const { mappings, setMappings } = useContext(AppdataContext);
    const lineIsHighlighted = props.lineIsHighlighted;
    const eventIsMapped = props.eventIsMapped;
    const mappingsAreEditable = props.mappingsAreEditable
    const classNames = props.classNames
    const { events } = useContext(AppdataContext);
    const shownLines = props.shownLines;

    function handleMappingChange(eventText: string, mappingIndex: number): void {
        const inputValue = eventText;

        // Filter out characters that are not in the range of 'a' to 'y' || 'A' to 'Y'
        const lastChar = inputValue.slice(-1);
        const filteredValue = lastChar.search(/[a-yA-Y]/gi) === 0 ? lastChar : "";

        // EventText is empty when the user has removed the mapping.
        if (filteredValue === "" && eventText !== "") return;
        const mapKey = events[mappingIndex];
        mappings.set(mapKey, filteredValue);
        const newMappings = new Map(mappings);
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
                <div key={fileLine.line} className={classNames(
                    lineIsHighlighted(fileLine.line)
                        ? eventIsMapped(fileLine.text) ? "bg-yellow-200" : "bg-yellow-100"
                        : "even:bg-white odd:bg-gray-100",
                    "flex items-center justify-end gap-1 py-2 pl-2 pr-1")}>
                    <input
                        className="w-6 h-6 text-center border-2 border-gray-300 rounded-md"
                        type="text"
                        readOnly={mappingsAreEditable ? false : true}
                        value={mappings.get(fileLine.text) || ''}
                        onChange={(event) => {
                            handleMappingChange(event.target.value, fileLine.line);
                        }}
                    />
                    {mappingsAreEditable ? (
                        <svg
                            onClick={() => {
                                removeMapping(fileLine.line);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default MappingInput;
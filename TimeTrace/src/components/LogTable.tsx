type LogTableProps = {
    mappingsAreEditable: boolean | undefined;
    events: string[];
    mappings: Map<string, string>;
    fileLines: string[];
    setMappings: React.Dispatch<React.SetStateAction<Map<string, string>>> | undefined;
};

function LogTable(props: LogTableProps) {
    function handleMappingChange(eventText: string, mappingIndex: number): void {
        const inputValue = eventText;

        // Filter out characters that are not in the range of 'a' to 'y' || 'A' to 'Y'
        const lastChar = inputValue.slice(-1);
        const filteredValue = lastChar.search(/[a-yA-Y]/gi) === 0 ? lastChar : "";

        // EventText is empty when the user has removed the mapping.
        if (filteredValue === "" && eventText !== "") return;
        const mapKey = props.events[mappingIndex];
        props.mappings.set(mapKey, filteredValue);
        const newMappings = new Map(props.mappings);
        if (props.setMappings) {
            props.setMappings(newMappings);
        }
    }

    function removeMapping(eventIndex: number): void {
        handleMappingChange("", eventIndex);
    }

    return (
        <div className="relative w-[60%] h-[92%] overflow-auto border-2 border-gray-300 p-5 rounded-md">
            <div className="flex flex-col overflow-auto log-table">
                {props.fileLines.map((event: string, i: number) => {
                    return <pre key={i} className="w-full py-2">{`Line ${i}: ` + event}      </pre>;
                })}

                <div className="absolute top-0 right-0 flex flex-col pt-5 bg-white mapping-container">
                    {props.fileLines.map((event: string, i: number) => {
                        return (
                            <div key={i} className="flex items-center justify-end gap-1 py-2 pr-1">
                                <input
                                    className="w-6 h-6 text-center border-2 border-gray-300 rounded-md"
                                    type="text"
                                    readOnly={props.mappingsAreEditable ? false : true}
                                    value={props.mappings.get(props.events[i]) || ''}
                                    onChange={(event) => {
                                        handleMappingChange(props.events[i], i);
                                    }}
                                />
                                {props.mappingsAreEditable ? (
                                    <svg
                                        onClick={() => {
                                            removeMapping(i);
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
                                ) : null }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LogTable;

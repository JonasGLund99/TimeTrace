import { useState } from "react";

function LogTable(props: LogTableProps) {
  const [mappings, setMapping] = useState<Map<string, string>>(new Map(props.events.map(event => [event, ""])));

  function handleMappingChange(eventText: string, mappingIndex: number): void {
    console.log([...props.events.map((val) => "")]);
    const inputValue = eventText;
    
    // Filter out characters that are not in the range of 'a' to 'y' || 'A' to 'Y'
    const lastChar = inputValue.slice(-1);
    const filteredValue = lastChar.search(/[a-yA-Y]/gi) === 0 ? lastChar : "";

    //eventText is empty when the user has removed the mapping.
    if (filteredValue === "" && eventText !== "") return;
    const mapKey = props.events[mappingIndex];
    mappings.set(mapKey, filteredValue);
    setMapping(new Map(mappings));
  };

  function removeMapping(event: React.MouseEvent<SVGSVGElement>): void {
  }



  return (
    <div className="overflow-auto log-table">
      {props.events.map((event: string, i: number) => {
        return (
            <div key={i} className="grid items-center grid-cols-6">
              <pre className="col-span-5">{event}</pre>
    
            {props.displaysMappings && (
              <div className="flex items-center justify-end">
                <input className="w-8 h-8 text-center border-2 border-gray-300 rounded-md"
                  type="text"
                  value={mappings.get(event)}
                  onChange={(event) => {
                    handleMappingChange(event.target.value, i);
                  }}
                />
                <svg onClick={(event) => {removeMapping(event)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export type LogTableProps = {
  displaysMappings: boolean | undefined;
  events: string[];
};

export default LogTable;

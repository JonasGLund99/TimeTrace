import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";

function MappedItemsList() {
    const { mappings, setMappings } = useContext(AppdataContext);

    function removeMapping(eventText: string): void {
        mappings.set(eventText, "")
        const newMappings = new Map(mappings);
        if (setMappings) {
            setMappings(newMappings);
        }
    }

    return (
        <div id="mappings-container" className="w-full h-full border-2 border-gray-300 rounded-lg">
            <div className="px-4 pt-2">
                <div className="grid grid-cols-12 gap-1 mb-2">
                    <p className="col-span-2 font-bold text-left">Map Value</p>
                    <p className="col-span-9 font-bold text-left">Event</p>
                    <p className="col-span-1 font-bold text-center">Del</p>
                </div>
                {Array.from(mappings).filter(([event, map]) => map !== "").map(([event, map]) => (
                    <div key={event} className="grid grid-cols-12 gap-1 mb-2 border-b last:border-none">
                        <p className="col-span-2">{map}</p>
                        <p className="col-span-9 truncate">{event}</p>
                        <div className="flex justify-center col-span-1">
                            <svg
                                onClick={() => {
                                    removeMapping(event)
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MappedItemsList
import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";
import Trashcan from "./svgs/Trashcan";
import { CustomMap } from "../models/Types/EventMapping";
import Button from "./button/Button";
import { ButtonStyle } from "./button/IButtonProps";
import Tooltip from "./tooltip/ToolTip";

function MappedItemsList() {
    const { mappings, setMappings } = useContext(AppdataContext);

    function removeMapping(eventText: string): void {
        mappings.remove(eventText)
        const newMappings = new CustomMap(mappings);
        if (setMappings) {
            setMappings(newMappings);
        }
    }

    return (
        <div id="mappings-container" className="w-full h-full border-2 border-gray-300 rounded-lg">
            <div className="px-4 pt-2">
                <div className="grid grid-cols-12 gap-1 mb-2">
                    <p className="col-span-2 font-bold text-left">Mapping</p>
                    <p className="col-span-9 font-bold text-left">Event</p>
                </div>
                {mappings.allMappings().map(([event, map]) => (
                    <div key={event} className="grid grid-cols-12 gap-1 mb-2 border-b last:border-none">
                        <p className="col-span-2">{map}</p>
                        <p className="col-span-9 truncate">{event}</p>
                        <div className="flex justify-center col-span-1">
                            <Button tooltip={`Remove mapping '${map}' from event '${event}'.`} buttonStyle={ButtonStyle.None} onClick={() => {removeMapping(event)}}>
                                    <Trashcan />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MappedItemsList
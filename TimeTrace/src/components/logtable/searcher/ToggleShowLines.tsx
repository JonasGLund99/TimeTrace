import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import { ShowLinesMode } from "../../../context/LogTableContext";
import Tooltip from "../../tooltip/ToolTip";

function ShowLineToggle() {

    const { shownLinesMode, setShownLinesMode } = useContext(LogTableContext);

    function handleShowFilterUpdate(e: string) {
        switch (e) {
            case "all":
                setShownLinesMode(ShowLinesMode.ALL)
                break;
            case "mapped":
                setShownLinesMode(ShowLinesMode.MAPPED)
                break;
            case "unmapped":
                setShownLinesMode(ShowLinesMode.UNMAPPED)
                break;
        }
    }


    return (
        <form className="mb-2">
                <Tooltip tooltip="Change which lines are shown from the file.">
                    <select className="block h-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                            handleShowFilterUpdate(e.target.value);
                        }
                    }>
                        <option value="all">Show All Lines</option>
                        <option value="mapped">Show Mapped Lines</option>
                        <option value="unmapped">Show Unmapped Lines</option>
                    </select>
                </Tooltip>
            </form>
    );
}

export default ShowLineToggle;

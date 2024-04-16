import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import { ShowLinesMode } from "../../../context/LogTableContext";


function ShowLineToggle() {

    const { shownLinesMode, setShownLinesMode } = useContext(LogTableContext);

    function handleShowFilterUpdate(e: ShowLinesMode) {
        setShownLinesMode(e)
    }

    return (
        <form className="mb-2">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8"
                onChange={(e) => {
                        handleShowFilterUpdate(e.target.value as ShowLinesMode);
                    }
                }>
                <option value={ShowLinesMode.ALL}>Show All Lines</option>
                <option value={ShowLinesMode.MAPPED}>Show Mapped Lines</option>
                <option value={ShowLinesMode.UNMAPPED}>Show Unmapped Lines</option>
            </select>
        </form>
    );
}

export default ShowLineToggle;

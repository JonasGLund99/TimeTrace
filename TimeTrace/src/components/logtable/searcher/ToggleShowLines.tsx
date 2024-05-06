import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import { ShowLinesMode } from "../../../context/LogTableContext";

function ShowLineToggle() {
    const { setShownLinesMode } = useContext(LogTableContext);

    function handleShowFilterUpdate(e: ShowLinesMode) {
        setShownLinesMode(e)
    }

    return (
        <form className="mb-2">
            <select className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-time-trace focus:border-time-trace"
                onChange={(e) => {
                    handleShowFilterUpdate(e.target.value as ShowLinesMode);
                }}>
                <option value={ShowLinesMode.ALL}>Show All Lines</option>
                <option value={ShowLinesMode.MAPPED}>Show Mapped Lines</option>
                <option value={ShowLinesMode.UNMAPPED}>Show Unmapped Lines</option>
            </select>
        </form>
    );
}

export default ShowLineToggle;

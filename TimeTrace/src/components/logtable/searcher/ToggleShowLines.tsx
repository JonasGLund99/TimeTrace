import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import { ShowLinesMode } from "../../../context/LogTableContext";

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
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8"
                onChange={(e) => {
                        handleShowFilterUpdate(e.target.value);
                    }
                }>
                <option selected value="all">Show All Lines</option>
                <option value="mapped">Show Mapped Lines</option>
                <option value="unmapped">Show Unmapped Lines</option>
            </select>
        </form>
    );
}

export default ShowLineToggle;
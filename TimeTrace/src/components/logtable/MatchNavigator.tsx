import { useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { LogTableContext } from "../../context/LogTableContext";

interface MatchNavigatorProps {
    linesPerPage: number;
}

function MatchNavigator({linesPerPage}: MatchNavigatorProps) {
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const { currentPage, setCurrentPage } = useContext(LogTableContext);
    const { setShownLines } = useContext(LogTableContext);
    const { filteredFileLines } = useContext(LogTableContext);
    const { matches } = useContext(AppdataContext);
    

    function handlePreviousMatchClick() {
        const prevIndex = monaaMatchIndex === 0 ? 0 : monaaMatchIndex - 1;
        setMonaaMatchIndex(prevIndex)
    }

    function handeNextMatchClick() {
        const nextIndex: number = monaaMatchIndex === matches.length - 1 ? monaaMatchIndex : monaaMatchIndex + 1;
        const endOfMatchIndex: number = matches[nextIndex].lineMatches[matches[nextIndex].lineMatches.length - 1];

        if (endOfMatchIndex > currentPage * linesPerPage) {
            // If the end of the match is outside the currently shown lines
            const necessaryPages: number = Math.ceil(endOfMatchIndex / linesPerPage);
            
            // Render necessary pages
            setShownLines(shownLines => [...shownLines, ...(filteredFileLines.slice(linesPerPage * currentPage, linesPerPage * necessaryPages))]);
            setCurrentPage(necessaryPages);
        }
        setMonaaMatchIndex(nextIndex);
    }

    return (
        <div id="matches-buttons" className="mt-4 w-full h-[10%] flex flex-row justify-center items-center gap-20 ">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 "
                onClick={() => { handlePreviousMatchClick() }}>
                Previous match
            </button>
            <pre id="monaa-match-input" className="text-gray-800 ">
                {/* TODO:
                <input
                    className="text-right "
                    type="number"
                    name="matchIndex"
                    id=""
                    value={monaaMatchIndex + 1}
                    min={1}
                    max={matches.length}
                    onChange={(e) => {
                        setMonaaMatchIndex((e.target.value as unknown as number) - 1);
                    }} /> */}
                {monaaMatchIndex + 1} / {matches.length}
            </pre>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700"
                onClick={() => handeNextMatchClick()}>
                Next match
            </button>
        </div>
    );
}

export default MatchNavigator;
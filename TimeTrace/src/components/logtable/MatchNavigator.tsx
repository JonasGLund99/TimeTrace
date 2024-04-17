import { useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { LogTableContext } from "../../context/LogTableContext";
import Button from "../button/Button";

interface MatchNavigatorProps {
    linesPerPage: number;
}

function MatchNavigator({ linesPerPage }: MatchNavigatorProps) {
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const { currentPageSpan, setCurrentPageSpan } = useContext(LogTableContext);
    const { setShownLines } = useContext(LogTableContext);
    const { filteredFileLines } = useContext(LogTableContext);
    const { matches } = useContext(AppdataContext);

    function handlePreviousMatchClick() {
        const prevIndex = monaaMatchIndex === 0 ? 0 : monaaMatchIndex - 1;
        const startOfMatchIndex: number = matches[prevIndex].lineMatches[0];
        const endOfMatchIndex: number = matches[prevIndex].lineMatches[matches[prevIndex].lineMatches.length - 1];

        if (startOfMatchIndex < currentPageSpan.min * linesPerPage) {
            const endOfRender = Math.ceil(endOfMatchIndex / linesPerPage);
            const startOfRender = Math.floor(startOfMatchIndex / linesPerPage); 
            setShownLines([...(filteredFileLines.slice(linesPerPage * startOfRender, linesPerPage * endOfRender))]);
            setCurrentPageSpan({ min: startOfRender, max: endOfRender });
        }
        setMonaaMatchIndex(prevIndex)
    }

    function handeNextMatchClick() {
        const nextIndex: number = monaaMatchIndex === matches.length - 1 ? monaaMatchIndex : monaaMatchIndex + 1;
        const startOfMatchIndex: number = matches[nextIndex].lineMatches[0];
        const endOfMatchIndex: number = matches[nextIndex].lineMatches[matches[nextIndex].lineMatches.length - 1];

        if (endOfMatchIndex > currentPageSpan.max * linesPerPage) {
            // If the end of the match is outside the currently shown lines
            const endOfRender = Math.ceil(endOfMatchIndex / linesPerPage);
            const startOfRender = Math.floor(startOfMatchIndex / linesPerPage); 

            // Only render necessary pages
            setShownLines([...(filteredFileLines.slice(linesPerPage * startOfRender, linesPerPage * endOfRender))]);
            setCurrentPageSpan({ min: startOfRender, max: endOfRender });
        }
        setMonaaMatchIndex(nextIndex);
    }

    return (
        <div id="matches-buttons" className="mt-4 w-full h-[10%] flex flex-row justify-center items-center gap-20 ">
            <Button style={{style: 'px-4 py-2'}} onClick={() => { handlePreviousMatchClick() }}>Previous match</Button>
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
            <Button style={{style: 'px-4 py-2'}}
                onClick={() => handeNextMatchClick()}>
                Next match
            </Button>
        </div>
    );
}

export default MatchNavigator;
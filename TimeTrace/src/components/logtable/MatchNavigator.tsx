import { useContext, useEffect } from "react";
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

    function handleNewMatchIndex(newMatchIndex: number) {
        if (newMatchIndex < 0) {
            newMatchIndex = 0;
        } else if (newMatchIndex > matches.length - 1) {
            newMatchIndex = matches.length - 1;
        }

        const minPage = 0;
        const maxPage = Math.ceil(filteredFileLines.length / linesPerPage);
        const startOfMatchIndex = matches[newMatchIndex].lineMatches[0];
        const endOfMatchIndex = matches[newMatchIndex].lineMatches[matches[newMatchIndex].lineMatches.length - 1];
        const startOfRender = Math.floor(startOfMatchIndex / linesPerPage) === minPage ? minPage : Math.floor(startOfMatchIndex / linesPerPage) - 1;
        const endOfRender = Math.ceil(endOfMatchIndex / linesPerPage) === maxPage ? maxPage : Math.ceil(endOfMatchIndex / linesPerPage) + 1;
        if (startOfRender < currentPageSpan.min || endOfRender > currentPageSpan.max) {
            setShownLines(filteredFileLines.slice(linesPerPage * startOfRender, linesPerPage * endOfRender));
            setCurrentPageSpan({ min: startOfRender, max: endOfRender });
        }
        setMonaaMatchIndex(newMatchIndex);
    }

    return (
        <div id="matches-buttons" className="mt-4 w-full h-[10%] flex flex-row justify-center items-center gap-20 ">
            <Button style={{ style: 'px-4 py-2' }} onClick={() => { handleNewMatchIndex(monaaMatchIndex - 1) }}>
                Previous match
            </Button>
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
                {monaaMatchIndex + 1} of {matches.length}
            </pre>
            <Button style={{ style: 'px-4 py-2' }}
                onClick={() => handleNewMatchIndex(monaaMatchIndex + 1)}>
                Next match
            </Button>
        </div>
    );
}

export default MatchNavigator;
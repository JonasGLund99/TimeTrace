import { useContext } from "react";
import { LogTableContext } from "../../context/LogTableContext";
import Button from "../button/Button";
import { calcStartEndOfRender } from "../../models/helpers/scrollLogTable";

interface MatchNavigatorProps {
    linesPerPage: number;
}

function MatchNavigator({ linesPerPage }: MatchNavigatorProps) {
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const { currentPageSpan, setCurrentPageSpan } = useContext(LogTableContext);
    const { setShownLines } = useContext(LogTableContext);
    const { filteredFileLines } = useContext(LogTableContext);
    const { matches } = useContext(LogTableContext);

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
        const renderObj = calcStartEndOfRender(minPage, maxPage, startOfMatchIndex, endOfMatchIndex, linesPerPage);
        const matchIsOutsideCurrentPageSpan = renderObj.startOfRender < currentPageSpan.min || renderObj.endOfRender > currentPageSpan.max;
       
        if (matchIsOutsideCurrentPageSpan) {
            setShownLines(filteredFileLines.slice(linesPerPage * renderObj.startOfRender, linesPerPage * renderObj.endOfRender));
            setCurrentPageSpan({ min: renderObj.startOfRender, max: renderObj.endOfRender });
        }
        setMonaaMatchIndex(newMatchIndex);
    }

    return (
        <div id="matches-buttons" className="mt-4 w-full h-[10%] flex flex-row justify-center items-center gap-20 ">
            <Button style={{ style: 'px-4 py-2' }} onClick={() => { handleNewMatchIndex(monaaMatchIndex - 1) }}>
                Previous match
            </Button>
            <pre id="monaa-match-input" className="text-gray-800 ">
                <input
                    className="text-right "
                    type="number"
                    name="matchIndex"
                    id=""
                    value={monaaMatchIndex + 1}
                    min={1}
                    max={matches.length}
                    onChange={(e) => {
                        handleNewMatchIndex((e.target.value as unknown as number) - 1);
                    }} />
                of {matches.length}
            </pre>
            <Button style={{ style: 'px-4 py-2' }}
                onClick={() => handleNewMatchIndex(monaaMatchIndex + 1)}>
                Next match
            </Button>
        </div>
    );
}

export default MatchNavigator;
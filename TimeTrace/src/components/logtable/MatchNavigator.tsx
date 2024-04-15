import { useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { LogTableContext } from "../../context/LogTableContext";
import { ButtonType } from '../button/IButtonProps';
import Button from "../button/Button";

interface MatchNavigatorProps {
    linesPerPage: number;
}

function MatchNavigator({linesPerPage}: MatchNavigatorProps) {
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const { currentPage, setCurrentPage } = useContext(LogTableContext);
    const { matches } = useContext(AppdataContext);

    function handeNextMatchClick() {
        const nextIndex: number = monaaMatchIndex === matches.length - 1 ? monaaMatchIndex : monaaMatchIndex + 1;
        const endOfMatchIndex: number | undefined = matches[nextIndex]?.lineMatches[matches[nextIndex]?.lineMatches.length - 1];

        if (endOfMatchIndex !== undefined && endOfMatchIndex > currentPage * linesPerPage) {
            // If the end of the match is outside the currently shown lines
            const necessaryPages: number = Math.ceil(endOfMatchIndex / linesPerPage);
            const missingPages: number = necessaryPages - currentPage;
            // Render missing pages until necessary pages are loaded
            for (let i = 0; i < missingPages; i++) {
                setCurrentPage(currentPage + 1);
            }
        }
        setMonaaMatchIndex(nextIndex);
    }

    return (
        <div id="matches-buttons" className="mt-4 w-full h-[10%] flex flex-row justify-center items-center gap-20 ">
            <Button buttonType={ButtonType.Standard} style={{style: 'px-4 py-2'}} onClick={() => { setMonaaMatchIndex(monaaMatchIndex === 0 ? 0 : monaaMatchIndex - 1) }}>Previous match</Button>
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
            <Button buttonType={ButtonType.Standard} style={{style: 'px-4 py-2'}}
                onClick={() => handeNextMatchClick()}>
                Next match
            </Button>
        </div>
    );
}

export default MatchNavigator;
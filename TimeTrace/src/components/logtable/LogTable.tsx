import { useState, useEffect, useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { FileLine, mapEventsToFileLine } from '../../models/Types/FileLine';
import { LogTableContext } from "../../context/LogTableContext";
import MatchNavigator from "./MatchNavigator";
import MappingInputs from "./MappingInputs";
import LineContents from "./LineContents";
import LineNumbers from "./LineNumbers";
import Searcher from "./searcher/Searcher";
import { filterAllMappedUnmappedLines } from "../../models/helpers/filterLinesBasedOnShowMode";

interface LogTableProps {
    mappingsAreEditable: boolean;
}

function LogTable({ mappingsAreEditable }: LogTableProps) {
    const { events } = useContext(AppdataContext);
    const { mappings } = useContext(AppdataContext);
    const { fileLines } = useContext(AppdataContext);
    const { matches } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { currentPageSpan, setCurrentPageSpan } = useContext(LogTableContext);
    const { advancedSearchMode } = useContext(LogTableContext);
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const { filteredFileLines, setFilteredFileLines } = useContext(LogTableContext);
    const { shownLines, setShownLines } = useContext(LogTableContext);
    const { linesPerPage } = useContext(LogTableContext);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { shownLinesMode, setShownLinesMode } = useContext(LogTableContext);

    useEffect(() => {
        setFilteredFileLines(mapEventsToFileLine(events));
    }, [events]);

    useEffect(() => {
        setShownLines(filteredFileLines.slice(0, linesPerPage));
        setCurrentPageSpan({ min: 0, max: 1 });
        const logTable = document.querySelector("#log-table");
        if (logTable) logTable.scrollTo({ top: 0, behavior: 'smooth' });
    }, [filteredFileLines]);

    useEffect(() => {
        setMonaaMatchIndex(0);
    }, [matches])

    useEffect(() => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;

        const firstMappedLineMatched = document.querySelector(".mapped-line") as HTMLElement;
        const firstUnmappedLineMatched = document.querySelector(".unmapped-line") as HTMLElement;

        let lineToScrollTo: HTMLElement;
        if (!firstMappedLineMatched && !firstUnmappedLineMatched) return;

        if (!firstMappedLineMatched) {
            lineToScrollTo = firstUnmappedLineMatched;
        }
        else if (!firstUnmappedLineMatched) {
            lineToScrollTo = firstMappedLineMatched;
        }
        else {
            lineToScrollTo = firstMappedLineMatched.offsetTop < firstUnmappedLineMatched.offsetTop ? firstMappedLineMatched : firstUnmappedLineMatched;
        }
        logTable.scrollTo({ top: lineToScrollTo.offsetTop });
    }, [monaaMatchIndex]);

    useEffect(() => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;
        logTable.addEventListener('scroll', handleScroll);
        return () => {
            logTable.removeEventListener('scroll', handleScroll);
        };
    }, [currentPageSpan]);

    useEffect(() => {
        setFilteredFileLines(filterAllMappedUnmappedLines(mapEventsToFileLine(events), shownLinesMode, mappings))
    }, [shownLinesMode])

    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(filterAllMappedUnmappedLines(mapEventsToFileLine(events), shownLinesMode, mappings));
            return;
        };

        if (advancedSearchMode) {
            searchUsingRegex(query)
        } else {
            searchStandard(query)
        }
    }

    function searchStandard(query: string) {
        let filteredFileLines: FileLine[] = [];

        fileLines.filter((fileLine, index) => {
            const isAMatch: boolean = fileLine.toLowerCase().includes(query.toLowerCase());
            if (!isAMatch) return false;
            filteredFileLines.push({ text: events[index], line: index });
            return true;
        });
        filteredFileLines = filterAllMappedUnmappedLines(filteredFileLines, shownLinesMode, mappings)
        setFilteredFileLines(filteredFileLines);
    }

    function searchUsingRegex(query: string) {
        let regex: RegExp
        try {
            regex = new RegExp(query);
        } catch (e) {
            setError({
                title: "Error trying to interpret regex",
                errorString: "Regex error <br/><br/>" + e,
                callback: null,
                callbackTitle: null,
                isDismissible: true
            })
            return
        }

        let filteredFileLines: FileLine[] = [];
        fileLines.forEach((fileLine, index) => {
            if (regex.test(fileLine)) {
                filteredFileLines.push({ text: events[index], line: index });
            }
        });
        filteredFileLines = filterAllMappedUnmappedLines(filteredFileLines, shownLinesMode, mappings)
        setFilteredFileLines(filteredFileLines);
    }

    const handleScroll = () => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;
        const scrollY = logTable.scrollTop;
        const windowHeight = logTable.clientHeight;
        const fullHeight = logTable.scrollHeight;
        const scrollOffset = 100;
        const scrollBottom: boolean = scrollY + windowHeight >= fullHeight - scrollOffset;
        const scrollTop: boolean = scrollY <= scrollOffset;
        
        if (scrollBottom) {
            const nextPage = currentPageSpan.max + 1;
            setShownLines(shownLines => [...shownLines, ...(filteredFileLines.slice(linesPerPage * currentPageSpan.max, linesPerPage * nextPage))]);
            setCurrentPageSpan({
                min: currentPageSpan.min,
                max: nextPage
            });
        }
        else if (scrollTop) {
            if (currentPageSpan.min === 0) return;
            const prevPage = currentPageSpan.min - 1;
            const container = logTable.querySelector("#linecontents-container") as HTMLElement;
            if (!container) return;
            const topLine = container.firstElementChild as HTMLElement;
            setShownLines(filteredFileLines.slice(linesPerPage * prevPage, linesPerPage * currentPageSpan.max));
            logTable.scrollTo({ top: (topLine.offsetHeight * linesPerPage + scrollOffset) });
            setCurrentPageSpan({
                min: prevPage,
                max: currentPageSpan.max
            });
        }
    };

    function lineIsHighlighted(line: number): boolean {
        if (mappingsAreEditable || !matches[monaaMatchIndex]) return false;
        let highlightLine = false;

        matches[monaaMatchIndex].lineMatches.forEach(match => {
            if (match === line) highlightLine = true;
        });
        return highlightLine;
    }

    function eventIsMapped(fileLine: FileLine) {
        let isMapped = false;

        if (mappings.get(fileLine.text, fileLines[fileLine.line])) {
            isMapped = true;
        }
        return isMapped;
    }

    return (
        <div id="fixed-container" className="flex flex-col content-center w-full h-full">
            <div id="top-log-table-title-container" className="flex p-1">
                <Searcher searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog} mappingsAreEditable={mappingsAreEditable} />
            </div>
            <div id="log-table" className="relative flex h-full pt-0 overflow-auto border-2 border-gray-300 rounded-md">
                <LineNumbers lineIsHighlighted={lineIsHighlighted} shownLines={shownLines} eventIsMapped={eventIsMapped} />
                <LineContents lineIsHighlighted={lineIsHighlighted} fileLines={fileLines} shownLines={shownLines} eventIsMapped={eventIsMapped} filteredFileLines={filteredFileLines} />
                <MappingInputs lineIsHighlighted={lineIsHighlighted} shownLines={shownLines} eventIsMapped={eventIsMapped} mappingsAreEditable={mappingsAreEditable} fileLines={fileLines} />
            </div>
            {!mappingsAreEditable && matches.length > 0 &&
                <MatchNavigator linesPerPage={linesPerPage} />
            }
        </div>
    );
}

export default LogTable;

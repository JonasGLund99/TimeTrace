import { useState, useEffect, useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { FileLine, mapEventsToFileLine } from '../../models/Types/FileLine';
import { LogTableContext } from "../../context/LogTableContext";
import MatchNavigator from "./MatchNavigator";
import MappingInputs from "./MappingInputs";
import LineContents from "./LineContents";
import LineNumbers from "./LineNumbers";
import Searcher from "./searcher/Searcher";

interface LogTableProps {
    mappingsAreEditable: boolean;
}

function LogTable({ mappingsAreEditable }: LogTableProps) {
    const { events } = useContext(AppdataContext);
    const { mappings } = useContext(AppdataContext);
    const { fileLines } = useContext(AppdataContext);
    const { matches } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { currentPage, setCurrentPage } = useContext(LogTableContext);
    const { advancedSearchMode } = useContext(LogTableContext);
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const { filteredFileLines, setFilteredFileLines } = useContext(LogTableContext);
    const { shownLines, setShownLines } = useContext(LogTableContext);
    const { linesPerPage } = useContext(LogTableContext)
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        setFilteredFileLines(mapEventsToFileLine(events));
    }, [events]);

    useEffect(() => {
        setShownLines(filteredFileLines.slice(0, linesPerPage));
        setCurrentPage(0);
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

        let lineToScrollTo : HTMLElement;
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
        logTable.scrollTo({ top: lineToScrollTo.offsetTop, behavior: 'smooth' });
    }, [monaaMatchIndex]);

    useEffect(() => {
        if (currentPage !== 0) {
            setShownLines(shownLines => [...shownLines, ...(filteredFileLines.slice(linesPerPage * currentPage, linesPerPage * (currentPage + 1)))]);
        }
    }, [currentPage]);

    useEffect(() => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;
        logTable.addEventListener('scroll', handleScroll);
        return () => {
            logTable.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]);

    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(mapEventsToFileLine(events));
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

        setFilteredFileLines(filteredFileLines);
    }

    function searchUsingRegex(query: string) {
        let regex: RegExp
        try {
            regex = new RegExp(query); 
        } catch(e) {
            setError({
                title: "Error trying to interpret regex",
                errorString: "Regex error <br/><br/>" + e,
                callback: null,
                callbackTitle: null,
                is_dismissible: true
            })
            return
        }
        
        let filteredFileLines: FileLine[] = [];
        fileLines.forEach((fileLine, index) => {
            if (regex.test(fileLine)) {
                filteredFileLines.push({ text: events[index], line: index });
            }
        });

        setFilteredFileLines(filteredFileLines);
    }

    const handleScroll = () => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;
        const scrollY = logTable.scrollTop;
        const windowHeight = logTable.clientHeight;
        const fullHeight = logTable.scrollHeight;
        if (scrollY + windowHeight >= fullHeight - 100) {
            setCurrentPage(currentPage + 1);
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
                <div id="search-container" className="flex flex-col content-center w-full">
                    <Searcher searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog} mappingsAreEditable={mappingsAreEditable} />
                </div>
            </div>
            <div id="log-table" className="relative flex h-full pt-0 overflow-auto border-2 border-gray-300 rounded-md">
                <LineNumbers lineIsHighlighted={lineIsHighlighted} shownLines={shownLines} eventIsMapped={eventIsMapped} />
                <LineContents lineIsHighlighted={lineIsHighlighted} fileLines={fileLines} shownLines={shownLines} eventIsMapped={eventIsMapped} filteredFileLines={filteredFileLines} />
                <MappingInputs lineIsHighlighted={lineIsHighlighted} shownLines={shownLines} eventIsMapped={eventIsMapped} mappingsAreEditable={mappingsAreEditable} fileLines={fileLines}/>
            </div>
            {!mappingsAreEditable && matches.length > 0 &&
                <MatchNavigator linesPerPage={linesPerPage} />
            }
        </div>
    );
}

export default LogTable;

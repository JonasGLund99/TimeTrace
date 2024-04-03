import { useState, useEffect, useContext } from "react";
import { AppdataContext } from "../../context/AppContext";
import { FileLine, mapEventsToFileLine } from '../../models/Types/FileLine';
import { LogTableContext } from "../../context/LogTableContext";
import MatchNavigator from "./MatchNavigator";
import MappingInputs from "./MappingInputs";
import LineContents from "./LineContents";
import LineNumbers from "./LineNumbers";
import Searcher from "./Searcher";

interface LogTableProps {
    mappingsAreEditable: boolean;
}

function LogTable({ mappingsAreEditable }: LogTableProps) {
    const { events } = useContext(AppdataContext);
    const { mappings, setMappings } = useContext(AppdataContext);
    const { fileLines } = useContext(AppdataContext);
    const { matches } = useContext(AppdataContext);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { currentPage, setCurrentPage } = useContext(LogTableContext);
    const { monaaMatchIndex, setMonaaMatchIndex } = useContext(LogTableContext);
    const [filteredFileLines, setFilteredFileLines] = useState<FileLine[]>(mapEventsToFileLine(events));
    const linesPerPage = 100;
    const [shownLines, setShownLines] = useState<FileLine[]>(filteredFileLines.slice(0, linesPerPage));

    useEffect(() => {
        setFilteredFileLines(mapEventsToFileLine(events));
    }, [events]);

    useEffect(() => {
        setShownLines(filteredFileLines.slice(0, linesPerPage));
        setCurrentPage(0);
        const logTable = document.querySelector("#log-table");
        if (logTable) logTable.scrollTo({top: 0, behavior: 'smooth'});
    }, [filteredFileLines]);

    useEffect(() => {
        setMonaaMatchIndex(0);
    }, [matches])

    useEffect(() => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;

        const firstLineMatched = document.querySelector(".bg-yellow-200") as HTMLElement;
        if (!firstLineMatched) return;

        if (firstLineMatched) logTable.scrollTo({top: firstLineMatched.offsetTop, behavior: 'smooth'});
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

        let filteredFileLines: FileLine[] = [];

        fileLines.filter((fileLine, index) => {
            const isAMatch: boolean = fileLine.toLowerCase().includes(query.toLowerCase());
            if (!isAMatch) return false;
            filteredFileLines.push({ text: events[index], line: index });
            return true;
        });

        setFilteredFileLines(filteredFileLines);
    }

    const handleScroll = () => {
        const logTable = document.querySelector("#log-table");
        if (!logTable) return;
        const scrollY = logTable.scrollTop;
        const windowHeight = logTable.clientHeight;
        const documentHeight = logTable.scrollHeight;
        if (scrollY + windowHeight >= documentHeight - 100) {
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

    function eventIsMapped(eventText: string) {
        let isMapped = false;

        if (mappings.get(eventText)) {
            isMapped = true;
        }
        return isMapped;
    }

    return (
        <div id="fixed-container" className="flex flex-col content-center w-full h-full">
            <div id="top-log-table-title-container" className="flex p-1">
                <h2 className="font-bold text-md w-[20%]">Event</h2>
                <div id="search-container" className="flex flex-col content-center w-[60%]">
                    <h2 className="font-bold text-md">Search for event</h2>
                    <Searcher searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog}/>
                </div>
                <h2 className="font-bold justify-self-end text-end text-md w-[20%]">Mapped value</h2>
            </div>
            <div id="log-table" className="relative flex h-full pt-0 overflow-auto border-2 border-gray-300 rounded-md">
                <LineNumbers lineIsHighlighted={lineIsHighlighted} shownLines={shownLines} eventIsMapped={eventIsMapped} mappingsAreEditable={mappingsAreEditable}/>
                <LineContents lineIsHighlighted={lineIsHighlighted} fileLines={fileLines} shownLines={shownLines} eventIsMapped={eventIsMapped} mappingsAreEditable={mappingsAreEditable} filteredFileLines={filteredFileLines}/>
                <MappingInputs lineIsHighlighted={lineIsHighlighted} linesPerPage={linesPerPage} shownLines={shownLines} eventIsMapped={eventIsMapped} mappingsAreEditable={mappingsAreEditable}/>
            </div>
            {!mappingsAreEditable && matches.length > 0 && 
                <MatchNavigator linesPerPage={linesPerPage}/>
            }
        </div>
    );
}

export default LogTable;

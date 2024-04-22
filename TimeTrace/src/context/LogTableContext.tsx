import { useContext, createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";
import { FileLine } from "../models/FileLine";
import { mapEventsToFileLine } from "../models/Types/FileLine";
import { AppdataContext } from "./AppContext";
import { MonaaZone } from "../models/MonaaZone";

interface PageSpan {
    min: number;
    max: number;
}

export enum ShowLinesMode {
    ALL = "all",
    MAPPED = "mapped",
    UNMAPPED = "unmapped",
}

export type LogTableContextInterface = {
    matches: MonaaZone[];
    setMatches: React.Dispatch<React.SetStateAction<MonaaZone[]>>;
    monaaMatchIndex: number;
    setMonaaMatchIndex: Dispatch<SetStateAction<number>>;
    currentPageSpan: PageSpan;
    setCurrentPageSpan: Dispatch<SetStateAction<PageSpan>>;
    advancedSearchMode: boolean;
    setAdvancedSearchMode: Dispatch<SetStateAction<boolean>>;
    shownLines: FileLine[];
    setShownLines: Dispatch<SetStateAction<FileLine[]>>;
    shownLinesMode: ShowLinesMode;
    setShownLinesMode: Dispatch<SetStateAction<ShowLinesMode>>;
    filteredFileLines: FileLine[];
    setFilteredFileLines: Dispatch<SetStateAction<FileLine[]>>;
    linesPerPage: number;
}

const defaultState: LogTableContextInterface = {
    matches: [],
    setMatches: () => { },
    monaaMatchIndex: -1,
    setMonaaMatchIndex: () => { },
    currentPageSpan: { min: 0, max: 1 },
    setCurrentPageSpan: () => { },
    advancedSearchMode: false,
    setAdvancedSearchMode: () => { },
    shownLines: [],
    setShownLines: () => { },
    shownLinesMode: ShowLinesMode.ALL,
    setShownLinesMode: () => { },
    filteredFileLines: [],
    setFilteredFileLines: () => { },
    linesPerPage: 100,
} as LogTableContextInterface;

export const LogTableContext = createContext<LogTableContextInterface>(defaultState);

type LogTableProviderProps = {
    children: ReactNode
}

export default function LogTableProvider({ children }: LogTableProviderProps) {
    const [matches, setMatches] = useState<MonaaZone[]>([]);
    const [monaaMatchIndex, setMonaaMatchIndex] = useState<number>(-1);
    const [currentPageSpan, setCurrentPageSpan] = useState<PageSpan>({ min: 0, max: 1 });
    const [advancedSearchMode, setAdvancedSearchMode] = useState(false);
    const { events } = useContext(AppdataContext);
    const [filteredFileLines, setFilteredFileLines] = useState<FileLine[]>(mapEventsToFileLine(events));
    const linesPerPage = 100;
    const [shownLines, setShownLines] = useState<FileLine[]>(filteredFileLines.slice(0, linesPerPage));
    const [shownLinesMode, setShownLinesMode] = useState<ShowLinesMode>(ShowLinesMode.ALL);

    return (
        < LogTableContext.Provider value={{ matches, setMatches, monaaMatchIndex, setMonaaMatchIndex, currentPageSpan, setCurrentPageSpan, advancedSearchMode, setAdvancedSearchMode, filteredFileLines, setFilteredFileLines, shownLines, setShownLines, shownLinesMode, setShownLinesMode, linesPerPage }}>
            {children}
        </LogTableContext.Provider>
    );
}
import { createContext, ReactNode, useContext, useState } from "react";
import { FileLine } from "../models/FileLine";
import { mapEventsToFileLine } from "../models/Types/FileLine";
import { AppdataContext } from "./AppContext";

interface PageSpan {
    min: number;
    max: number;
}

export type LogTableContextInterface = {
    monaaMatchIndex: number;
    setMonaaMatchIndex: React.Dispatch<React.SetStateAction<number>>;
    currentPageSpan: PageSpan;
    setCurrentPageSpan: React.Dispatch<React.SetStateAction<PageSpan>>;
    advancedSearchMode: boolean;
    setAdvancedSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
    shownLines: FileLine[];
    setShownLines: React.Dispatch<React.SetStateAction<FileLine[]>>;
    filteredFileLines: FileLine[];
    setFilteredFileLines: React.Dispatch<React.SetStateAction<FileLine[]>>;
    linesPerPage: number;
}
const defaultState = {
    monaaMatchIndex: -1,
    setMonaaMatchIndex: (monaaMatchIndex: number) => { },
    currentPageSpan: { min: 0, max: 1 },
    setCurrentPageSpan: (currentPageSpan: PageSpan) => { },
    advancedSearchMode: false,
    setAdvancedSearchMode: (advancedMode: boolean) => { },
    shownLines: [],
    setShownLines: (shownLines: FileLine[]) => { },
    filteredFileLines: [],
    setFilteredFileLines: (filteredFileLines: FileLine[]) => { },
    linesPerPage: 100
} as LogTableContextInterface;

export const LogTableContext = createContext<LogTableContextInterface>(defaultState);

type LogTableProviderProps = {
    children: ReactNode
}

export default function LogTableProvider({ children }: LogTableProviderProps) {
    const [monaaMatchIndex, setMonaaMatchIndex] = useState<number>(-1);
    const [currentPageSpan, setCurrentPageSpan] = useState<PageSpan>({ min: 0, max: 1 });
    const [advancedSearchMode, setAdvancedSearchMode] = useState(false);
    const { events } = useContext(AppdataContext);
    const [filteredFileLines, setFilteredFileLines] = useState<FileLine[]>(mapEventsToFileLine(events));
    const linesPerPage = 100;
    const [shownLines, setShownLines] = useState<FileLine[]>(filteredFileLines.slice(0, linesPerPage));

    return (
        < LogTableContext.Provider value={{ monaaMatchIndex, setMonaaMatchIndex, currentPageSpan, setCurrentPageSpan, advancedSearchMode, setAdvancedSearchMode, filteredFileLines, setFilteredFileLines, shownLines, setShownLines, linesPerPage }}>
            {children}
        </ LogTableContext.Provider>
    );
}
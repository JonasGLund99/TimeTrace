import { createContext, ReactNode, useContext, useState } from "react";
import { FileLine } from "../models/FileLine";
import { mapEventsToFileLine } from "../models/Types/FileLine";
import { AppdataContext } from "./AppContext";

export type LogTableContextInterface = {
    monaaMatchIndex: number;
    setMonaaMatchIndex: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
    currentPage: 0,
    setCurrentPage: (currentPage: number) => { },
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
    const [currentPage, setCurrentPage] = useState(0);
    const [advancedSearchMode, setAdvancedSearchMode] = useState(false);
    const { events } = useContext(AppdataContext);
    const [filteredFileLines, setFilteredFileLines] = useState<FileLine[]>(mapEventsToFileLine(events));
    const linesPerPage = 100;
    const [shownLines, setShownLines] = useState<FileLine[]>(filteredFileLines.slice(0, linesPerPage));

    return (
        < LogTableContext.Provider value={{ monaaMatchIndex, setMonaaMatchIndex, currentPage, setCurrentPage, advancedSearchMode, setAdvancedSearchMode, filteredFileLines, setFilteredFileLines, shownLines, setShownLines, linesPerPage }}>
            {children}
        </ LogTableContext.Provider>
    );
}
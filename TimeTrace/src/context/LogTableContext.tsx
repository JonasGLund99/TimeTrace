import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

export enum ShowLinesMode {
    ALL = "all",
    MAPPED = "mapped",
    UNMAPPED = "unmapped",
}

export type LogTableContextInterface = {
    monaaMatchIndex: number;
    setMonaaMatchIndex: Dispatch<SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    advancedSearchMode: boolean;
    setAdvancedSearchMode: Dispatch<SetStateAction<boolean>>;
    shownLinesMode: ShowLinesMode;
    setShownLinesMode: Dispatch<SetStateAction<ShowLinesMode>>;
}

const defaultState: LogTableContextInterface = {
    monaaMatchIndex: -1,
    setMonaaMatchIndex: () => { },
    currentPage: 0,
    setCurrentPage: () => { }, 
    advancedSearchMode: false,
    setAdvancedSearchMode: () => { }, 
    shownLinesMode: ShowLinesMode.ALL,
    setShownLinesMode: () => { } 
};

export const LogTableContext = createContext<LogTableContextInterface>(defaultState);

type LogTableProviderProps = {
    children: ReactNode
}

export default function LogTableProvider({ children }: LogTableProviderProps) {
    const [monaaMatchIndex, setMonaaMatchIndex] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [advancedSearchMode, setAdvancedSearchMode] = useState<boolean>(false);
    const [shownLinesMode, setShownLinesMode] = useState<ShowLinesMode>(ShowLinesMode.ALL);

    return (
        <LogTableContext.Provider value={{ monaaMatchIndex, setMonaaMatchIndex, currentPage, setCurrentPage, advancedSearchMode, setAdvancedSearchMode, shownLinesMode, setShownLinesMode }}>
            {children}
        </LogTableContext.Provider>
    );
}
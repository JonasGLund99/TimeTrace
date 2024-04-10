import { createContext, ReactNode, useState } from "react";

export type LogTableContextInterface = {
    monaaMatchIndex: number;
    setMonaaMatchIndex: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    advancedSearchMode: boolean;
    setAdvancedSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultState = {
    monaaMatchIndex: -1,
    setMonaaMatchIndex: (monaaMatchIndex: number) => { },
    currentPage: 0,
    setCurrentPage: (currentPage: number) => { },
    advancedSearchMode: false,
    setAdvancedSearchMode: (advancedMode: boolean) => { }
} as LogTableContextInterface;

export const LogTableContext = createContext<LogTableContextInterface>(defaultState);

type LogTableProviderProps = {
    children: ReactNode
}

export default function LogTableProvider({ children }: LogTableProviderProps) {
    const [monaaMatchIndex, setMonaaMatchIndex] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState(0);
    const [advancedSearchMode, setAdvancedSearchMode] = useState(false);

    return (
        < LogTableContext.Provider value={{ monaaMatchIndex, setMonaaMatchIndex, currentPage, setCurrentPage, advancedSearchMode, setAdvancedSearchMode }}>
            {children}
        </ LogTableContext.Provider>
    );
}
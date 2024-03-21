import { Children, createContext, ReactNode, useState } from "react";



export type AppdataContextInterface = {
    events: string[];
    setEvents: React.Dispatch<React.SetStateAction<string[]>>
    mappings: Map<string, string>;
    setMappings: React.Dispatch<React.SetStateAction<Map<string, string>>>
    fileLines: string[];
    setFileLines: React.Dispatch<React.SetStateAction<string[]>>
    fileName: string
    setFileName: React.Dispatch<React.SetStateAction<string>>
}

const defaultState = {
    events: [],
    setEvents: (events: string[]) => { },
    mappings: new Map(),
    setMappings: (mappings: Map<string, string>) => { },
    fileLines: [],
    setFileLines: (lines: string[]) => { },
    fileName: "",
    setFileName: (fileName: string) => { }
} as AppdataContextInterface

export const AppdataContext = createContext<AppdataContextInterface>(defaultState);

type AppDataProvideProps = {
    children: ReactNode
}

export default function AppdataProvider({ children }: AppDataProvideProps) {
    const [events, setEvents] = useState<string[]>(["login"]);
    const [mappings, setMappings] = useState<Map<string, string>>(new Map());
    const [fileLines, setFileLines] = useState<string[]>(["321232 login"]);
    const [fileName, setFileName] = useState<string>("");

    return (
        <AppdataContext.Provider value={{ events, setEvents, mappings, setMappings, fileLines, setFileLines, fileName, setFileName }}>
            {children}
        </AppdataContext.Provider>
    );
}



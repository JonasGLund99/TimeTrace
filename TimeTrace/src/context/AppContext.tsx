import { createContext, ReactNode, useState } from "react";
import { MonaaZone } from "../models/MonaaZone";

export type ErrorObject = {
    errorString: string,
    title: string,
    callback: (() => void) | null,
    callbackTitle: string | null,
    is_dismissible: boolean
}

export type AppdataContextInterface = {
    events: string[];
    setEvents: React.Dispatch<React.SetStateAction<string[]>>;
    mappings: Map<string, string>;
    setMappings: React.Dispatch<React.SetStateAction<Map<string, string>>>;
    fileLines: string[];
    setFileLines: React.Dispatch<React.SetStateAction<string[]>>;
    uploadedFile: File | null;
    setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
    errorObj: ErrorObject | null;
    setError: React.Dispatch<React.SetStateAction<ErrorObject | null>>;
    matches: MonaaZone[];
    setMatches: React.Dispatch<React.SetStateAction<MonaaZone[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tre: string;
    dateFormatIndex: string,
    setDateFormatIndex: React.Dispatch<React.SetStateAction<string>>;
    setTre: React.Dispatch<React.SetStateAction<string>>;
    timeStampRegex: RegExp;
    setTimeStampRegex: React.Dispatch<React.SetStateAction<RegExp>>;
}

const defaultState = {
    events: [],
    setEvents: (events: string[]) => { },
    mappings: new Map(),
    setMappings: (mappings: Map<string, string>) => { },
    fileLines: [],
    setFileLines: (lines: string[]) => { },
    uploadedFile: null,
    setUploadedFile: (uploadedFile: File | null) => { },
    errorObj: null,
    setError: (value: ErrorObject | null) => { },
    matches: [],
    setMatches: (value: MonaaZone[]) => { },
    loading: false,
    setLoading: (loading: boolean) => { },
    tre: "",
    setTre: (tre: string) => { },
    dateFormatIndex: "0",
    setDateFormatIndex: (dateFormatIndex: string) => { },
    timeStampRegex: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}(Z|[+-]\d{2}:\d{2})\b/g,
    setTimeStampRegex: (timeStampRegex: RegExp) => { },
} as AppdataContextInterface;

export const AppdataContext = createContext<AppdataContextInterface>(defaultState);

type AppDataProvideProps = {
    children: ReactNode
}

export default function AppdataProvider({ children }: AppDataProvideProps) {
    const [events, setEvents] = useState<string[]>([]);
    const [mappings, setMappings] = useState<Map<string, string>>(new Map());
    const [fileLines, setFileLines] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [errorObj, setError] = useState<ErrorObject | null>(null);
    const [matches, setMatches] = useState<MonaaZone[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tre, setTre] = useState<string>("");
    const [dateFormatIndex, setDateFormatIndex] = useState<string>("0");
    const [timeStampRegex, setTimeStampRegex] = useState<RegExp>(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,6}(Z|[+-]\d{2}:\d{2})\b/g);

    return (
        <AppdataContext.Provider value={{ events, setEvents, mappings, setMappings, fileLines, setFileLines, uploadedFile, setUploadedFile, errorObj, setError, matches, setMatches, loading, setLoading, tre, setTre, dateFormatIndex, setDateFormatIndex, timeStampRegex, setTimeStampRegex }}>
            {children}
        </AppdataContext.Provider>
    );
}
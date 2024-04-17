import { createContext, ReactNode, useEffect, useState } from "react";
import { MonaaZone } from "../models/MonaaZone";
import { DateFormat } from "../models/helpers/dateFormats";
import { CustomMap } from "../models/Types/EventMapping";

export type ErrorObject = {
    errorString: string,
    title: string,
    callback: (() => void) | null,
    callbackTitle: string | null,
    isDismissible: boolean
}

export type ModalObject = {
    text: string,
    title: string,
    submit?: (() => void) | null,
    closeCallback?: (() => void),
    submitTitle: string | null,
    isDismissible: boolean,
    children?: ReactNode,
    submitButtonType?: "submit" | "button" | "reset" | undefined,
    cancelButtonType?: "submit" | "button" | "reset" | undefined,
}

export type AppdataContextInterface = {
    events: string[];
    setEvents: React.Dispatch<React.SetStateAction<string[]>>;
    mappings: CustomMap;
    setMappings: React.Dispatch<React.SetStateAction<CustomMap>>;
    fileLines: string[];
    setFileLines: React.Dispatch<React.SetStateAction<string[]>>;
    uploadedFile: File | null;
    setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
    errorObj: ErrorObject | null;
    setError: React.Dispatch<React.SetStateAction<ErrorObject | null>>;
    modalObj: ModalObject | null;
    setModal: React.Dispatch<React.SetStateAction<ModalObject | null>>;
    matches: MonaaZone[];
    setMatches: React.Dispatch<React.SetStateAction<MonaaZone[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tre: string;
    dateFormat: string,
    setDateFormat: React.Dispatch<React.SetStateAction<string>>;
    setTre: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState = {
    events: [],
    setEvents: (events: string[]) => { },
    mappings: new CustomMap(),
    setMappings: (mappings: CustomMap) => { },
    fileLines: [],
    setFileLines: (lines: string[]) => { },
    uploadedFile: null,
    setUploadedFile: (uploadedFile: File | null) => { },
    errorObj: null,
    setError: (value: ErrorObject | null) => { },
    modalObj: null,
    setModal: (value: ModalObject | null) => { },
    matches: [],
    setMatches: (value: MonaaZone[]) => { },
    loading: false,
    setLoading: (loading: boolean) => { },
    tre: "",
    setTre: (tre: string) => { },
    dateFormat: DateFormat.ISO_8601,
    setDateFormat: (dateFormat: string) => { },
} as AppdataContextInterface;

export const AppdataContext = createContext<AppdataContextInterface>(defaultState);

type AppDataProvideProps = {
    children: ReactNode
}

export default function AppdataProvider({ children }: AppDataProvideProps) {
    const [events, setEvents] = useState<string[]>([]);
    const [mappings, setMappings] = useState<CustomMap>(new CustomMap());
    const [fileLines, setFileLines] = useState<string[]>([]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [errorObj, setError] = useState<ErrorObject | null>(null);
    const [matches, setMatches] = useState<MonaaZone[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [tre, setTre] = useState<string>("");
    const [dateFormat, setDateFormat] = useState<string>(DateFormat.ISO_8601);
    const [modalObj, setModal] = useState<ModalObject | null>(null);

    // Reset matches and TRE when mappings change
    useEffect(() => {
        setMatches([]);
        setTre("");
    }, [mappings]);

    return (
        <AppdataContext.Provider value={{ modalObj, setModal, events, setEvents, mappings, setMappings, fileLines, setFileLines, uploadedFile, setUploadedFile, errorObj, setError, matches, setMatches, loading, setLoading, tre, setTre, dateFormat, setDateFormat }}>
            {children}
        </AppdataContext.Provider>
    );
}
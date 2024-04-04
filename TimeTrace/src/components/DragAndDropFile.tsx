import { useContext, useState } from "react";
import { AppdataContext } from "../context/AppContext";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import { fileLinesAreValid } from '../models/helpers/validation';
import FileUploadLogo from './svgs/FileUploadLogo';
import FileUploadButton from "./FileUploadButton";

function DragAndDropZone() {
    const { setFileLines } = useContext(AppdataContext);
    const { setUploadedFile } = useContext(AppdataContext);
    const { setMappings } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { setEvents } = useContext(AppdataContext);
    const { setLoading } = useContext(AppdataContext);
    const { setMatches } = useContext(AppdataContext);
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile: File | null = e.dataTransfer.files[0] || null;
        if (droppedFile) {
            handleFileChange(droppedFile);
        }
    };

    async function handleFileChange(file: File | null) {
        setUploadedFile(file);
        if (file) {
            try {
                setLoading(true);
                let lines: string[] = await getFileLines(file);
                //validate file content
                let error: string | null = fileLinesAreValid(lines)
                if (error !== null) {
                    throw new Error(error)
                }
                setFileLines(lines);
                const events = extractEventsFromFileLines(lines);
                setEvents(events);
                setMappings(new Map(events.map((event) => [event, ""])));
            } catch (e) {
                setError({
                    title: "Error during file upload",
                    errorString: "Error duing upload of file <br/> <br/>" + e,
                    callback: null,
                    callbackTitle: null,
                    is_dismissible: true
                })
                //reset

                setFileLines([]);
                setEvents([]);
                setMappings(new Map());
                setUploadedFile(null);
                setMatches([]);
            }
        } else {
            //reset
            setFileLines([]);
            setEvents([]);
            setMappings(new Map());
            setUploadedFile(null);
            setMatches([])
        }
        setLoading(false);
    };

    return (
        <div className={`w-full h-full border-2 flex flex-col justify-center items-center rounded-2xl border-gray-800 border-dashed ${dragging ? ' border-4' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            <FileUploadLogo />
            <div className="text-2xl">
                Drag and drop your file here to get started!
            </div>
            <div className="pb-4 text-base">
                Limit ??? GB per file <br />
                Supported files: .txt, .log
            </div>
            <FileUploadButton />
        </div>
    );
}

export default DragAndDropZone;
import { useContext, useState } from "react";
import { AppdataContext } from "../context/AppContext";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import { fileLinesAreValid } from "../models/helpers/validation";
import Trashcan from "./svgs/Trashcan";
import FileUploadLogo from "./svgs/FileUploadLogo";
import { Store } from 'react-notifications-component';
import { CustomMap } from "../models/Types/EventMapping";
import DateFormatChooser from "./DateFormatChooser";
import Button from './button/Button';
import { ButtonStyle } from "./button/IButtonProps";
import { LogTableContext } from "../context/LogTableContext";

interface FileUploadProps {
    showDateFormatChooser?: boolean;
    asDragAndDrop?: boolean;
}

function FileUpload({ showDateFormatChooser, asDragAndDrop }: FileUploadProps) {
    const { setFileLines } = useContext(AppdataContext);
    const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
    const { setMappings } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { setEvents } = useContext(AppdataContext);
    const { setLoading } = useContext(AppdataContext);
    const { setMatches } = useContext(LogTableContext);
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

    async function handleFileUpload(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        // Call the callback function with the file
        handleFileChange(file);
        if (target !== null) {
            target.value = "";
        }
        Store.addNotification({
            title: "Uploaded file!",
            message: `File Uploaded: ${file.name}, size of uploaded file: ${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    function handleFileRemove() {
        Store.addNotification({
            title: "Deleted file!",
            message: `File deleted: ${uploadedFile?.name}. Add a new log file before continuing`,
            type: "warning",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
        handleFileChange(null);
    }

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
                setMappings(new CustomMap(events.map((event) => [{ key: event, isRegex: false }, ""])));
            } catch (e) {
                setError({
                    title: "Error during file upload",
                    errorString: "Error during upload of file <br/> <br/>" + e,
                    callback: null,
                    callbackTitle: null,
                    isDismissible: true
                })
                //reset
                setFileLines([]);
                setEvents([]);
                setMappings(new CustomMap());
                setUploadedFile(null);
                setMatches([]);
            }
        } else {
            //reset
            setFileLines([]);
            setEvents([]);
            setMappings(new CustomMap());
            setUploadedFile(null);
            setMatches([])
        }
        setLoading(false);
    };

    return (
        <div>
            {asDragAndDrop &&
                <div className={`relative w-full h-full border-2 flex flex-col justify-center items-center rounded-2xl border-gray-800 border-dashed p-14 ${dragging ? ' border-4' : ''}`}>
                    <FileUploadLogo />
                    <div className="text-2xl">
                        Drag and drop your file here to get started!
                    </div>
                    <div className="pb-4 text-base">
                        Supported file formats: .txt, .log
                    </div>
                    <div className="absolute inset-0"
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                    </div>
                    <FileUpload />
                </div>
            }
            {!asDragAndDrop &&
                <div className="flex gap-2 mb-4">
                    <input
                        type="file"
                        accept=".txt,.log"
                        id="contained-button-file"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    <Button style={{ style: 'relative ' }}>
                        <label htmlFor="contained-button-file" className="flex items-center px-6 py-4 rounded-md cursor-pointer">
                            {
                                uploadedFile ? "Current file: " + uploadedFile.name : "Upload file"
                            }
                        </label>
                        {
                            uploadedFile === null &&
                            <span id="ping" className="absolute top-[-3px] right-[-3px] block w-3 h-3 bg-yellow-200 rounded-full animate-ping ring-1 ring-yellow-200" style={{ animationDuration: '2s', animationTimingFunction: 'ease-out' }}></span>
                        }
                    </Button>
                    {!uploadedFile && showDateFormatChooser &&
                        <DateFormatChooser />
                    }
                    {uploadedFile &&
                        <Button tooltip={`Remove uploaded file (${uploadedFile.name}).`} buttonStyle={ButtonStyle.None} onClick={handleFileRemove} data-testid="remove-button">
                            <Trashcan />
                        </Button>
                    }
                </div>
            }
        </div>
    )
}


export default FileUpload;

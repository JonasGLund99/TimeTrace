import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import { fileLinesAreValid } from "../models/helpers/validation";
import { CustomMap } from "../models/Types/EventMapping";
import Trashcan from "./svgs/Trashcan";

function FileUploadButton() {
    const { setFileLines } = useContext(AppdataContext);
    const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
    const { setMappings } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { setEvents } = useContext(AppdataContext);
    const { setLoading } = useContext(AppdataContext);
    const { setMatches } = useContext(AppdataContext);

    async function handleFileUpload(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        // Call the callback function with the file
        handleFileChange(file);
        if (target !== null) {
            target.value = "";
        }
    }

    function handleFileRemove() {
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
        <div className="flex gap-2 mb-4">
            <input
                type="file"
                accept=".txt"
                id="contained-button-file"
                className="hidden"
                onChange={handleFileUpload}
            />
            <button className="relative py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700">
                <label htmlFor="contained-button-file" className="px-6 py-2 rounded-md cursor-pointer">
                    {
                        uploadedFile ? "Current file: " + uploadedFile.name : "Upload file"
                    }
                </label>
                {
                    uploadedFile === null && 
                        <span id="ping" className="absolute top-[-3px] right-[-3px] block w-3 h-3 bg-yellow-200 rounded-full animate-ping ring-1 ring-yellow-200" style={{ animationDuration: '2s', animationTimingFunction: 'ease-out' }}></span>
                }
            </button>
            { uploadedFile && 
                <button onClick={handleFileRemove} data-testid="remove-button">
                    <Trashcan />
                </button>
            }
        </div>
    );
}

export default FileUploadButton;

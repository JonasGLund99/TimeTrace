import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import { fileLinesAreValid } from "../models/helpers/validation";

function FileUploadButton() {
    const { setFileLines } = useContext(AppdataContext);
    const { setUploadedFile } = useContext(AppdataContext);
    const { setMappings } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { setEvents } = useContext(AppdataContext);

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
                setFileLines([]);
                setEvents([]);
                setMappings(new Map());
                setUploadedFile(null);
            }
        } else {
            setFileLines([]);
            setEvents([]);
            setMappings(new Map());
            setUploadedFile(null);
        }
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
            <div className="flex gap-2">
                <button className="py-2">
                    <label htmlFor="contained-button-file" className="px-5 py-2 border-2 rounded-md cursor-pointer border-black-100">
                        Upload file
                    </label>
                </button>
            </div>
            <button onClick={handleFileRemove} data-testid="remove-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    );
}

export default FileUploadButton;

import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import { useContext, useEffect, useState } from "react";
import LogTable from "../components/LogTable";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import Loader from "../components/Loader";
import { AppdataContext } from "../context/AppContext";



function MappingsPage() {
    const { events, setEvents } = useContext(AppdataContext);
    const { mappings, setMappings } = useContext(AppdataContext);
    const { fileLines, setFileLines } = useContext(AppdataContext);
    const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
    const [filteredFileLines, setFilteredFileLines] = useState<string[]>(events);
    const { errorObj, setError } = useContext(AppdataContext);

    useEffect(() => {
        setFilteredFileLines(fileLines);
    }, [fileLines])

    // Callback function to receive the file
    const handleFileChange = async (file: File | null) => {
        setUploadedFile(file);
        if (file) {
            try {
                let lines: string[] = await getFileLines(file);
                setFileLines(lines);
    
                setEvents(extractEventsFromFileLines(lines));
    
                setMappings(new Map(events.map((event) => [event, ""])));
            } catch(e) {
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
        }
    };

    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(fileLines);

            return;
        };
        const filteredFileLines = fileLines.filter((fileLine) => fileLine.toLowerCase().includes(query.toLowerCase()));
        setFilteredFileLines(filteredFileLines);


        // Todo this could probably be done more efficiently.
        // This is necessary because LogTable uses the indexes of the filteredFileLines to update the mappings.
        // A filteredFileLine cannot be mapped to its event text without doing this.
        setEvents(extractEventsFromFileLines(filteredFileLines));
    }

    return (
        <div className="flex flex-row h-full gap-5 mappings-page" >
            <div className="w-[40%]">
                {
                    uploadedFile ?
                        <div>
                            <p>File uploaded: {uploadedFile.name}</p>
                        </div>
                        :
                        <div>
                            <p>Choose a file</p>
                        </div>
                }
                <FileUploadButton onFileChange={handleFileChange} />
                <div className="h-[90%]">
                    <MappedItemsList mappings={mappings} setMappings={setMappings} />
                </div>

            </div>
            <LogTable mappings={mappings} setMappings={setMappings} mappingsAreEditable={true} events={events} searchLog={searchLog} fileLines={filteredFileLines} />
        </div>
    );
}

export default MappingsPage;

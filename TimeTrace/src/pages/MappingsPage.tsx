import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import { useContext, useEffect, useState } from "react";
import LogTable from "../components/LogTable";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import { AppdataContext } from "../context/AppContext";
import { FileLine, mapEventsToFileLine } from "../models/Types/FileLine";



function MappingsPage() {
    const { events, setEvents } = useContext(AppdataContext);
    const { mappings, setMappings } = useContext(AppdataContext);
    const { fileLines, setFileLines } = useContext(AppdataContext);
    const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
    const [filteredFileLines, setFilteredFileLines] = useState<FileLine[]>(mapEventsToFileLine(events));
    const { errorObj, setError } = useContext(AppdataContext);

    useEffect(() => {
        setEvents(extractEventsFromFileLines(fileLines));
    }, [fileLines])

    // Callback function to receive the file
    const handleFileChange = async (file: File | null) => {
        setUploadedFile(file);
        if (file) {
            try {
                let lines: string[] = await getFileLines(file);
                setFileLines(lines);

                const events = extractEventsFromFileLines(lines);
                setFilteredFileLines(mapEventsToFileLine(events));
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
            setFilteredFileLines([]);
            setMappings(new Map());
        }
    };

    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(mapEventsToFileLine(events));
            return;
        };

        let filteredFileLines: FileLine[] = [];

        fileLines.filter((fileLine, index) => {
            const isAMatch: boolean = fileLine.toLowerCase().includes(query.toLowerCase());
            if (!isAMatch) return false;
            filteredFileLines.push({ text: events[index], line: index });
            return true;
        });

        setFilteredFileLines(filteredFileLines);
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
                    <MappedItemsList />
                </div>

            </div>
            <LogTable filteredFileLines={filteredFileLines} mappingsAreEditable={true} searchLog={searchLog} />
        </div>
    );
}

export default MappingsPage;

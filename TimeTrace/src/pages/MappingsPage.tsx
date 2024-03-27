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
            setMappings(new Map());
        }
    };

    return (
        <div id="mappings-page" className="flex flex-row h-full gap-5" >
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
            <div className="w-[60%] h-full">
                <LogTable mappingsAreEditable={true} />
            </div>
        </div>
    );
}

export default MappingsPage;

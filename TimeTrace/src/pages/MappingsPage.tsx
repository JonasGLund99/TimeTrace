import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import { useEffect, useState } from "react";
import LogTable from "../components/LogTable";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";

function MappingsPage() {
    const [events, setEvents] = useState<string[]>([]);
    const [mappings, setMapping] = useState<Map<string, string>>(new Map(events.map((event) => [event, ""])))
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [fileLines, setFileLines] = useState<string[]>([]);
    const [filteredFileLines, setFilteredFileLines] = useState<string[]>(events);

    useEffect(() => {
        setFilteredFileLines(fileLines);
    }, [fileLines])

    // Callback function to receive the file
    const handleFileChange = async (file: File | null) => {
        setUploadedFile(file);
        if (file) {
            let lines: string[] = await getFileLines(file);
            setFileLines(lines);
            setEvents(extractEventsFromFileLines(lines));
            setMapping(new Map(events.map((event) => [event, ""])));
        } else {
            setFileLines([]);
            setEvents([]);
            setMapping(new Map());
        }
    };


    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(fileLines);
            return;
        };
        const filteredFileLines = fileLines.filter((fileLine) => fileLine.toLowerCase().includes(query.toLowerCase()));
        setFilteredFileLines(filteredFileLines);
    }

    return (
        <div className="flex flex-row h-full mappings-page" >
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
                <MappedItemsList mappings={mappings} setMappings={setMapping} />

            </div>
            <LogTable mappings={mappings} setMappings={setMapping} mappingsAreEditable={true} events={events} searchLog={searchLog} fileLines={filteredFileLines} />
        </div>
    );
}

export default MappingsPage;

import FileUploadButton from "../components/FileUploadButton";
import { useState } from "react";
import LogTable from "../components/LogTable";

function MappingsPage() {
    const events: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",];
    const [filteredEvents, setFilteredEvents] = useState<string[]>(events);
    const [mappings, setMapping] = useState<Map<string, string>>(new Map(events.map((event) => [event, ""])))
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);


    // Callback function to receive the file
    const handleFileChange = (file: File | null) => {
        setUploadedFile(file);
    };

    function searchLog(query: string) {
        if (query === "") {
            setFilteredEvents(events);
            return;
        };
        const filteredEvents = events.filter((event) => event.toLowerCase().includes(query.toLowerCase()));
        setFilteredEvents(filteredEvents);
    }

    return (
        <div className="flex flex-row h-full mappings-page " >
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

            </div>
            <LogTable mappings={mappings} setMappings={setMapping} mappingsAreEditable={true} events={filteredEvents} searchLog={searchLog} />
        </div>

    );
}

export default MappingsPage;

import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import { useState } from "react";
import LogTable from "../components/LogTable";

function MappingsPage() {
    const events: string[] = [];
    const [mappings, setMapping] = useState<Map<string, string>>(new Map(events.map((event) => [event, ""])))
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [mappings, updateMappings] = useState(() => setMappings())

    // Callback function to receive the file
    const handleFileChange = (file: File | null) => {
        setUploadedFile(file);
    };

    function setMappings() {
        return new Map<string, string>([
            ["login", "A"],
            ["logout", "B"]
        ]);
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
            <MappedItemsList mappings={mappings} />
            <FileUploadButton onFileChange={handleFileChange} />

        </div>
        <LogTable mappings={mappings} setMappings={setMapping} mappingsAreEditable={true} events={events}/>
      </div>
        
    );
}

export default MappingsPage;

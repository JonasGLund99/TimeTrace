import { useState } from "react";
import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";

function MappingsPage() {
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
        <div>
            <FileUploadButton onFileChange={handleFileChange} />
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
        </div>
    );
}


export default MappingsPage;

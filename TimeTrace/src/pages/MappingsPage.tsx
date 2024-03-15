import { useState } from "react";
import FileUploadButton from "../components/FileUploadButton";

function MappingsPage() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Callback function to receive the file
    const handleFileChange = (file: File | null) => {
        setUploadedFile(file);
    };

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
        </div>
    );
}


export default MappingsPage;

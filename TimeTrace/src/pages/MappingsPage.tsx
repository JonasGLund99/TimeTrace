import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import LogTable from "../components/LogTable";
import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";

function MappingsPage() {
    const { uploadedFile } = useContext(AppdataContext);

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
                <FileUploadButton />
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

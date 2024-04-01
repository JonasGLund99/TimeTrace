import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import LogTable from "../components/LogTable";

function MappingsPage() {
    return (
        <div id="mappings-page" className="flex flex-row h-full gap-5" >
            <div className="w-[40%]">
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

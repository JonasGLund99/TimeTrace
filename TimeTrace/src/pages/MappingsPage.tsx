import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import LogTable from "../components/LogTable";
import Loader from "../components/Loader";
import { useContext } from "react";
import { AppdataContext } from "../context/AppContext";

function MappingsPage() {
    const { loading } = useContext(AppdataContext);

    return (
        <div id="mappings-page" className="flex flex-row h-full gap-5" >
            <div className="w-[40%]">
                <FileUploadButton />
                <div className="h-[90%]">
                    <MappedItemsList />
                </div>

            </div>
            <div className="w-[60%] h-full">
                {loading ? <Loader /> :
                    <LogTable mappingsAreEditable={true} />
                }
            </div>
        </div>
    );
}

export default MappingsPage;

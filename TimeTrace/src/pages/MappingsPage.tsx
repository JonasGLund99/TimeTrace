import { useEffect } from "react";
import FileUpload from "../components/FileUpload";
import MappedItemsList from "../components/MappedItemsList";
import LogTable from "../components/logtable/LogTable";
import LogTableProvider from '../context/LogTableContext';

function MappingsPage() {

    function handleOnBeforeUnload(e: BeforeUnloadEvent) {
        e.preventDefault();
        return (e.returnValue = '');
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        return () => {
            window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
        }
    }, [])

    return (
        <div id="mappings-page" className="flex flex-row h-full gap-5" >
            <LogTableProvider>
                <div className="w-[40%]">
                    <FileUpload asDragAndDrop={false} />
                    <div className="pt-2 h-[94%]">
                        <MappedItemsList />
                    </div>
                </div>
                <div className="w-[60%] h-full">
                    <LogTable mappingsAreEditable={true} />
                </div>
            </LogTableProvider>
        </div>

    );
}

export default MappingsPage;

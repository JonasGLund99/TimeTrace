import { useEffect } from "react";
import FileUploadButton from "../components/FileUploadButton";
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
                    <FileUploadButton />
                    <div className="h-[95%]">
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

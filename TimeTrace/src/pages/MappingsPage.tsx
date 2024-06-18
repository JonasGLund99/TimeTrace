import { useEffect } from "react";
import FileUpload from "../components/FileUpload";
import MappedItemsList from "../components/MappedItemsList";
import LogTable from "../components/logtable/LogTable";
import LogTableProvider from '../context/LogTableContext';

/**
 * 
 * @returns The page to create mappings
 */
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
        <div id="mappings-page" className="flex flex-col h-full gap-5 md:flex-row" >
            <LogTableProvider>
                <div className="w-full md:w-[40%]">
                    <FileUpload asDragAndDrop={false} showDateFormatChooser={true} />
                    <div className="h-[95%]">
                        <MappedItemsList />
                    </div>
                </div>
                <div className="w-full md:w-[60%] h-full">
                    <LogTable mappingsAreEditable={true} />
                </div>
            </LogTableProvider>
        </div>

    );
}

export default MappingsPage;

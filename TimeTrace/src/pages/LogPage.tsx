import { useContext, useEffect } from "react";
import LogTable from "../components/logtable/LogTable";
import SearchForm from "../components/SearchForm";
import { AppdataContext } from "../context/AppContext";
import { navigation } from "../components/Navbar";
import LogTableProvider from '../context/LogTableContext';

function LogPage() {
    const { uploadedFile } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);

    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
        event.preventDefault();
        return (event.returnValue = '');
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
    }, [])

    useEffect(() => {
        if (uploadedFile === null) {
            setError({
                title: "No file uploaded",
                errorString: "To be able to view the log and search, you must upload a file on the file upload page",
                callback: () => {
                    window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true }); // Remove event listener
                    window.location.href = navigation.filter(x => x.name === "Create mappings")[0].href;
                },
                callbackTitle: "Go to Upload",
                is_dismissible: false
            });
        }
    }, [uploadedFile, setError]);

    return (
        <div id="log-page" className="h-full gap-5">
            <LogTableProvider>
                <div className="h-[15%]">
                    <SearchForm />
                </div>
                <div className="w-full h-[85%]">
                    <LogTable mappingsAreEditable={false} />
                </div>
            </LogTableProvider>
        </div>
    );
}

export default LogPage;

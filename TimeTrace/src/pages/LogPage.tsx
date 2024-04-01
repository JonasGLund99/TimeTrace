import { useContext, useEffect } from "react";
import LogTable from "../components/LogTable";
import SearchForm from "../components/SearchForm";
import { AppdataContext } from "../context/AppContext";
import { navigation } from "../components/Navbar";

function LogPage() {
    const { uploadedFile } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);

    useEffect(() => {
        if (uploadedFile === null) {
            setError({
                title: "No file uploaded",
                errorString: "To be able to view the log and search, you must upload a file on the file upload page",
                callback: () => {
                    window.location.href = navigation.filter(x => x.name === "Create mappings")[0].href;
                },
                callbackTitle: "Go to Upload",
                is_dismissible: false
            });
        }
    }, [uploadedFile, setError]);

    return (
        <div id="log-page" className="h-full gap-5">
            <div className="h-[15%]">
                <SearchForm />
            </div>
            <div className="w-full h-[85%]">
                <LogTable mappingsAreEditable={false} />
            </div>
        </div>
    );
}

export default LogPage;

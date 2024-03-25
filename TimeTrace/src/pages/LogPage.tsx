import { useContext, useState, useEffect } from "react";
import LogTable from "../components/LogTable";
import SearchForm from "../components/SearchForm";
import { QueryHandler } from "../models/QueryHandler";
import { AppdataContext } from "../context/AppContext";
import { LogFormatter } from "../models/LogFormatter";
import Loader from "../components/Loader";
import { getFileLines } from "../models/helpers/getFileLines";
import { upload } from "@testing-library/user-event/dist/upload";
import { navigation } from "../components/Navbar";

function LogPage() {
    const { events, setEvents } = useContext(AppdataContext);
    const { mappings, setMappings } = useContext(AppdataContext);
    const { fileLines, setFileLines } = useContext(AppdataContext);
    const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
    const queryHandler: QueryHandler = new QueryHandler();
    const [loading, setLoading] = useState<boolean>(false);
    const logFormatter = new LogFormatter();
    const { errorObj, setError } = useContext(AppdataContext);


    function searchLog(searchQuery: string): void {
        throw new Error("Function not implemented.");
    }

    async function callMonaa() {
        setLoading(true);
        if (!uploadedFile) return;
        const formattedFile = await logFormatter.formatLog(uploadedFile, mappings);

        queryHandler.file = fileLines;
        queryHandler.formattedFile = await getFileLines(formattedFile);
        queryHandler.mappings = mappings;
        const monaaZones = await queryHandler.search("ab$");
        const linesFromZones: string[] = [];
        monaaZones.forEach((zone) => {
            zone.match.forEach(match => {
                linesFromZones.push(fileLines[match]);
            });
        });

        // setFilteredFileLines(linesFromZones);
        // setEvents(extractEventsFromFileLines(linesFromZones));
        setLoading(false);
    }

    useEffect(() => {
        if (uploadedFile === null) {
            console.log(navigation.filter(x => x.name === "Create mappings")[0].href)
            setError({
                title: "No file uploaded",
                errorString: "To be able to view the log and search, you must upload a file on the file upload page",
                callback: () => {
                    window.location.href = 'http://localhost:3000' + navigation.filter(x => x.name === "Create mappings")[0].href;
                },
                callbackTitle: "Go to Upload",
                is_dismissible: false
            });
        }
    }, [uploadedFile, setError]);

    return (
        <div>
            <h1 className="flex justify-center pb-5 text-4xl ">Search logfile {uploadedFile?.name}</h1>
            <SearchForm onSubmit={callMonaa} />
            {loading ? <Loader /> :
                <LogTable mappings={mappings} setMappings={setMappings} mappingsAreEditable={false} events={events} searchLog={searchLog} fileLines={fileLines} />
            }
        </div>
    );
}

export default LogPage;

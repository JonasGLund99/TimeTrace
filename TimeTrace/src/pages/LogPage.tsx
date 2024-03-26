import { useContext, useEffect, useState } from "react";
import LogTable from "../components/LogTable";
import SearchForm from "../components/SearchForm";
import { QueryHandler } from "../models/QueryHandler";
import { AppdataContext } from "../context/AppContext";
import { LogFormatter } from "../models/LogFormatter";
import Loader from "../components/Loader";
import { getFileLines } from "../models/helpers/getFileLines";
import { FileLine, mapEventsToFileLine, mapFileLineToEvents } from "../models/Types/FileLine";
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


    const [filteredFileLines, setFilteredFileLines] = useState<FileLine[]>(mapEventsToFileLine(events));
    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(mapEventsToFileLine(events));

            return;
        };

        let filteredFileLines: FileLine[] = [];

        fileLines.filter((fileLine, index) => {
            const isAMatch: boolean = fileLine.toLowerCase().includes(query.toLowerCase());
            if (!isAMatch) return false;
            filteredFileLines.push({ text: events[index], line: index });
            return true;
        });

        setFilteredFileLines(filteredFileLines);
    }

    async function callMonaa() {
        setLoading(true);
        if (!uploadedFile) return;
        const formattedFile = await logFormatter.formatLog(uploadedFile, mappings);

        queryHandler.file = fileLines;
        queryHandler.formattedFile = await getFileLines(formattedFile);
        queryHandler.mappings = mappings;
        const monaaZones = await queryHandler.search("ab$");
        const linesFromZones: FileLine[] = [];
        monaaZones.forEach((zone) => {
            zone.match.forEach(match => {
                linesFromZones.push({ text: events[match], line: match });
            });
        });

        setFilteredFileLines(linesFromZones);
        setEvents(mapFileLineToEvents(linesFromZones));
        setLoading(false);
    }

    return (
        <div>
            <h1 className="flex justify-center pb-5 text-4xl ">Search logfile {uploadedFile?.name}</h1>
            <SearchForm onSubmit={callMonaa} />
            {loading ? <Loader /> :
                <LogTable filteredFileLines={filteredFileLines} mappingsAreEditable={false} searchLog={searchLog} />
            }
        </div>
    );
}

export default LogPage;

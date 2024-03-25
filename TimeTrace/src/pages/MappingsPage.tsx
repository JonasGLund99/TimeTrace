import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import { useContext, useEffect, useState } from "react";
import LogTable from "../components/LogTable";
import { getFileLines } from "../models/helpers/getFileLines";
import { extractEventsFromFileLines } from "../models/helpers/extractEventsFromFileLines";
import { QueryHandler } from '../models/QueryHandler';
import { LogFormatter } from '../models/LogFormatter';
import Loader from "../components/Loader";
import { AppdataContext } from "../context/AppContext";

function MappingsPage() {
    const { events, setEvents } = useContext(AppdataContext);
    const { mappings, setMappings } = useContext(AppdataContext);
    const { fileLines, setFileLines } = useContext(AppdataContext);
    const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
    const [filteredFileLines, setFilteredFileLines] = useState<string[]>(events);
    const [loading, setLoading] = useState<boolean>(false);
    const queryHandler = new QueryHandler();
    const logFormatter = new LogFormatter();

    useEffect(() => {
        setFilteredFileLines(fileLines);
    }, [fileLines])

    // Callback function to receive the file
    const handleFileChange = async (file: File | null) => {
        setUploadedFile(file);
        if (file) {
            let lines: string[] = await getFileLines(file);
            setFileLines(lines);

            setEvents(extractEventsFromFileLines(lines));

            setMappings(new Map(events.map((event) => [event, ""])));

        } else {
            setFileLines([]);
            setEvents([]);
            setMappings(new Map());
        }
    };

    async function callMonaa() {
        setLoading(true);
        if(!uploadedFile) return;
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

        
        setFilteredFileLines(linesFromZones);
        setEvents(extractEventsFromFileLines(linesFromZones));
        setLoading(false);
    }

    function searchLog(query: string) {
        if (query === "") {
            setFilteredFileLines(fileLines);

            return;
        };
        const filteredFileLines = fileLines.filter((fileLine) => fileLine.toLowerCase().includes(query.toLowerCase()));
        setFilteredFileLines(filteredFileLines);


        // Todo this could probably be done more efficiently.
        // This is necessary because LogTable uses the indexes of the filteredFileLines to update the mappings.
        // A filteredFileLine cannot be mapped to its event text without doing this.
        setEvents(extractEventsFromFileLines(filteredFileLines));
    }

    return (
        <div className="flex flex-row h-full gap-5 mappings-page" >
            <div>
                <button className="p-5 bg-slate-600" onClick={callMonaa}>Call Monaa</button>
            </div>
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
                <FileUploadButton onFileChange={handleFileChange} />
                <div className="h-[90%]">
                    <MappedItemsList mappings={mappings} setMappings={setMappings} />
                </div>

            </div>
            {loading ? <Loader /> : 
                <LogTable mappings={mappings} setMappings={setMappings} mappingsAreEditable={true} events={events} searchLog={searchLog} fileLines={filteredFileLines} />
            }
        </div>
    );
}

export default MappingsPage;

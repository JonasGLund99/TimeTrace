import { useContext, useState } from "react";
import LogTable from "../components/LogTable";
import SearchForm from "../components/SearchForm";
import { QueryHandler } from "../models/QueryHandler";
import { AppdataContext } from "../context/AppContext";
import { LogFormatter } from "../models/LogFormatter";
import Loader from "../components/Loader";
import { getFileLines } from "../models/helpers/getFileLines";

function LogPage() {
  const { events, setEvents } = useContext(AppdataContext);
  const { mappings, setMappings } = useContext(AppdataContext);
  const { fileLines, setFileLines } = useContext(AppdataContext);
  const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
  const queryHandler: QueryHandler = new QueryHandler();
  const [loading, setLoading] = useState<boolean>(false);
  const logFormatter = new LogFormatter();

  function searchLog(searchQuery: string): void {
    throw new Error("Function not implemented.");
  }

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

    // setFilteredFileLines(linesFromZones);
    // setEvents(extractEventsFromFileLines(linesFromZones));
    setLoading(false);
  }
  
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

import { useContext } from "react";
import LogTable from "../components/LogTable";
import SearchForm from "../components/SearchForm";
import { QueryHandler } from "../models/QueryHandler";
import { AppdataContext } from "../context/AppContext";

function LogPage() {
  const { events, setEvents } = useContext(AppdataContext);
  const { mappings, setMappings } = useContext(AppdataContext);
  const { fileLines, setFileLines } = useContext(AppdataContext);
  const { uploadedFile, setUploadedFile } = useContext(AppdataContext);
  const queryHandler: QueryHandler = new QueryHandler();
  function handleSearchSubmit(TRE: string): void {

    queryHandler.TREBuilder.TREString = TRE;
    queryHandler.search(TRE);
  }

  function searchLog(searchQuery: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <h1 className="flex justify-center pb-5 text-4xl ">Search logfile {uploadedFile?.name}</h1>
      <SearchForm onSubmit={handleSearchSubmit} />
      <LogTable mappings={mappings} mappingsAreEditable={false} events={events} searchLog={searchLog} fileLines={fileLines} />
    </div>

  );
}


export default LogPage;

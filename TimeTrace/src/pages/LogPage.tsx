import SearchForm from "../components/SearchForm";
import { QueryHandler } from "../models/QueryHandler";

function LogPage() {
  const queryHandler: QueryHandler = new QueryHandler();
  function handleSearchSubmit(TRE: string): void {

    console.log('Search TRE:', TRE);
    queryHandler.TREBuilder.TREString = TRE;

  }

  return (
    <div>
      <h1 className="flex justify-center pb-5 text-4xl ">Search logfile</h1>
      <SearchForm onSubmit={handleSearchSubmit} />
    </div>

  );

}


export default LogPage;

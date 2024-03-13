// import something here

import LogTable from "../components/LogTable";

function MappingsPage() {
    return (
      <div>
		    <h1>MappingsPage</h1>
        <LogTable displaysMappings={true} events={["2024-02-26T08:22:14.642Z some_event.xxxxxxxxsdsdsdsdsds", "2024-02-26T08:22:14.648Z some_event.xxxxxxxxsdsdsdsdsds", "2024-02-26T08:22:14.650Z some_event.xxxxxxxxsdsdsdsdsds"]}/>
      </div>
        
    );
}
  

export default MappingsPage;

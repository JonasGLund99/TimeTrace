// import something here

import LogTable from "../components/LogTable";

function MappingsPage() {
    return (
      <div>
		    <h1>MappingsPage</h1>
        <LogTable displaysMappings={true} events={["event1", "event2", "event3"]}/>
      </div>
        
    );
}
  

export default MappingsPage;

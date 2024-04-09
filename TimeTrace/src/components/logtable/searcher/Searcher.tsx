import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import AdvancedSearch from "./AdvancedSearch";
import StandardSearch from "./StandardSearch";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
    mappingsAreEditable: boolean;
}

function Searcher({searchQuery, setSearchQuery, searchLog, mappingsAreEditable}: SearcherProps) {

    const { advancedSearchMode, setAdvancedSearchMode } = useContext(LogTableContext);

    const handleSearchModeChange = () => {
        setAdvancedSearchMode(prevMode => !prevMode); 
    };

    return (
        <div>
            {mappingsAreEditable && 
                (
                    <div className="relative w-full mb-2 rounded-md border h-10 p-1 bg-gray-200">
                        <div className="relative w-full h-full flex items-center">
                            <div  className="w-full flex justify-center text-gray-400 cursor-pointer">
                                <button className="w-full" onClick={handleSearchModeChange}>Standard Search Mode</button>
                            </div>
                            <div className="w-full flex justify-center text-gray-400 cursor-pointer">
                                <button className="w-full" onClick={handleSearchModeChange}>Advanced Search Mode</button>
                            </div>
                        </div>
                        <span className={`bg-white shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-500 ease-in-out top-[4px] absolute ${!advancedSearchMode ? 'left-1 font-semibold' : 'left-1/2 -ml-1 font-semibold'}`}
                            children={!advancedSearchMode ? 'Standard Searching...' : 'Searching using regex...'}
                        ></span>
                    </div>
                )
            }   
            
            {advancedSearchMode 
                ? <AdvancedSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog}/>
                : <StandardSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog}/>
            }
        </div>
    );
}

export default Searcher;
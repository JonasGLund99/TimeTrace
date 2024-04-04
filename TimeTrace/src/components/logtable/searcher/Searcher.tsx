import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import AdvancedSearch from "./AdvancedSearch";
import StandardSearch from "./StandardSearch";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function Searcher({searchQuery, setSearchQuery, searchLog}: SearcherProps) {

    const { advancedSearchMode, setAdvancedSearchMode } = useContext(LogTableContext);

    const handleCheckboxChange = () => {
        setAdvancedSearchMode(prevMode => !prevMode); // Toggle the mode
    };

    return (
        <div>
            <div>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onChange={handleCheckboxChange} checked={advancedSearchMode} />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-m font-medium text-gray-900 dark:text-gray-300">{advancedSearchMode ? "Searching using regex mode" : "Standard searching"}</span>
                </label>
            </div>
            {advancedSearchMode 
                ? <AdvancedSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog}/>
                : <StandardSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog}/>
            }
        </div>
    );
}

export default Searcher;
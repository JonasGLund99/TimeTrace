import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function StandardSearch({searchQuery, setSearchQuery, searchLog}: SearcherProps) {

    const { advancedSearchMode, setAdvancedSearchMode } = useContext(LogTableContext);

    return (
        <div>
            <h2 className="font-bold text-md">Normal Search</h2>    
            <input
                type="text"
                className="px-2 border-2 border-gray-300 rounded-lg w-full"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchLog(e.target.value);
                }}
            ></input>
        </div>
    );
}

export default StandardSearch;
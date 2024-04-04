import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function AdvancedSearch({searchQuery, setSearchQuery, searchLog}: SearcherProps) {


    return (
        <div>
            <h2 className="font-bold text-md">Advanced Mode!</h2>    
            <div className="flex">
                <input
                    type="text"
                    className="px-2 border-2 border-gray-300 rounded-lg w-full"
                    placeholder="Search using regex... e.g. gr(a|e)y"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        searchLog(e.target.value);
                    }}
                ></input>
                <input
                    className="w-20 px-2 border-2 border-gray-300 rounded-lg text-center mx-2"
                    type="text"
                    placeholder="map to..."
                />
                <button className="relative py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700">
                <label htmlFor="" className="px-6 py-2 rounded-md cursor-pointer">
                    Save
                </label>
            </button>
            </div>
            
        </div>
    );
}

export default AdvancedSearch;
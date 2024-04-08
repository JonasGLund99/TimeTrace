import { useContext, useState } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import { AppdataContext } from "../../../context/AppContext";
import { CustomMap } from "../../../models/Types/EventMapping";
interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function AdvancedSearch({searchQuery, setSearchQuery, searchLog}: SearcherProps) {
    const {mappings, setMappings} = useContext(AppdataContext);
    const [regexMapValue, setRegexMapValue] = useState('');
    const { setError } = useContext(AppdataContext)

    function mapEventsUsingRegex() {
        const regex = searchQuery;
        const mapValue = regexMapValue;
        let errorStr: string = "";
        if (regex === "") 
            errorStr = "Write regex before mapping events or goto standard search";
        else if(mapValue ==="")
            errorStr = "Make sure to input a map value that the matches of the regex should be mapped"
        
        if (errorStr !== "") {
            setError({
                title: "Error during mapping",
                errorString: errorStr,
                callback: null,
                callbackTitle: null,
                is_dismissible: true
            })
            return
        }
            
        mappings.setRegex(regex, mapValue)
        const newMappings = new CustomMap(mappings)
        setMappings(newMappings)
    }

    return (
        <div>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        id="regex-input"
                        type="text"
                        className="pl-10 pr-2 border-2 border-gray-300 rounded-lg w-full"
                        placeholder="Search using regex... e.g. gr(a|e)y"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    ></input>
                    <button
                        className="absolute left-0 top-0 h-full px-2 flex items-center justify-center bg-gray-800 rounded-l-lg hover:bg-gray-700"
                        onClick={() => searchLog(searchQuery)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.5 17.5l2.5 2.5"
                            />
                        </svg>
                    </button>
                </div>
                <input
                    id="map-regex-to-value"
                    className="w-20 px-2 border-2 border-gray-300 rounded-lg text-center mx-2"
                    type="text"
                    placeholder="map to..."
                    maxLength={1}
                    value={regexMapValue}
                    onChange={(e) => setRegexMapValue(e.target.value)}
                />
                <button onClick={mapEventsUsingRegex} className="relative h-7 text-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700">
                    <label htmlFor="" className="px-6 rounded-md cursor-pointer">
                        Confirm
                    </label>
                </button>
            </div>
        </div>
    );
}

export default AdvancedSearch;
import { useContext, useState } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import { AppdataContext } from "../../../context/AppContext";
import { CustomMap } from "../../../models/Types/EventMapping";
import Button from "../../button/Button";
import { ButtonType } from "../../button/IButtonProps";
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

    function listenForEnter(keyPress: React.KeyboardEvent<HTMLInputElement>) {
        if(keyPress.key === "Enter")
            searchLog(searchQuery)
    }

    return (
        <div>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        id="regex-input"
                        type="text"
                        className="w-full pl-12 pr-2 border-2 border-gray-300 rounded-lg"
                        placeholder="Search using regex... e.g. gr(a|e)y"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => listenForEnter(e)}
                    ></input>
                    <Button
                        buttonType={ButtonType.none}
                        style={{ style: "absolute top-0 left-0 h-full flex items-center justify-center h-full px-2 rounded-l-lg bg-gray-800 hover:bg-gray-700" }}
                        onClick={() => searchLog(searchQuery)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-400"
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
                    </Button>
                </div>
                <input
                    id="map-regex-to-value"
                    className="w-20 px-2 mx-2 text-center border-2 border-gray-300 rounded-lg"
                    type="text"
                    placeholder="map to..."
                    maxLength={1}
                    value={regexMapValue}
                    onChange={(e) => setRegexMapValue(e.target.value)}
                />
                <Button onClick={mapEventsUsingRegex} buttonType={ButtonType.Standard} style={{style: 'relative'}} >
                    <label htmlFor="" className="px-6 rounded-md cursor-pointer">
                        Confirm
                    </label>
                </Button>
            </div>
        </div>
    );
}

export default AdvancedSearch;
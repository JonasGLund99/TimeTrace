import { useContext } from "react";
import { LogTableContext } from "../../../context/LogTableContext";
import AdvancedSearch from "./AdvancedSearch";
import StandardSearch from "./StandardSearch";
import Button from "../../button/Button";
import { ButtonStyle } from "../../button/IButtonProps";
import ShowLineToggle from "./ToggleShowLines";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
    mappingsAreEditable: boolean;
}

function Searcher({ searchQuery, setSearchQuery, searchLog, mappingsAreEditable }: SearcherProps) {

    const { advancedSearchMode, setAdvancedSearchMode } = useContext(LogTableContext);

    const handleSearchModeChange = () => {
        setAdvancedSearchMode(prevMode => !prevMode);
    };

    return (
        <div className="w-full">
            {
                mappingsAreEditable &&
                <ShowLineToggle></ShowLineToggle>
            }
            <div id="search-container" className="flex flex-col content-center w-full">
                {mappingsAreEditable &&
                    (
                        <div className="relative w-full h-10 p-1 mb-2 bg-gray-200 border rounded-md">
                            <div className="relative flex items-center w-full h-full">
                                <div className="flex justify-center w-full text-gray-400 cursor-pointer">
                                    <Button tooltip="Search in your log with plain text." buttonStyle={ButtonStyle.None} style={{ style: 'w-full' }} onClick={handleSearchModeChange}>Standard Search Mode</Button>
                                </div>
                                <div className="flex justify-center w-full text-gray-400 cursor-pointer">
                                    <Button tooltip="Search in your log with regex or plain text." buttonStyle={ButtonStyle.None} style={{ style: 'w-full' }} onClick={handleSearchModeChange}>Advanced Search Mode</Button>
                                </div>
                            </div>
                            <span className={`bg-white shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-500 ease-in-out top-[4px] absolute ${!advancedSearchMode ? 'left-1 font-semibold' : 'left-1/2 -ml-1 font-semibold'}`}
                                children={!advancedSearchMode ? 'Standard Searching...' : 'Searching using regex...'}
                            ></span>
                        </div>
                    )
                }

                {advancedSearchMode
                    ? <AdvancedSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog} />
                    : <StandardSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchLog={searchLog} />
                }

            </div>
        </div>
    );
}

export default Searcher;
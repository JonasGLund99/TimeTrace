import Tooltip from "../../tooltip/ToolTip";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function StandardSearch({searchQuery, setSearchQuery, searchLog}: SearcherProps) {

    return (
        <Tooltip tooltip="Search in your log with plain text.">
            <input
                type="text"
                className="w-full px-2 border-2 border-gray-300 rounded-lg"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchLog(e.target.value);
                }}
                ></input>
        </Tooltip>
    );
}

export default StandardSearch;
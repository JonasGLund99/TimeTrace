
interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function StandardSearch({searchQuery, setSearchQuery, searchLog}: SearcherProps) {

    return (
        <div>
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
        </div>
    );
}

export default StandardSearch;
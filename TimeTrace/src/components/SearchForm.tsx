import { useContext, useState } from 'react';
import { AppdataContext } from '../context/AppContext';
import { QueryHandler } from '../models/QueryHandler';
import { LogFormatter } from '../models/LogFormatter';
import { getFileLines } from "../models/helpers/getFileLines";
import { LogTableContext } from '../context/LogTableContext';

export default function SearchForm() {
    const [tre, setTre] = useState('');
    const { mappings } = useContext(AppdataContext);
    const { fileLines } = useContext(AppdataContext);
    const { uploadedFile } = useContext(AppdataContext);
    const { setMatches } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { setLoading } = useContext(AppdataContext);
    const { setMonaaMatchIndex } = useContext(LogTableContext);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callMonaa(tre);
    };

    async function callMonaa(tre: string) {
        setLoading(true);
        if (!uploadedFile) return; //should never happen
        try {
            const formattedFile = await LogFormatter.formatLog(uploadedFile, mappings);
            
            QueryHandler.file = fileLines;
            QueryHandler.formattedFile = await getFileLines(formattedFile);
            QueryHandler.mappings = mappings;
            const monaaZones = await QueryHandler.search(tre + "$");
            
            setMonaaMatchIndex(-1);
            setMatches(monaaZones);
            setLoading(false);
        } catch (e) {
            setLoading(false)
            setError({
                title: "Error during regex search in file! Try searching again...",
                errorString: "An error occured during the timed regex search in the file <br /> <br />" + e,
                callback: null,
                callbackTitle: null,
                is_dismissible: true
            })
        }
    }

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                    <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    className="block w-full p-4 text-sm text-gray-900 bg-white border border-gray-600 rounded-lg ps-10 focus:ring-blue-500 focus:border-blue-500"
                    placeholder='Enter TRE string'
                    name="TRE"
                    value={tre}
                    onChange={(e) => setTre(e.target.value)}
                    required
                />
                <button className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-700  font-medium rounded-lg text-sm px-4 py-2 " type="submit">
                    Search
                </button>
            </div>
        </form>
    );
}



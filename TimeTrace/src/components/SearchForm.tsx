import { useContext } from 'react';
import { AppdataContext } from '../context/AppContext';
import { QueryHandler } from '../models/QueryHandler';
import { LogFormatter } from '../models/LogFormatter';
import { getFileLines } from "../models/helpers/getFileLines";
import { LogTableContext } from '../context/LogTableContext';
import { Store } from 'react-notifications-component';
import Button from './button/Button';
import Tooltip from './tooltip/ToolTip';
import { MonaaZone } from '../models/MonaaZone';
import { calcStartEndOfRender } from '../models/helpers/scrollLogTable';

interface SearchFormProps {
    tooltip?: string;
}

export default function SearchForm({ tooltip }: SearchFormProps) {
    const { tre, setTre } = useContext(AppdataContext);
    const { mappings } = useContext(AppdataContext);
    const { fileLines } = useContext(AppdataContext);
    const { uploadedFile } = useContext(AppdataContext);
    const { setMatches } = useContext(LogTableContext);
    const { setError } = useContext(AppdataContext);
    const { setLoading } = useContext(AppdataContext);
    const { setMonaaMatchIndex } = useContext(LogTableContext);
    const { setShownLines } = useContext(LogTableContext);
    const { filteredFileLines } = useContext(LogTableContext);
    const { linesPerPage } = useContext(LogTableContext);
    const { currentPageSpan, setCurrentPageSpan } = useContext(LogTableContext);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        callMonaa(tre);
    };

    function findFirstMatch(matches: MonaaZone[]) {
        if (matches.length === 0) {
            setShownLines(filteredFileLines.slice(0, linesPerPage));
            setCurrentPageSpan({ min: 0, max: 1 });
            setMonaaMatchIndex(-1);
            return;
        }

        const newMatchIndex = 0;
        const minPage = 0;
        const maxPage = Math.ceil(filteredFileLines.length / linesPerPage);
        const startOfMatchIndex = matches[newMatchIndex].lineMatches[0];
        const endOfMatchIndex = matches[newMatchIndex].lineMatches[matches[newMatchIndex].lineMatches.length - 1];
        const renderObj = calcStartEndOfRender(minPage, maxPage, startOfMatchIndex, endOfMatchIndex, linesPerPage);
        const matchIsOutsideCurrentPageSpan = renderObj.startOfRender < currentPageSpan.min || renderObj.endOfRender > currentPageSpan.max;
        
        if (matchIsOutsideCurrentPageSpan) {
            setShownLines(filteredFileLines.slice(linesPerPage * renderObj.startOfRender, linesPerPage * renderObj.endOfRender));
            setCurrentPageSpan({ min: renderObj.startOfRender, max: renderObj.endOfRender });
        }
        setMonaaMatchIndex(-1); //set to -1 to trigger a scroll to the first match (when use effect on LogTable sets it to 0 after this)
    }

    async function callMonaa(tre: string) {
        setLoading(true);
        if (!uploadedFile) return; //should never happen
        try {
            const startTime = performance.now(); //start Monaa call
            const formattedLog = await LogFormatter.formatLog(uploadedFile, mappings);
            const formattedFile = await getFileLines(formattedLog);
            const monaaZones = await QueryHandler.search(tre, formattedFile, fileLines, mappings);
            setMatches(monaaZones);
            findFirstMatch(monaaZones);
            const endTime = performance.now(); //End of Monaa call
            const duration = endTime - startTime;
            setLoading(false);
            Store.addNotification({
                title: `Monaa searh for pattern: ${tre}`,
                message: `Found ${monaaZones.length} matches in ${(duration / 1000).toFixed(1)} seconds`,
                type: `${monaaZones.length > 0 ? "success" : "warning"}`,
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        } catch (e) {
            setLoading(false)
            setError({
                title: "Error during regex search in file! Try searching again...",
                errorString: "An error occured during the timed regex search in the file <br /> <br />" + e,
                callback: null,
                callbackTitle: null,
                isDismissible: true
            })
        }
    }

    return (
        <Tooltip tooltip={tooltip}>
            <form className="w-[40vw] mx-auto" onSubmit={handleSubmit}>
                <div className="relative">
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        className="block w-full p-4 text-sm text-gray-900 bg-white border border-gray-600 rounded-lg ps-10 focus:ring-time-trace focus:border-time-trace"
                        placeholder='Enter TRE...'
                        name="TRE"
                        value={tre}
                        onChange={(e) => setTre(e.target.value)}
                        required
                    />
                    <Button style={{ style: 'absolute end-2.5 bottom-2.5 px-4 py-2' }} type='submit'>Search</Button>
                </div>
            </form>
        </Tooltip>
    );
}

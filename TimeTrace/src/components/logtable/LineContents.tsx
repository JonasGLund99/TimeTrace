import { useContext } from 'react';
import { FileLine } from '../../models/Types/FileLine';
import { cn } from '../../models/helpers/cn';
import { AppdataContext } from '../../context/AppContext';
import FileUpload from '../FileUpload';

interface LineContentsProps {
    lineIsHighlighted: (line: number) => boolean;
    eventIsMapped: (fileLine: FileLine) => boolean;
    shownLines: FileLine[];
    filteredFileLines: FileLine[];
    fileLines: string[];
}

function LineContents({ lineIsHighlighted, eventIsMapped, shownLines, filteredFileLines, fileLines }: LineContentsProps) {
    const { uploadedFile } = useContext(AppdataContext);
    return (
        <div className={cn(
            filteredFileLines.length === 0
                ? "items-center justify-center"
                : "",
            "flex flex-col grow"
        )}
        >
            {uploadedFile === null && (
                <div className="flex items-center justify-center w-4/5 h-4/5 ">
                    <FileUpload asDragAndDrop={true} />
                </div>
            )}
            {filteredFileLines.length === 0 && fileLines.length === 0 && uploadedFile !== null && (
                <div className="p-10 text-2xl font-medium text-center align">
                    No events found! Try searching again...
                </div>
            )}
            {shownLines.map((fileLine: FileLine, i: number) => {
                return <pre key={i} className={cn(
                    lineIsHighlighted(fileLine.line)
                        ? eventIsMapped(fileLine) ? "bg-yellow-200" : "bg-yellow-100"
                        : "even:bg-white odd:bg-gray-100",
                    "w-full py-2 "
                )}>{`${fileLines[fileLine.line]}`} </pre>;
            })}
        </div>
    );
}

export default LineContents;
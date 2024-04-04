import { FileLine } from '../../models/Types/FileLine';
import { cn } from '../../models/helpers/cn';
import FileUploadButton from '../FileUploadButton';

interface LineContentsProps {
    lineIsHighlighted: (line: number) => boolean;
    eventIsMapped: (event: string) => boolean;
    shownLines: FileLine[];
    filteredFileLines: FileLine[];
    fileLines: string[];
}

function LineContents({ lineIsHighlighted, eventIsMapped, shownLines, filteredFileLines, fileLines }: LineContentsProps) {
    return (
        <div className={cn(
            filteredFileLines.length === 0 
                ? "items-center justify-center"
                : "",
            "flex flex-col grow"
            )}
        >
            {filteredFileLines.length === 0 && 
                <div className="text-2xl font-medium text-center align">
                    {!fileLines.length ? 
                        <div className="flex flex-col items-center justify-center gap-4">
                            Upload a file to get started!
                            <FileUploadButton />
                        </div>
                        : "No events found! Try searching again..."
                    }
                </div>
            }
            {shownLines.map((fileLine: FileLine, i: number) => {
                return <pre key={i} className={cn(
                    lineIsHighlighted(fileLine.line)
                        ? eventIsMapped(fileLine.text) ? "bg-yellow-200" : "bg-yellow-100"
                        : "even:bg-white odd:bg-gray-100",
                    "w-full py-2 "
                )}>{`${fileLines[fileLine.line]}`} </pre>;
            })}
        </div>
    );
}

export default LineContents;
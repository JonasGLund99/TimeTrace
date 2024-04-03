import { FileLine } from '../../models/Types/FileLine';
import { cn } from '../../models/helpers/cn';

interface LineNumbersProps {
    lineIsHighlighted: (line: number) => boolean;
    eventIsMapped: (event: string) => boolean;
    shownLines: FileLine[];
}

function LineNumbers({ lineIsHighlighted, eventIsMapped, shownLines }: LineNumbersProps) {
    return (
        <div id="lineNumber-container" className="sticky left-0">
            {shownLines.map((fileLine: FileLine) => {
                return <pre key={fileLine.line} className={cn(
                    lineIsHighlighted(fileLine.line)
                        ? eventIsMapped(fileLine.text) ? "bg-yellow-200" : "bg-yellow-100"
                        : "even:bg-white odd:bg-gray-100",
                    "py-2 pl-3"
                )}>{`${fileLine.line + 1}: `}  </pre>;
            })}
        </div>
    );
}

export default LineNumbers;
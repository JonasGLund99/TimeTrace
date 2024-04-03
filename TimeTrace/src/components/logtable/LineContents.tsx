import { FileLine } from '../../models/Types/FileLine';
import { cn } from '../../models/helpers/cn';

interface Props {
    lineIsHighlighted:(line: number) => boolean;
    eventIsMapped:(event: string) => boolean;
    mappingsAreEditable: boolean;
    shownLines: FileLine[];
    filteredFileLines: FileLine[];
    fileLines: string[];
}

function LineContents(props: Props) {
    const lineIsHighlighted = props.lineIsHighlighted;
    const eventIsMapped = props.eventIsMapped;
    const shownLines = props.shownLines;
    const filteredFileLines = props.filteredFileLines;
    const fileLines = props.fileLines;

    return (
        <div className="flex flex-col grow">
            {filteredFileLines.length === 0 ? (
                <h3 className="self-center text-2xl font-medium text-center align">
                    No events were found.
                </h3>
            ) : null}
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
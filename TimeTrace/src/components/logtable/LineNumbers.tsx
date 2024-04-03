import { FileLine } from '../../models/Types/FileLine';
interface Props {
    lineIsHighlighted:(line: number) => boolean;
    eventIsMapped:(event: string) => boolean;
    classNames:(...classes: String[]) => string;
    mappingsAreEditable: boolean;
    shownLines: FileLine[];
}

function LineNumbers(props: Props) {
    const lineIsHighlighted = props.lineIsHighlighted;
    const eventIsMapped = props.eventIsMapped;
    const classNames = props.classNames
    const shownLines = props.shownLines;

    return (
        <div id="lineNumber-container" className="sticky left-0">
            {shownLines.map((fileLine: FileLine) => {
                return <pre key={fileLine.line} className={classNames(
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
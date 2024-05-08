import { useEffect, useState } from "react";
import Collapsible from '../components/Collapsible';
import CloseAllIcon from '../components/svgs/CloseAllIcon';
import OpenAllIcon from "../components/svgs/OpenAllIcon";
import Button from "../components/button/Button";

function Home() {
    const [collapseAll, setCollapseAll] = useState(false);

    function handleCollapseAll() {
        setCollapseAll(!collapseAll);
    }
    function handleOnBeforeUnload(e: BeforeUnloadEvent) {
        e.preventDefault();
        return (e.returnValue = '');
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
        return () => {
            window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true });
        }
    }, [])

    //TODO ref tags to different section and add pictures with the updated information.
    return (
        <div className="flex flex-row justify-center h-full overflow-auto pt-14">
            <div className="relative w-[90%] h-full rounded-lg items-center flex flex-col ">
                <Button style={{ style: "absolute right-0 flex items-center gap-4 p-3 text-gray-100 -top-10" }} onClick={handleCollapseAll}>
                    {collapseAll ? (
                        <p>Close all</p>
                    ) : (
                        <p>Open all</p>
                    )}
                    {collapseAll ? (
                        <CloseAllIcon />
                    ) : (
                        <OpenAllIcon />
                    )}
                </Button>

                <Collapsible label="Welcome to TimeTrace" isOpen={collapseAll}>
                    <div className="">
                        <h3 className="text-xl font-semibold">Welcome!</h3>
                        <p>
                            Welcome to TimeTrace, your solution for streamlined log analysis. In the vast realm of data, TimeTrace serves as your reliable guide, meticulously sorting through logs to reveal valuable insights. Our advanced technology ensures rapid and accurate pattern recognition, enabling you to uncover meaningful information effortlessly. Explore the capabilities of TimeTrace as we transform log analysis, combining professionalism with efficiency. Discover the power of TimeTrace and unleash the full potential of your data.
                        </p>
                        <br />
                        <h3 className="text-xl font-semibold">What can I do with TimeTrace</h3>
                        <ul className="pl-8 list-disc">
                            <li>Efficiently search for timed patterns in your extensive log files</li>
                            <li>Analyze your time series data for specific timed patterns</li>
                            <li>Effectively find errors from the vast amount of data your system creates in the form of log files</li>
                            <li>And much more</li>
                        </ul>
                        <br />
                        <h3 className="text-xl font-semibold">To come!</h3>
                        <ul className="pl-8 list-disc">
                            <li>Live data pattern matching</li>
                        </ul>
                    </div>


                </Collapsible>
                <Collapsible label="How to get started" isOpen={collapseAll}>
                    <h3 className="text-xl font-semibold">To get started</h3>
                    <p>
                        To get started with TimeTrace as your tool for searching and analysing your log files or time series data, upload a file. The uploaded log file must be either a .txt file or a .log file. If the log file or time series data is not in one of the following formats, you will have to convert your data to one of these supported formats.                    </p>
                    <br />
                    <br />
                    <h4 className="text-lg font-semibold">Uploading a file</h4>
                    <p>
                        When navigating to the mappings page, the screen below will be visible.
                    </p>
                    <img className="w-3/4 h-auto my-4 " src="./assets/getstarted_1.png" alt="uploading file" />
                    A file can either be uploaded by pressing the upload button or dragging a file over the drop zone
                    <br />
                    <br />
                    <h4 className="text-lg font-semibold">Mapping your events</h4>
                    <p>
                        After uploading a file, create the mappings for your events. The value to which you map your event has to be one character from 'a' to 'y' or 'A' to 'Y'. This means that you can map a total of 50 events to values. This restriction comes from the underlying search engine Monaa, whose documentation you can view
                        <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://monaa.readthedocs.io/en/latest/">here</a>. Note that the characters 'z' and 'Z' are reserved values. 'z' will be used as the mapped value for all mapped and unmapped events on the search page, while 'Z' will be used as the map value for all unmapped events.
                    </p>
                    <br />
                    <br />
                    <img className="w-3/4 h-auto my-4 " src="./assets/getstarted_2.png" alt="uploading file" />
                    <br />
                    <br />
                    On the left, the created mappings can be seen, and on the right, new mappings can be created. Here, assigning a mapping value to a line will map each identical event to this value. To delete an event, press the trash can. In the standard search setting, you can search for the event that you wish to find and map to a value.
                    Switching to the advanced search mode with regex allows you to create mappings based on regex patterns. To learn more about regex patterns, <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://regexr.com/">click here</a>.
                    <br />
                    <br />
                    <img className="w-3/4 h-auto my-4 " src="./assets/getstarted_3.png" alt="uploading file" />
                    <br />
                    <br />
                    When mapping events to values using a regex search pattern, all events matching this pattern will be given that mapped value.
                    Please note, if two mappings created with regex search patterns overlap, there will be no overwrite of the first mapped search pattern.
                    Furthermore, the individual mappings created below the overview that match all identical events will take precedence if they are to be matched and mapped during advanced search with regex.
                    <br />
                    <br />
                    <h4 className="text-lg font-semibold">Searching for patterns in your file</h4>
                    When you have created the mappings of the events you wish to base your search/analysis upon, navigate to the View Log page.
                    <br />
                    <br />
                    <img className="w-3/4 h-auto my-4 " src="./assets/getstarted_4.png" alt="uploading file" />
                    <br />
                    <br />
                    To start searching for patterns in your log file, simply create a timed regular expression. The syntax for searching for patterns in your log is different from the previously mentioned regex patterns. Here, the syntax is specific to the underlying engine Monaa. For more information on the Monaa syntax, <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://monaa.readthedocs.io/en/latest/">click here</a>.
                    After pressing search, the timed regular expression and the mapped file are processed, and the matches will be represented in the overview below the search bar. Here, the matches will be highlighted.
                    <br />

                    <br />
                    <img className="w-3/4 h-auto my-4 " src="./assets/getstarted_5.png" alt="uploading file" />
                    <br />
                    <br />
                    To help search for patterns in your log file, four predefined TRE structures are defined: Timed Event, Within, Sequential, and Timed Sequential. Below, Timed Event is presented. Here, input fields guide you for the input of events and time restraint. In the given example, 's' is used as the unit for the time constraint. Available units are [ms (millisecond), s (second), m (minute), h (hour), d (day)]. The default time unit is ms.
                    <br />
                    <br />
                    <img className="w-3/4 h-auto my-4 " src="./assets/getstarted_6.png" alt="uploading file" />
                    <br />
                    <br />
                </Collapsible>

                <Collapsible label="Guide to regex" isOpen={collapseAll}>
                    <div id="regex-section">

                        <div className="mb-4">
                            <p>Before exploring TimeTrace's advanced features for time tracking and data analysis, it's helpful to understand the basics of regular expressions to enhance its utility.</p>
                        </div>

                        <h2 className="mb-4 text-xl font-bold">Beginner's Guide to Regular Expressions (Regex)</h2>

                        <div className="mb-4">
                            <h3 className="font-bold">What is Regex?</h3>
                            <p className="mb-2">Regular expressions, commonly known as regex, are sequences of characters that define a search pattern. They are powerful tools used for pattern matching in strings. With regex, you can search, extract, and manipulate text based on these patterns.</p>
                            <p className="mb-2">Regex allows for the specification of complex patterns that define the structure of the text being searched. This flexibility enables tasks ranging from simple operations, like finding instances of specific words or phrases, to more complex operations, such as extracting data in a specific format from large datasets.</p>
                            <p className="mb-2">Due to their efficiency and versatility, regex are widely used in various fields, including software development, data analysis, text mining, and bioinformatics. They provide a way to efficiently handle text processing tasks that would otherwise be time-consuming or error-prone if done manually.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Basic Syntax:</h3>
                            <ul className="pl-8 list-disc">
                                <li>Literals: Characters that match themselves, e.g., <code>a</code> matches the letter 'a'.</li>
                                <li>Metacharacters: Special characters with predefined meanings, such as <code>.</code> (matches any single character) and <code>*</code> (matches zero or more occurrences).</li>
                                <li>Character Classes: Sets of characters enclosed in square brackets, e.g., <code>[aeiou]</code> matches any vowel.</li>
                                <li>Anchors: Specify the position in the text where the match must occur, such as <code>^</code> (start of string) and <code>$</code> (end of string).</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Common Quantifiers:</h3>
                            <ul className="pl-8 list-disc">
                                <li><code>*</code>: Zero or more occurrences.</li>
                                <li><code>+</code>: One or more occurrences.</li>
                                <li><code>?</code>: Zero or one occurrence.</li>
                                <li><em>n</em>: Exactly <em>n</em> occurrences.</li>
                                <li><em>n,</em>: At least <em>n</em> occurrences.</li>
                                <li><em>n,m</em>: Between <em>n</em> and <em>m</em> occurrences.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Modifiers:</h3>
                            <ul className="pl-8 list-disc">
                                <li><code>i</code>: Case-insensitive matching.</li>
                                <li><code>g</code>: Global matching (find all matches rather than stopping after the first match).</li>
                                <li><code>m</code>: Multiline matching (treats beginning and end characters (^ and $) as working across multiple lines).</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Common Escapes:</h3>
                            <ul className="pl-8 list-disc">
                                <li><code>\d</code>: Digit character.</li>
                                <li><code>\w</code>: Word character (alphanumeric or underscore).</li>
                                <li><code>\s</code>: Whitespace character.</li>
                                <li><code>\b</code>: Word boundary.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Examples:</h3>
                            <p>To match a date in the format <code>YYYY-MM-DD</code>: <code>\d{4}-\d{2}-\d{2}</code></p>
                            <p>To match an email address: <code>\w+@\w+\.\w+</code></p>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Another Example:</h3>
                            <p className="mb-2">Let's use regex to identify any words starting with the letter 'b' in the following text:</p>
                            <p className="mb-2">"The big brown bear walked by the beautiful riverbank, where it found a bunch of berries."</p>
                            <p className="mb-2">Using the regex <code>\b(b\w+)\b</code>, we can identify the following words starting with 'b': <strong>big</strong>, <strong>brown</strong>, <strong>bear</strong>, <strong>by</strong>, and <strong>berries</strong>.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-bold">Resources:</h3>
                            <ul className="pl-8 list-disc">
                                <li><a className="text-time-trace" target="_blank" rel="noreferrer" href="https://www.regular-expressions.info/">Regular-Expressions.info</a> - Comprehensive regex tutorial and reference.</li>
                                <li><a className="text-time-trace" target="_blank" rel="noreferrer" href="https://regexr.com/">RegExr</a> - Online regex tester and debugger.</li>
                            </ul>
                        </div>
                    </div>
                </Collapsible>

                <Collapsible label="Monaa syntax for timed regular expresions" isOpen={collapseAll}>
                    <div id="timed-regex-section" className="p-4">
                        <h2 className="mb-4 text-xl font-bold">Timed Regular Expressions</h2>

                        <div className="mb-4">
                            <p className="mb-2">This section illustrates the utilisation of timed regular expressions in MONAA. The syntax provided is identical to the underlying workings of MONAA. The documented work of Monaa can be seen at this <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://monaa.readthedocs.io/en/latest/TRE/">webpage</a>.</p>
                        </div>

                        <h2 className="mb-4 text-xl font-bold">Timed Regular Expressions in MONAA</h2>

                        <div className="mb-4">
                            <p className="mb-2">In MONAA, timed regular expressions are translated into timed automata for pattern matching. The supported syntax for timed regular expressions includes:</p>

                            <pre className="p-4 bg-gray-100 rounded-md">
                                <code>
                                    expr : c (An event) <br />
                                    | ( expr ) (Grouping) <br />
                                    | expr + (Kleene Plus) <br />
                                    | expr * (Kleene Star) <br />
                                    | expr expr (Concatenation) <br />
                                    | expr | expr (Disjunction) <br />
                                    | expr & expr (Conjunction) <br />
                                    | expr % (s,t) (Time Restriction) <br />
                                </code>
                            </pre>
                            <p className="mb-2">Advanced specifications of the theory of timed regular expressions can be further explored in this <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://monaa.readthedocs.io/en/latest/TRE/">paper</a>, by Eugene Asarin, Paul Caspi, and Oded Maler</p>
                        </div>

                        <div className="mb-4">
                            <p className="mb-2">An event in MONAA can be represented by a single character of the English alphabet [a-z, A-Z]. Therefore, MONAA can define 52 events. In TimeTrace, only 50 events can be represented with these mapping values, as 'z' and 'Z' are reserved keywords for all events and all unmapped events accordingly.</p>
                        </div>

                        <h2 className="mb-4 text-xl font-bold">Examples of patterns search</h2>

                        <div className="mb-4">
                            <p className="mb-2">The following expressions demonstrate timed pattern searches in MONAA:</p>

                            <div className="mb-4">
                                <h3 className="font-bold">Example 1:</h3>
                                <p className="mb-2">This expression matches consecutive occurrences of events A, B, and C such that the duration between A and B is less than 1 and the duration between B and C is more than 1.</p>
                                <pre className="p-4 bg-gray-100 rounded-md">'(((AB)%(0,1)C)&(A(BC)%(1,20)))$'</pre>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-bold">Example 2:</h3>
                                <p className="mb-2">This expression matches consecutive occurrences of events A, B, and C such that the blank interval after C is longer than 1.</p>
                                <pre className="p-4 bg-gray-100 rounded-md">'ABC($)%(1,20)'</pre>
                            </div>
                        </div>

                    </div>
                </Collapsible>

                <Collapsible label="Video guide" isOpen={collapseAll}>
                    <div className="flex justify-center p-4 border-black border-y-2">
                        <video width="80%" height="80%" controls>
                            <source src="./assets/tutorial.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </Collapsible>

                <Collapsible label="Official links" isOpen={collapseAll}>

                    <h2 className="mb-4 text-2xl font-bold">Links you might find usefull</h2>
                    <div className="mb-4">
                        <h3 className="font-bold">TimeTrace Links:</h3>
                        <ul className="pl-8 list-disc">
                            <li className="mb-2">
                                Link to TimeTrace Github: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://github.com/JonasGLund99/TimeTrace?tab=readme-ov-file">TimeTrace Github repository</a>
                            </li>
                            <li className="mb-2">
                                Link to TimeTrace paper: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://www.overleaf.com/read/vvptqndjnkpp#253802">TimeTrace Official Paper</a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold">Monaa Links:</h3>
                        <ul className="pl-8 list-disc">
                            <li className="mb-2">
                                Link to Monaa's official webpage: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://monaa.readthedocs.io/en/latest/TRE/">Monaa webpage</a>
                            </li>
                            <li className="mb-2">
                                Link to Monaa paper: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8429481">Monaa paper</a>
                            </li>
                            <li className="mb-2">
                                Link to paper on Monaa's underlying algorithm: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://arxiv.org/pdf/1706.09174.pdf">paper on Monaa algorithm</a>
                            </li>
                            <li className="mb-2">
                                Link to Monaa Github: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://github.com/MasWag/monaa">Monaa Github repository</a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold">Additional Relevant Links:</h3>
                        <ul className="pl-8 list-disc">
                            <li className="mb-2">
                                Link to regex tool for debugging and testing regex patterns: <a className="text-time-trace" target="_blank" rel="noreferrer" href="https://regexr.com/">regex tool</a>
                            </li>
                        </ul>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}


export default Home;

import { useEffect, useState } from "react";
import Collapsible from '../components/Collapsible';
import CloseAllIcon from '../components/svgs/CloseAllIcon';
import OpenAllIcon from "../components/svgs/OpenAllIcon";
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
        <div className="flex flex-row justify-center h-full mt-20 overflow-auto">
            <button className="absolute justify-end p-2 text-gray-300 rounded-xl top-5 right-5 bg-slate-800" onClick={handleCollapseAll}>
                {collapseAll ? (
                    <CloseAllIcon />
                ) : (
                    <OpenAllIcon />
                )}
            </button>
            <div className="w-[90%] h-full  rounded-lg items-center flex flex-col ">
                <Collapsible label="Welcome to TimeTrace" isOpen={collapseAll}>
                    <div className="">
                        <h3 className="text-xl font-semibold">Welcome!</h3>
                        <p>
                            Welcome to Timetrace, your premier solution for efficient log analysis. In the vast expanse of data, Timetrace stands as your trusted navigator, meticulously sifting through logs to unveil valuable insights. Our cutting-edge technology ensures swift and precise pattern recognition, empowering you to extract meaningful information with unparalleled efficiency. Join us as we redefine the landscape of log analysis, where professionalism meets proficiency. Experience the power of Timetrace and unlock the true potential of your data.
                        </p>
                        <br />
                        <h3 className="text-xl font-semibold">What can i do with TimeTrace</h3>
                        <li>Effeciently search for patterns in your big log files </li>
                        <li>Analyse your timeseries data for specific patterns </li>
                        <li>Effectivly find errors from the wast amount of data your system creates in form of logfiles</li>
                        <br />
                        <li>And much more</li>
                    </div>
                </Collapsible>
                <Collapsible label="How to get started" isOpen={collapseAll}>
                    <h3 className="text-xl font-semibold">To get started</h3>
                    <p>
                        To get started with TimeTrace as your tool for searching and analyzing in your logfile or timeseries data, upload a file. The uploaded logfile must be either a .txt file or a .log file. If the logfile og timeseries is not in one of the following formats, you will have to convert your data to one of these supported formats.
                        <br />
                        <br />
                        <h4 className="text-lg font-semibold">Uploading a file</h4>
                        Navigating to the mappings page the below screen will be seen.
                        <img height={600} width={750} src="https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg" alt="uploading file" />
                        A file can either be uploaded by pressing the upload button dragging a file over the drop zone.
                        <br />
                        <br />
                        <h4 className="text-lg font-semibold">Mapping your events</h4>
                        After uploading a file create the mappings of your events. The value to which you map your event have to be one charater from <span className="font-semibold">a-y or A-Y</span>. This means that you can map a total of 50 event to value.
                        This restriction comes from the underlying search engine Monaa, which dokumentation your can view <a className="text-blue-600" href="https://monaa.readthedocs.io/en/latest/">here</a>. Remark that the character z and Z are reserved values. Both will be used in the search page, where z are the mapped value of all mapped and unmapped events. The Z value are used as map value for all unmapped events.
                        <br />
                        <br />
                        <img height={600} width={750} src="https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg" alt="uploading file" />
                        <br />
                        <br />
                        On the left the mapping created can be seen and on the right mappings can be created. Here giving a line a mapping value will map each identical event to this value. To delete and event press the trashcan. In the standard search setting you can search for the event that your which to find and map to value.
                        Switching to the advanced search mode with regex allows you to create mapping based on regex patterns. To learn more about regex patterns <a className="text-blue-600" href="https://regexr.com/">click here</a>.
                        <br />
                        <br />
                        <img height={600} width={750} src="https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg" alt="uploading file" />
                        <br />
                        <br />
                        When mapping event to value mapping value with a regex search pattern all events matching this pattern will be given that map value.
                        Notice, if two mappings created with regex search patterns are made and some event overlap, there will be no overwrite of the first mapped search pattern.
                        Furthermore the single mappings created below the overview that mathces all indetical event, will overrule if they should be matched and mapped during advanced search with regex
                        <br />
                        <br />
                        <h4 className="text-lg font-semibold">Searching for patterns in your file</h4>
                        When you have created the mappings of the events you wish to base your search/analyzis upon, navigate the View log page.
                        <br />
                        <br />
                        <img height={600} width={750} src="https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg" alt="uploading file" />
                        <br />
                        <br />
                        To start searching for the patterns in your logfile you simply create a timed regular expression. The syntax for searching for patters in your log i different from the previousely mentioned regex patterns. Here the syntax are specific to the underlying engine Monaa. For more information of the Monaa syntax <a className="text-blue-600" href="https://monaa.readthedocs.io/en/latest/">click here</a>.
                        After pressing search the timed regular expression and the mapped file are prossesed the matches will be represented in the overview below the searchbar. Here the matches will be highligted.
                        <br />
                        <br />
                        <img height={600} width={750} src="https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg" alt="uploading file" />
                        <br />
                        <br />
                    </p>
                </Collapsible>

                <Collapsible label="Guide to regex" isOpen={collapseAll}>
                    <p id="regex-section">

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
                                <li><a className="text-blue-600" href="https://www.regular-expressions.info/">Regular-Expressions.info</a> - Comprehensive regex tutorial and reference.</li>
                                <li><a className="text-blue-600" href="https://regexr.com/">RegExr</a> - Online regex tester and debugger.</li>
                            </ul>
                        </div>
                    </p>
                </Collapsible>

                <Collapsible label="Monaa syntax for timed regular expresions" isOpen={collapseAll}>
                    <div id="timed-regex-section" className="p-4">
                        <h2 className="mb-4 text-xl font-bold">Timed Regular Expressions</h2>

                        <div className="mb-4">
                            <p className="mb-2">This section illustrates the utilization of timed regular expressions in MONAA. The syntax provided is identical to the underlying workings of MONAA. The documented work of Monaa can be seen at this <a className="text-blue-600" href="https://monaa.readthedocs.io/en/latest/TRE/">webpage</a>.</p>
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
                            <p className="mb-2">Advanced specifications of the theory of timed regular expressions can be further explored in this <a className="text-blue-600" href="https://monaa.readthedocs.io/en/latest/TRE/">paper</a>, by Eugene Asarin, Paul Caspi, and Oded Maler</p>
                        </div>

                        <div className="mb-4">
                            <p className="mb-2">An event in Monaa can be representet by a single character of the english alfabet [a-z,A-Z], thereby Monaa can define 52 events. In TimeTrace only 50 events can be representet with these mapping value, as z and Z are reserved keywords for all event and all umapped event acordingly.</p>
                        </div>

                        <h2 className="mb-4 text-xl font-bold">Examples of patterns search</h2>

                        <div className="mb-4">
                            <p className="mb-2">The following expressions demonstrate pattern searches:</p>

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
                    <div className="flex justify-center">
                        <video width="80%" height="80%" controls>
                            <source src="movie.mp4" type="video/mp4" />
                            <source src="movie.ogg" type="video/ogg" />
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
                                Link to TimeTrace Github: <a className="text-blue-600" href="https://github.com/JonasGLund99/TimeTrace?tab=readme-ov-file">TimeTrace Github repository</a>
                            </li>
                            <li className="mb-2">
                                Link to TimeTrace paper: <a className="text-blue-600" href="https://www.overleaf.com/project/65c49b8b5ae83f8a929e1371">TimeTrace Official Paper</a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold">Monaa Links:</h3>
                        <ul className="pl-8 list-disc">
                            <li className="mb-2">
                                Link to Monaa's official webpage: <a className="text-blue-600" href="https://monaa.readthedocs.io/en/latest/TRE/">Monaa webpage</a>
                            </li>
                            <li className="mb-2">
                                Link to Monaa paper: <a className="text-blue-600" href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8429481">Monaa paper</a>
                            </li>
                            <li className="mb-2">
                                Link to paper on Monaa's underlying algorithm: <a className="text-blue-600" href="https://arxiv.org/pdf/1706.09174.pdf">paper on Monaa algorithm</a>
                            </li>
                            <li className="mb-2">
                                Link to Monaa Github: <a className="text-blue-600" href="https://github.com/MasWag/monaa">Monaa Github repository</a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold">Additional Relevant Links:</h3>
                        <ul className="pl-8 list-disc">
                            <li className="mb-2">
                                Link to regex tool for debugging and testing regex patterns: <a className="text-blue-600" href="https://regexr.com/">regex tool</a>
                            </li>
                        </ul>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}


export default Home;

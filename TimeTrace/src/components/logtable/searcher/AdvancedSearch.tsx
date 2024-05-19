import { FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { AppdataContext } from "../../../context/AppContext";
import { CustomMap } from "../../../models/Types/EventMapping";
import Button from "../../button/Button";
import { ButtonStyle } from "../../button/IButtonProps";
import { IntervalClass, OverClass, PredefinedRE, PredefinedREType } from "../../predefined-res/PredefinedREs";
import Over from "../../predefined-res/Over";
import Interval from "../../predefined-res/Interval";

interface SearcherProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    searchLog: (qry: string) => void;
}

function AdvancedSearch({searchQuery, setSearchQuery, searchLog}: SearcherProps) {
    const {mappings, setMappings} = useContext(AppdataContext);
    const [regexMapValue, setRegexMapValue] = useState('');
    const { setError } = useContext(AppdataContext)
    const { setModal } = useContext(AppdataContext);

    function mapEventsUsingRegex() {
        const regex = searchQuery;
        const mapValue = regexMapValue;
        let errorStr: string = "";
        if (regex === "") 
            errorStr = "Write regex before mapping events or go to standard search";
        else if (mapValue === "")
            errorStr = "Make sure to input a map value that the matches of the regex should be mapped"
        else if (!mapValue.match(/[a-yA-Y]/gi))
            errorStr = "Map value must be a single character from a to y or A to Y"
        
        if (errorStr !== "") {
            setError({
                title: "Error during mapping",
                errorString: errorStr,
                callback: null,
                callbackTitle: null,
                isDismissible: true
            })
            return
        }
            
        mappings.setRegex(regex, mapValue)
        const newMappings = new CustomMap(mappings)
        setMappings(newMappings)
    }

    function listenForEnter(keyPress: React.KeyboardEvent<HTMLInputElement>) {
        if(keyPress.key === "Enter")
            searchLog(searchQuery)
    }

    function insertPredefRE(predefinedRE: PredefinedRE) {
        const newSearchQuery = searchQuery + predefinedRE.insertRE(); 
        setSearchQuery(newSearchQuery);
        setModal(null);
    }

    function createModalObject(predefREType: PredefinedREType) {
        let predefinedRE: ReactNode;
        let modalTitle: string = '';
        switch(predefREType) {
            case PredefinedREType.InclusiveOver:
                let inclusiveOver = new OverClass(true);
                modalTitle = inclusiveOver.title;
                predefinedRE = <Over reObject={inclusiveOver} onSubmit={(e: FormEvent) => {e.preventDefault(); insertPredefRE(inclusiveOver)}} closeRE={() => { setModal(null); } }/>
                break;
            case PredefinedREType.StrictOver:
                let strictOver = new OverClass(false);
                modalTitle = strictOver.title;
                predefinedRE = <Over reObject={strictOver} onSubmit={(e: FormEvent) => {e.preventDefault(); insertPredefRE(strictOver)}} closeRE={() => { setModal(null); } }/>
                break;
            case PredefinedREType.Interval:
                let interval = new IntervalClass();
                modalTitle = interval.title;
                predefinedRE = <Interval reObject={interval} onSubmit={(e: FormEvent) => {e.preventDefault(); insertPredefRE(interval)}} closeRE={() => { setModal(null); } }/>
                break;
            case PredefinedREType.StrictUnder:
                let strictUnder = new OverClass(true, undefined, true);
                modalTitle = strictUnder.title;
                predefinedRE = <Over reObject={strictUnder} onSubmit={(e: FormEvent) => {e.preventDefault(); insertPredefRE(strictUnder)}} closeRE={() => { setModal(null); } }/>
                break;
            case PredefinedREType.InclusiveUnder:
                let inclusiveUnder = new OverClass(false, undefined, true);
                modalTitle = inclusiveUnder.title;
                predefinedRE = <Over reObject={inclusiveUnder} onSubmit={(e: FormEvent) => {e.preventDefault(); insertPredefRE(inclusiveUnder)}} closeRE={() => { setModal(null); } }/>
                break;
            default:
                throw new Error("The predefined type of the TRE has not been defined in this switch case");
        }

        setModal({
            isDismissible: false,
            title: modalTitle,
            submitTitle: "Insert RE",
            children: predefinedRE,
            submitButtonType: "submit",
        })
    }

    return (
            <div>
                <div className="flex">
                    <div className="relative flex flex-col w-full gap-2">
                        <div id="predefined-re" className="flex self-center gap-2">
                            <Button buttonStyle={ButtonStyle.Modal} tooltip="RE to find greater or equal numbers." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedREType.InclusiveOver)}>Greater or Equal</Button>
                            <Button buttonStyle={ButtonStyle.Modal} tooltip="RE to find greater numbers." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedREType.StrictOver)}>Greater</Button>
                            <Button buttonStyle={ButtonStyle.Modal} tooltip="RE to find numbers in an interval." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedREType.Interval)}>Interval</Button>
                            <Button buttonStyle={ButtonStyle.Modal} tooltip="RE to find smaller numbers." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedREType.StrictUnder)}>Smaller</Button>
                            <Button buttonStyle={ButtonStyle.Modal} tooltip="RE to find smaller numbers." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedREType.InclusiveUnder)}>Smaller or Equal</Button>
                        </div>
                        <div className="relative flex">
                        <Button
                            buttonStyle={ButtonStyle.None}
                            style={{ style: "absolute top-0 left-0 h-full flex items-center justify-center px-2 rounded-l-lg bg-time-trace-dark hover:bg-time-trace" }}
                            onClick={() => searchLog(searchQuery)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.5 17.5l2.5 2.5"
                                    />
                            </svg>
                            </Button>
                                <input
                                id="regex-input"
                                type="text"
                                className="w-full pl-12 pr-2 border-2 border-gray-300 rounded-lg"
                                placeholder="Search using regex... e.g. gr(a|e)y"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => listenForEnter(e)}
                                ></input>
                                                    <input
                            id="map-regex-to-value"
                            className="w-20 px-2 mx-2 text-center border-2 border-gray-300 rounded-lg"
                            type="text"
                            placeholder="Map to.."
                            maxLength={1}
                            value={regexMapValue}
                            onChange={(e) => setRegexMapValue(e.target.value)}
                            />
                            <Button onClick={mapEventsUsingRegex} style={{style: 'relative'}} >
                                <label htmlFor="" className="px-6 rounded-md cursor-pointer">
                                    Confirm
                                </label>
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
    );
}

export default AdvancedSearch;
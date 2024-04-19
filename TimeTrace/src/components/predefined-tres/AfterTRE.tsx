import {useState } from "react";
import ModalInput from "../modal/ModalInput";
import { AfterTREclass } from "./PredefinedTREs";
import PredefinedTREButtonGroup from "./PredefinedTREButtonGroup";

interface AfterTREProps {
    treObject: AfterTREclass;
    onSubmit: () => void;
    closeTRE: () => void;
}

function AfterTRE({ treObject, onSubmit, closeTRE }: AfterTREProps) {
    const [TREObject, setTREObject] = useState<AfterTREclass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateTREObject() {
        setTREObject(new AfterTREclass(TREObject.input));
    }

    return (
        <form id="after-tre" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput tooltip="The first group of events you want to match." required={true} value={TREObject.input.firstGroup} onChange={(e) => { treObject.input.firstGroup = e.target.value; updateTREObject();}} label="First group of events" placeholder="Enter the first group of events" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput tooltip="The start" required={true} value={TREObject.input.startTime} onChange={(e) => { treObject.input.startTime = e.target.value; updateTREObject();}} label="Start time" placeholder="Enter the start time" ></ModalInput>
                    <ModalInput tooltip="The end" required={true} value={TREObject.input.endTime} onChange={(e) => { treObject.input.endTime = e.target.value; updateTREObject();}} label="End time" placeholder="Enter the end time" ></ModalInput>
                </div>
            </div>
            <PredefinedTREButtonGroup closeTRE={closeTRE}/>
        </form>
    )
}

export default AfterTRE;
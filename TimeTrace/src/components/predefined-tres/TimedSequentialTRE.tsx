import {useState } from "react";
import ModalInput from "../modal/ModalInput";
import PredefinedTREButtonGroup from "./PredefinedTREButtonGroup";
import { TimedSequentialClass } from "./PredefinedTREs";

interface TimedSequentialTREProps {
    treObject: TimedSequentialClass;
    onSubmit: () => void;
    closeTRE: () => void;
}

function TimedSequentialTRE({ treObject, onSubmit, closeTRE }: TimedSequentialTREProps) {
    const [TREObject, setTREObject] = useState<TimedSequentialClass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateTREObject() {
        setTREObject(new TimedSequentialClass(TREObject.input));
    }

    return (
        <form id="timed-seq-tre" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput tooltip="The first group of events you want to match." required={true} value={TREObject.input.firstGroup} onChange={(e) => { treObject.input.firstGroup = e.target.value; updateTREObject();}} label="First group of events" placeholder="Enter the first group of events" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput tooltip="The start" required={true} value={TREObject.input.firstStartTime} onChange={(e) => { treObject.input.firstStartTime = e.target.value; updateTREObject();}} label="Start time" placeholder="Enter the start time" ></ModalInput>
                    <ModalInput tooltip="The end" required={true} value={TREObject.input.firstEndTime} onChange={(e) => { treObject.input.firstEndTime = e.target.value; updateTREObject();}} label="End time" placeholder="Enter the end time" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput tooltip="The second group of events you want to match." required={true} value={TREObject.input.secondGroup} onChange={(e) => { treObject.input.secondGroup = e.target.value; updateTREObject();}} label="Second group of events" placeholder="Enter the second group of events" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput tooltip="The start" required={true} value={TREObject.input.secondStartTime} onChange={(e) => { treObject.input.secondStartTime = e.target.value; updateTREObject();}} label="Start time" placeholder="Enter the start time" ></ModalInput>
                    <ModalInput tooltip="The end" required={true} value={TREObject.input.secondEndTime} onChange={(e) => { treObject.input.secondEndTime = e.target.value; updateTREObject();}} label="End time" placeholder="Enter the end time" ></ModalInput>
                </div>
            </div>
            <PredefinedTREButtonGroup closeTRE={closeTRE}/>
        </form>
    )
}

export default TimedSequentialTRE;
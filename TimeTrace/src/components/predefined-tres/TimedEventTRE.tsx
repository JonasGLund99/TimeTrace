import {useState } from "react";
import ModalInput from "../modal/ModalInput";
import { TimedEventTREClass } from "./PredefinedTREs";
import FormButtonGroup from "../button/FormButtonGroup";

interface TimedEventTREProps {
    treObject: TimedEventTREClass;
    onSubmit: () => void;
    closeTRE: () => void;
}

function TimedEventTRE({ treObject, onSubmit, closeTRE }: TimedEventTREProps) {
    const [TREObject, setTREObject] = useState<TimedEventTREClass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateTREObject() {
        setTREObject(new TimedEventTREClass(TREObject.input));
    }

    return (
        <form id="after-tre" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput tooltip="The group of events you want to match." required={true} value={TREObject.input.firstGroup} onChange={(e) => { treObject.input.firstGroup = e.target.value; updateTREObject();}} label="Group of events" placeholder="Enter the group of events" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput tooltip="The start" required={true} value={TREObject.input.startTime} onChange={(e) => { treObject.input.startTime = e.target.value; updateTREObject();}} label="Start time" placeholder="Enter the start time" ></ModalInput>
                    <ModalInput tooltip="The end" required={true} value={TREObject.input.endTime} onChange={(e) => { treObject.input.endTime = e.target.value; updateTREObject();}} label="End time" placeholder="Enter the end time" ></ModalInput>
                </div>
            </div>
            <FormButtonGroup cancel={closeTRE} submitText="Insert TRE"/>
        </form>
    )
}

export default TimedEventTRE;
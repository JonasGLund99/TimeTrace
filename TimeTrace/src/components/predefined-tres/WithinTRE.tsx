import {useState } from "react";
import ModalInput from "../modal/ModalInput";
import { WithinTREClass } from "./PredefinedTREs";
import FormButtonGroup from "../button/FormButtonGroup";

interface IWithinTREProps {
    treObject: WithinTREClass;
    onSubmit: () => void;
    closeTRE: () => void;
}

function WithinTRE({ treObject, onSubmit, closeTRE }: IWithinTREProps) {
    const [TREObject, setTREObject] = useState<WithinTREClass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateTREObject() {
        setTREObject(new WithinTREClass(TREObject.input));
    }

    return (
        <form id="within-tre" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput tooltip="The first group of events you want to match." required={true} value={TREObject.input.firstGroup} onChange={(e) => { treObject.input.firstGroup = e.target.value; updateTREObject();}} label="First group of events" placeholder="Enter the first group of events" ></ModalInput>
                    <ModalInput tooltip="The second group of events you want to match." required={true} value={TREObject.input.secondGroup} onChange={(e) => { treObject.input.secondGroup = e.target.value; updateTREObject();}} label="Second group of events" placeholder="Enter the second group of events" ></ModalInput>
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

export default WithinTRE;
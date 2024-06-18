import {FormEvent, useState } from "react";
import ModalInput from "../modal/ModalInput";
import { OverClass } from "./PredefinedREs"; 
import FormButtonGroup from "../button/FormButtonGroup";

interface InclusiveOverProps {
    reObject: OverClass;
    onSubmit: (event: FormEvent) => void;
    closeRE: () => void;
}

function TimedSequentialTRE({ reObject, onSubmit, closeRE }: InclusiveOverProps) {
    const [REObject, setREObject] = useState<OverClass>(reObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateREObject() {
        setREObject(new OverClass(REObject.includesLowerBound, REObject.input));
    }

    return (
        <form id="interval-re" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput required={false} value={REObject.input.prependedText} onChange={(e) => {reObject.input.prependedText = String(e.target.value); updateREObject();}} label="Prepended text" placeholder="Optional text to prepend your RE" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput type="number" required={true} value={REObject.input.lowerBound} onChange={(e) => {reObject.input.lowerBound = String(e.target.value); updateREObject();}} label={reObject.label} placeholder="Enter the lower bound" ></ModalInput>
                </div>
            </div>
            <FormButtonGroup cancel={closeRE} submitText="Insert RE"/>
        </form>
    )
}

export default TimedSequentialTRE;
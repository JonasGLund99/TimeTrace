import {FormEvent, useState } from "react";
import ModalInput from "../modal/ModalInput";
import { IntervalClass } from "./PredefinedREs"; 
import FormButtonGroup from "../button/FormButtonGroup";
import { validateNumberInput } from "./numbersOnlyInput";

interface IntervalProps {
    reObject: IntervalClass;
    onSubmit: (event: FormEvent) => void;
    closeRE: () => void;
}

function TimedSequentialTRE({ reObject, onSubmit, closeRE }: IntervalProps) {
    const [REObject, setREObject] = useState<IntervalClass>(reObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateREObject() {
        setREObject(new IntervalClass(REObject.input));
    }

    return (
        <form id="interval-re" onSubmit={onSubmit} >
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput tooltip="Prepend the interval by some text" required={false} value={REObject.input.prependedText} onChange={(e) => { reObject.input.prependedText = e.target.value; updateREObject();}} label="Prepended text" placeholder="Optional text to prepend your interval" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput type="number" tooltip="The start of the interval" required={true} value={REObject.input.lowerBound} onChange={(e) => {if(!validateNumberInput(e.target.value)) return; reObject.input.lowerBound = String(e.target.value); updateREObject();}} label="Lower bound (Inclusive)" placeholder="Enter the start of the interval" ></ModalInput>
                    <ModalInput type="number" tooltip="The end of the interval" required={true} value={REObject.input.upperBound} onChange={(e) => { if(!validateNumberInput(e.target.value)) return; reObject.input.upperBound = String(e.target.value); updateREObject();}} label="Upper bound" placeholder="Enter the end of the interval" ></ModalInput>
                </div>
            </div>
            <FormButtonGroup cancel={closeRE} submitText="Insert RE"/>
        </form>
    )
}

export default TimedSequentialTRE;
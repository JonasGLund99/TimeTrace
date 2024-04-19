import {useState } from "react";
import ModalInput from "../modal/ModalInput";
import PredefinedTREButtonGroup from "./PredefinedTREButtonGroup";
import { SequentialTREClass } from "./PredefinedTREs";

interface SequentialTREProps {
    treObject: SequentialTREClass;
    onSubmit: () => void;
    closeTRE: () => void;
}

function SequentialTRE({ treObject, onSubmit, closeTRE }: SequentialTREProps) {
    const [TREObject, setTREObject] = useState<SequentialTREClass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateTREObject() {
        setTREObject(new SequentialTREClass(TREObject.input));
    }

    return (
        <form id="seq-tre" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput tooltip="The first group of events you want to match." required={true} value={TREObject.input.firstGroup} onChange={(e) => { treObject.input.firstGroup = e.target.value; updateTREObject();}} label="First group of events" placeholder="Enter the first group of events" ></ModalInput>
                    <ModalInput tooltip="The second group of events you want to match." required={true} value={TREObject.input.secondGroup} onChange={(e) => { treObject.input.secondGroup = e.target.value; updateTREObject();}} label="Second group of events" placeholder="Enter the second group of events" ></ModalInput>
                </div>
            </div>
            <PredefinedTREButtonGroup closeTRE={closeTRE}/>
        </form>
    )
}

export default SequentialTRE;
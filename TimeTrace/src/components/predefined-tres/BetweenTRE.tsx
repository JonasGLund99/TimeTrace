import { useEffect, useState } from "react";
import ModalInput from "../modal/ModalInput";
import { BetweenTREClass } from "./PredefinedTREs";
import Button from "../button/Button";
import { ButtonStyle } from "../button/IButtonProps";
import PredefinedTREButtonGroup from "./PredefinedTREButtonGroup";

interface IBetweenTREProps {
    treObject: BetweenTREClass;
    onSubmit: () => void;
    closeTRE: () => void;
}

function BetweenTRE({ treObject, onSubmit, closeTRE }: IBetweenTREProps) {
    const [TREObject, setTREObject] = useState<BetweenTREClass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateTREObject() {
        setTREObject(new BetweenTREClass(TREObject.input));
    }

    return (
        <form id="BetweenTRE" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <ModalInput required={true} value={TREObject.input.firstGroup} onChange={(e) => { treObject.input.firstGroup = e.target.value; updateTREObject();}} label="First group of events" placeholder="Enter the first group of events" ></ModalInput>
                    <ModalInput required={true} value={TREObject.input.secondGroup} onChange={(e) => { treObject.input.secondGroup = e.target.value; updateTREObject();}} label="Second group of events" placeholder="Enter the second group of events" ></ModalInput>
                </div>
                <div className="flex gap-4">
                    <ModalInput required={true} value={TREObject.input.startTime} onChange={(e) => { treObject.input.startTime = e.target.value; updateTREObject();}} label="Start time" placeholder="Enter the start time" ></ModalInput>
                    <ModalInput required={true} value={TREObject.input.endTime} onChange={(e) => { treObject.input.endTime = e.target.value; updateTREObject();}} label="End time" placeholder="Enter the end time" ></ModalInput>
                </div>
            </div>
            <PredefinedTREButtonGroup closeTRE={closeTRE}/>
        </form>
    )
}

export default BetweenTRE;
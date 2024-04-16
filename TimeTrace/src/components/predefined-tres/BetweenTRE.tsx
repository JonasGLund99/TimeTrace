import { useState } from "react";
import ModalInput from "../modal/ModalInput";
import { BetweenTREClass } from "./PredefinedTREs";

interface IBetweenTREProps {
    treObject: BetweenTREClass;
}

function BetweenTRE({ treObject }: IBetweenTREProps) {
    const [TREObject, setTREObject] = useState<BetweenTREClass>(treObject) // [0] = First group of events, [1] = Second group of events, [2] = Start time, [3] = End time

    function updateModalValue(index: number, value: string) {
        TREObject.input[index].value = value;
        setTREObject(new BetweenTREClass(TREObject.input));
    }


    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4">
                <ModalInput required={true} value={TREObject.input[0].value} onChange={(e) => updateModalValue(0, e.target.value)} label="First group of events" placeholder="Enter the first group of events" ></ModalInput>
                <ModalInput required={true} value={TREObject.input[1].value} onChange={(e) => updateModalValue(1, e.target.value)} label="Second group of events" placeholder="Enter the second group of events" ></ModalInput>
            </div>
            <div className="flex gap-4">
                <ModalInput required={true} value={TREObject.input[2].value} onChange={(e) => updateModalValue(2, e.target.value)} label="Start time" placeholder="Enter the start time" ></ModalInput>
                <ModalInput required={true} value={TREObject.input[3].value} onChange={(e) => updateModalValue(3, e.target.value)} label="End time" placeholder="Enter the end time" ></ModalInput>
            </div>
        </div>
    )
}

export default BetweenTRE;
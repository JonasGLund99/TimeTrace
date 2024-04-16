import { useEffect, useState } from "react";
import ModalInput from "../modal/ModalInput";
import { BetweenTREClass } from "./PredefinedTREs";
import Button from "../button/Button";
import { ButtonType } from "../button/IButtonProps";

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

    useEffect(() => {
        console.log(onSubmit);
    }, [])


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
                <div id="modal-button-container" className="flex justify-center pt-2">
                    <Button type="submit" buttonType={ButtonType.Modal}>
                        Insert TRE
                    </Button>
                    <Button buttonType={ButtonType.None} type="button" onClick={closeTRE} style={{style: 'text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800'}}>
                        Cancel
                    </Button>
                </div>
        </form>
    )
}

export default BetweenTRE;
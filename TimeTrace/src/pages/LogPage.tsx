import { useContext, useEffect, useState } from "react";
import LogTable from "../components/logtable/LogTable";
import SearchForm from "../components/SearchForm";
import { AppdataContext } from "../context/AppContext";
import { navigation } from "../components/Navbar";
import LogTableProvider from '../context/LogTableContext';
import Button from "../components/button/Button";
import { ButtonType } from "../components/button/IButtonProps";
import BetweenTRE from '../components/predefined-tres/BetweenTRE';
import { BetweenTREClass, IPredefinedTRE, PredefinedTre } from '../components/predefined-tres/PredefinedTREs';

function LogPage() {
    const { uploadedFile } = useContext(AppdataContext);
    const { setError } = useContext(AppdataContext);
    const { setModal } = useContext(AppdataContext);
    const { tre, setTre } = useContext(AppdataContext);



    function handleOnBeforeUnload(e: BeforeUnloadEvent) {
        e.preventDefault();
        return (e.returnValue = '');
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
    }, [])

    useEffect(() => {
        if (uploadedFile === null) {
            setError({
                title: "No file uploaded",
                errorString: "To be able to view the log and search, you must upload a file on the file upload page",
                callback: () => {
                    window.removeEventListener('beforeunload', handleOnBeforeUnload, { capture: true }); // Remove event listener
                    window.location.href = navigation.filter(x => x.name === "Create mappings")[0].href;
                },
                callbackTitle: "Go to Upload",
                is_dismissible: false
            });
        }
    }, [uploadedFile, setError]);

    function createModalObject(predefTREType: PredefinedTre) {
        let TREObject: IPredefinedTRE;

        switch(predefTREType) {
            case PredefinedTre.None:
                throw new Error("A predefined TRE type must be selected.");
            case PredefinedTre.Between:
                TREObject = new BetweenTREClass();
                break;
            default:
                throw new Error("The predefined type of the TRE has not been defined in this switch case");;
        }

        setModal({
            title: "Event followed by an event within a duration",
            text: "This is a predefined query",
            submit: () => { insertPredefinedTRE(TREObject)},
            closeCallback: () => {setModal(null)},
            submitTitle: "Insert TRE",
            is_dismissible: true,
            children: <BetweenTRE treObject={TREObject}/>,
        })
    }

    function insertPredefinedTRE(predefinedTRE: IPredefinedTRE) {
        const predefinedTREString = predefinedTRE.insertTRE();
        setTre(tre + predefinedTREString);
        setModal(null);
    }

    return (
        <div id="log-page" className="h-full gap-5">
            <LogTableProvider>
                <div className="h-[15%] flex flex-col gap-2">
                    <div id="Predefined queries" className="flex items-center self-center">
                        <Button style={{style: 'px-4 py-2'}} buttonType={ButtonType.Standard} onClick={() => createModalObject(PredefinedTre.Between)}>Between</Button>
                    </div>
                    <SearchForm />
                </div>
                <div className="w-full h-[85%]">
                    <LogTable mappingsAreEditable={false} />
                </div>
            </LogTableProvider>
        </div>
    );
}

export default LogPage;

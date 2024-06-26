import { ReactNode, useContext, useEffect } from "react";
import LogTable from "../components/logtable/LogTable";
import SearchForm from "../components/SearchForm";
import { AppdataContext } from "../context/AppContext";
import { navigation } from "../components/Navbar";
import LogTableProvider from '../context/LogTableContext';
import Button from "../components/button/Button";
import WithinTRE from '../components/predefined-tres/WithinTRE';
import { WithinTREClass, IPredefinedTRE, PredefinedTre, SequentialTREClass, TimedEventTREClass, TimedSequentialClass } from '../components/predefined-tres/PredefinedTREs';
import SequentialTRE from "../components/predefined-tres/SequentialTRE";
import TimedEventTRE from "../components/predefined-tres/TimedEventTRE";
import TimedSequentialTRE from "../components/predefined-tres/TimedSequentialTRE";
import { ButtonStyle } from "../components/button/IButtonProps";

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
                isDismissible: false
            });
        }
    }, [uploadedFile, setError]);

    function createModalObject(predefTREType: PredefinedTre) {
        let predefinedTRE: ReactNode;
        let modalTitle: string = '';
        switch(predefTREType) {
            case PredefinedTre.None:
                throw new Error("A predefined TRE type must be selected.");
            case PredefinedTre.Within:
                let within = new WithinTREClass();
                modalTitle = within.title;
                predefinedTRE = <WithinTRE treObject={within} onSubmit={() => insertPredefinedTRE(within)} closeTRE={() => {setModal(null)}}/>
                break;
            case PredefinedTre.Sequential:
                let sequential = new SequentialTREClass();
                modalTitle = sequential.title;
                predefinedTRE = <SequentialTRE treObject={sequential} onSubmit={() => insertPredefinedTRE(sequential)} closeTRE={() => {setModal(null)}}/>
                break;
            case PredefinedTre.TimedEvent:
                let after = new TimedEventTREClass();
                modalTitle = after.title;
                predefinedTRE = <TimedEventTRE treObject={after} onSubmit={() => insertPredefinedTRE(after)} closeTRE={() => {setModal(null)}}/>
                break;
            case PredefinedTre.TimedSequential:
                let timedSequential = new TimedSequentialClass();
                modalTitle = timedSequential.title;
                predefinedTRE = <TimedSequentialTRE treObject={timedSequential} onSubmit={() => insertPredefinedTRE(timedSequential)} closeTRE={() => {setModal(null)}}/>
                break;
            default:
                throw new Error("The predefined type of the TRE has not been defined in this switch case");
        }

        setModal({
            isDismissible: false,
            title: modalTitle,
            submitTitle: "Insert TRE",
            children: predefinedTRE,
            submitButtonType: "submit",
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
                    <div id="predefined-queries" className="flex items-center justify-center gap-2">
                        <Button buttonStyle={ButtonStyle.Modal} tooltip="TRE to find an event with a time constraint." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedTre.TimedEvent)}>Timed Event</Button>
                        <Button buttonStyle={ButtonStyle.Modal} tooltip="TRE to match groups of events within a duration." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedTre.Within)}>Within</Button>
                        <Button buttonStyle={ButtonStyle.Modal} tooltip="TRE to find two sequential events." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedTre.Sequential)}>Sequential</Button>
                        <Button buttonStyle={ButtonStyle.Modal} tooltip="TRE to find two sequential events with their own time constraint." style={{style: 'px-4 py-2'}} onClick={() => createModalObject(PredefinedTre.TimedSequential)}>Timed Sequential</Button>
                    </div>
                    <SearchForm/>
                </div>
                <div className="w-full h-[85%]">
                    <LogTable mappingsAreEditable={false} />
                </div>
            </LogTableProvider>
        </div>
    );
}

export default LogPage;

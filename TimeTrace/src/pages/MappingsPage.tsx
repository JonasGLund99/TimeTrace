import FileUploadButton from "../components/FileUploadButton";
import MappedItemsList from "../components/MappedItemsList";
import LogTable from "../components/logtable/LogTable";
import LogTableProvider from '../context/LogTableContext';
import { Store } from 'react-notifications-component';


function MappingsPage() {

    function handleClick() {
        Store.addNotification({
            title: "Wonderful!",
            message: "hello world",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    };

    return (
        <div id="mappings-page" className="flex flex-row h-full gap-5" >
            <LogTableProvider>
                <div className="w-[40%]">
                    <FileUploadButton />
                    <div className="h-[95%]">
                        <MappedItemsList />
                    </div>
                </div>
                <div className="w-[60%] h-full">
                    <LogTable mappingsAreEditable={true} />
                </div>
            </LogTableProvider>
            <button onClick={handleClick}>
                Click me
            </button>
        </div>

    );
}

export default MappingsPage;

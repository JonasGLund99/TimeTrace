import { AppdataContext } from "../../context/AppContext";
import { ReactNode, useContext } from "react";
import Button from "../button/Button";
import { ButtonType } from "../button/IButtonProps";

export default function Modal() {
    const { modalObj, setModal } = useContext(AppdataContext);

    function closeModal() {
        if (modalObj !== null) {
            setModal(null);
        }
    }

    if (modalObj === null) return null;

    return (
        <div className="h-screen w-screen flex items-center justify-center backdrop-blur-[3px] fixed z-10">
            <div id="alert-additional-content-4" className="w-1/3 p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <h3 className= "text-lg font-medium">{modalObj.title}</h3>
                </div>
                {modalObj.children}
                <div id="modal-button-container" className="flex justify-center pt-2">
                    {modalObj.submit !== null &&
                        <Button type="button" onClick={modalObj.submit} buttonType={ButtonType.Modal}>
                            {modalObj.submitTitle}
                        </Button>
                    }
                    {modalObj.is_dismissible &&
                        <Button buttonType={ButtonType.None} type="button" onClick={closeModal} style={{style: 'text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800'}}>
                            Cancel
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}
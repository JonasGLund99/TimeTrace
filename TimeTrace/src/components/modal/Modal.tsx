import { AppdataContext, ModalObject } from '../../context/AppContext';
import { ReactNode, useContext, useEffect } from 'react';
import Button from "../button/Button";
import { ButtonStyle } from "../button/IButtonProps";

export default function Modal() {
    const { modalObj, setModal } = useContext(AppdataContext);

    function closeModal() {
        if (modalObj !== null) {
            setModal(null);
        }
    }

    if (modalObj === null) return null;


    function submitClick() {
        if(modalObj === null) return;

        if(modalObj.submitButtonType !== "submit" && modalObj.submit !== null && modalObj.submit !== undefined) {
            modalObj.submit();
        } 
        else {
            return;
        }

    }


    return (
        <div className="h-screen w-screen flex items-center justify-center backdrop-blur-[3px] fixed z-10">
            <div id="alert-additional-content-4" className="w-1/3 p-4 mb-4 border rounded-lg border-github-borderWhiteBg text-github-textWhiteBg bg-github-navbarBg" role="alert">
                <div className="flex items-center">
                    <h3 className= "text-lg font-medium">{modalObj.title}</h3>
                </div>
                {modalObj.children}
                <div id="modal-button-container" className="flex justify-center pt-2">
                    {modalObj.submit !== null && modalObj.submit !== undefined &&
                        <Button type={modalObj.submitButtonType} onClick={submitClick} buttonStyle={ButtonStyle.Modal}>
                            {modalObj.submitTitle}
                        </Button>
                    }
                    {modalObj.is_dismissible &&
                        <Button buttonStyle={ButtonStyle.None} type="button" onClick={closeModal} style={{style: 'text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800'}}>
                            Cancel
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}
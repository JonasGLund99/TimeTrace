import { AppdataContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "./button/Button";
import { ButtonType } from "./button/IButtonProps";

export default function Warning() {
    const { errorObj, setError } = useContext(AppdataContext);

    function closeWarning() {
        if (errorObj !== null) {
            setError(null);
        }
    }

    if (errorObj === null) return null;

    return (
        <div className="h-screen w-screen flex items-center justify-center backdrop-blur-[3px] fixed z-10">
            <div id="alert-additional-content-4" className="w-1/3 p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <h3 className="text-lg font-medium">{errorObj.title}</h3>
                </div>
                <div className="mt-2 mb-4 overflow-y-auto text-sm max-h-60" dangerouslySetInnerHTML={{ __html: errorObj.errorString }}></div>
                <div className="flex">
                    {errorObj.callback !== null &&
                        <Button type="button" onClick={errorObj.callback} style={{style: 'px-3 py-1.5 me-2 text-center inline-flex items-center'}} buttonType={ButtonType.Modal}>{errorObj.callbackTitle}</Button>
                    }
                    {errorObj.is_dismissible &&
                        <Button type="button" onClick={closeWarning} style={{style: 'px-3 py-1.5 me-2 text-center inline-flex items-center'}} buttonType={ButtonType.Modal}>Dismiss</Button>
                    }
                </div>
            </div>
        </div>
    );
}
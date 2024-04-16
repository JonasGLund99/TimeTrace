import { ButtonType, IButtonProps } from "./IButtonProps";

interface ButtonTypeStyles {
    [ButtonType.None]: string;
    [ButtonType.Warning]: string;
    [ButtonType.Standard]: string;
    [ButtonType.Modal]: string;

}

const buttonTypeStyles: ButtonTypeStyles = {
    [ButtonType.None]: '',
    [ButtonType.Standard]: 'text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm',
    [ButtonType.Modal]: 'text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800',
    [ButtonType.Warning]: 'text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800',
}

function Button({ onClick, type, style, buttonStyle: ButtonType, children }: IButtonProps) {
    return (
        <button onClick={onClick} className={`${buttonTypeStyles[ButtonType] + " "+ style?.style}`} type={type}>
            {children && 
                children
            }
        </button>
    );
}


export default Button;
import Button from "../button/Button";
import { ButtonStyle } from "../button/IButtonProps";

interface PredefinedTREButtonGroupProps {
    closeTRE: () => void;
}

function PredefinedTREButtonGroup({closeTRE}: PredefinedTREButtonGroupProps) {
    return (
        <div id="modal-button-container" className="flex justify-center pt-2">
        <Button type="submit" buttonStyle={ButtonStyle.Modal}>
            Insert TRE
        </Button>
        <Button buttonStyle={ButtonStyle.None} type="button" onClick={closeTRE} style={{style: 'text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800'}}>
            Cancel
        </Button>
    </div>
    )
}

export default PredefinedTREButtonGroup;
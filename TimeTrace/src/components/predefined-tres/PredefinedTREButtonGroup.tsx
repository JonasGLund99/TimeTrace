import Button from "../button/Button";
import { ButtonStyle } from "../button/IButtonProps";

interface PredefinedTREButtonGroupProps {
    closeTRE: () => void;
}

function PredefinedTREButtonGroup({closeTRE}: PredefinedTREButtonGroupProps) {
    return (
        <div id="modal-button-container" className="flex justify-end pt-2">
        <Button buttonStyle={ButtonStyle.None} type="button" onClick={closeTRE} style={{style: 'text-github-textWhiteBg bg-github-navbarBg border border-github-borderWhiteBg hover:bg-github-highlightedBtnNavBg focus:ring-4 focus:outline-none focus:ring-github-borderWhiteBg font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center'}}>
            Cancel
        </Button>
        <Button type="submit" buttonStyle={ButtonStyle.Modal}>
            Insert TRE
        </Button>
    </div>
    )
}

export default PredefinedTREButtonGroup;
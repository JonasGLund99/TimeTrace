import Button from "./Button";
import { ButtonStyle } from "./IButtonProps";

interface FormButtonGroupProps {
    cancel: () => void;
    cancelText?: string;
    submitText?: string;
}

function FormButtonGroup({ cancel, cancelText, submitText }: FormButtonGroupProps) {
    return (
        <div id="modal-button-container" className="flex justify-end pt-2">
            <Button buttonStyle={ButtonStyle.None} type="button" onClick={cancel} style={{style: 'text-github-textWhiteBg bg-github-navbarBg border border-github-borderWhiteBg hover:bg-github-highlightedBtnNavBg focus:ring-4 focus:outline-none focus:ring-github-borderWhiteBg font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center transition-all'}}>
                {cancelText || "Cancel"}
            </Button>
            <Button type="submit" buttonStyle={ButtonStyle.Modal}>
                {submitText || "Submit"}
            </Button>
        </div>
    )
}

export default FormButtonGroup;
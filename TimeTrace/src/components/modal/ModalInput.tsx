import { Tooltip } from "@material-tailwind/react";

interface IModalInputProps {
    placeholder?: string;
    tooltip?: string;
    type?: 'text' | 'number' | 'date';
    label: string;
    value: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalInput({ placeholder, type, label, value, onChange, required, tooltip }: IModalInputProps) {
    return (
        <Tooltip content={tooltip}>
            <div className="flex flex-col w-full">
                <label>{label}</label>
                <input required={required} value={value} onChange={onChange} className="px-2 py-2 border rounded-lg border-github-borderWhiteBg " placeholder={placeholder} type={type} ></input>
            </div>
        </Tooltip>
    )
}

export default ModalInput;
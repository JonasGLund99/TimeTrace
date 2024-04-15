
interface IModalInputProps {
    placeholder: string;
    type?: 'text' | 'number' | 'date';
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalInput({ placeholder, type, label, value, onChange }: IModalInputProps) {
    return (
        <div className="flex flex-col w-full">
            <label>{label}</label>
            <input value={value} onChange={onChange} className="px-2 py-2 border border-yellow-300 rounded-lg dark:border-yellow-800" placeholder={placeholder} type={type} ></input>
        </div>
    )
}

export default ModalInput;
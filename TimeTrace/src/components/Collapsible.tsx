import { ReactNode, useEffect, useState } from "react";
import FoldDownIcon from "./svgs/FoldDownIcon";
import FoldUpIcon from "./svgs/FoldUpIcon";

interface Collapsibleprop {
    label?: string;
    children?: ReactNode;
    isOpen: boolean; // Add open prop
}
function Collapsible({ label, children, isOpen }: Collapsibleprop) {
    const [open, setIsOpen] = useState(isOpen || false);

    const toggle = () => {
        setIsOpen(!open);
    };

    useEffect(() => {
        setIsOpen(isOpen)
    }, [isOpen]);

    return (
        <div className="flex flex-col w-full my-4">
            <button className={`flex justify-between items-center p-4 text-3xl font-semibold text-left text-gray-200 bg-gray-800 ${open ? 'rounded-t-lg' : 'rounded-lg'}`} onClick={toggle}>
                {label}
                {open ? (
                    <FoldUpIcon />
                ) : (
                    <FoldDownIcon />
                )}
            </button>
            {open && (
                <div className="p-10 border rounded-b-lg shadow-md">{children}
                </div>
            )}
        </div>
    );
}
export default Collapsible;


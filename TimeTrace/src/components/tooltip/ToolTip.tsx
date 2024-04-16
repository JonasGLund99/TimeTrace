import * as react from "@material-tailwind/react";
import { ReactNode } from "react";
interface TooltipProps {
    tooltip?: string;
    children?: ReactNode;
    className?: string;
} 

function Tooltip({tooltip, children}: TooltipProps) {
    return (
        <react.Tooltip className="border border-github-borderWhiteBg bg-github-navbarBg text-github-textWhiteBg" content={tooltip}>
           {children}
        </react.Tooltip>
    )
}

export default Tooltip;
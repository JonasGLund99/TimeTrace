import { ReactNode } from "react";

export interface IButtonProps {
    onClick?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    style?: {style: string};
    buttonStyle?: ButtonStyle;
    children?: ReactNode;
    tooltip?: string;
}

export enum ButtonStyle {
    Default,
    None, 
    Standard,
    Modal,
    Warning,
}
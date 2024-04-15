import { ReactNode } from "react";

export interface IButtonProps {
    onClick?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    style?: {style: string};
    buttonType: ButtonType;
    children?: ReactNode;
}

export enum ButtonType {
    None, 
    Standard,
    Modal,
    Warning,
}
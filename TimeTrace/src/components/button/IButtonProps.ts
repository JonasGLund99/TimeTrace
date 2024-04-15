export interface IButtonProps {
    text: string;
    onClick?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    style?: {style: string};
    ButtonType: ButtonType;
}

export enum ButtonType {
    none, 
    Standard,
    Modal
}
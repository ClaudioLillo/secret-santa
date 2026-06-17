import { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
    text?: string;
    variant?: 'primary' | 'secondary';
    onClick: () => void;
    children?: ReactNode;
}

export default function Button({text, variant, onClick, children}: ButtonProps){
    return (
        <div className={`button ${variant}`} onClick={onClick}>
            {children ? children : text}
        </div>
    )
}
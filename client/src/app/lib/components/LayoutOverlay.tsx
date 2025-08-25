import { RingLoader } from "react-spinners";
import effects from "@app/lib/styles/effects.module.css";

type LayoutOverlayProps = {
    children: React.ReactNode;
    visible: boolean;
    size?: number;
    color?: string;
};

export default function LayoutOverlay({ children, visible = false, size = 50, color = "black" }: LayoutOverlayProps): React.ReactNode {
    return (
        <div className="relative">
            {children}
            {visible && (
                <div className={effects.overlay}>
                    <RingLoader color={color} size={size} />
                </div>
            )}
        </div>
    );
}

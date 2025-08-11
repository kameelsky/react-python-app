import { RingLoader } from "react-spinners";
import styles from "./Effects.module.css";

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
                <div className={styles.overlay}>
                    <RingLoader color={color} size={size} />
                </div>
            )}
        </div>
    );
}

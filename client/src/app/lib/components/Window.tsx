import styles from "@app/lib/styles/styles.module.css";
import clsx from "clsx";
import React from "react";

type WindowProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Window({ children, className }: WindowProps): React.ReactNode {
    return <div className={clsx(styles.window, className)}>{children}</div>;
}

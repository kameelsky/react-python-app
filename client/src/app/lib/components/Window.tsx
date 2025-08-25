import styles from "@app/lib/styles/styles.module.css";

export default function Window({ children }: { children: Readonly<React.ReactNode> }): React.ReactNode {
    return <div className={styles.window}>{children}</div>;
}

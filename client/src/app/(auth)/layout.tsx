// import SessionRefresher from "@app/lib/components/SessionRefresh";
import styles from "@app/lib/styles/styles.module.css";
import "./style.css";
import clsx from "clsx";

export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }): React.ReactNode {
    return (
        <div className={clsx(styles.background, "grid")}>
            <header></header>
            <aside></aside>
            <main>{children}</main>
        </div>
    );
}

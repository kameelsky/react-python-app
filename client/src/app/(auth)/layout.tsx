"use client";

import Island from "@app/lib/components/Island";
import SessionRefresher from "@app/lib/components/SessionRefresh";
import Sidebar from "@app/lib/components/Sidebar";
import Window from "@app/lib/components/Window";
import { DashboardContext } from "@app/lib/context/DashboardContext";
import styles from "@app/lib/styles/styles.module.css";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.css";

export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }): React.ReactNode {
    const [isSidebarOpen, sidebarHandlers] = useDisclosure(true);
    const [isBlurred, setIsBlurred] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsBlurred(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <SessionRefresher />
            <div className={clsx(styles.background, "gridContainer", isSidebarOpen || "sidebarHidden")}>
                <Image src="/favicon.ico" alt="background" className="backgroundIcon" width={0} height={1} />
                <DashboardContext.Provider value={{ isSidebarOpen, sidebarHandlers }}>
                    <div className="header">
                        <Island />
                    </div>
                </DashboardContext.Provider>
                {isSidebarOpen && (
                    <div className="aside">
                        <Window className={clsx("sticky top-10 min-h-1/5", isBlurred && styles.blurred)}>
                            <Sidebar />
                        </Window>
                    </div>
                )}
                <div className="main">
                    <Window className={clsx("h-full w-full", isBlurred && styles.blurred)}>{children}</Window>
                </div>
            </div>
        </>
    );
}

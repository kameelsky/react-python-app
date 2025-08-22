"use client";

import SessionRefresher from "@app/lib/components/SessionRefresh";
import Window from "@app/lib/components/Window";
import styles from "@app/lib/styles/styles.module.css";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import Image from "next/image";
import React, { createContext, useEffect, useState } from "react";
import Island from "./Island";
import Sidebar from "./Sidebar";
import "./style.css";

type DashboardContextType = {
    isSidebarOpen: boolean;
    sidebarHandlers: {
        open: () => void;
        close: () => void;
        toggle: () => void;
    };
};

export const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

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
            <div className={clsx(styles.background, "gridContainer", isSidebarOpen ? "" : "sidebarHidden")}>
                <Image src="/favicon.ico" alt="background" className="backgroundIcon" width={0} height={1} />
                <DashboardContext.Provider value={{ isSidebarOpen, sidebarHandlers }}>
                    <div className="header">
                        <Island />
                    </div>
                </DashboardContext.Provider>
                {isSidebarOpen && (
                    <div className="aside">
                        <Window className={isBlurred ? `${styles.blurred}` : ""}>
                            <Sidebar />
                        </Window>
                    </div>
                )}
                <div className="main">
                    <Window className={isBlurred ? `${styles.blurred}` : ""}>{children}</Window>
                </div>
            </div>
        </>
    );
}

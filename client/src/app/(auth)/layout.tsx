"use client";

import SessionRefresher from "@app/lib/components/SessionRefresh";
import styles from "@app/lib/styles/styles.module.css";
import { Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import clsx from "clsx";
import React from "react";
import Sidebar from "./Sidebar";
import "./style.css";

export default function AuthLayout({ children }: { children: Readonly<React.ReactNode> }): React.ReactNode {
    const [isSidebarOpen, sidebarHandlers] = useDisclosure(true);
    return (
        <>
            <SessionRefresher />
            <div className={clsx(styles.background, "gridContainer", isSidebarOpen ? "" : "sidebarHidden")}>
                <div className="header">
                    <div className="island">
                        <Burger opened={isSidebarOpen} onClick={sidebarHandlers.toggle} color="white" />
                        <p>{isSidebarOpen ? "Close Menu" : "Open Menu"}</p>
                    </div>
                </div>
                {isSidebarOpen && (
                    <div className="aside">
                        <Sidebar />
                    </div>
                )}
                <div className="main">{children}</div>
            </div>
        </>
    );
}

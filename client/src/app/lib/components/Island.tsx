"use client";

import Button from "@app/lib/components/Button";
import { logOut } from "@app/lib/serverActions/authentication";
import { Burger, Menu, MenuDropdown } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/DashboardContext";
import { LogOut as LogOutIcon } from "lucide-react";
import clsx from "clsx";

export default function Island(): React.ReactNode {
    const { isSidebarOpen, sidebarHandlers } = useContext(DashboardContext);
    const [isHidden, setIsHidden] = useState<boolean>(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY === 0) setIsHidden(false);
            else if (currentScrollY > lastScrollY) setIsHidden(true);
            else setIsHidden(false);
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={clsx("island", isHidden && "hide")}>
            <span className="flex items-center justify-center gap-2">
                <Burger opened={isSidebarOpen} onClick={sidebarHandlers.toggle} color="white" />
                <p>{isSidebarOpen ? "Close Menu" : "Open Menu"}</p>
            </span>
            <Menu transitionProps={{ transition: "skew-up", duration: 500 }}>
                <Menu.Target>
                    <Button color="black">Account</Button>
                </Menu.Target>
                <MenuDropdown>
                    <Menu.Item color="red" leftSection={<LogOutIcon />} onClick={logOut}>
                        Logout
                    </Menu.Item>
                </MenuDropdown>
            </Menu>
        </div>
    );
}

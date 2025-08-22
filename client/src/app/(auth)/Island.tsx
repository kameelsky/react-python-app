"use client";

import { Burger, Menu, MenuDropdown, MenuItem } from "@mantine/core";
import { useContext } from "react";
import { DashboardContext } from "./layout";
import Button from "@app/lib/components/Button";
import { logOut } from "@app/lib/serverActions/authentication";

export default function Island(): React.ReactNode {
    const { isSidebarOpen, sidebarHandlers } = useContext(DashboardContext);
    return (
        <div className="island">
            <span className="flex items-center justify-center gap-2">
                <Burger opened={isSidebarOpen} onClick={sidebarHandlers.toggle} color="white" />
                <p>{isSidebarOpen ? "Close Menu" : "Open Menu"}</p>
            </span>
            <Menu>
                <Menu.Target>
                    <Button color="black">Account</Button>
                </Menu.Target>
                <MenuDropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item color="red" onClick={logOut}>
                        Log out
                    </Menu.Item>
                </MenuDropdown>
            </Menu>
        </div>
    );
}

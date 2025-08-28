"use client";

import { NavLink } from "@mantine/core";
import { usePathname } from "next/navigation";
import { HomeTwoTone, CloudTwoTone } from "@ant-design/icons";

const antdIconProps = { twoToneColor: "#bee3d", style: { fontSize: "1.5em" } };

export default function Sidebar(): React.ReactNode {
    const pathname = usePathname();
    return (
        <div className="flex flex-col items-center justify-up p-3 w-full h-auto">
            <NavLink href="/home" label="Home" leftSection={<HomeTwoTone {...antdIconProps} />} active={"/home" === pathname} />
            <NavLink href="/selection" label="Selection" leftSection={<CloudTwoTone {...antdIconProps} />} active={"/selection" === pathname} />
        </div>
    );
}

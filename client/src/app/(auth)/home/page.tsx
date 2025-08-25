"use client";

import { Button } from "@mantine/core";
import { logOut } from "@app/lib/serverActions/authentication";
import Window from "@app/lib/components/Window";

export default function HomePage(): React.ReactNode {
    return (
        <Window>
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-5xl font-extrabold">Home Page</h1>
                <hr />
                <Button onClick={logOut}>Log out</Button>
            </div>
        </Window>
    );
}

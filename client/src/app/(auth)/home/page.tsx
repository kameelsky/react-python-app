"use client";

import { Button } from "@mantine/core";
import { logOut } from "@app/lib/serverActions/authentication";

export default function HomePage(): React.ReactNode {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-extrabold">Home Page</h1>
            <hr />
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
}

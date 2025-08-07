"use client";

import Button from "@app/lib/components/Button";
import { logOut } from "@app/lib/serverActions/authentication";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-extrabold">Home Page</h1>
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
}

"use client";

import Button from "@app/lib/components/Button";
import { GET } from "@app/lib/requests";
import { logOut } from "@app/lib/serverActions/authentication";

export default function HomePage() {
    const clickTest = async () => {
        const data = await GET("/tools/jwt-test");
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-extrabold">Home Page</h1>
            <Button onClick={logOut}>Log out</Button>
            <hr />
            <Button color="green" onClick={clickTest}>
                Test
            </Button>
        </div>
    );
}

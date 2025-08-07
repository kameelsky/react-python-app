"use server";

import { AuthData, ServerResponse } from "@app/lib/data/types";
import { decryptJWT, encryptJWT } from "@app/lib/encryption";
import logger from "@app/lib/logger";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { POST } from "@app/lib/serverActions/requests";

interface LoginData {
    user_login: string;
    provided_password: string;
}

export async function sessionAuth(formData: LoginData, developer: boolean = false): Promise<ServerResponse<AuthData | null>> {
    let response: ServerResponse<AuthData | null>;
    if (!developer) {
        response = (await POST("/auth/user-validate", formData)) as ServerResponse<AuthData | null>;
        if (response.success) response.message = "Logged in";
        else response.message = response.message || "Login failed";
    } else {
        response = {
            success: true,
            status_code: 200,
            message: "Logged in in developer mode.",
            body: { name: "Developer", role: "admin", login: "DEVE" },
        };
    }

    if (response.success) {
        const token = await encryptJWT(response.body as AuthData);
        const cookieStorage = await cookies();

        const hours = 1; // hours
        const cookieLifeSpan = hours * 3_600; // seconds
        // const cookieLifeSpan = 10; // seconds
        const expires = new Date(Date.now() + cookieLifeSpan * 1000); // current date + miliseconds

        cookieStorage.set("session", token, {
            secure: false,
            httpOnly: true,
            expires: expires,
        });

        logger.info(`${response.body?.name}(${response.body?.login}) logged in as ${response.body?.role}.`);
    }

    return response;
}
export async function sessionDeauth(): Promise<void> {
    const cookieStorage = await cookies();
    const token = cookieStorage.get("session")?.value || "";
    const payload = await decryptJWT(token);
    cookieStorage.delete("session");
    logger.info(`${payload?.name}(${payload?.login}) logged out.`);
}

export async function logOut(): Promise<void> {
    await sessionDeauth();
    redirect("/login");
}

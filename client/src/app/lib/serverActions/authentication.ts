"use server";

import { AuthData, ServerResponse } from "@app/lib/data/types";
import logger from "@app/lib/logger";
import { POST } from "@app/lib/requests";
import { decryptJWT, encryptJWT } from "@app/lib/serverActions/encryption";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface LoginData {
    user_login: string;
    provided_password: string;
}

export async function createSessionCookie(token: string): Promise<void> {
    const cookieStorage = await cookies();
    const hours = 0.5; // hours
    const cookieLifeSpan = hours * 60 * 60 * 1000; // ms
    const expires = new Date(Date.now() + cookieLifeSpan); // UTC
    cookieStorage.set("session", token, {
        secure: false,
        httpOnly: true,
        expires: expires,
    });
}

export async function cookieDuration(): Promise<number> {
    const cookieStorage = await cookies();
    const token = cookieStorage.get("session")?.value || "";
    const payload = await decryptJWT(token);
    const exp = payload!.exp;
    const diff = exp - Math.floor(Date.now() / 1000);
    return diff; // Time in seconds
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
            body: { id: 0, name: "Developer", role: "admin", login: "DEVE" },
        };
    }

    if (response.success) {
        const token = await encryptJWT(response.body as AuthData);
        await createSessionCookie(token);
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

export async function sessionRefresh(): Promise<void> {
    const cookieStorage = await cookies();
    const token = cookieStorage.get("session")?.value || "";
    const payload = await decryptJWT(token);
    const newToken = await encryptJWT(payload as AuthData);
    await createSessionCookie(newToken);
}

"use server";

import { ServerResponse } from "@app/lib/data/types";
import { api } from "@app/lib/fetching";
import { cookies } from "next/headers";

export async function getSessionCookie(): Promise<string> {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    return `session=${session}`;
}

export async function POST(endpoint: string, json: object = {}): Promise<ServerResponse> {
    const sessionCookie = await getSessionCookie();
    const data: ServerResponse = await api
        .post(endpoint, json, {
            headers: { Cookie: sessionCookie },
        })
        .then((response) => {
            return {
                success: true,
                status_code: response.status,
                body: response.data,
            } as ServerResponse<object | string>;
        })
        .catch((error) => {
            return {
                success: false,
                status_code: error.response?.status || 500,
                message: error.response?.data.detail || "Server API not responding.",
            } as ServerResponse;
        });
    return data;
}
export async function GET(endpoint: string): Promise<ServerResponse> {
    const sessionCookie = await getSessionCookie();
    const data: ServerResponse = await api
        .get(endpoint, {
            headers: { Cookie: sessionCookie },
        })
        .then((response) => {
            return {
                success: true,
                status_code: response.status,
                body: response.data,
            } as ServerResponse<object | string>;
        })
        .catch((error) => {
            return {
                success: false,
                status_code: error.response?.status || 500,
                message: error.response?.data.detail || "Server API not responding.",
            } as ServerResponse;
        });
    return data;
}

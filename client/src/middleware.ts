import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decryptJWT } from "@app/lib/serverActions/encryption";

const nextPaths: string[] = ["/_next", "/favicon.ico"];
const publicRoutes: string[] = ["/home", "/unauthorized", "/cloud"];
const accessMap: Record<string, string[]> = {
    admin: ["*"],
    user: [...publicRoutes],
};

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("session")?.value || "";
    const payload = await decryptJWT(token);
    if (nextPaths.some((nextPathEndpoint) => pathname.startsWith(nextPathEndpoint))) return NextResponse.next();
    switch (pathname) {
        case "/":
            return payload ? NextResponse.redirect(new URL("/home", request.url)) : NextResponse.redirect(new URL("/login", request.url));
        case "/login":
            return payload ? NextResponse.redirect(new URL("/home", request.url)) : NextResponse.next();
    }
    if (!payload) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("msg", "login required");
        return NextResponse.redirect(loginUrl);
    } else {
        const allowedPaths = payload.role ? accessMap[payload.role] : [];
        if (allowedPaths.includes("*")) return NextResponse.next();
        else {
            const isAllowed = allowedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
            return isAllowed ? NextResponse.next() : NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }
}

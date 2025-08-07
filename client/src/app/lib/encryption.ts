import { AuthData } from "@app/lib/data/types";
import { SignJWT, jwtVerify } from "jose";

const encryptJWT = async (payload: AuthData): Promise<string> => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) throw new Error("SECRET_KEY is not defined in environment variables.");
    const encodedKey = new TextEncoder().encode(secretKey); // UTF-8
    return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1h").sign(encodedKey);
};

const decryptJWT = async (token: string): Promise<AuthData | null> => {
    try {
        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) throw new Error("SECRET_KEY is not defined in environment variables.");
        const encodedKey = new TextEncoder().encode(secretKey); // UTF-8
        const { payload } = await jwtVerify(token, encodedKey);
        return payload as AuthData;
    } catch {
        return null;
    }
};

export { encryptJWT, decryptJWT };

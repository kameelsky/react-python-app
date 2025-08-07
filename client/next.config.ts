import type { NextConfig } from "next";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
    allowedDevOrigins: [],
    env: {
        SECRET_KEY: process.env.SECRET_KEY,
        PRODUCTION: process.env.PRODUCTION,
        PRODUCTION_SERVER_IP: process.env.PRODUCTION_SERVER_IP,
        CLIENT_PORT: process.env.CLIENT_PORT,
        SERVER_PORT: process.env.SERVER_PORT,
    },
};

export default nextConfig;

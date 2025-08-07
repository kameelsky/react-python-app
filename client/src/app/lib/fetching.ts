import axios, { type AxiosInstance } from "axios";

const PRODUCTION = process.env.PRODUCTION;
const PRODUCTION_SERVER_IP = process.env.PRODUCTION_SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;

let baseURL: string;
if (PRODUCTION === "True") baseURL = `http://${PRODUCTION_SERVER_IP}:${SERVER_PORT}`;
else baseURL = `http://localhost:${SERVER_PORT}`;

export const api: AxiosInstance = axios.create({
    baseURL,
});

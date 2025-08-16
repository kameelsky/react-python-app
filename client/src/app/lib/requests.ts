import axios, { type AxiosRequestConfig, Method, AxiosInstance } from "axios";
import { type ServerResponse } from "@app/lib/data/types";

const PRODUCTION = process.env.NEXT_PUBLIC_PRODUCTION;
const PRODUCTION_SERVER_IP = process.env.NEXT_PUBLIC_PRODUCTION_SERVER_IP;
const SERVER_PORT = process.env.NEXT_PUBLIC_SERVER_PORT;
const baseURL = PRODUCTION === "True" ? `http://${PRODUCTION_SERVER_IP}:${SERVER_PORT}` : `http://localhost:${SERVER_PORT}`;

const api: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

async function request(method: Method, endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<ServerResponse> {
    const response = await api
        .request({ method, url: endpoint, ...(["post", "put", "patch"].includes(method) ? { data } : {}), ...config } as AxiosRequestConfig)
        .then((response) => {
            return {
                success: true,
                status_code: response.status,
                body: response.data,
            } as ServerResponse<string | object | Blob>;
        })
        .catch((error) => {
            return {
                success: false,
                status_code: error.response?.status || 500,
                message: error.response?.data?.detail || "Server API not responding.",
            } as ServerResponse;
        });
    return response;
}

export const GET = (endpoint: string, config: AxiosRequestConfig = {}): Promise<ServerResponse> => request("get", endpoint, {}, config);
export const DELETE = (endpoint: string, config: AxiosRequestConfig = {}): Promise<ServerResponse> => request("delete", endpoint, {}, config);
export const POST = (endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<ServerResponse> => request("post", endpoint, data, config);
export const PUT = (endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<ServerResponse> => request("put", endpoint, data, config);
export const PATCH = (endpoint: string, data: object = {}, config: AxiosRequestConfig = {}): Promise<ServerResponse> => request("patch", endpoint, data, config);

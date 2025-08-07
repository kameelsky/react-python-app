export type AuthData = {
    name: string;
    role: string;
    login: string;
};

export type ServerResponse<ResponseData = string | object> = {
    success: boolean;
    status_code: number;
    message?: string;
    body?: ResponseData;
};

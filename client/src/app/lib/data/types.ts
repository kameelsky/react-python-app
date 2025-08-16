export type AuthData = {
    id: number;
    name: string;
    role: string;
    login: string;
};

export type JWT = AuthData & {
    iat: number;
    exp: number;
};

export type ServerResponse<ResponseData = string | object | Blob> = {
    success: boolean;
    status_code: number;
    message?: string;
    body?: ResponseData;
};

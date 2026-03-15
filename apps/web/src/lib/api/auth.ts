import { api } from "../axios";
import { HTTP_SERVER } from "../config";
import { AuthForm } from "../types";

export async function signupApi(form: AuthForm) {
    try {
        const res = await api.post(`${HTTP_SERVER}/users/signup`, form);
        return {
            token: res.data.token,
            user: res.data.user
        };
    } catch (error: any) {
        const status = error.response?.status;

        if (status === 411) {
            throw new Error("Invalid credentails");
        } else if (status === 400) {
            throw new Error("Invalid credentails");
        } else {
            throw new Error("Internal server error")
        }
    }
}

export async function signinApi(form: AuthForm) {
    try {
        const res = await api.post(`${HTTP_SERVER}/users/signin`, form);

        return {
            token: res.data.token,
            user: res.data.user
        };
    } catch (error: any) {
        const status = error.response?.status;

        if (status === 411) {
            throw new Error("Invalid credentails");
        } else if (status === 400) {
            throw new Error("Invalid credentails");
        } else {
            throw new Error("Internal server error")
        }
    }
}


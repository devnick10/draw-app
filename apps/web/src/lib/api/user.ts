import { api } from "../axios";
import { HTTP_SERVER } from "../config";

export async function getUserApi() {
    try {
        const res = await api.get(`${HTTP_SERVER}/users/me`);
        return {
            user: res.data.user
        };
    } catch (error: any) {
        const status = error.response?.status;

        if (status === 401) {
            throw new Error("Unauthorized");
        } else {
            throw new Error("Internal server error")
        }
    }
}
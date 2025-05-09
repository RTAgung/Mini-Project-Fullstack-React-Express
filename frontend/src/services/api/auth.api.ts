/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export default class AuthApi {
    static readonly URL_API = `${BASE_URL_API}/auth`;

    static async login(data: { email: string; password: string }) {
        try {
            const response = await fetch(`${this.URL_API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (json?.status === "error") {
                throw new Error(json.message);
            }
            return json;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    static async decodeToken(data: { token: string }) {
        try {
            const response = await fetch(`${this.URL_API}/decode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await response.json();
            if (json?.status === "error") {
                throw new Error(json.message);
            }
            return json;
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    }
}

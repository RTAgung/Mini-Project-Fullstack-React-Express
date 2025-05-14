/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../../utils/api.util";

export default class AuthApi {
    static readonly URL_API = `/auth`;

    static async login(data: { email: string; password: string }) {
        return apiFetch(`${this.URL_API}/login`, "POST", data);
    }

    static async register(data: any) {
        return apiFetch(`${this.URL_API}/register`, "POST", data);
    }

    static async checkToken() {
        return apiFetch(`${this.URL_API}/check`, "POST");
    }

    static async logout() {
        return apiFetch(`${this.URL_API}/logout`, "POST");
    }
}

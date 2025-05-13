/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiFetch } from "../../utils/api.util";

export default class UserApi {
    static readonly URL_API = `/users`;

    static async getUserById(data: { userId: string }) {
        return apiFetch(`${this.URL_API}/${data.userId}`, "GET");
    }
}

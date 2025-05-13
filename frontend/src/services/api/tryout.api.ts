/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../../utils/api.util";

export default class TryoutApi {
    static readonly URL_API = `/tryout_sections`;

    static async fetchData() {
        return apiFetch(`${this.URL_API}`, "GET");
    }
}

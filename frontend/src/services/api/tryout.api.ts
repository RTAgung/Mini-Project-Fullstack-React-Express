/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export default class TryoutApi {
    static readonly URL_API = `${BASE_URL_API}/tryout_sections`;

    static async fetchData() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch(`${this.URL_API}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
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

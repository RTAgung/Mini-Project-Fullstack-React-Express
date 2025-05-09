/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export default class UserApi {
    static readonly URL_API = `${BASE_URL_API}/users`;

    static async getUserById(data: { userId: string }) {
        try {
            const response = await fetch(`${this.URL_API}/${data.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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

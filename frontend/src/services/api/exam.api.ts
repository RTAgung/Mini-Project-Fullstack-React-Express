import AuthApi from "./auth.api";

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

export default class ExamApi {
    static readonly URL_API = `${BASE_URL_API}/exams`;

    static async fetchData(filter: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const tokenData = await AuthApi.decodeToken({ token });
            const userId = tokenData.data.id;

            let url = `${this.URL_API}/user/${userId}`;
            if (filter == "in-progress") {
                url = `${this.URL_API}/current/${userId}`;
            } else if (filter == "completed") {
                url = `${this.URL_API}/complete/${userId}`;
            }

            const response = await fetch(`${url}`, {
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

    static async fetchDataById(id: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch(`${this.URL_API}/${id}`, {
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

    static async startSession(id: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch(
                `${this.URL_API}/start_session/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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

    static async nextQuestion(id: string, answer: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch(
                `${this.URL_API}/next_question/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ answer }),
                }
            );
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

    static async endSession(id: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch(`${this.URL_API}/end_session/${id}`, {
                method: "POST",
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

    static async create(tryoutId: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const tokenData = await AuthApi.decodeToken({ token });
            const userId = tokenData.data.id;

            const response = await fetch(`${this.URL_API}/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ tryoutSectionId: tryoutId }),
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

    static async endExam(id: string) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }

            const response = await fetch(`${this.URL_API}/end/${id}`, {
                method: "POST",
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

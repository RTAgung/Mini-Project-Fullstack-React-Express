/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "../../utils/api.util";

export default class ExamApi {
    static readonly URL_API = `/exams`;

    static async fetchData(filter: string) {
        let url = `${this.URL_API}/user`;
        if (filter == "in-progress") {
            url = `${this.URL_API}/current`;
        } else if (filter == "completed") {
            url = `${this.URL_API}/complete`;
        }
        return apiFetch(`${url}`, "GET");
    }

    static async fetchDataById(id: string) {
        return apiFetch(`${this.URL_API}/detail/${id}`, "GET");
    }

    static async startSession(id: string) {
        return apiFetch(`${this.URL_API}/start_session/${id}`, "POST");
    }

    static async nextQuestion(id: string, answer: string) {
        return apiFetch(`${this.URL_API}/next_question/${id}`, "POST", {
            answer,
        });
    }

    static async endSession(id: string) {
        return apiFetch(`${this.URL_API}/end_session/${id}`, "POST");
    }

    static async create(tryoutId: string) {
        return apiFetch(`${this.URL_API}`, "POST", {
            tryoutSectionId: tryoutId,
        });
    }

    static async endExam(id: string) {
        return apiFetch(`${this.URL_API}/end/${id}`, "POST");
    }
}

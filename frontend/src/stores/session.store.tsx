/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import ExamApi from "../services/api/exam.api";

interface SessionState {
    session: any;
    question: any;
    hasUpdatedBefore: boolean;
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    fetchSession: (id: string) => Promise<void>;
    submitAnswer: (id: string, answer: string) => Promise<void>;
    endSession: (id: string) => Promise<void>;
    updateData: (response: any) => Promise<void>;
}

const initialData = {
    session: {
        title: "Title",
        accuracyScore: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        endTimeTest: "2025-05-09T17:23:30.793Z",
    },
    question: {
        sequence: [],
        options: [],
    },
    hasUpdatedBefore: false,
    isLoading: false,
    isError: false,
    message: null,
};

const useSessionStore = create<SessionState>((set, get) => ({
    ...initialData,

    async fetchSession(id: string) {
        if (get().hasUpdatedBefore) return;

        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await ExamApi.fetchDataById(id);
            const data = response.data.data;
            const session = data.sessions[data.currentSession];
            const question = {
                sequence:
                    session.questions[data.currentQuestion].question.split(""),
                options:
                    session.questions[data.currentQuestion].option.split(""),
            };
            set({ session, question });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    async updateData(response: any) {
        if (response != null) {
            const data = response.data.data;
            const session = data.sessions[data.currentSession];
            const question = {
                sequence:
                    session.questions[data.currentQuestion].question.split(""),
                options:
                    session.questions[data.currentQuestion].option.split(""),
            };
            set({ session, question, hasUpdatedBefore: true });
        } else {
            set({ ...initialData });
        }
    },

    async submitAnswer(id: string, answer: string) {
        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await ExamApi.nextQuestion(id, answer);
            const data = response.data.data;
            const session = data.sessions[data.currentSession];
            const question = {
                sequence:
                    session.questions[data.currentQuestion].question.split(""),
                options:
                    session.questions[data.currentQuestion].option.split(""),
            };
            set({ session, question, hasUpdatedBefore: true });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    async endSession(id: string) {
        set({ isLoading: true, isError: false, message: null });
        try {
            await ExamApi.endSession(id);
            set({ ...initialData });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useSessionStore;

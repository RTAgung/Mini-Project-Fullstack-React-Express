/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import ExamApi from "../services/api/exam.api";

interface SessionState {
    session: any;
    question: any;
    hasUpdatedBefore: boolean;
    isLoading: boolean;
    isError: boolean;
    isLoadingAnswer: boolean;
    selectedOption: string | null;
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
    isLoadingAnswer: false,
    selectedOption: null,
    message: null,
};

const constructSessionData = (response: any) => {
    const data = response.data.data;
    const session = data.sessions[data.currentSession];
    const question = {
        sequence: session.questions[data.currentQuestion].question.split(""),
        options: session.questions[data.currentQuestion].option.split(""),
    };

    const examEnd = new Date(data.endTimeTest);
    const sessionEnd = new Date(session.endTime);
    const effectiveEndTime = examEnd < sessionEnd ? examEnd : sessionEnd;
    console.log(data.endTimeTest);
    console.log(session.endTime);
    console.log(effectiveEndTime);
    return {
        session: {
            ...session,
            endTime: effectiveEndTime.toISOString(),
        },
        question,
    };
};

const useSessionStore = create<SessionState>((set, get) => ({
    ...initialData,

    async fetchSession(id: string) {
        if (get().hasUpdatedBefore) return;

        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await ExamApi.fetchDataById(id);
            set({
                ...constructSessionData(response),
            });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    async updateData(response: any) {
        if (response != null) {
            set({
                ...initialData,
                ...constructSessionData(response),
                hasUpdatedBefore: true,
            });
        } else {
            set({ ...initialData });
        }
    },

    async submitAnswer(id: string, answer: string) {
        set({
            isLoadingAnswer: true,
            isError: false,
            message: null,
            selectedOption: answer,
        });
        try {
            const response = await ExamApi.nextQuestion(id, answer);
            set({
                ...constructSessionData(response),
                hasUpdatedBefore: true,
            });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoadingAnswer: false, selectedOption: null });
        }
    },

    async endSession(id: string) {
        set({ isError: false, message: null });
        try {
            await ExamApi.endSession(id);
            set({ ...initialData, message: "Session has ended" });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        }
    },
}));

export default useSessionStore;

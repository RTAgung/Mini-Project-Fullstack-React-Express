/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import ExamApi from "../services/api/exam.api";

interface ExamDetailState {
    exam: any;
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    fetchExamDetail: (id: string) => Promise<void>;
}

const initialState: ExamDetailState = {
    exam: {
        title: "title",
        description: "description",
        status: "status",
        totalScore: 0.0,
        currentSession: 0,
        currentQuestion: 0,
        sessions: [],
        endTimeTest: "2025-05-09T17:23:30.793Z"
    },
    isLoading: false,
    isError: false,
    message: null,
    fetchExamDetail: async () => {},
};

const useExamDetailStore = create<ExamDetailState>((set) => ({
    ...initialState,

    async fetchExamDetail(id: string) {
        set({ isLoading: true, isError: false, message: null });
        try {
            set({ exam: {} });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useExamDetailStore;

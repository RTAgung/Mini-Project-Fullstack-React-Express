/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import ExamApi from "../services/api/exam.api";

interface ExamState {
    exams: any[];
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    message: string | null;
    fetchExams: (filter: string) => Promise<void>;
}

const initialState = {
    exams: [],
    isLoading: false,
    isError: false,
    isEmpty: false,
    message: null,
};

const useExamStore = create<ExamState>((set) => ({
    ...initialState,

    async fetchExams(filter: string) {
        set({ isLoading: true, isError: false, isEmpty: false, message: null });
        try {
            const response = await ExamApi.fetchData(filter);
            const data = response.data;
            if (data.length === 0) {
                set({ isEmpty: true });
            } else {
                set({ exams: response.data });
            }
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useExamStore;

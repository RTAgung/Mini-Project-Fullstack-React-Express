/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import ExamApi from "../services/api/exam.api";

interface ExamDetailState {
    exam: any;
    response: any;
    sessions: any[];
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    fetchExamDetail: (id: string) => Promise<void>;
    startSession: (id: string) => Promise<any>;
    endExam: (id: string) => Promise<void>;
}

const initialState = {
    exam: {
        title: "title",
        description: "description",
        status: "in-progress",
        totalScore: 0.0,
        totalSession: 0,
        currentSession: 0,
        currentQuestion: 0,
        endTimeTest: "2025-05-09T17:23:30.793Z",
    },
    sessions: [],
    response: null,
    isLoading: false,
    isError: false,
    message: null,
};

const constructExamData: any = (data: any) => {
    const tryoutData = data.accuracyTest;
    const sessions = data.sessions.map((session: any) => {
        return {
            ...session,
            duration: tryoutData.durationPerSessions,
            isShowButton:
                data.status === "in-progress" ||
                (data.status === "completed" && session.status === "completed"),
        };
    });
    return {
        exam: {
            ...data,
            totalSession: tryoutData.numberOfSessions,
        },
        sessions:
            data.status == "completed"
                ? sessions
                : [sessions[data.currentSession]],
    };
};

const useExamDetailStore = create<ExamDetailState>((set) => ({
    ...initialState,

    async fetchExamDetail(id: string) {
        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await ExamApi.fetchDataById(id);
            const data = response.data.data;
            set({
                ...constructExamData(data),
            });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    async startSession(id: string): Promise<any> {
        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await ExamApi.startSession(id);
            set({ isLoading: false, response });
            return response;
        } catch (error: any) {
            set({ isLoading: false, isError: true, message: error.message });
            return null;
        }
    },

    async endExam(id: string) {
        set({ isError: false, message: null });
        try {
            const response = await ExamApi.endExam(id);
            const data = response.data.data;
            set({
                ...constructExamData(data),
            });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        }
    },
}));

export default useExamDetailStore;

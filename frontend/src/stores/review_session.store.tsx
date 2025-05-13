/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import ExamApi from "../services/api/exam.api";

interface ReviewSessionState {
    session: any;
    question: any;
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    fetchReviewSession: (
        id: string,
        sessionIdx: number,
        questionIdx: number
    ) => Promise<void>;
}

const initialData = {
    session: {
        title: "Title",
        accuracyScore: 0,
        totalCorrect: 0,
        totalIncorrect: 0,
        totalQuestions: 0,
        endTimeTest: "2025-05-09T17:23:30.793Z",
    },
    question: {
        sequence: [],
        options: [],
        userAnswer: "",
        trueAnswer: "",
        isCorrect: false,
    },
    isLoading: false,
    isError: false,
    message: null,
};

const useReviewSessionStore = create<ReviewSessionState>((set) => ({
    ...initialData,

    fetchReviewSession: async (id, sessionIdx, questionIdx) => {
        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await ExamApi.fetchDataById(id);
            const data = response.data.data;
            const session = data.sessions[sessionIdx];
            const question = session.questions[questionIdx];
            if (!session || !question) throw new Error("Invalid index");
            set({
                session: {
                    ...session,
                    totalQuestions: session.questions.length,
                },
                question: {
                    sequence: question.question.split(""),
                    options: question.option.split(""),
                    userAnswer: question.userAnswer,
                    trueAnswer: question.trueAnswer,
                    isCorrect: question.userAnswer === question.trueAnswer,
                },
                isLoading: false,
            });
        } catch (error: any) {
            set({ isError: true, message: error.message, isLoading: false });
        }
    },
}));

export default useReviewSessionStore;

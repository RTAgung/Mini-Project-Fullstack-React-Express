import { useCallback, useEffect, useState } from "react";
import BasePage from "./BasePage";
import { Loader2, Timer } from "lucide-react";
import useSessionStore from "../stores/session.store";
import { useNavigate, useParams } from "react-router-dom";

export default function Session() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        session,
        question,
        isLoading,
        isError,
        isLoadingAnswer,
        selectedOption,
        fetchSession,
        submitAnswer,
        endSession,
    } = useSessionStore();
    const [countdown, setCountdown] = useState("00:00:00");

    useEffect(() => {
        if (session.status !== undefined && session.status !== "in-progress") {
            navigate(`/exam/${id}`, { replace: true });
        }
    }, [id, navigate, session.status]);

    const handleFinishSession = useCallback(async () => {
        if (id) {
            await endSession(id);
            navigate(`/exam/${id}`, { replace: true });
        }
    }, [id, endSession, navigate]);

    useEffect(() => {
        if (isError) {
            navigate("/exam", { replace: true });
        }
    }, [isError, navigate]);

    useEffect(() => {
        if (id) {
            fetchSession(id);
        } else {
            navigate("/exam", { replace: true });
        }
    }, [fetchSession, id, navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = new Date(session.endTime).getTime() - now.getTime();
            if (diff <= 0) {
                clearInterval(interval);
                setCountdown("00:00:00");
                handleFinishSession();
            } else {
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                setCountdown(
                    `${h.toString().padStart(2, "0")}:${m
                        .toString()
                        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
                );
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [handleFinishSession, session.endTime]);

    const handleOptionClick = (answer: string) => {
        if (id) {
            submitAnswer(id, answer);
        }
    };

    if (isLoading) {
        return (
            <BasePage>
                <div className="flex justify-center items-center h-[70vh]">
                    <Loader2 className="animate-spin text-cyber w-10 h-10" />
                </div>
            </BasePage>
        );
    }

    return (
        <BasePage>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">
                        {session.title}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-yellow-400 font-medium">
                            <Timer size={18} />
                            <span>{countdown}</span>
                        </div>
                        <button
                            onClick={handleFinishSession}
                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Finish Session
                        </button>
                    </div>
                </div>

                {/* Session Info Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-sm text-gray-300 mb-1">Score</div>
                        <div className="text-xl font-bold text-white">
                            {session.accuracyScore * 100}%
                        </div>
                        <div className="flex gap-4 mt-2 text-sm">
                            <span className="text-green-400">
                                ✔ Correct: {session.totalCorrect}
                            </span>
                            <span className="text-red-400">
                                ✘ Incorrect: {session.totalIncorrect}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-gray-900 p-6 rounded-xl border border-cyber space-y-6 relative min-h-[300px]">
                    {/* Overlay for Answer Loading */}
                    {isLoadingAnswer && (
                        <div className="absolute inset-0 bg-opacity-60 z-10 flex items-center justify-center rounded-xl">
                            <Loader2 className="animate-spin text-cyber w-10 h-10" />
                        </div>
                    )}

                    {/* Question Number Label */}
                    <div className="absolute -top-[1px] -left-[1px] border border-cyber bg-gray-900 px-3 py-1 rounded-tl-xl text-xl text-cyber font-semibold z-0">
                        {session.totalCorrect + session.totalIncorrect + 1}
                    </div>

                    {/* Content with opacity when loadingAnswer */}
                    <div
                        className={
                            isLoadingAnswer
                                ? "opacity-50 pointer-events-none"
                                : ""
                        }
                    >
                        {/* Question Prompt */}
                        <div className="space-y-2 pt-4">
                            <div className="flex items-center justify-center">
                                <p className="text-white text-center">
                                    Look for the missing symbol
                                </p>
                            </div>
                            <div className="flex gap-4 justify-center mt-6">
                                {question.sequence.map(
                                    (char: string, idx: number) => (
                                        <span
                                            key={char + idx}
                                            className="w-24 h-16 flex items-center justify-center text-3xl font-semibold text-white border border-gray-500 rounded-md bg-gray-700"
                                        >
                                            {char}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Option Label */}
                        <div className="mt-12">
                            <p className="text-sm text-gray-400">Option:</p>
                        </div>

                        {/* Answer Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                            {question.options.map(
                                (option: string, index: number) => (
                                    <button
                                        key={option + index}
                                        onClick={() =>
                                            handleOptionClick(option)
                                        }
                                        className={`cursor-pointer py-3 rounded-md text-2xl font-semibold transition border border-gray-700 ${
                                            selectedOption === option
                                                ? "bg-cyber text-white"
                                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BasePage>
    );
}

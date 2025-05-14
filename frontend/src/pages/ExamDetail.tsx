/* eslint-disable @typescript-eslint/no-explicit-any */

import { Loader2, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useExamDetailStore from "../stores/exam_detail.store";
import BasePage from "./BasePage";
import useSessionStore from "../stores/session.store";
import { toast } from "../utils/toast.util";

export default function ExamDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateData } = useSessionStore();
    const {
        exam,
        sessions,
        isLoading,
        isError,
        message,
        fetchExamDetail,
        startSession,
        endExam,
        setMessage,
    } = useExamDetailStore();
    const [isStartingSession, setIsStartingSession] = useState(false);

    const [countdown, setCountdown] = useState("00:00:00");

    const handleFinishExam = useCallback(async () => {
        if (id) {
            await endExam(id);
        }
    }, [id, endExam]);

    useEffect(() => {
        if (message) {
            toast.warning(message);
            setMessage(null);
        }
    }, [message]);

    useEffect(() => {
        if (isError) {
            navigate("/exam", { replace: true });
        }
    }, [isError, navigate]);

    useEffect(() => {
        if (id) {
            fetchExamDetail(id);
        } else {
            navigate("/exam", { replace: true });
        }
    }, [fetchExamDetail, id, navigate]);

    useEffect(() => {
        if (exam.status === "in-progress") {
            const interval = setInterval(() => {
                const now = new Date();
                const diff =
                    new Date(exam.endTimeTest).getTime() - now.getTime();
                if (diff <= 0) {
                    clearInterval(interval);
                    setCountdown("00:00:00");
                    handleFinishExam();
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
        }
    }, [exam.endTimeTest, exam.status, handleFinishExam]);

    const handleButtonSessionClick = async (
        isCompleted: boolean,
        sessionIdx: number
    ) => {
        if (!id) {
            navigate("/exam", { replace: true });
            return;
        }

        if (isCompleted) {
            navigate(`/exam/${id}/session/review/${sessionIdx}/0`);
        } else {
            try {
                // TODO: refactor architecture, using state management to handle loading and updateData response
                setIsStartingSession(true);
                const response = await startSession(id);
                await updateData(response);
                navigate(`/exam/${id}/session`);
            } catch (err) {
                console.error("Failed to start session", err);
            } finally {
                setIsStartingSession(false);
            }
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

    let buttonContent: React.ReactNode;

    if (isStartingSession) {
        buttonContent = (
            <>
                <Loader2 className="animate-spin w-4 h-4" />
                Starting...
            </>
        );
    } else if (exam.status === "in-progress") {
        buttonContent = "Start Session";
    } else {
        buttonContent = "Review";
    }

    return (
        <BasePage>
            <div>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Exam: {exam.title}
                    </h1>
                    {exam.status === "in-progress" && (
                        <div className="mt-2 sm:mt-0 bg-yellow-900 text-yellow-400 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
                            <Timer size={16} />
                            <span>Remaining: {countdown}</span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mt-4 text-sm">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                        {/* Left info */}
                        <div className="space-y-2">
                            <p>
                                <span className="text-gray-400">Status: </span>
                                <span
                                    className={`font-semibold ${
                                        exam.status === "completed"
                                            ? "text-green-400"
                                            : "text-yellow-400"
                                    }`}
                                >
                                    {exam.status}
                                </span>
                            </p>
                            <p>
                                <span className="text-gray-400">
                                    Total Session:{" "}
                                </span>
                                {exam.totalSession}
                            </p>
                            <p>
                                <span className="text-gray-400">
                                    Current Session:{" "}
                                </span>
                                {exam.currentSession + 1}
                            </p>
                        </div>

                        {/* Highlighted score */}
                        <div className="sm:text-right">
                            <p className="text-gray-400">Total Score</p>
                            <p className="text-3xl font-bold text-cyber">
                                {(exam.totalAccuracyScore * 100).toFixed(1)}%
                            </p>
                        </div>
                    </div>

                    {/* Divider and description */}
                    <hr className="my-4 border-gray-700" />
                    <div>
                        <p className="text-gray-400 mb-1">Description:</p>
                        <p>{exam.description}</p>
                    </div>
                </div>

                {/* Sessions */}
                <h2 className="text-xl font-semibold text-white mt-10 mb-4">
                    Sessions
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {sessions.map((session, index) => (
                        <div
                            key={session.title + index}
                            className="p-5 rounded-xl bg-gray-800 border border-gray-700 space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-cyber">
                                    {session.title}
                                </h3>
                                <span
                                    className={`text-xs px-2 py-1 rounded ${
                                        session.status === "completed"
                                            ? "bg-green-900 text-green-300"
                                            : "bg-yellow-900 text-yellow-300"
                                    }`}
                                >
                                    {session.status}
                                </span>
                            </div>
                            <div className="text-sm text-gray-300 space-y-1">
                                <p>
                                    <span className="text-gray-400">
                                        Duration:{" "}
                                    </span>
                                    {session.duration} minutes
                                </p>
                                <p>
                                    <span className="text-gray-400">
                                        Score:{" "}
                                    </span>
                                    {(session.accuracyScore * 100).toFixed(1)}%
                                </p>
                                <p>
                                    <span className="text-gray-400">
                                        Correct:{" "}
                                    </span>
                                    {session.totalCorrect}
                                    <span className="text-gray-400">
                                        {" "}
                                        | Incorrect:{" "}
                                    </span>
                                    {session.totalIncorrect}
                                </p>
                            </div>
                            {session.isShowButton && (
                                <button
                                    onClick={() =>
                                        handleButtonSessionClick(
                                            session.status !== "not-started",
                                            index
                                        )
                                    }
                                    disabled={isStartingSession}
                                    className={`cursor-pointer mt-3 w-full py-2 px-3 text-sm font-medium rounded-lg transition-colors flex justify-center items-center gap-2
                                        ${
                                            exam.status === "in-progress"
                                                ? "bg-cyber hover:bg-cyber/90 text-white"
                                                : "bg-gray-700 hover:bg-gray-600 text-white"
                                        }
                                        ${
                                            isStartingSession
                                                ? "opacity-60 cursor-not-allowed"
                                                : ""
                                        }
                                    `}
                                >
                                    {buttonContent}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </BasePage>
    );
}

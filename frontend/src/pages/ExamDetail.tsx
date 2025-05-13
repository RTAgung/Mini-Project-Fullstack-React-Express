/* eslint-disable @typescript-eslint/no-explicit-any */

import { Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useExamDetailStore from "../stores/exam_detail.store";
import BasePage from "./BasePage";
import useSessionStore from "../stores/session.store";

export default function ExamDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateData } = useSessionStore();
    const { exam, sessions, fetchExamDetail, startSession, endExam } =
        useExamDetailStore();

    const [countdown, setCountdown] = useState("00:00:00");

    const handleFinishExam = useCallback(async () => {
        if (id) {
            await endExam(id);
        }
    }, [id, endExam]);

    useEffect(() => {
        if (id) {
            fetchExamDetail(id);
        } else {
            navigate("/exam", { replace: true });
        }
    }, [fetchExamDetail, id, navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = new Date(exam.endTimeTest).getTime() - now.getTime();
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
    }, [exam.endTimeTest]);

    const handleStartSessionClick = async () => {
        if (id) {
            const response = await startSession(id);
            await updateData(response);
            navigate(`/exam/${id}/session`);
        } else {
            navigate("/exam", { replace: true });
        }
    };

    return (
        <BasePage>
            <div>
                <h1 className="text-2xl font-bold text-white">
                    Exam: {exam.title}
                </h1>

                <div className="text-sm mt-2 text-gray-300 bg-gray-900 px-4 py-2 rounded-md border border-gray-700 inline-block">
                    <div className="flex w-full item-center gap-2">
                        <Timer size={18} />
                        <span>
                            Time Remaining:{" "}
                            <span className="font-semibold text-yellow-400">
                                {countdown}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 mt-4 text-sm space-y-2">
                    <p>
                        <span className="text-gray-400">Description:</span>{" "}
                        {exam.description}
                    </p>
                    <p>
                        <span className="text-gray-400">Status:</span>
                        <span
                            className={`ml-2 font-semibold ${
                                exam.status === "completed"
                                    ? "text-green-400"
                                    : "text-yellow-400"
                            }`}
                        >
                            {exam.status}
                        </span>
                    </p>
                    <p>
                        <span className="text-gray-400">Total Score:</span>{" "}
                        {exam.totalScore ?? 0}%
                    </p>
                    <p>
                        <span className="text-gray-400">Total Session:</span>{" "}
                        {exam.totalSession}
                    </p>
                    <p>
                        <span className="text-gray-400">Current Session:</span>{" "}
                        {exam.currentSession + 1}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6">
                    {sessions.map((session: any, index: number) => {
                        return (
                            <div
                                key={session.title + index}
                                className="cyber-card p-4 rounded-xl "
                            >
                                <h3 className="text-cyber text-lg font-semibold mb-1">
                                    {session.title}
                                </h3>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <p>
                                        Status:{" "}
                                        <span className="text-yellow-400">
                                            {session.status}
                                        </span>
                                    </p>
                                    <p>Duration: {session.duration} minutes</p>
                                    <p>Score: {session.accuracyScore}%</p>
                                    <p>
                                        Correct: {session.totalCorrect} |
                                        Incorrect: {session.totalIncorrect}
                                    </p>
                                </div>

                                <button
                                    onClick={handleStartSessionClick}
                                    className="cursor-pointer mt-4 w-full bg-cyber text-white py-2 px-3 rounded-lg hover:bg-cyber/90 transition-colors text-sm font-medium"
                                >
                                    Start Session
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </BasePage>
    );
}

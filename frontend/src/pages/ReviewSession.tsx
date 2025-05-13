import { useEffect } from "react";
import BasePage from "./BasePage";
import { useNavigate, useParams } from "react-router-dom";
import useReviewSessionStore from "../stores/review_session.store";

export default function ReviewSession() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const sessionIdx = Number(params.sessionIdx);
    const questionIdx = Number(params.questionIdx);
    const { isError, session, question, fetchReviewSession } =
        useReviewSessionStore();

    useEffect(() => {
        if (isError) {
            navigate(`/exam/${id}`, { replace: true });
        }
    }, [id, isError, navigate]);

    useEffect(() => {
        const isStatusNotCompleted =
            session.status !== undefined && session.status !== "completed";
        if (isStatusNotCompleted) {
            navigate(`/exam/${id}`, { replace: true });
        }
    }, [id, navigate, session.status]);

    useEffect(() => {
        if (id) {
            if (isNaN(sessionIdx) || isNaN(questionIdx)) {
                navigate(`/exam/${id}`, { replace: true });
            } else {
                fetchReviewSession(id, sessionIdx, questionIdx);
            }
        } else {
            navigate("/exam", { replace: true });
        }
    }, [fetchReviewSession, id, navigate, questionIdx, sessionIdx]);

    const getOptionClass = (option: string) => {
        if (option === question.trueAnswer) {
            return "bg-green-900 border-green-500 text-green-300";
        }
        if (option === question.userAnswer) {
            return "bg-red-900 border-red-500 text-red-300";
        }
        return "bg-gray-800 border-gray-700 text-gray-300";
    };

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
                            completed
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                            Back
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
                <div className="bg-gray-900 p-6 rounded-xl border border-cyber space-y-6 relative">
                    {/* Question Number Label */}
                    <div className="absolute -top-[1px] -left-[1px] border border-cyber bg-gray-900 px-3 py-1 rounded-tl-xl text-xl text-cyber font-semibold">
                        {questionIdx + 1}
                    </div>

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
                    <div className="flex mt-12">
                        <p className="text-sm text-gray-400">
                            Option:{" "}
                            {question.isCorrect ? (
                                <span className="text-green-400">
                                    ✔ Correct
                                </span>
                            ) : (
                                <span className="text-red-400">
                                    ✘ Incorrect
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Answer Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {question.options.map(
                            (option: string, index: number) => (
                                <div
                                    key={option + index}
                                    className={`py-3 rounded-md text-2xl font-semibold transition border text-center relative ${getOptionClass(
                                        option
                                    )}`}
                                >
                                    {option}

                                    {option === question.userAnswer && (
                                        <span
                                            className={`absolute -top-2 -right-2 text-xs px-2 py-[2px] rounded-full font-medium ${
                                                question.isCorrect
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"
                                            }`}
                                        >
                                            {question.isCorrect ? "✔" : "✘"}
                                        </span>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        disabled={questionIdx <= 0}
                        onClick={() =>
                            navigate(
                                `/exam/${id}/session/review/${sessionIdx}/${
                                    questionIdx - 1
                                }`,
                                { replace: true }
                            )
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            questionIdx <= 0
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-cyber text-white hover:bg-cyber/80 cursor-pointer"
                        }`}
                    >
                        ← Previous
                    </button>

                    <button
                        disabled={questionIdx >= session.totalQuestions - 1}
                        onClick={() =>
                            navigate(
                                `/exam/${id}/session/review/${sessionIdx}/${
                                    questionIdx + 1
                                }`,
                                { replace: true }
                            )
                        }
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            questionIdx >= session.totalQuestions - 1
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-cyber text-white hover:bg-cyber/80 cursor-pointer"
                        }`}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </BasePage>
    );
}

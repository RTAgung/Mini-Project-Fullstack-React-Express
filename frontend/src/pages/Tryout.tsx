import { useNavigate } from "react-router-dom";
import BasePage from "./BasePage";
import { CircleGauge, Loader2, SquareLibrary, Timer } from "lucide-react";
import useTryoutStore from "../stores/tryout.store";
import { useEffect, useState } from "react";
import ExamApi from "../services/api/exam.api";
import toast from "react-hot-toast";

const getDifficultyStyle = (level: string) => {
    switch (level.toLowerCase()) {
        case "beginner":
            return "text-green-400 bg-green-900";
        case "intermediate":
            return "text-yellow-400 bg-yellow-900";
        case "expert":
            return "text-red-400 bg-red-900";
        default:
            return "text-gray-400 bg-gray-700";
    }
};

function Tryout() {
    const navigate = useNavigate();
    const { tryouts, isLoading, isError, isEmpty, message, fetchTryouts } =
        useTryoutStore();
    const [creatingExamId, setCreatingExamId] = useState<string | null>(null);

    useEffect(() => {
        fetchTryouts();
    }, [fetchTryouts]);

    const handleTakeExamClick = async (tryoutId: string) => {
        if (creatingExamId) return;
        try {
            setCreatingExamId(tryoutId);
            const response = await ExamApi.create(tryoutId);
            if (response.data.id) {
                navigate(`/exam/${response.data.id}`);
                toast.success(response.message);
            } else {
                throw new Error("Failed to create exam.");
            }
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setCreatingExamId(null);
        }
    };

    let content;

    if (isLoading) {
        content = (
            <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-cyber" size={28} />
            </div>
        );
    } else if (isError) {
        content = (
            <div className="text-red-400 text-center py-10">
                Error: {message || "Something went wrong."}
            </div>
        );
    } else if (isEmpty) {
        content = (
            <div className="text-gray-400 text-center py-10">
                No tryouts available.
            </div>
        );
    } else {
        content = (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {tryouts.map((tryout) => (
                    <div
                        key={tryout.id}
                        className="rounded-xl border border-gray-700 bg-gray-800 p-5 hover:shadow-lg hover:border-cyber transition-all flex flex-col justify-between"
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-cyber">
                                {tryout.title ?? "Title"}
                            </h2>
                            <p className="text-sm text-gray-300 mt-1 mb-3">
                                {tryout.description ?? "Description"}
                            </p>

                            <div className="space-y-1 border-t border-gray-700 pt-2 text-sm text-gray-400">
                                <div className="flex items-center gap-2">
                                    <SquareLibrary size={18} />
                                    <span className="text-sm font-medium">
                                        Total Session:{" "}
                                        {tryout.data?.numberOfSessions ?? 0}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Timer size={18} />
                                    <span className="text-sm font-medium">
                                        Duration: {tryout.data?.duration ?? 0}{" "}
                                        minutes
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CircleGauge size={18} />
                                    <span className="text-sm font-medium">
                                        Difficulty:{" "}
                                        <span
                                            className={`px-2 py-0.5 rounded text-xs font-semibold ${getDifficultyStyle(
                                                tryout.data?.level ?? "Beginner"
                                            )}`}
                                        >
                                            {tryout.data?.level ?? "Beginner"}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleTakeExamClick(tryout.id)}
                            disabled={creatingExamId === tryout.id}
                            className="cursor-pointer w-full bg-cyber text-white py-2 px-3 rounded-lg hover:bg-cyber/90 transition-colors text-sm font-medium disabled:opacity-60"
                        >
                            {creatingExamId === tryout.id
                                ? "Creating..."
                                : "Take Exam"}
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <BasePage>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">Tryout List</h1>
                {content}
            </div>
        </BasePage>
    );
}

export default Tryout;

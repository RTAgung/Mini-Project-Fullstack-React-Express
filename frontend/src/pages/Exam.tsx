/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleX, Loader2 } from "lucide-react";
import BasePage from "./BasePage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useExamStore from "../stores/exam.store";

function Exam() {
    const { exams, isLoading, isError, isEmpty, message, fetchExams } =
        useExamStore();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchExams(filter);
    }, [fetchExams, filter]);

    const calculateEndTime = (timeString: string) => {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes.toString().padStart(2, "0")}`;
    };

    const calculateAccuracyScore = (score: number) => {
        const result = parseFloat(score.toFixed(3)) * 100;
        return `${parseFloat(result.toFixed(3))}%`;
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
                Error: {message || "Something went wrong"}
            </div>
        );
    } else if (isEmpty) {
        content = (
            <div className="text-gray-400 text-center py-10">
                No exams available.
            </div>
        );
    } else {
        content = (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                    <Link
                        to={`/exam/${exam.id}`}
                        key={exam.id}
                        className="group block bg-gray-800 border border-gray-700 p-4 rounded-xl transition hover:shadow-lg hover:border-cyber hover:bg-gray-700"
                    >
                        <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-cyber">
                            {exam.data.title ?? "Title"}
                        </h2>
                        <p className="text-sm text-gray-400 mb-3">
                            {exam.data.description ?? "Description"}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                            {(() => {
                                if (exam.data.status === "completed") {
                                    return (
                                        <span className="text-blue-400">
                                            Score:{" "}
                                            {calculateAccuracyScore(
                                                exam.data.totalAccuracyScore ??
                                                    0
                                            )}
                                        </span>
                                    );
                                } else if (exam.data.status === "in-progress") {
                                    return (
                                        <span className="text-orange-400 flex items-center gap-1">
                                            End time:{" "}
                                            {calculateEndTime(
                                                exam.data.endTimeTest
                                            )}
                                        </span>
                                    );
                                } else {
                                    return (
                                        <span className="text-red-400 flex items-center gap-1">
                                            <CircleX size={14} /> No Status
                                        </span>
                                    );
                                }
                            })()}
                        </div>
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <BasePage>
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold text-white">My Exams</h1>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                    <label htmlFor="filter" className="text-sm text-gray-300">
                        Filter:
                    </label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-gray-800 text-gray-200 border border-gray-700 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyber"
                    >
                        <option value="all">All</option>
                        <option value="in-progress">In-progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* State Rendering */}
                {content}
            </div>
        </BasePage>
    );
}

export default Exam;

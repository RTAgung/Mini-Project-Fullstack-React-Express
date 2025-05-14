import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 text-center">
            <div className="cyber-card max-w-xl bg-gray-900 border border-cyber rounded-xl shadow-xl py-18 px-24 space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <AlertTriangle className="text-yellow-400 w-12 h-12" />
                    <h1 className="text-5xl font-extrabold text-white">404</h1>
                    <p className="text-gray-400 text-lg font-medium">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-cyber text-white font-semibold text-sm hover:bg-cyber/90 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

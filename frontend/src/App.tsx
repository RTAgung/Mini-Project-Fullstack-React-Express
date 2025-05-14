import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Exam from "./pages/Exam";
import AuthRoute from "./components/AuthRoute";
import Tryout from "./pages/Tryout";
import { Toaster } from "react-hot-toast";
import ExamDetail from "./pages/ExamDetail";
import Session from "./pages/Session";
import ReviewSession from "./pages/ReviewSession";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: "#1f2937", // Tailwind gray-800
                        color: "#f9fafb", // Tailwind gray-50
                        border: "1px solid #374151", // Tailwind gray-700
                    },
                    success: {
                        iconTheme: {
                            primary: "#10b981", // Tailwind green-500
                            secondary: "#1f2937",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#ef4444", // Tailwind red-500
                            secondary: "#1f2937",
                        },
                    },
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/exam" element={<Exam />}></Route>
                        <Route path="/tryout" element={<Tryout />}></Route>
                        <Route
                            path="/exam/:id"
                            element={<ExamDetail />}
                        ></Route>
                        <Route
                            path="/exam/:id/session"
                            element={<Session />}
                        ></Route>
                        <Route
                            path="/exam/:id/session/review/:sessionIdx/:questionIdx"
                            element={<ReviewSession />}
                        ></Route>
                    </Route>
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route
                            path="/forgot_password"
                            element={<Register />}
                        ></Route>
                    </Route>
                    <Route element={<PublicRoute />}>
                        <Route path="/" element={<Home />}></Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

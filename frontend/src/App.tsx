import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./components/AuthRoute";

function App() {
    return (
        <div className="min-h-screen bg-black text-white">
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/exam" element={<Dashboard />}></Route>
                        <Route path="/tryout" element={<Dashboard />}></Route>
                        <Route path="/exam/:id" element={<Dashboard />}></Route>
                        <Route
                            path="/session/:id"
                            element={<Dashboard />}
                        ></Route>
                    </Route>
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Login />}></Route>
                        <Route
                            path="/forgot_password"
                            element={<Login />}
                        ></Route>
                    </Route>
                    <Route element={<PublicRoute />}>
                        <Route path="/" element={<Home />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
        // <div className='min-h-screen flex flex-col'>
        //   <header className='fixed top-0 inset-x-0 flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-800 z-50'>
        //     <h1>Halo</h1>
        //   </header>
        // </div>
    );
}

export default App;

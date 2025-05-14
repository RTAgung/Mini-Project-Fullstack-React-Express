import {
    GraduationCap,
    LogIn,
    LogOut,
    Menu,
    User,
    UserPlus,
    Loader2,
} from "lucide-react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../stores/auth.store";

export function TopNavigation() {
    const navigate = useNavigate();
    const { isLoggedIn, userName, logout } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="fixed top-0 inset-x-0 flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-800 z-50">
            <div className="flex items-center flex-1">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            className="h-8 w-8"
                            src="/assets/phindojo-logo.png"
                            alt="Phindojo Logo"
                        />
                        <h1 className="text-xl md:text-2xl font-bold">
                            <span className="text-green-500">Phin</span>
                            <span className="text-cyber">Dojo</span>
                        </h1>
                    </Link>

                    {isLoggedIn && (
                        <div className="sm:flex items-center ml-5 gap-4">
                            <NavLink
                                to="/exam"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hidden sm:inline ${
                                        isActive
                                            ? "text-cyber"
                                            : "text-gray-300 hover:text-cyber"
                                    }`
                                }
                            >
                                My Exams
                            </NavLink>
                            <NavLink
                                to="/tryout"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hidden sm:inline ${
                                        isActive
                                            ? "text-cyber"
                                            : "text-gray-300 hover:text-cyber"
                                    }`
                                }
                            >
                                Tryout Sections
                            </NavLink>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2 ml-auto">
                    <GraduationCap
                        color="#00b4d8"
                        className="hidden sm:inline"
                    />
                    <span className="text-sm md:text-base hidden sm:inline">
                        Training Center
                    </span>
                </div>

                <button className="sm:hidden flex items-center text-gray-300 hover:text-cyber transition-colors">
                    <Menu />
                </button>

                {isLoggedIn ? (
                    <>
                        <div className="hidden sm:flex items-center gap-2 bg-gray-700 px-3 py-1 ml-3 rounded-lg">
                            <User className="text-cyber" size={18} />
                            <span className="text-sm font-medium text-white">
                                {userName}
                            </span>
                        </div>
                        <div className="relative ml-3">
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-red-500 hover:bg-red-500/90 text-white"
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                            Logging out...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut />
                                            Logout
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="relative ml-3">
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={() => navigate("/login")}
                                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-cyber bg-gray-800"
                            >
                                <LogIn /> Login
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-cyber hover:bg-cyber/90 text-white"
                            >
                                <UserPlus /> Register
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

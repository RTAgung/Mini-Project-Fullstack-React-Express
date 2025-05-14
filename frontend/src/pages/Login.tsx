import { Lock, LogIn, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/auth.store";
import { useNavigate } from "react-router-dom";
import { toast } from "../utils/toast.util";

function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, isLoadingLogin, isErrorLogin, message, login } =
        useAuthStore();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/exam");
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (isErrorLogin && message) {
            toast.error(message);
        }
    }, [isErrorLogin, message]);

    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(formData.email, formData.password);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="cyber-card max-w-md w-full p-6">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="/assets/phindojo-logo.png"
                        alt="Phin Dojo Logo"
                        className="h-16 w-16"
                    />
                    <h1 className="text-2xl font-bold">
                        <span className="text-green-500">Phin</span>
                        <span className="text-cyber">Dojo</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-center">
                        Login untuk melanjutkan
                    </p>
                </div>

                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber">
                            <Mail className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-base md:text-sm border-0 focus-visible:ring-0"
                                placeholder="email@domain.com"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <div className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber">
                            <Lock className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-base md:text-sm border-0 focus-visible:ring-0"
                                placeholder="**********"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-cyber text-white hover:bg-cyber/90 mt-2 disabled:opacity-50"
                        type="submit"
                        disabled={isLoadingLogin}
                    >
                        {isLoadingLogin ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            <>
                                <LogIn />
                                <span>Login</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Forget Password?{" "}
                    <a
                        className="text-cyber hover:underline"
                        href="/forgot-password"
                    >
                        Reset Password
                    </a>
                </div>
                <div className="mt-2 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <a className="text-cyber hover:underline" href="/register">
                        Register
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;

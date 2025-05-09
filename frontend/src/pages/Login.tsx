/* eslint-disable @typescript-eslint/no-explicit-any */

import { Lock, LogIn, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/auth.store";
import { useNavigate } from "react-router-dom";

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

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        login(formData.email, formData.password);
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
                <form className="space-y-4 w-full" action="">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor=":r0:-form-item"
                        >
                            Email
                        </label>
                        <div
                            className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber focus-within:border-transparent"
                            id=":r0:-form-item"
                            aria-describedby=":r0:-form-item-description"
                            aria-invalid="false"
                        >
                            <Mail className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 focus-visible:ring-0"
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
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor=":r0:-form-item"
                        >
                            Password
                        </label>
                        <div
                            className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber focus-within:border-transparent"
                            id=":r0:-form-item"
                            aria-describedby=":r0:-form-item-description"
                            aria-invalid="false"
                        >
                            <Lock className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-0 focus-visible:ring-0"
                                placeholder="**********"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div>
                    <button
                        className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-cyber hover:bg-cyber/90 mt-2"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <LogIn />
                        <span className="flex items-center"> Login</span>
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">
                        Forget Password?{" "}
                        <a className="text-cyber hover:underline" href="/login">
                            Forgot Password
                        </a>
                    </p>
                </div>
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <a className="text-cyber hover:underline" href="/login">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

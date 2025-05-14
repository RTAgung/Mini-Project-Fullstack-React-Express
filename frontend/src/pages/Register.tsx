import { Loader2, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/auth.store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../utils/toast.util";

function Register() {
    const navigate = useNavigate();
    const {
        isLoggedIn,
        isLoadingRegister,
        isErrorRegister,
        message,
        register,
    } = useAuthStore();
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/exam", { replace: true });
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        if (isErrorRegister && message) {
            toast.error(message);
        }
    }, [isErrorRegister, message]);

    const handleChange = (e: { target: { name: string; value: string } }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(formData).then((isSuccess) => {
            if (isSuccess) {
                toast.success("Register success");
                navigate("/login", { replace: true });
            } else {
                toast.error("Register failed");
            }
        });
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
                        Register to create your account
                    </p>
                </div>

                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <div className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber">
                            <User className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-base md:text-sm border-0 focus-visible:ring-0"
                                placeholder="John Doe"
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Username</label>
                        <div className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber">
                            <UserPlus className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-base md:text-sm border-0 focus-visible:ring-0"
                                placeholder="johndoe123"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

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
                        <label className="text-sm font-medium">
                            Phone Number
                        </label>
                        <div className="flex p-1 items-center border mt-2 border-gray-700 rounded-md focus-within:ring-2 focus-within:ring-cyber">
                            <Phone className="mx-2" width={20} height={20} />
                            <input
                                className="flex h-10 w-full rounded-md bg-background px-3 py-2 text-base md:text-sm border-0 focus-visible:ring-0"
                                placeholder="08123456789"
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
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
                                placeholder="********"
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
                        disabled={isLoadingRegister}
                    >
                        {isLoadingRegister ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Registering...
                            </>
                        ) : (
                            <>
                                <UserPlus />
                                <span>Register</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link className="text-cyber hover:underline" to="/login">
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

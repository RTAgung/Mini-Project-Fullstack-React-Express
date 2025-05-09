/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import AuthApi from "../services/api/auth.api";
import UserApi from "../services/api/user.api";

interface AuthState {
    isLoggedIn: boolean;
    isLoadingLogin: boolean;
    isErrorLogin: boolean;
    message: string | null;
    userName: string;
    hasCheckLogin: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkLogin: () => Promise<void>;
}

class AuthEvent {
    static async login(email: string, password: string): Promise<any> {
        const loginResponse = await AuthApi.login({ email, password });
        const token = loginResponse.data.token;
        localStorage.setItem("token", token);

        const tokenData = await AuthApi.decodeToken({ token });
        const userId = tokenData.data.id;

        const userData = await UserApi.getUserById({ userId });
        const json = userData.data;

        return json.fullname ?? "";
    }

    static async checkLogin(token: string): Promise<any> {
        const tokenData = await AuthApi.decodeToken({ token });
        const userId = tokenData.data.id;

        const userData = await UserApi.getUserById({ userId });
        const json = userData.data;

        return json.fullname ?? "";
    }
}

const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    isLoadingLogin: false,
    isErrorLogin: false,
    message: null,
    userName: "",
    hasCheckLogin: false,
    login: async (email: string, password: string) => {
        set({ isLoadingLogin: true, isErrorLogin: false, message: null });
        try {
            const userName = await AuthEvent.login(email, password);
            set({
                isLoggedIn: true,
                userName: userName ?? "",
            });
        } catch (error: any) {
            set({
                isErrorLogin: true,
                message: "Login failed",
            });
            console.error(error);
        } finally {
            set({ isLoadingLogin: false });
        }
    },
    logout: () => {
        localStorage.removeItem("token");
        set({
            isLoggedIn: false,
            userName: "",
        });
    },
    checkLogin: async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const userName = await AuthEvent.checkLogin(token);

                set({
                    isLoggedIn: true,
                    userName: userName,
                    hasCheckLogin: true,
                });
            } catch (error: any) {
                console.error(error);
                set({ isLoggedIn: false, userName: "", hasCheckLogin: true });
            }
        } else {
            set({ isLoggedIn: false, userName: "", hasCheckLogin: true });
        }
    },
}));

export default useAuthStore;

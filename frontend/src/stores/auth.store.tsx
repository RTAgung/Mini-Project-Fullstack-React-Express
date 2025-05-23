/* eslint-disable @typescript-eslint/no-explicit-any */

import { create } from "zustand";
import AuthApi from "../services/api/auth.api";
import UserApi from "../services/api/user.api";

interface AuthState {
    isLoggedIn: boolean;
    isLoadingLogin: boolean;
    isErrorLogin: boolean;
    isLoadingRegister: boolean;
    isErrorRegister: boolean;
    message: string | null;
    userName: string;
    hasCheckLogin: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<boolean>;
    logout: () => Promise<void>;
    checkLogin: () => Promise<void>;
}

class AuthEvent {
    static async login(email: string, password: string): Promise<any> {
        await AuthApi.login({ email, password });

        const tokenData = await AuthApi.checkToken();
        const userId = tokenData.data.id;

        const userData = await UserApi.getUserById({ userId });
        const json = userData.data;

        return json.fullname ?? "";
    }

    static async checkLogin(): Promise<any> {
        const tokenData = await AuthApi.checkToken();
        const userId = tokenData.data.id;

        const userData = await UserApi.getUserById({ userId });
        const json = userData.data;

        return json.fullname ?? "";
    }
}

const useAuthStore = create<AuthState>((set, get) => ({
    isLoggedIn: false,
    isLoadingLogin: false,
    isErrorLogin: false,
    isLoadingRegister: false,
    isErrorRegister: false,
    message: null,
    userName: "",
    hasCheckLogin: false,
    login: async (email: string, password: string) => {
        set({
            isLoadingLogin: true,
            isLoggedIn: false,
            isErrorLogin: false,
            message: null,
        });
        try {
            const userName = await AuthEvent.login(email, password);
            set({
                isLoggedIn: true,
                userName: userName ?? "",
            });
        } catch (error: any) {
            set({
                isErrorLogin: true,
                message: error.message,
            });
            console.error(error);
        } finally {
            set({ isLoadingLogin: false });
        }
    },
    register: async (data: any) => {
        set({
            isLoadingRegister: true,
            isErrorRegister: false,
            message: null,
        });
        try {
            await AuthApi.register(data);
            set({ isLoadingRegister: false });
            return true;
        } catch (error: any) {
            set({
                isLoadingRegister: false,
                isErrorRegister: true,
                message: error.message,
            });
            console.error(error);
            return false;
        }
    },
    logout: async () => {
        await AuthApi.logout();
        set({
            isLoggedIn: false,
            userName: "",
        });
    },
    checkLogin: async () => {
        if (get().hasCheckLogin) return;
        try {
            const userName = await AuthEvent.checkLogin();
            set({
                userName: userName,
                isLoggedIn: true,
                hasCheckLogin: true,
            });
        } catch (error: any) {
            console.error(error);
            get().logout();
            set({
                userName: "",
                hasCheckLogin: true,
            });
        }
    },
}));

export default useAuthStore;

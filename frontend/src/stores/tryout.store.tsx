/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import TryoutApi from "../services/api/tryout.api";

interface TryoutState {
    tryouts: any[];
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    message: string | null;
    fetchTryouts: () => Promise<void>;
}

const initialState = {
    tryouts: [],
    isLoading: false,
    isError: false,
    isEmpty: false,
    message: null,
};

const useTryoutStore = create<TryoutState>((set) => ({
    ...initialState,

    fetchTryouts: async () => {
        set({ isLoading: true, isError: false, isEmpty: false, message: null });
        try {
            const response = await TryoutApi.fetchData();
            const data = response.data;
            if (data.length === 0) {
                set({ isEmpty: true });
            } else {
                set({ tryouts: response.data });
            }
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useTryoutStore;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import TryoutApi from "../services/api/tryout.api";

interface TryoutState {
    tryouts: any[];
    isLoading: boolean;
    isError: boolean;
    message: string | null;
    fetchTryouts: () => Promise<void>;
}

const initialState: TryoutState = {
    tryouts: [],
    isLoading: false,
    isError: false,
    message: null,
    fetchTryouts: async () => {},
};

const useTryoutStore = create<TryoutState>((set) => ({
    ...initialState,

    fetchTryouts: async () => {
        set({ isLoading: true, isError: false, message: null });
        try {
            const response = await TryoutApi.fetchData();
            set({ tryouts: response.data });
        } catch (error: any) {
            set({ isError: true, message: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useTryoutStore;

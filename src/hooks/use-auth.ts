import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    key: string | undefined;
    setKey: (key: string) => void;
    clear: () => void;
}

export const useAuth = create<AuthStore>()(
    persist(
        (set) => ({
            key: undefined,
            setKey: (key: string) => set({ key }),
            clear: () => {
                set({ key: undefined });
                localStorage.removeItem("auth-storage");
            },
        }),
        {
            name: "auth-storage",
        }
    )
);

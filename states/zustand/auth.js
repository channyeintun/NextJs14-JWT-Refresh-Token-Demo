import { getClientJwt } from "@/services";
import { create } from "zustand";

const useAuthStore = create((set) => ({
    jwt: getClientJwt().jwt,
    removeJwt: () => set({ jwt: undefined }),
    setJwt: (newJwt) => set({ jwt: newJwt }),
}));

export default useAuthStore;

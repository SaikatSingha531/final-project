import { User } from "@/typescript/global";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("currentUser");
    set({ user: null });
  },

  loadUser: () => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    set({ user });
  },
}));
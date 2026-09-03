import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { secureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });

      await secureStorageAdapter.deleteItem("token");

      return false;
    }

    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    await secureStorageAdapter.setItem("token", token);

    return true;
  },

  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);
    return get().changeStatus(response?.token, response?.user);
  },

  checkStatus: async () => {
    const response = await authCheckStatus();
    get().changeStatus(response?.token, response?.user);
  },

  logout: async () => {
    secureStorageAdapter.deleteItem("token");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));

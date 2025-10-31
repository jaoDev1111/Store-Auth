interface User {
  email: string;
  token: string;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  isAuthenticated?: boolean;
  user?: User | null;
}

interface Actions {
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearAuth: () => void;
}

const initialState: State = {
  isAuthenticated: false,
  user: {
    email: "",
    token: "",
  },
};

// Faz todo o controle do fluxo de acesso de autenticação - É como se fosse o segurança que observa se o usuário tem a pulseira = token para entrar na área vip. Disponibiliza de forma global o estado de login do usuário
export const useAuthStore = create<State & Actions>()(
  persist(
    // Opcional: remove se não quiser persistência
    (set) => ({
      ...initialState,

      login: (userData: User) =>
        set({
          isAuthenticated: true,
          user: userData,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),

      updateUser: (userData: Partial<User>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      clearAuth: () => set(initialState),
    }),
    {
      name: "auth-storage", // Nome para o localStorage
      // partialize: (state) => ({ user: state.user }) // Opcional: persistir apenas partes específicas
    }
  )
);

export const useAuth = () => {
  const { isAuthenticated, user, login, logout, updateUser, clearAuth } =
    useAuthStore();

  return {
    isAuthenticated,
    user,
    login,
    logout,
    updateUser,
    clearAuth,
    // Utilitários adicionais
    isLoggedIn: isAuthenticated && user?.token,
    userEmail: user?.email || "",
  };
};

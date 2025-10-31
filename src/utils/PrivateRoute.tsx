import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

import { useEffect, type PropsWithChildren } from "react";

type ProtectedRouteProps = PropsWithChildren;

const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.user?.token ?? "");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate, token]);

  // Opcional: mostrar loading enquanto verifica
  if (!isAuthenticated || !token) {
    return <div>Carregando...</div>; // ou null, ou um spinner
  }

  return children;
};

export default PrivateRoute;

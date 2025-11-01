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

  // Da pra colocar um loading enquanto carrega em
  if (!isAuthenticated || !token) {
    return <div>Carregando...</div>; //  spinner / componente de loading
  }

  return children;
};

export default PrivateRoute;

// import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../utils/PrivateRoute";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

// const LoginPage = lazy(() => import('../pages/LoginPage'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <h1>Dashboard - Área Privada</h1>
      </PrivateRoute>
    ),
  },
]);

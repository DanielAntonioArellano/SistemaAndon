import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sidebar from "./Components/Shared/Sidebar.jsx";
import PageUsers from "./pages/Users.jsx";
import RegisterPage from "./pages/Register.jsx";
import Production from "./pages/Production.jsx";
import Eventos from "./pages/DashboardEventos.jsx";
import NavBar from "./Components/Shared/NavbarUser.jsx";
import Failure from "./pages/Failure.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <Dashboard />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/sidebar",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <Sidebar />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <PageUsers />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <RegisterPage />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/production",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <Production />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/events",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <Eventos />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/failure",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <Failure />
        </>
      </ProtectedRoute>
    ),
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/shared";
import { CreateUserPage } from "@/features/users"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/auth" replace/>, 
    },
    {
        path:"/auth",
        element: <AuthLayout />,
        children: [{ index: true, element: <h1>Inicio Auth</h1>}],
    },
    {
        path:"/dashboard",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <h1>Inicio Dashboard</h1> },
            { path: "contacto", element: <h1>Contacto</h1> },
            { path: "usuarios", element: <h1>Usuarios</h1> },
            { path: "productos", element: <h1>Productos</h1> },
        ],
    },
]);

export default router;
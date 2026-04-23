import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/shared/layouts/MainLayout";
import { CreateUserPage } from "@/features/users"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <h1 className="p-4">Inicio</h1>,
            },
            {
                path: "cursos",
                element: <h1 className="p-4"></h1>,
            },
            {
                path: "recursos",
                element: <h1 className="p-4"></h1>,

            },
            {
                path: "contacto",
                element: <h1 className="p-4"></h1>,
            },
        ],
    },
]);

export default router;
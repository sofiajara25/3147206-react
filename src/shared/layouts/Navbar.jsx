import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
    IconButton,
    Switch,
    Dropdown,
    DropdownTrigger,
    DropdownItem,
    DropdownContent,
} from "@/shared";
import logo from "@/assets/images/Logo1.png";
import { useState } from "react";


export default function Navbar() {

    // Estado que controla el switch
    const [isActive, setIsActive] = useState(true);

    // Manejador del estado del switch
    const handleStatusChange = (value) => {
        setIsActive(value);

        // Aquí generalmente va el llamdo a una API
        console.log("Nuevo estado", value)
    }

    return (
        <nav className="w-full bg-transparent border-b-2">
            <div className="mx-auto max-w-7xl px-4 ">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo de marca */}
                    <div className="flex items-center">
                        <Link to={"/"} className="text-h1 font-heading ">
                            <img src={logo} alt="logo" className="h-12 w-auto" />
                        </Link>
                    </div>

                    {/* Switch */}
                    <Switch
                        checked={isActive}
                        onChange={handleStatusChange}
                        size="md"
                    />

                    {/* Links de navegación */}
                    <ul className="hidden md:flex items-center gap-6">
                        <li>
                            <Link to={"/inicio"} className="hover:text-text-primary transition">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to={"/inicio"} className="hover:text-text-primary transition">
                                Cursos
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} className="hover:text-text-primary transition">
                                Recursos
                            </Link>
                        </li>
                        <li>
                            <Link to={"/inicio"} className="hover:text-text-primary transition">
                                Contacto
                            </Link>
                        </li>
                    </ul>

                    {/* Sección de la derecha: búsqueda +usuario */}
                    <div className="flex items-center gap-5">

                        {/* Icono de búsqueda */}
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="pl-9 pr-4 py-2.5 border rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-text-primary"
                            />
                        </div>

                        {/* Icono de usuario */}
                        <Link>

                        </Link>
                        {/* ======= Dropdown ======= */}
                        <div className="p-10">
                            <Dropdown>
                                <DropdownTrigger>
                                    <IconButton ariaLabel="Menú de usuario">
                                        <User />
                                    </IconButton>
                                </DropdownTrigger>

                                <DropdownContent className="right-0 w-48">
                                    <DropdownItem>
                                        <Link to="/dashboard/auth" className="block w-full">
                                            Cerrar sesión
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/dashboard" className="block w-full">
                                            Panel de control
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/login" className="block w-full">
                                            Gestión usuarios
                                        </Link>
                                    </DropdownItem>

                                    <DropdownItem
                                        onClick={() => {
                                            console.log("Cerrar sesión");
                                        }}
                                    >
                                        Cerrar sesión
                                    </DropdownItem>
                                </DropdownContent>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};
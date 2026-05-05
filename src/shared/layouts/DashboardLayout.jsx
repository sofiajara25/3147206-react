import { Outlet } from "react-router-dom";
import heroBg from "@/assets/images/bg-3.jpg";
import { Navbar }from "@/shared";
import { HomePage } from "@/features/home";

export default function MainLayout() {
  return (
    <div className="relative min-h-screen text-text-primary">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <Navbar/>

      {/* Contenido dinámico de las páginas */}
      <main>
        <HomePage/>
        <Outlet/>
      </main>
    </div>
  );
}

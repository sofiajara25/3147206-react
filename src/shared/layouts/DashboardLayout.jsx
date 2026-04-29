import { Outlet, Link } from "react-router-dom";
import heroBg from "@/assets/images/bg-3.jpg";
import { ArrowLeftToLine } from "lucide-react";
import { IconButton } from "@/shared";

export default function DashboardLayout() {
    return (
        <div className="relative min-h-screen text-text-primary ">

            <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            <Link to="/auth">
                <IconButton
                    variant="ghost"
                >
                    <ArrowLeftToLine />
                </IconButton>
            </Link>
        </div>
    );
}
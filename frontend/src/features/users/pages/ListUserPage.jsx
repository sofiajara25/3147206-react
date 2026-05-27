import DataTable from "@/shared/components/DataTable"
import { usersColumns } from "../table/usersColumns"
import { users } from "../data/users"
import { Button } from "@/shared"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal";

export default function ListUserPage() {

    const [isReportModalOpen, setIsReportModalOpen] = useState(false)

    const navigate = useNavigate();

    return (
        <div className="p-6">

            <div className="flex flex-1 justify-end gap-2">
                <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsReportModalOpen(true)}>
                    Reportar usuario
                </Button>

                <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate("/dashboard/create-user")}>
                    Crear usuario
                </Button>
            </div>

            <h1 className="text-xl font-semibold mb-4">
                Usuarios
            </h1>


            <DataTable
                data={users}
                columns={usersColumns}
            />

            <ReportConfigModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
            />


        </div>
    )
}

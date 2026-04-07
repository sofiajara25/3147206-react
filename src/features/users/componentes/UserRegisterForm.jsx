import { useState, useEffect } from "react";

import { Input, Button, DeleteCounter, DeleteEffect, DeleteCounter2, Select } 
from "@/shared";
import { getDocumentType } from "../services/selectServices";

export default function UserRegisterForm() {

    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        getDocumentType().then(setDocumentTypes);
    }, []);

    // Handle
    const handleNameChange = (e) => {
        console.log("Nombre: ", e.target.value)
    }

    const handleEmailBlur = (e) => {
        console.log("Email: ", e.target.value)
    }

    return (
        <div>
            <h1 className="text-text-primary text-2xl mb-6">Regitro de usuarios</h1>

            <form className="grid grid-cols-1 items-center gap-6">
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-6 my-0 mx-auto ">
                    <Input
                        label="Nombre"
                        placeholder="Ingrese su nombre"
                        onChange={handleNameChange}
                    />

                    <Input
                        label="Nombre"
                        placeholder="Ingrese su nombre"
                    />

                    <Input
                        label="Nombre"
                        placeholder="Ingrese su nombre"
                    />

                    <Input
                        label="Teléfono"
                        placeholder="Ingrese su teléfono"
                        type="tel"
                    />

                    <Input
                        label="Correo"
                        placeholder="Ingrese su correo"
                        type="email"
                        onBlur={handleEmailBlur}
                    />

                    <Input
                        label="Contreseña"
                        placeholder="Ingrese su contraseña"
                        type="password"
                    />
                    
                    <Input
                        label="Edad"
                        placeholder="Ingrese su edad"
                        type="number"
                    />

                    <Select
                        label="Tipo de documento"
                        name="documentType"
                        options={documentTypes}
                    />

                    {/* Actions */}
                    <div className="flex items-end justify-end gap-12">
                        <Button variant="secondary" size="sm">
                            Cancelar
                        </Button>

                        <Button variant="secondary" size="md">
                            Guardar
                        </Button>
                    </div>

                </div>

            </form>

            <DeleteCounter />

            {/* Uso del useEffect */}
            <DeleteEffect/>

            <DeleteCounter2/>

        </div>
    );
}
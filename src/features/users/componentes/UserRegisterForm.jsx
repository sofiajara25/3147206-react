import { useState, useEffect } from "react";

import { Input, Button, DeleteCounter2, Select }
    from "@/shared";
import { getDocumentType } from "../services/selectServices";
import { userSchema } from "../schemas/userSchema";

export default function UserRegisterForm() {

    const [documentTypes, setDocumentTypes] = useState([]);
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        documentType: "",
        userDocumentNumber: "",
        userPassword: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        getDocumentType().then(setDocumentTypes);
    }, []);

    // ===========================
    //        Handle Genérico
    // ===========================
    /**
     * Función que se ejecuta cada vez que cambia el valor de un input del formulario 
     */
    const handleChange = (e) => {
        // Se obtiene el nombre del campo y su valor 
        const { name, value } = e.target;

        setFormData((prev) => ({
            // Se copian todos loa valores anteriores del estado
            ...prev,

            // Se actualiza unicamente lo que cambió
            [name]: value,
        }));
    };

    // ===========================
    //        Handle Submit
    // ===========================
    /**
     * Función que se ejecuta cuando se envía al formulario
     */

    const handleSubmit = (e) => {

        e.preventDefault();

        const result = userSchema.sefaParse(formData);

        // Si la validación falla
        if (!result.success) {
            // Objeto donde se almacenarán los errores por campo
            const fieldErrors = {};

            // Zod devuelve los errores en un arreglo llamado issues
            // Se recorren para asociar cada error a su campo que fallo
            result.error.issues.forEach((issue) => {
                // issue.path contiene la ruta del campo que fallo
                const field = issue.path[0];

                fieldErrors[field] = issue.message;
            });

            setErrors(fieldErrors);

            return;
        }
        setErrors({});

        console.log("Usuarios válido: ", result.data);
    }

    return (
        <div>
            <h1 className="text-text-primary text-2xl mb-6">Regitro de usuarios</h1>

            <form
                className="grid grid-cols-1 items-center gap-6"
                onSubmit={handleSubmit}>
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-6 my-0 mx-auto ">
                    <Input
                        label="Nombre"
                        name="userName"
                        placeholder="Ingrese su nombre"
                        value={formData.userName}
                        onChange={handleChange}
                        error={errors.userName}
                    />

                    <Input
                        label="Correo"
                        name="userEmail"
                        placeholder="Ingrese su correo"
                        type="email"
                        value={formData.userEmail}
                        onChange={handleChange}
                        error={errors.userEmail}
                    />

                    <Input
                        label="Teléfono"
                        name="userPhone"
                        placeholder="Ingrese su teléfono"
                        type="tel"
                        value={formData.userPhone}
                        onChange={handleChange}
                        error={errors.userPhone}
                    />

                    <Select
                        label="Tipo de documento"
                        name="documentType"
                        options={documentTypes}
                        value={formData.documentType}
                        onChange={handleChange}
                        error={errors.documentType}
                    />

                    <Input
                        label="Número de documento"
                        name="userDocumentNumber"
                        placeholder="Ingrese su número de documento"
                        value={formData.userDocumentNumber}
                        onChange={handleChange}
                        error={errors.userDocumentNumber}
                    />

                    <Input
                        label="Contreseña"
                        name="userPassword"
                        placeholder="Ingrese su contraseña"
                        type="password"
                        value={formData.userPassword}
                        onChange={handleChange}
                        error={errors.userPassword}
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

            <DeleteCounter2 />

        </div>
    );
}
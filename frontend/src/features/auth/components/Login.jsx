import { useState } from "react";
import { loginSchema } from "../schemas/loginSchema";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SquareArrowRightEnter, Menu } from "lucide-react";

import {
  Input,
  Button,
} from "@/shared";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",

    // Flags booleanos
    isStaff: false,
    isActive: true,
    isSuperUser: false,
  });
  const [errors, setErrors] = useState({});

  // ======================================
  //            Handle Genérico
  // ======================================
  /**
   * Función que se ejecuta cada vez que cambia el valor de un input del formulario
   */
  const handleChange = (e) => {
    // Se obtiene el nombre del campo y su valor
    const { name, value, type, checked} = e.target;

    setFormData((prev) => ({
      // Se copian todos los valores anteriores del estado
      ...prev,

      // Se actualiza unicamente lo que cambió
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================================
  //            Handle Submit
  // ======================================
  /**
   * Función que se ejecuta cuando se envía el formulario
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      // Objeto donde se almacenarán
      const fieldErrors = {};

      // Zod devuelve los errores en un arreglo llamado issues
      // Se recorren para asociar cada error a su campo correspondiente
      result.error.issues.forEach((issue) => {
        // contiene la ruta del campo que falló
        const field = issue.path[0];
        // Se guarda el mensaje de error en el objeto
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      // Se detiene la ejecución porque el formulario tiene errores
      return;
    }

    setErrors({});
    console.log("Usuario válido:", result.data);
  };

  return (
    <div className="flex flex-col justify-center h-screen ">
      <h1 className="text-text-primary text-2xl mb-6 text-center pt-6">
        Inicio de Sesión
      </h1>

      <form
        className="grid grid-cols-1 items-center gap-6"
        onSubmit={handleSubmit}
      >
        {/* Inputs */}
        <div className="grid grid-cols-1 gap-6 my-auto mx-auto border p-[48px] rounded-[6px] ">

          <Input
            label="Correo"
            name="userEmail"
            type="email"
            placeholder="Ingrese su correo"
            value={formData.userEmail}
            onChange={handleChange}
            error={errors.userEmail}
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
          <div className="flex items-center justify-center gap-12">
            <Button variant="secondary" size="sm" >
              Cancelar
            </Button>

            <Button variant="primary" size="md" onClick={() => navigate("/dashboard")}>
              Iniciar
            </Button>

            {/* Icon button */}
            {/* <Link to="/dashboard">
              <IconButton variant="ghost">
                <SquareArrowRightEnter />
              </IconButton>
            </Link> */}

            {/* <a href="/DashboardLayout">
              <IconButton>
                <SquareArrowRightEnter />
              </IconButton>
            </a> */}

            {/* <IconButton onClick={() => navigate("/DashboardLayout")}>
                <SquareArrowRightEnter />
              </IconButton> */}
          </div>
        </div>
      </form>
    </div>
  );
}

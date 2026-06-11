import { useState, useEffect} from "react";
import { getDocumentTypes } from "../services/selectServices";
import { userSchema } from "../schemas/userSchema";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

import {
  Input,
  Button,
  Select,
  Checkbox,
  IconButton,
  FileInput
} from "@/shared";


export default function UserRegisterForm() {
  const navigate = useNavigate();

  // Estados
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userDocumentType: "",
    userDocumentNumber: "",
    userPassword: "",
    userImage: [],

    // Flags booleanos
    isStaff: false,
    isActive: true,
    isSuperUser: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  // ======================================
  //            Handle Genérico
  // ======================================
  /**
   * Función que se ejecuta cada vez que cambia el valor de un input del formulario
   */
  const handleChange = (e) => {
    // Se obtiene el nombre del campo y su valor
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      // Se copian todos los valores anteriores del estado
      ...prev,

      // Se actualiza unicamente lo que cambió
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ======================================

  //============== HANDLE SUBMIT ==============
  const handleSubmit = async (e) => {
    // Evita que el formulario recargue la página
    e.preventDefault();

    // Validamos los datos del formulario contra el esquema Zod
    // safeParse NO lanza excepción, retorna un objeto controlado
    const result = userSchema.safeParse(formData);

    // Verificar en consola si el esquema está funcionando 
    console.log(result);

    // Si la validación falla
    if (!result.success) {
      // Objeto donde almacenaremos los errores por campo
      const fieldErrors = {};

      // Recorremos cada error generado por Zod
      result.error.issues.forEach((issue) => {
        // issue.path[0] corresponde al nombre del campo
        // issue.message contiene el mensaje de error definido en el schema
        fieldErrors[issue.path[0]] = issue.message;
      });

      // Actualizamos el estado de errores para mostrarlos en la UI
      setErrors(fieldErrors);

      // Cortamos la ejecución: NO se envía nada al backend

      return;
    }

    // Si la validación pasa, limpiamos errores previos
    setErrors({});

    // Activamos estado de envío (útil para deshabilitar el botón)
    setIsSubmitting(true);

    try {
      // Llamamos al servicio frontend que consume la API
      // result.data contiene los datos ya validados por Zod
      const response = await createUser(result.data);

      // Log informativo para desarrollo
      console.log("Usuario creado:", response);

      // Feedback básico al usuario
      alert("Usuario creado correctamente");

      // Navegamos a la vista anterior
      // navigate(-1) equivale a "volver atrás"
      navigate(-1);
    } catch (error) {
      // Capturamos errores de red o errores lanzados por el service
      console.error("Error:", error.message);

      // Mostramos el mensaje de error al usuario
      alert(error.message);
    } finally {
      // Pase lo que pase, desactivamos el estado de envío
      setIsSubmitting(false);
    }
  };

// =======================================================

  let label;
   // 😂 lógica fuera del JSX
  if (isSubmitting) {
    label = "Guardando...";
  } else {
    label = "Guardar";
  }

// =======================================================


  return (
    <div>
      <h1 className="text-text-primary text-2xl mb-6 text-center pt-6">
        Regitro de usuarios
      </h1>

      <form
        className="grid grid-cols-1 items-center gap-6"
        onSubmit={handleSubmit}
      >
        {/* Inputs */}
        <div
          className="
          grid grid-cols sm:grid-cols-2
          gap-6
          mx-auto
          border
          p-6 sm:p-[48px]
          rounded-[6px]
        "
        >
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
            type="email"
            placeholder="Ingrese su correo"
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
            error=   {errors.userPhone}
          />

          <Select
            label="Tipo de documento"
            name="userDocumentType"
            options={documentTypes}
            value={formData.userDocumentType}
            onChange={handleChange}
            error={errors.userDocumentType}
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
            label="Contraseña"
            name="userPassword"
            placeholder="Ingrese su contraseña"
            type="password"
            value={formData.userPassword}
            onChange={handleChange}
            error={errors.userPassword}
          />

          <Checkbox
            id="isStaff"
            name="isStaff"
            label="Es staff"
            checked={formData.isStaff}
            onChange={handleChange}
          />
          <Checkbox
            id="isActive"
            name="isActive"
            label="Activo"
            checked={formData.isActive}
            onChange={handleChange}
          />

          <Checkbox
            id="isSuperUser"
            name="isSuperUser"
            label="Es super usuario"
            checked={formData.isSuperUser}
            onChange={handleChange}
          />

          {/* Contenedor del input */}
          <div>
            <h4>
              Máximo puede subir 12 archivos, archivos permitidos jpg, png etc
            </h4>
            <FileInput
              value={formData.userImage}
              onChange={(files) =>
                setFormData((prev) => ({ ...prev, userImage: files }))
              }
              multiple={true}
            />
            {errors.userImage && (
              <span className="text-red-500 text-sm">{errors.userImage}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-end justify-end gap-12">
            <Button variant="secondary" size="sm" type="button" onClick={() => navigate(-1)}>
              Cancelar
            </Button>

            <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>
              {label}
              {/* {isSubmitting ? "Guardando..." : "Guardar"} */}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

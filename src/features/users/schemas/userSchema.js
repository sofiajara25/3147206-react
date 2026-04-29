import { z } from "zod";

export const userSchema = z.object({

    userName: z
        .string()
        .min(3, "El nombre debe tener mínimo 3 caracteristicas")
        .max(60, "El nombre es demasiado largo"),

    userEmail: z
        .string()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ingresar un email válido"),

    userPhone: z
        .string()
        .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos"),

    documentType: z
        .string()
        .min(1, "Debe seleccionar un tipo de documento"),
        
    userDocumentNumber: z
        .string()
        .min(5, "Número de documento inválido")
        .max(20, "Número de documento damasiado largo"),

    userPassword: z 
        .string()
        .min(8, "Contraseña debe tener mínimo 8 caracteres ")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

})
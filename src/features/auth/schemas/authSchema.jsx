import { z } from "zod";

export const authSchema = z.object({
  userEmail: 
    z.email()    
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Debe ingresar un email válido"),

  userPassword: z
    .string()
    .min(8, "Contraseña debe tener mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),

  avatarUrl: z
    .string()
    .url("La URL del avatar no es válida")
    .nullable()
    .optional(),
});

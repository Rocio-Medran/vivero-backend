import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(100, 'La contraseña no puede tener más de 100 caracteres'),
});

export type LoginDTO = z.infer<typeof loginSchema>;
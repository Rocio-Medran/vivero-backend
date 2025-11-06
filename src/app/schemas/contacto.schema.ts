import z from "zod";

export const ContactoSchema = z.object({
  id: z.number().min(1),
  horario_atencion: z.string().min(2).max(250),
  email: z.string().email().max(250),
  telefono: z.string().min(3).max(20),
  whatsapp: z.string().min(3).max(20)
});

export const UpContactoSchema = z.object({
  horario_atencion: z.string().min(2).max(250).optional(),
  email: z.string().email().max(250).optional(),
  telefono: z.string().min(3).max(20).optional(),
  whatsapp: z.string().min(3).max(20).optional()
});

export type ContactoDTO = z.infer<typeof ContactoSchema>;
export type UpContactoDTO = z.infer<typeof UpContactoSchema>;

import z from "zod";

export const EncargadoSchema = z.object({
  id: z.number().min(1),
  nombre: z.string().min(2).max(100),
  foto: z.string().min(1).max(255),
  descripcion: z.string().min(2)
});

export const UpEncargadoSchema = z.object({
  nombre: z.string().min(2).max(100).optional(),
  foto: z.string().min(1).max(255).optional(),
  descripcion: z.string().min(2).optional()
});

export type EncargadoDTO = z.infer<typeof EncargadoSchema>;
export type UpEncargadoDTO = z.infer<typeof UpEncargadoSchema>;

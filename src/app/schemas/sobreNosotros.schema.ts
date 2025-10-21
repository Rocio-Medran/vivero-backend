import z from 'zod';

export const SobreNosotrosSchema = z.object({
    id: z.number().min(1),
    titulo: z.string().min(2).max(250),
    contenido: z.string().min(2),
    mision: z.string().nullish(),
    vision: z.string().nullish(),
    valores: z.string().nullish(),
    ultima_actualizacion: z.date(),
    esta_activo: z.boolean(),
    imagen_url: z.string().nullish(),
    imagen2_url: z.string().nullish()
});

export const CreateSobreNosotrosSchema = z.object({
    titulo: z.string().min(2).max(250),
    contenido: z.string().min(2),
    mision: z.string().optional(),
    vision: z.string().optional(),
    valores: z.string().optional(),
    imagen_url: z.string().optional(),
    imagen2_url: z.string().optional()
});

export const UpSobreNosotrosSchema = z.object({
    titulo: z.string().min(2).max(250).optional(),
    contenido: z.string().min(2).optional(),
    mision: z.string().optional(),
    vision: z.string().optional(),
    valores: z.string().optional(),
    imagen_url: z.string().optional(), 
    imagen2_url: z.string().optional()
});

export const SobreNosotrosDetallesSchema = z.object({
    titulo: z.string().min(2).max(250),
    contenido: z.string().min(2),
    mision: z.string().nullish(),
    vision: z.string().nullish(),
    valores: z.string().nullish(),
    imagen_url: z.string().nullish(),
    imagen2_url: z.string().nullish()
});

export type SobreNosotrosDTO = z.infer<typeof SobreNosotrosSchema>;
export type CreateSobreNosotrosDTO = z.infer<typeof CreateSobreNosotrosSchema>;
export type UpSobreNosotrosDTO = z.infer<typeof UpSobreNosotrosSchema>;
export type SobreNosotrosDetallesDTO = z.infer<typeof SobreNosotrosDetallesSchema>;
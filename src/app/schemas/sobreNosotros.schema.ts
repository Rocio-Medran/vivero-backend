import z from 'zod';

export const SobreNosotrosSchema = z.object({
    id: z.number().min(1),
    nuestro_origen: z.string().min(2),
    produccion_historica: z.string().min(2),
    nuevas_producciones: z.string().min(2),
    ultima_actualizacion: z.date(),
    imagen_url: z.string().nullish(),
    imagen2_url: z.string().nullish(),
    imagen3_url: z.string().nullish(),
    imagen4_url: z.string().nullish(),
    imagen5_url: z.string().nullish()
});

export const UpSobreNosotrosSchema = z.object({
    nuestro_origen: z.string().min(2).optional(),
    produccion_historica: z.string().min(2).optional(),
    nuevas_producciones: z.string().min(2).optional(),
    imagen_url: z.string().optional(),
    imagen2_url: z.string().optional(),
    imagen3_url: z.string().optional(),
    imagen4_url: z.string().optional(),
    imagen5_url: z.string().optional()
});

export const SobreNosotrosDetallesSchema = z.object({
    nuestro_origen: z.string().min(2),
    produccion_historica: z.string().min(2),
    nuevas_producciones: z.string().min(2),
    imagen_url: z.string().nullish(),
    imagen2_url: z.string().nullish(),
    imagen3_url: z.string().nullish(),
    imagen4_url: z.string().nullish(),
    imagen5_url: z.string().nullish()
});

export type SobreNosotrosDTO = z.infer<typeof SobreNosotrosSchema>;
export type UpSobreNosotrosDTO = z.infer<typeof UpSobreNosotrosSchema>;
export type SobreNosotrosDetallesDTO = z.infer<typeof SobreNosotrosDetallesSchema>;
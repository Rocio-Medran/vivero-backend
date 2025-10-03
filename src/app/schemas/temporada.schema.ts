import z from 'zod';

export const TemporadaSchema = z.object ({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    fecha_desde: z.number().min(1).max(12),
    fecha_hasta: z.number().min(1).max(12)
});

export const CreateTemporadaSchema = z.object ({
    nombre: z.string().min(2).max(250),
    fecha_desde: z.number().min(1).max(12),
    fecha_hasta: z.number().min(1).max(12)
});

export const UpdateTemporadaSchema = z.object ({
    nombre: z.string().min(2).max(250).optional(),
    fecha_desde: z.number().min(1).max(12).optional(),
    fecha_hasta: z.number().min(1).max(12).optional()
});

export type TemporadaDTO = z.infer<typeof TemporadaSchema>;
export type CreateTemporadaDTO = z.infer<typeof CreateTemporadaSchema>;
export type UpdateTemporadaDTO = z.infer<typeof UpdateTemporadaSchema>;
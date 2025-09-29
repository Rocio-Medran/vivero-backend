import z from 'zod';

export const TemporadaSchema = z.object ({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    fecha_desde: z.date(),
    fecha_hasta: z.date()
});

export const CreateTemporadaSchema = z.object ({
    nombre: z.string().min(2).max(250),
    fecha_desde: z.date(),
    fecha_hasta: z.date()
});

export const UpdateTemporadaSchema = z.object ({
    nombre: z.string().min(2).max(250).optional(),
    fecha_desde: z.date().optional(),
    fecha_hasta: z.date().optional()
});

export type TemporadaDTO = z.infer<typeof TemporadaSchema>;
export type CreateTemporadaDTO = z.infer<typeof CreateTemporadaSchema>;
export type UpdateTemporadaDTO = z.infer<typeof UpdateTemporadaSchema>;
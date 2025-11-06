import z from "zod";


export const ImagenServicioSchema = z.object({
    id: z.number().min(1),
    url: z.string(),
    public_id: z.string().optional(),
    es_principal: z.boolean().default(false),
    orden: z.number().min(0)
});


export const CreateImagenServicioSchema = z.object({
    url: z.string(),
    es_principal: z.boolean().default(false),
    orden: z.number().min(0).optional(),
    servicio_id: z.number().min(1)
});

export type ImagenServicioDTO = z.infer<typeof ImagenServicioSchema>;
export type CreateImagenServicioDTO = z.infer<typeof CreateImagenServicioSchema>;

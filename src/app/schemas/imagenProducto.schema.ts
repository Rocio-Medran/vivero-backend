import z from "zod";


export const ImagenProductoSchema = z.object({
    id: z.number().min(1),
    public_id: z.string().optional(),
    url: z.string(),
    es_principal: z.boolean().default(false),
    es_ilustrativa: z.boolean().default(false),
    orden: z.number().min(0)
});

export const CreateImagenProductoSchema = z.object({
    url: z.string(),
    es_principal: z.boolean().default(false),
    es_ilustrativa: z.boolean().default(false),
    orden: z.number().min(0),
    producto_id: z.number().min(1)
});

export const UpdateImagenProductoSchema = z.object({
    url: z.string().optional(),
    es_principal: z.boolean().default(false).optional(),
    es_ilustrativa: z.boolean().default(false).optional(),
    orden: z.number().min(0).optional(),
    producto_id: z.number().min(1).optional()
});

export type ImagenProductoDTO = z.infer<typeof ImagenProductoSchema>;
export type CreateImagenProductoDTO = z.infer<typeof CreateImagenProductoSchema>;
export type UpdateImagenProductoDTO = z.infer<typeof UpdateImagenProductoSchema>;
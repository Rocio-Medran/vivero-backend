import z from "zod";


export const ImagenProductoSchema = z.object({
    id: z.number().min(1),
    url: z.string().url(),
    es_principal: z.boolean().default(false),
    orden: z.number().min(0)
});

export const CreateImagenProductoSchema = z.object({
    url: z.string().url(),
    es_principal: z.boolean().default(false),
    orden: z.number().min(0),
    producto_id: z.number().min(1)
});

export const UpdateImagenProductoSchema = z.object({
    url: z.string().url().optional(),
    es_principal: z.boolean().default(false).optional(),
    orden: z.number().min(0).optional(),
    producto_id: z.number().min(1).optional()
});

export type ImagenProductoDTO = z.infer<typeof ImagenProductoSchema>;
export type CreateImagenProductoDTO = z.infer<typeof CreateImagenProductoSchema>;
export type UpdateImagenProductoDTO = z.infer<typeof UpdateImagenProductoSchema>;
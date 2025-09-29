import { z } from "zod";

export const CreateProductoSchema = z.object({
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    esta_activo: z.boolean().default(true),
    categoria_id: z.number().min(1),
    temporada_id: z.number().min(1),
});

export const UpdateProductoSchema = z.object({
    nombre: z.string().min(2).max(250).optional(),
    descripcion: z.string().min(10).max(1000).optional(),
    esta_activo: z.boolean().optional(),
    categoria_id: z.number().min(1).optional(),
    temporada_id: z.number().min(1).optional(),
});

export const ProductoSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    esta_activo: z.boolean().default(true),
    categoria_id: z.number().min(1),
    temporada_id: z.number().min(1),
});

export const ProductoConDetallesSchema = z.object({
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    nombre_categoria: z.string().min(2).max(250),
    nombre_temporada: z.string().min(2).max(250),
    imagenes: z.array(z.object({
        id: z.number().min(1),
        url: z.string().url(),
        es_principal: z.boolean().default(false),
        orden: z.number().min(0)
    })).optional()
});

export type CreateProductoDTO = z.infer<typeof CreateProductoSchema>;
export type UpdateProductoDTO = z.infer<typeof UpdateProductoSchema>;
export type ProductoDTO = z.infer<typeof ProductoSchema>;
export type ProductoConDetallesDTO = z.infer<typeof ProductoConDetallesSchema>;
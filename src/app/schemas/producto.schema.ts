import { z } from "zod";
import { es } from "zod/v4/locales";


export const CreateProductoSchema = z.object({
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    informacion_extra: z.string().min(10).max(2000),
    categoria_id: z.number().min(1),
    temporada_id: z.number().min(1),
});

export const UpdateProductoSchema = z.object({
    nombre: z.string().min(2).max(250).optional(),
    descripcion: z.string().min(10).max(1000).optional(),
    informacion_extra: z.string().min(10).max(2000).optional(),
    esta_activo: z.boolean().optional(),
    categoria_id: z.number().min(1).optional(),
    temporada_id: z.number().min(1).optional(),
});

export const ProductoSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    informacion_extra: z.string().min(10).max(2000),
    esta_activo: z.boolean().default(true),
    categoria_id: z.number().min(1),
    temporada_id: z.number().min(1),
});

export const ProductoConDetallesSchema = z.object({
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    informacion_extra: z.string().min(10).max(2000),
    nombre_categoria: z.string().min(2).max(250),
    nombre_temporada: z.string().min(2).max(250),
    imagenes: z.array(z.object({
        url: z.string(),
        es_principal: z.boolean().default(false),
        es_ilustrativa: z.boolean(),
        orden: z.number().min(0)
    })).optional()
});

export const ProductoCompletoSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    informacion_extra: z.string(),
    esta_activo: z.boolean(),
    categoria_id: z.number(),
    temporada_id: z.number(),
    categoria: z.object({
        id: z.number(),
        id_padre: z.number(),
        nombre: z.string()
    }),
    temporada: z.object({
        id: z.number(),
        nombre: z.string()
    }),
    imagenes: z.array(z.object({
        id: z.number().min(1),
        url: z.string(),
        es_principal: z.boolean(),
        es_ilustrativa: z.boolean(),
        orden: z.number()
    })).optional()
});

export type CreateProductoDTO = z.infer<typeof CreateProductoSchema>;
export type UpdateProductoDTO = z.infer<typeof UpdateProductoSchema>;
export type ProductoDTO = z.infer<typeof ProductoSchema>;
export type ProductoConDetallesDTO = z.infer<typeof ProductoConDetallesSchema>;
export type ProductoCompletoDTO = z.infer<typeof ProductoCompletoSchema>;
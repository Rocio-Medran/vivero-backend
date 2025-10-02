import z from "zod";
import { ProductoSchema } from "./producto.schema";


export const CategoriaSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    id_padre: z.number().min(0).optional(),
    tipo: z.string().min(2).max(50)
});

export const CreateCategoriaSchema = z.object({
    nombre: z.string().min(2).max(250),
    id_padre: z.number().min(0).optional(),
    tipo: z.string().min(2).max(50)
});

export const CategoriaConProductosSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    id_padre: z.number().min(0).optional(),
    tipo: z.string().min(2).max(50),
    productos: z.array(z.object({
        id: z.number().min(1),
        nombre: z.string().min(2).max(250),
        descripcion: z.string().min(10).max(1000),
        informacion_extra: z.string().min(10).max(2000),
        esta_activo: z.boolean().default(true),
        categoria_id: z.number().min(1),
        temporada_id: z.number().min(1),
    })).optional()
});

export type CategoriaDTO = z.infer<typeof CategoriaSchema>;
export type CreateCategoriaDTO = z.infer<typeof CreateCategoriaSchema>;
export type CategoriaConProductosDTO = z.infer<typeof CategoriaConProductosSchema>;
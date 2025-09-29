import z from "zod";
import { ProductoSchema } from "./producto.schema";


export const CategoriaSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
});

export const CreateCategoriaSchema = z.object({
    nombre: z.string().min(2).max(250)
});

export const CategoriaConProductosSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    productos: z.array(ProductoSchema)
});

export type CategoriaDTO = z.infer<typeof CategoriaSchema>;
export type CreateCategoriaDTO = z.infer<typeof CreateCategoriaSchema>;
export type CategoriaConProductosDTO = z.infer<typeof CategoriaConProductosSchema>;
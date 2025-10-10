import z from "zod";
import { ServicioSchema } from "./servicio.schema";

export const CategoriaServicioSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    id_padre: z.number().min(0).optional(),
    tipo: z.string().min(2).max(50),
    imagen_url: z.string().max(2000).optional(),
    imagen2_url: z.string().max(2000).optional()
});

export const CreateCategoriaServicioSchema = z.object({
    nombre: z.string().min(2).max(250),
    id_padre: z.number().min(0).optional(),
    tipo: z.string().min(2).max(50).optional(),
    imagen_url: z.string().max(2000).optional(),
    imagen2_url: z.string().max(2000).optional()
});

export const CategoriaServicioConServiciosSchema = z.object({
    id: z.number().min(1),
    nombre: z.string().min(2).max(250),
    id_padre: z.number().min(0).optional(),
    tipo: z.string().min(2).max(50),
    servicios: z.array(ServicioSchema)
});

export type CategoriaServicioDTO = z.infer<typeof CategoriaServicioSchema>;
export type CreateCategoriaServicioDTO = z.infer<typeof CreateCategoriaServicioSchema>;
export type CategoriaServicioConServiciosDTO = z.infer<typeof CategoriaServicioConServiciosSchema>;

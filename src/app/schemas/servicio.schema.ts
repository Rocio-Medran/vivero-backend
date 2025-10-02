import z from "zod";
import { Servicio } from '../../domain/entities/Servicio';

export const ServicioSchema = z.object({
  id: z.number().min(1),
  nombre: z.string().min(2).max(250),
  descripcion: z.string().min(2),
  informacion_extra: z.string().optional(),
  esta_activo: z.boolean(),
  categoria_id: z.number().min(1)
});

export const CreateServicioSchema = z.object({
  nombre: z.string().min(2).max(250),
  descripcion: z.string().min(2),
  informacion_extra: z.string().optional(),
  categoria_id: z.number().min(1)
});

export const UpServicioSchema = z.object({
  nombre: z.string().min(2).max(250).optional(),
  descripcion: z.string().min(2).optional(),
  informacion_extra: z.string().optional(),
  esta_activo: z.boolean().optional(),
  categoria_id: z.number().min(1).optional()
});

export const ServicioConDetallesSchema = z.object({
    nombre: z.string().min(2).max(250),
    descripcion: z.string().min(10).max(1000),
    informacion_extra: z.string().min(10).max(2000),
    nombre_categoria: z.string().min(2).max(250),
    imagenes: z.array(z.object({
        id: z.number().min(1),
        url: z.string(),
        es_principal: z.boolean().default(false),
        orden: z.number().min(0)
    })).optional()
});

export type ServicioDTO = z.infer<typeof ServicioSchema>;
export type CreateServicioDTO = z.infer<typeof CreateServicioSchema>;
export type UpServicioDTO = z.infer<typeof UpServicioSchema>;
export type ServicioConDetallesDTO = z.infer<typeof ServicioConDetallesSchema>;

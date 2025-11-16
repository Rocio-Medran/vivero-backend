import z from "zod";

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
  descripcion: z.string(),
  informacion_extra: z.string().optional(),
  nombre_categoria: z.string(),
  imagenes: z.array(z.object({
    url: z.string(),
    es_principal: z.boolean().default(false),
    es_ilustrativa: z.boolean(),
    orden: z.number().min(0)
  })).optional()
});

export const ServicioCompletoSchema = z.object({
  id: z.number().min(1),
  nombre: z.string().min(2).max(250),
  descripcion: z.string(),
  informacion_extra: z.string().optional(),
  nombre_categoria: z.string(),
  categoria_id: z.number(),
  imagenes: z.array(z.object({
    id: z.number().min(1),
    url: z.string(),
    es_principal: z.boolean().default(false),
    es_ilustrativa: z.boolean(),
    orden: z.number().min(0)
  })).optional()
});

export type ServicioDTO = z.infer<typeof ServicioSchema>;
export type CreateServicioDTO = z.infer<typeof CreateServicioSchema>;
export type UpServicioDTO = z.infer<typeof UpServicioSchema>;
export type ServicioConDetallesDTO = z.infer<typeof ServicioConDetallesSchema>;
export type ServicioCompletoDTO = z.infer<typeof ServicioCompletoSchema>;

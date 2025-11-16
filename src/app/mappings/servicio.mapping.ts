import { Servicio } from "../../domain/entities/Servicio";
import { ServicioConDetallesDTO, ServicioConDetallesSchema, ServicioDTO, ServicioSchema, ServicioCompletoDTO, ServicioCompletoSchema } from "../schemas/servicio.schema";


export const toServicioDTO = (entity: Servicio): ServicioDTO =>
  ServicioSchema.parse({
    id: entity.id,
    nombre: entity.nombre,
    descripcion: entity.descripcion,
    informacion_extra: entity.informacion_extra,
    esta_activo: entity.esta_activo,
    categoria_id: entity.categoria?.id
  },
  );

export const toServicioDTOs = (entities: Servicio[]): ServicioDTO[] =>
  entities.map(e => toServicioDTO(e));

export const toServicioConDetallesDTO = (entity: Servicio): ServicioConDetallesDTO =>
  ServicioConDetallesSchema.parse(
    {
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      informacion_extra: entity.informacion_extra,
      esta_activo: entity.esta_activo,
      nombre_categoria: entity.categoria?.nombre,
      imagenes: entity.imagenes ? entity.imagenes.map(i => ({
            id: i.id,
            url: i.url,
            es_principal: i.es_principal,
            es_ilustrativa: i.es_ilustrativa,
            orden: i.orden
        })) : []
    },
  );

export const toServicioConDetallesDTOs = (entities: Servicio[]): ServicioConDetallesDTO[] =>
  entities.map(e => toServicioConDetallesDTO(e));


export const toServicioCompletoDTO = (entity: Servicio): ServicioCompletoDTO =>
  ServicioCompletoSchema.parse({
    id: entity.id,
    nombre: entity.nombre,
    descripcion: entity.descripcion,
    informacion_extra: entity.informacion_extra,
    nombre_categoria: entity.categoria?.nombre,
    categoria_id: entity.categoria?.id,
    imagenes: entity.imagenes ? entity.imagenes.map(i => ({
      id: i.id,
      url: i.url,
      es_principal: i.es_principal,
      es_ilustrativa: i.es_ilustrativa,
      orden: i.orden
    })) : []
  });

export const toServicioCompletoDTOs = (entities: Servicio[]): ServicioCompletoDTO[] =>
  entities.map(e => toServicioCompletoDTO(e));
import { plainToInstance } from "class-transformer";
import { Servicio } from "../../domain/entities/Servicio";
import { ServicioDTO, ServicioConDetallesDTO } from "../dtos/servicio.dto";

export const toServicioDTO = (entity: Servicio): ServicioDTO =>
  plainToInstance(ServicioDTO, entity, { excludeExtraneousValues: true });

export const toServicioDTOs = (entities: Servicio[]): ServicioDTO[] =>
  entities.map(e => toServicioDTO(e));

export const toServicioConDetallesDTO = (entity: Servicio): ServicioConDetallesDTO =>
  plainToInstance(
    ServicioConDetallesDTO,
    {
      nombre: entity.nombre,
      descripcion: entity.description,
      imagen_url: entity.imagen_url,
      nombre_categoria: entity.categoria?.nombre
    },
    { excludeExtraneousValues: true }
  );

export const toServicioConDetallesDTOs = (entities: Servicio[]): ServicioConDetallesDTO[] =>
  entities.map(e => toServicioConDetallesDTO(e));
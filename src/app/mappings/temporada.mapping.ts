import { Temporada } from "../../domain/entities/Temporada";
import { TemporadaDTO, TemporadaSchema } from "../schemas/temporada.schema";


export const toTemporadaDTO = (entity: Temporada): TemporadaDTO =>
    TemporadaSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        fecha_desde: entity.fecha_desde,
        fecha_hasta: entity.fecha_hasta
    });

export const toTemporadaDTOs = (entities: Temporada[]): TemporadaDTO[] =>
    entities.map(e => toTemporadaDTO(e));


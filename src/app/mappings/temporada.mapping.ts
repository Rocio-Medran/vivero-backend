import { plainToInstance } from "class-transformer";
import { Temporada } from "../../domain/entities/Temporada";
import { TemporadaDTO } from "../dtos/temporada.dto";

export const toTemporadaDTO = (entity: Temporada): TemporadaDTO =>
    plainToInstance(TemporadaDTO, entity, { excludeExtraneousValues: true });

export const toTemporadaDTOs = (entities: Temporada[]): TemporadaDTO[] =>
    entities.map(e => toTemporadaDTO(e));


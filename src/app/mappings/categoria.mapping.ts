import { plainToInstance } from "class-transformer";
import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaDTO } from "../dtos/categoria.dto";

export const toCategoriaDTO = (entity: Categoria): CategoriaDTO => 
    plainToInstance(CategoriaDTO, entity, { excludeExtraneousValues: true });

export const toCategoriaDTOs = (entities: Categoria[]): CategoriaDTO[] => 
    entities.map(e => toCategoriaDTO(e));
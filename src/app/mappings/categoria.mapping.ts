import { plainToInstance } from "class-transformer";
import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaConProductosDTO, CategoriaDTO } from "../dtos/categoria.dto";
import { toProductoConDetallesDTO } from "./producto.mapping";

export const toCategoriaDTO = (entity: Categoria): CategoriaDTO =>
    plainToInstance(CategoriaDTO, entity, { excludeExtraneousValues: true });

export const toCategoriaDTOs = (entities: Categoria[]): CategoriaDTO[] =>
    entities.map(e => toCategoriaDTO(e));

export const toCategoriaConProductosDTO = (entity: Categoria): CategoriaConProductosDTO =>
    plainToInstance(CategoriaConProductosDTO,
        {
            id: entity.id,
            nombre: entity.nombre,
            productos: entity.productos ? entity.productos.map(toProductoConDetallesDTO) : []
        },
        { excludeExtraneousValues: true });

export const toCategoriaConProductosDTOs = (entities: Categoria[]): CategoriaConProductosDTO[] =>
    entities.map(e => toCategoriaConProductosDTO(e));
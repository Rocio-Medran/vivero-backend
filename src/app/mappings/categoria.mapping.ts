import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaConProductosDTO, CategoriaConProductosSchema, CategoriaDTO, CategoriaSchema } from "../schemas/categoria.schema";
import { toProductoConDetallesDTO } from "./producto.mapping";


export const toCategoriaDTO = (entity: Categoria): CategoriaDTO =>
    CategoriaSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
    });

export const toCategoriaDTOs = (entities: Categoria[]): CategoriaDTO[] =>
    entities.map(e => toCategoriaDTO(e));

export const toCategoriaConProductosDTO = (entity: Categoria): CategoriaConProductosDTO =>
    CategoriaConProductosSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        productos: entity.productos ? entity.productos.map(toProductoConDetallesDTO) : []
    });

export const toCategoriaConProductosDTOs = (entities: Categoria[]): CategoriaConProductosDTO[] =>
    entities.map(e => toCategoriaConProductosDTO(e));
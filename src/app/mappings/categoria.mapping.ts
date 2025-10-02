import { id } from "zod/v4/locales";
import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaConProductosDTO, CategoriaConProductosSchema, CategoriaDTO, CategoriaSchema } from "../schemas/categoria.schema";
import { toProductoConDetallesDTO, toProductoDTO } from "./producto.mapping";


export const toCategoriaDTO = (entity: Categoria): CategoriaDTO =>
    CategoriaSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        id_padre: entity.id_padre,
        tipo: entity.tipo
    });

export const toCategoriaDTOs = (entities: Categoria[]): CategoriaDTO[] =>
    entities.map(e => toCategoriaDTO(e));
export const toCategoriaConProductosDTO = (entity: Categoria): CategoriaConProductosDTO => {
    return CategoriaConProductosSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        id_padre: entity.id_padre,
        tipo: entity.tipo,
        productos: entity.productos
            ? entity.productos.filter((p: any) => p.categoria && p.temporada).map(toProductoDTO)
            : []
    });
};

export const toCategoriaConProductosDTOs = (entities: Categoria[]): CategoriaConProductosDTO[] =>
    entities.map(e => toCategoriaConProductosDTO(e));
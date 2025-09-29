import { id } from "zod/v4/locales";
import { Producto } from "../../domain/entities/Producto";
import { ProductoConDetallesDTO, ProductoConDetallesSchema, ProductoDTO, ProductoSchema } from "../schemas/producto.schema";


export const toProductoDTO = (entity: Producto): ProductoDTO =>
    ProductoSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        esta_activo: entity.esta_activo,
        categoria_id: entity.categoria?.id,
        temporada_id: entity.temporada?.id
    });

export const toProductoDTOs = (entities: Producto[]): ProductoDTO[] =>
    entities.map(e => toProductoDTO(e));

export const toProductoConDetallesDTO = (entity: Producto): ProductoConDetallesDTO =>
    ProductoConDetallesSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        esta_activo: entity.esta_activo,
        nombre_categoria: entity.categoria?.nombre,
        nombre_categoria_padre: entity.categoria?.nombre,
        nombre_temporada: entity.temporada?.nombre,
        imagenes: entity.imagenes ? entity.imagenes.map(i => ({
            id: i.id,
            url: i.url,
            es_principal: i.es_principal,
            orden: i.orden
        })) : []
    });

export const toProductoConDetallesDTOs = (entities: Producto[]): ProductoConDetallesDTO[] =>
    entities.map(e => toProductoConDetallesDTO(e));
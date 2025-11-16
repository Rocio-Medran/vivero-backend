import { Producto } from "../../domain/entities/Producto";
import { ProductoCompletoDTO, ProductoCompletoSchema, ProductoConDetallesDTO, ProductoConDetallesSchema, ProductoDTO, ProductoSchema } from "../schemas/producto.schema";

export const toProductoDTO = (entity: Producto): ProductoDTO =>
    ProductoSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        informacion_extra: entity.informacion_extra,
        esta_activo: entity.esta_activo,
        categoria_id: entity.categoria.id,
        temporada_id: entity.temporada.id
    });

export const toProductoDTOs = (entities: Producto[]): ProductoDTO[] =>
    entities.map(e => toProductoDTO(e));

export const toProductoConDetallesDTO = (entity: Producto): ProductoConDetallesDTO =>
    ProductoConDetallesSchema.parse({
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        informacion_extra: entity.informacion_extra,
        esta_activo: entity.esta_activo,
        nombre_categoria: entity.categoria.nombre,
        nombre_temporada: entity.temporada.nombre,
        imagenes: entity.imagenes ? entity.imagenes.map(i => ({
            url: i.url,
            es_principal: i.es_principal,
            es_ilustrativa: i.es_ilustrativa,
            orden: i.orden
        })) : []
    });

export const toProductoConDetallesDTOs = (entities: Producto[]): ProductoConDetallesDTO[] =>
    entities.map(e => toProductoConDetallesDTO(e));


export const toProductoCompletoDTO = (entity: Producto): ProductoCompletoDTO =>
    ProductoCompletoSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        informacion_extra: entity.informacion_extra,
        esta_activo: entity.esta_activo,
        categoria_id: entity.categoria.id,
        temporada_id: entity.temporada.id,
        categoria: {
            id: entity.categoria.id,
            id_padre: entity.categoria.id_padre,
            nombre: entity.categoria.nombre
        },
        temporada: {
            id: entity.temporada.id,
            nombre: entity.temporada.nombre
        },
        imagenes: entity.imagenes ? entity.imagenes.map(i => ({
            id: i.id,
            url: i.url,
            es_principal: i.es_principal,
            es_ilustrativa: i.es_ilustrativa,
            orden: i.orden
        })) : []
    });

export const toProductoCompletoDTOs = (entities: Producto[]): ProductoCompletoDTO[] =>
    entities.map(e => toProductoCompletoDTO(e));
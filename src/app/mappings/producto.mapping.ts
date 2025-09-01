import { plainToInstance } from "class-transformer";
import { Producto } from "../../domain/entities/Producto";
import { ProductoConDetallesDTO, ProductoDTO } from '../dtos/producto.dto';


export const toProductoDTO = (entity: Producto): ProductoDTO => {
    return plainToInstance(ProductoDTO, {
        id: entity.id,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        imagen_url: entity.imagen_url,
        categoria_id: entity.categoria?.id,
        temporada_id: entity.temporada?.id
    },
        { excludeExtraneousValues: true });
}

export const toProductoDTOs = (entities: Producto[]): ProductoDTO[] =>
    entities.map(e => toProductoDTO(e));

export const toProductoConDetallesDTO = (entity: Producto): ProductoConDetallesDTO =>
    plainToInstance(ProductoConDetallesDTO, {
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        imagen_url: entity.imagen_url,
        nombre_categoria: entity.categoria?.nombre,
        nombre_temporada: entity.temporada?.nombre
    },
        { excludeExtraneousValues: true }
    );

export const toProductoConDetallesDTOs = (entities: Producto[]): ProductoConDetallesDTO[] =>
    entities.map(e => toProductoConDetallesDTO(e));
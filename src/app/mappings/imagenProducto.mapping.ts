import { ImagenProducto } from "../../domain/entities/ImagenProducto";
import { ImagenProductoDTO, ImagenProductoSchema } from "../schemas/imagenProducto.schema";


export const toImagenProductoDTO = (entity: ImagenProducto): ImagenProductoDTO =>
    ImagenProductoSchema.parse({
        id: entity.id,
        public_id: entity.public_id,
        url: entity.url,
        es_principal: entity.es_principal,
        orden: entity.orden
    });

export const toImagenProductoDTOs = (entities: ImagenProducto[]): ImagenProductoDTO[] =>
    entities.map(e => toImagenProductoDTO(e));


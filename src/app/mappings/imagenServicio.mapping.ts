import { ImagenServicio } from "../../domain/entities/ImagenServicio";
import { ImagenServicioDTO, ImagenServicioSchema } from "../schemas/imagenServicio.schema";


export const toImagenServicioDTO = (entity: ImagenServicio): ImagenServicioDTO =>
    ImagenServicioSchema.parse({
        id: entity.id,
        url: entity.url,
        es_principal: entity.es_principal,
        orden: entity.orden
    });

export const toImagenServicioDTOs = (entities: ImagenServicio[]): ImagenServicioDTO[] =>
    entities.map(e => toImagenServicioDTO(e));

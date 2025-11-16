import { ImagenServicio } from "../../domain/entities/ImagenServicio";
import { ImagenServicioDTO, ImagenServicioSchema } from "../schemas/imagenServicio.schema";


export const toImagenServicioDTO = (entity: ImagenServicio): ImagenServicioDTO =>
    ImagenServicioSchema.parse({
        id: entity.id,
        url: entity.url,
        public_id: entity.public_id ?? undefined,
        es_principal: entity.es_principal,
        es_ilustrativa: entity.es_ilustrativa,
        orden: entity.orden
    });

export const toImagenServicioDTOs = (entities: ImagenServicio[]): ImagenServicioDTO[] =>
    entities.map(e => toImagenServicioDTO(e));

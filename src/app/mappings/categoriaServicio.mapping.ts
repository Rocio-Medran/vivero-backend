import { CategoriaServicio } from "../../domain/entities/CategoriaServicio";
import { CategoriaServicioConServiciosSchema, CategoriaServicioSchema } from "../schemas/categoriaServicio.schema";
import { toServicioDTO } from "./servicio.mapping";

export const toCategoriaServicioDTO = (entity: CategoriaServicio) =>
    CategoriaServicioSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        id_padre: entity.id_padre,
        tipo: entity.tipo,
        imagen_url: entity.imagen_url,
        imagen2_url: entity.imagen2_url
    });

export const toCategoriaServicioDTOs = (entities: CategoriaServicio[]) =>
    entities.map(e => toCategoriaServicioDTO(e));

export const toCategoriaServicioConServiciosDTO = (entity: CategoriaServicio) =>
    CategoriaServicioConServiciosSchema.parse({
        id: entity.id,
        nombre: entity.nombre,
        id_padre: entity.id_padre,
        tipo: entity.tipo,
        servicios: entity.servicios
            ? entity.servicios.filter((s: any) => s.categoria).map(toServicioDTO)
            : []
    });

export const toCategoriaServicioConServiciosDTOs = (entities: CategoriaServicio[]) =>
    entities.map(e => toCategoriaServicioConServiciosDTO(e));

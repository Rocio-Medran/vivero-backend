import { Encargado } from "../../domain/entities/Encargado";
import { EncargadoDTO, EncargadoSchema } from "../schemas/encargado.schema";

export const toEncargadoDTO = (entity: Encargado): EncargadoDTO =>
  EncargadoSchema.parse({
    id: entity.id,
    nombre: entity.nombre,
    foto: entity.foto,
    descripcion: entity.descripcion
  });

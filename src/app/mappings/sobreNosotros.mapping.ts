import { SobreNosotros } from "../../domain/entities/SobreNosotros";
import { SobreNosotrosDetallesDTO, SobreNosotrosDetallesSchema, SobreNosotrosDTO, SobreNosotrosSchema } from "../schemas/sobreNosotros.schema";

export const toSobreNosotrosDTO = (entity: SobreNosotros): SobreNosotrosDTO =>
    SobreNosotrosSchema.parse({
        id: entity.id,
        titulo: entity.titulo,
        contenido: entity.contenido,
        mision: entity.mision ?? null,
        vision: entity.vision ?? null,
        valores: entity.valores ?? null,
        ultima_actualizacion: entity.ultima_actualizacion,
        esta_activo: entity.esta_activo,
        imagen_url: entity.imagen_url ?? null,
        imagen2_url: entity.imagen2_url ?? null
    });

export const toSobreNosotrosDetallesDTO = (entity: SobreNosotros): SobreNosotrosDetallesDTO =>
    SobreNosotrosDetallesSchema.parse({
        titulo: entity.titulo,
        contenido: entity.contenido,
        mision: entity.mision ?? null,
        vision: entity.vision ?? null,
        valores: entity.valores ?? null,
        imagen_url: entity.imagen_url ?? null,
        imagen2_url: entity.imagen2_url ?? null
    });
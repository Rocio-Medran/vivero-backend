import { SobreNosotros } from "../../domain/entities/SobreNosotros";
import { SobreNosotrosDetallesDTO, SobreNosotrosDetallesSchema, SobreNosotrosDTO, SobreNosotrosSchema } from "../schemas/sobreNosotros.schema";

export const toSobreNosotrosDTO = (entity: SobreNosotros): SobreNosotrosDTO =>
    SobreNosotrosSchema.parse({
        id: entity.id,
        nuestro_origen: entity.nuestro_origen,
        produccion_historica: entity.produccion_historica,
        nuevas_producciones: entity.nuevas_producciones,
        ultima_actualizacion: entity.ultima_actualizacion,
        imagen_url: entity.imagen_url ?? null,
        imagen2_url: entity.imagen2_url ?? null,
        imagen3_url: entity.imagen3_url ?? null,
        imagen4_url: entity.imagen4_url ?? null,
        imagen5_url: entity.imagen5_url ?? null
    });

export const toSobreNosotrosDetallesDTO = (entity: SobreNosotros): SobreNosotrosDetallesDTO =>
    SobreNosotrosDetallesSchema.parse({
        nuestro_origen: entity.nuestro_origen,
        produccion_historica: entity.produccion_historica,
        nuevas_producciones: entity.nuevas_producciones,
        imagen_url: entity.imagen_url ?? null,
        imagen2_url: entity.imagen2_url ?? null,
        imagen3_url: entity.imagen3_url ?? null,
        imagen4_url: entity.imagen4_url ?? null,
        imagen5_url: entity.imagen5_url ?? null
    });
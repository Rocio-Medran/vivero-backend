import { Contacto } from "../../domain/entities/Contacto";
import { ContactoDTO, ContactoSchema } from "../schemas/contacto.schema";

export const toContactoDTO = (entity: Contacto): ContactoDTO =>
  ContactoSchema.parse({
    id: entity.id,
    horario_atencion: entity.horario_atencion,
    email: entity.email,
    telefono: entity.telefono,
    whatsapp: entity.whatsapp
  });

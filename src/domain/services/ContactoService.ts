import { Contacto } from "../entities/Contacto";
import { BaseRepository } from "../repositories/BaseRepository";
import { IContactoService } from "./interfaces/IContactoService";
import { ContactoDTO, UpContactoDTO } from "../../app/schemas/contacto.schema";
import { toContactoDTO } from "../../app/mappings/contacto.mapping";
import { NotFoundError } from "../../app/errors/CustomErrors";

export class ContactoService implements IContactoService {
  constructor(private readonly repo: BaseRepository<Contacto>) {}

  async getContactoById(id: number): Promise<ContactoDTO> {
    const contacto = await this.repo.findOneBy({ id });
    if (!contacto) throw new NotFoundError("Contacto no existente");
    return toContactoDTO(contacto);
  }

  async updateContactoAsync(id: number, dto: UpContactoDTO): Promise<boolean> {
    const contacto = await this.repo.findOneBy({ id });
    if (!contacto) throw new NotFoundError("Contacto no existente");

    if (dto.horario_atencion !== undefined) contacto.horario_atencion = dto.horario_atencion;
    if (dto.email !== undefined) contacto.email = dto.email;
    if (dto.telefono !== undefined) contacto.telefono = dto.telefono;
    if (dto.whatsapp !== undefined) contacto.whatsapp = dto.whatsapp;

    await this.repo.update(contacto);
    return true;
  }
}

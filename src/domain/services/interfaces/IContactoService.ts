import { ContactoDTO, UpContactoDTO } from "../../../app/schemas/contacto.schema";

export interface IContactoService {
  getContactoById(id: number): Promise<ContactoDTO>;
  updateContactoAsync(id: number, dto: UpContactoDTO): Promise<boolean>;
}

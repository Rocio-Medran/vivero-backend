import { Encargado } from "../entities/Encargado";
import { BaseRepository } from "../repositories/BaseRepository";
import { IEncargadoService } from "./interfaces/IEncargadoService";
import { EncargadoDTO, UpEncargadoDTO } from "../../app/schemas/encargado.schema";
import { toEncargadoDTO } from "../../app/mappings/encargado.mapping";
import { NotFoundError } from "../../app/errors/CustomErrors";

export class EncargadoService implements IEncargadoService {
  constructor(private readonly repo: BaseRepository<Encargado>) {}

  async getEncargadoById(id: number): Promise<EncargadoDTO> {
    const encargado = await this.repo.findOneBy({ id });
    if (!encargado) throw new NotFoundError("Encargado no existente");
    return toEncargadoDTO(encargado);
  }

  async updateEncargadoAsync(id: number, dto: UpEncargadoDTO): Promise<boolean> {
    const encargado = await this.repo.findOneBy({ id });
    if (!encargado) throw new NotFoundError("Encargado no existente");

    if (dto.nombre !== undefined) encargado.nombre = dto.nombre;
    if (dto.foto !== undefined) encargado.foto = dto.foto;
    if (dto.descripcion !== undefined) encargado.descripcion = dto.descripcion;

    await this.repo.update(encargado);
    return true;
  }
}

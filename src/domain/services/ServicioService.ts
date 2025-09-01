import { CreateServicioDTO, UpServicioDTO } from "../../app/dtos/servicio.dto";
import { toServicioDTO, toServicioDTOs } from "../../app/mappings/servicio.mapping";
import { Servicio } from "../entities/Servicio";
import { IServicioRepository } from "../repositories/interfaces/IServicioRepository";
import { IServicioService } from "./interfaces/IServicioService";

export class ServicioService implements IServicioService {
  constructor(private readonly repo: IServicioRepository) {}

  async getAllServicios() {
    const servicios = await this.repo.getAll(['categoria']);
    return toServicioDTOs(servicios);
  }

  async getServicioById(id: number) {
    const servicio = await this.repo.getById(id, ['categoria']);
    return servicio ? toServicioDTO(servicio) : null;
  }

  async createServicioAsync(dto: CreateServicioDTO) {
    const servicio = new Servicio();
    servicio.nombre = dto.nombre;
    servicio.description = dto.descripcion;
    servicio.imagen_url = dto.imagen_url;
    
    servicio.categoria = { id: dto.categoria_id } as any;

    const saved = await this.repo.add(servicio);
    return toServicioDTO(saved);
  }

  async updateServicioAsync(id: number, dto: UpServicioDTO) {
    const servicio = await this.repo.getById(id, ['categoria']);
    if (!servicio) return false;

    if (dto.nombre !== undefined) servicio.nombre = dto.nombre;
    if (dto.descripcion !== undefined) servicio.description = dto.descripcion;
    if (dto.imagen_url !== undefined) servicio.imagen_url = dto.imagen_url;
    if (dto.categoria_id !== undefined) (servicio as any).categoria = { id: dto.categoria_id };

    await this.repo.update(servicio);
    return true;
  }

  async removeServicioAsync(id: number) {
    const servicio = await this.repo.getById(id);
    if (!servicio) return false;

    await this.repo.delete(servicio);
    return true;
  }
}
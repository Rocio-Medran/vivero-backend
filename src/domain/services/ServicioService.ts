import { CreateServicioDTO, ServicioConDetallesDTO, ServicioDTO, ServicioCompletoDTO, UpServicioDTO } from "../../app/schemas/servicio.schema";
import { toServicioConDetallesDTO, toServicioConDetallesDTOs, toServicioDTO, toServicioDTOs, toServicioCompletoDTO, toServicioCompletoDTOs } from "../../app/mappings/servicio.mapping";
import { Servicio } from "../entities/Servicio";
import { IServicioRepository } from "../repositories/interfaces/IServicioRepository";
import { IServicioService } from "./interfaces/IServicioService";
import { ConflictError, NotFoundError } from "../../app/errors/CustomErrors";
import { CategoriaServicio } from "../entities/CategoriaServicio";
import { BaseRepository } from "../repositories/BaseRepository";

export class ServicioService implements IServicioService {
  categoriaRepo = new BaseRepository(CategoriaServicio);
  constructor(private readonly repo: IServicioRepository) { }

  async getAllServicios(): Promise<ServicioDTO[]> {
    const servicios = await this.repo.getAll(['categoria', 'imagenes']);
    return toServicioDTOs(servicios);
  }

  async getServicioById(id: number): Promise<ServicioDTO> {
    const servicio = await this.repo.getById(id, ['categoria', 'imagenes']);
    if (!servicio) throw new NotFoundError("Servicio no existente");
    return toServicioDTO(servicio);
  }

  async createServicioAsync(dto: CreateServicioDTO) {

    const nombreNormalizado = dto.nombre.trim().toLowerCase();
    const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
    if (nombreExiste) throw new ConflictError("Ya existe un servicio con este nombre");

    const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
    if (!categoria) throw new NotFoundError("Categoría no existente");

    const servicio = new Servicio();
    servicio.nombre = dto.nombre;
    servicio.descripcion = dto.descripcion;
    servicio.informacion_extra = dto.informacion_extra ?? '';
    servicio.categoria = { id: dto.categoria_id } as any;

    const saved = await this.repo.add(servicio);

    const dtoServicio = await this.repo.getById(saved.id, ["categoria"]);
    if (!dtoServicio) throw new ConflictError("Error al obtener servicio");

    return toServicioDTO(dtoServicio);
  }

  async updateServicioAsync(id: number, dto: UpServicioDTO) {
    const servicio = await this.repo.getById(id, ['categoria']);
    if (!servicio) throw new NotFoundError("Servicio no existente");

    if (dto.nombre !== undefined) {
      const nombreNormalizado = dto.nombre.trim().toLowerCase();
      const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
      if (nombreExiste && nombreExiste.id !== id) throw new ConflictError("Ya existe un servicio con este nombre");
      servicio.nombre = dto.nombre;
    }

    if (dto.descripcion !== undefined) servicio.descripcion = dto.descripcion;
    if (dto.informacion_extra !== undefined) servicio.informacion_extra = dto.informacion_extra;
    if (dto.esta_activo !== undefined) servicio.esta_activo = dto.esta_activo;
    if (dto.categoria_id !== undefined) {
      const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
      if (!categoria) throw new NotFoundError("Categoria no existente");
      servicio.categoria = categoria;
    }

    await this.repo.update(servicio);
    return true;
  }

  async removeServicioAsync(id: number) {
    const servicio = await this.repo.getById(id);
    if (!servicio) throw new NotFoundError("Servicio no existente");

    await this.repo.delete(servicio);
    return true;
  }

  async getAllServiciosConDetalles(): Promise<ServicioConDetallesDTO[]> {
    const servicios = await this.repo.getServiciosConDetalles();
    return toServicioConDetallesDTOs(servicios);
  }

  async getServicioConDetallesById(id: number): Promise<ServicioConDetallesDTO> {
    const servicio = await this.repo.getServicioConDetallesById(id);
    if (!servicio) throw new NotFoundError("Servicio no existente");
    return toServicioConDetallesDTO(servicio);
  }

  async getServiciosCompletos(): Promise<ServicioCompletoDTO[]> {
    const servicios = await this.repo.getServiciosConDetalles();
    return toServicioCompletoDTOs(servicios);
  }

  async getServicioCompletoById(id: number): Promise<ServicioCompletoDTO> {
    const servicio = await this.repo.getServicioConDetallesById(id);
    if (!servicio) throw new NotFoundError("Servicio no existente");
    return toServicioCompletoDTO(servicio);
  }
}
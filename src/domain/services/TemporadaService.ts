import { NotFoundError } from "../../app/errors/CustomErrors";
import { toTemporadaDTO, toTemporadaDTOs } from "../../app/mappings/temporada.mapping";
import { CreateTemporadaDTO, TemporadaDTO, UpdateTemporadaDTO } from "../../app/schemas/temporada.schema";
import { Temporada } from "../entities/Temporada";
import { IRepository } from "../repositories/interfaces/IRepository";
import { ITemporadaService } from "./interfaces/ITemporadaService";

export class TemporadaService implements ITemporadaService {
    constructor(private readonly repo: IRepository<Temporada>) { }

    async getAllTemporadas(): Promise<TemporadaDTO[]> {
        const temporadas = await this.repo.getAll();
        return toTemporadaDTOs(temporadas);
    }

    async getTemporadaById(id: number): Promise<TemporadaDTO> {
        const temporada = await this.repo.getById(id);
        if (!temporada) throw new NotFoundError("Temporada no existente");
        return toTemporadaDTO(temporada);
    }

    async createTemporada(dto: CreateTemporadaDTO): Promise<TemporadaDTO> {

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste) throw new Error("Ya existe una temporada con este nombre");

        const temporada = new Temporada();
        temporada.nombre = dto.nombre;
        temporada.fecha_desde = dto.fecha_desde;
        temporada.fecha_hasta = dto.fecha_hasta;

        await this.repo.add(temporada);
        return toTemporadaDTO(temporada);
    }

    async updateTemporada(id: number, dto: UpdateTemporadaDTO): Promise<boolean> {
        const temporada = await this.repo.getById(id);
        if (!temporada) throw new NotFoundError("Temporada no existente");

        if (dto.nombre) {
            const nombreNormalizado = dto.nombre.trim().toLowerCase();
            const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
            if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe una temporada con este nombre");
        }

        Object.assign(temporada, dto);
        await this.repo.update(temporada);
        return true;
    }

    async removeTemporada(id: number) {
        const temporada = await this.repo.getById(id);
        if (!temporada) throw new NotFoundError("Temporada no existente");

        await this.repo.delete(temporada);
        return true;
    }

}

import { toTemporadaDTO, toTemporadaDTOs } from "../../app/mappings/temporada.mapping";
import { CreateTemporadaDTO, UpdateTemporadaDTO } from "../../app/schemas/temporada.schema";
import { Temporada } from "../entities/Temporada";
import { IRepository } from "../repositories/interfaces/IRepository";
import { ITemporadaService } from "./interfaces/ITemporadaService";

export class TemporadaService implements ITemporadaService {
    constructor(private readonly repo: IRepository<Temporada>) { }

    async getAllTemporadas() {
        const temporadas = await this.repo.getAll();
        return toTemporadaDTOs(temporadas);
    }

    async getTemporadaById(id: number) {
        const temporada = await this.repo.getById(id);
        return temporada ? toTemporadaDTO(temporada) : null;
    }

    async createTemporada(dto: CreateTemporadaDTO) {
        const nombreExiste = await this.repo.findByNombre(dto.nombre)
        if (nombreExiste) throw new Error("Ya existe una temporada con este nombre");

        const temporada = Object.assign(new Temporada(), dto);
        await this.repo.add(temporada);
        return toTemporadaDTO(temporada);
    }

    async updateTemporada(id: number, dto: UpdateTemporadaDTO) {
        const temporada = await this.repo.getById(id);
        if (!temporada) return false;

        if (dto.nombre) {
            const nombreExiste = await this.repo.findByNombre(dto.nombre)
            if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe una temporada con este nombre");
        }

        Object.assign(temporada, dto);
        await this.repo.update(temporada);
        return true;
    }

    async removeTemporada(id: number) {
        const temporada = await this.repo.getById(id);
        if (!temporada) return false;

        await this.repo.delete(temporada);
        return true;
    }


}
import { CategoriaDTO, CreateCategoriaDTO } from "../../app/dtos/categoria.dto";
import { toCategoriaDTOs, toCategoriaDTO } from '../../app/mappings/categoria.mapping';
import { CategoriaServicio } from "../entities/CategoriaServicio";
import { IRepository } from "../repositories/interfaces/IRepository";
import { IcategoriaService } from "./interfaces/ICategoriaService";

export class CategoriaServicioService implements IcategoriaService {
    constructor(private readonly repo: IRepository<CategoriaServicio> ) {}

    async getAllCategorias(): Promise<CategoriaDTO[]> {
        const categorias = await this.repo.getAll();
        return toCategoriaDTOs(categorias);
    }

    async getCategoriaById(id: number): Promise<CategoriaDTO | null> {
        const categoria = await this.repo.getById(id);
        if (!categoria) return null;
        return toCategoriaDTO(categoria);
    }

    async createCategoria(dto: CreateCategoriaDTO): Promise<CategoriaDTO> {
        const nuevaCategoria = new CategoriaServicio();
        nuevaCategoria.nombre = dto.nombre;
        const categoria = await this.repo.add(nuevaCategoria);
        return toCategoriaDTO(categoria);
    }

    async updateCategoria(id: number, dto: CreateCategoriaDTO): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) return false;
        categoria.nombre = dto.nombre;
        await this.repo.update(categoria);
        return true;
    }

    async removeCategoria(id: number): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) return false;
        await this.repo.delete(categoria);
        return true;
    }
}
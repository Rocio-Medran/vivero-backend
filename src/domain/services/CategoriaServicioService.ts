import { toCategoriaServicioConServiciosDTO, toCategoriaServicioConServiciosDTOs, toCategoriaServicioDTO, toCategoriaServicioDTOs } from "../../app/mappings/categoriaServicio.mapping";
import { CategoriaServicioDTO, CreateCategoriaServicioDTO } from "../../app/schemas/categoriaServicio.schema";
import { CategoriaServicio } from "../entities/CategoriaServicio";
import { ICategoriaServicioRepository } from '../repositories/interfaces/ICategoriaServicioRepository';
import { ICategoriaServicioService } from "./interfaces/ICategoriaServicioService";

export class CategoriaServicioService implements ICategoriaServicioService {
    constructor(private readonly repo: ICategoriaServicioRepository) { }

    async getAllCategorias(): Promise<CategoriaServicioDTO[]> {
        const categorias = await this.repo.getAll();
        return toCategoriaServicioDTOs(categorias);
    }

    async getCategoriaById(id: number): Promise<CategoriaServicioDTO | null> {
        const categoria = await this.repo.getById(id);
        return categoria ? toCategoriaServicioDTO(categoria) : null;
    }

    async createCategoria(dto: CreateCategoriaServicioDTO): Promise<CategoriaServicioDTO> {
        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste) throw new Error("Ya existe una categoria de servicio con este nombre");

        const categoria = Object.assign(new CategoriaServicio(), dto);
        await this.repo.add(categoria);
        return toCategoriaServicioDTO(categoria);
    }

    async updateCategoria(id: number, dto: CreateCategoriaServicioDTO): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) return false;

        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe una categoria de servicio con este nombre");

        Object.assign(categoria, dto);
        await this.repo.update(categoria);
        return true;
    }

    async removeCategoria(id: number): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) return false;

        await this.repo.delete(categoria);
        return true;
    }

    async getCategoriaServicioConServiciosById(id: number) {
        const categoria = await this.repo.getCategoriaServicioConServiciosById(id);
        return categoria ? toCategoriaServicioConServiciosDTO(categoria) : null;
    }

    async getCategoriasServicioConServicios() {
        const categorias = await this.repo.getCategoriasServicioConServicios();
        return toCategoriaServicioConServiciosDTOs(categorias);
    }
}
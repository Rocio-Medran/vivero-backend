import { Categoria } from './../entities/Categoria';
import { CreateCategoriaDTO } from "../../app/dtos/categoria.dto";
import { toCategoriaDTO, toCategoriaDTOs } from "../../app/mappings/categoria.mapping";
import { IRepository } from "../repositories/interfaces/IRepository";
import { IcategoriaService } from "./interfaces/ICategoriaService";

export class CategoriaService implements IcategoriaService {
    constructor(private readonly repo: IRepository<Categoria>) {}

    async getAllCategorias() {
        const categorias = await this.repo.getAll();
        return toCategoriaDTOs(categorias);
    }

    async getCategoriaById(id: number) {
        const categoria = await this.repo.getById(id);
        return categoria ? toCategoriaDTO(categoria) : null;
    }

    async createCategoria(dto: CreateCategoriaDTO) {
        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste) throw new Error("Ya existe una categoria con este nombre");

        const categoria = Object.assign(new Categoria(), dto);
        await this.repo.add(categoria);
        return toCategoriaDTO(categoria);
    }

    async updateCategoria(id: number, dto: CreateCategoriaDTO) {
        const categoria = await this.repo.getById(id);
        if(!categoria) return false;

        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe una categoria con este nombre");

        Object.assign(categoria, dto);
        await this.repo.update(categoria);
        return true;
    }

    async removeCategoria(id: number) {
        const categoria = await this.repo.getById(id);
        if(!categoria) return false;

        await this.repo.delete(categoria);
        return true;
    }
}
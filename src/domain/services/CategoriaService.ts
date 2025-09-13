import { Categoria } from './../entities/Categoria';
import { CategoriaConProductosDTO, CategoriaDTO, CreateCategoriaDTO } from "../../app/dtos/categoria.dto";
import { toCategoriaConProductosDTO, toCategoriaConProductosDTOs, toCategoriaDTO, toCategoriaDTOs } from "../../app/mappings/categoria.mapping";
import { IcategoriaService } from "./interfaces/ICategoriaService";
import { ICategoriaRepository } from '../repositories/interfaces/ICategoriaRepository';

export class CategoriaService implements IcategoriaService {
    constructor(private readonly repo: ICategoriaRepository) { }

    async getAllCategorias(): Promise<CategoriaDTO[]> {
        const categorias = await this.repo.getAll();
        return toCategoriaDTOs(categorias);
    }

    async getCategoriaById(id: number): Promise<CategoriaDTO | null> {
        const categoria = await this.repo.getById(id);
        return categoria ? toCategoriaDTO(categoria) : null;
    }

    async createCategoria(dto: CreateCategoriaDTO): Promise<CategoriaDTO> {
        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste) throw new Error("Ya existe una categoria con este nombre");

        const categoria = Object.assign(new Categoria(), dto);
        await this.repo.add(categoria);
        return toCategoriaDTO(categoria);
    }

    async updateCategoria(id: number, dto: CreateCategoriaDTO): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) return false;

        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe una categoria con este nombre");

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

    async getCategoriaConProductosById(id: number): Promise<CategoriaConProductosDTO | null> {
        const categoria = await this.repo.getCategoriaConProductosById(id);
        return categoria ? toCategoriaConProductosDTO(categoria) : null;
    }

    async getCategoriasConProductos(): Promise<CategoriaConProductosDTO[]> {
        const categorias = await this.repo.getCategoriasConProductos();
        return toCategoriaConProductosDTOs(categorias);
    }
}
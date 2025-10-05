import { Categoria } from './../entities/Categoria';
import { CategoriaConProductosDTO, CategoriaDTO, CreateCategoriaDTO } from "../../app/schemas/categoria.schema";
import { toCategoriaConProductosDTO, toCategoriaConProductosDTOs, toCategoriaDTO, toCategoriaDTOs } from "../../app/mappings/categoria.mapping";
import { IcategoriaService } from "./interfaces/ICategoriaService";
import { ICategoriaRepository } from '../repositories/interfaces/ICategoriaRepository';
import { ConflictError, NotFoundError, ValidationError } from '../../app/errors/CustomErrors';

export class CategoriaService implements IcategoriaService {
    constructor(private readonly repo: ICategoriaRepository) { }

    async getAllCategorias(): Promise<CategoriaDTO[]> {
        const categorias = await this.repo.getAll();
        return toCategoriaDTOs(categorias);
    }

    async getCategoriaById(id: number): Promise<CategoriaDTO> {
        const categoria = await this.repo.getById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");
        return toCategoriaDTO(categoria);
    }

    async createCategoria(dto: CreateCategoriaDTO): Promise<CategoriaDTO> {

        if (!dto.nombre?.trim()) {
            throw new ValidationError("El nombre de la categoría es obligatorio");
        }

        if (!dto.tipo) {
            throw new ValidationError("El tipo de categoría es obligatorio");
        }

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste) throw new ConflictError("Ya existe una categoria con este nombre");

        if (dto.id_padre) {
            const padre = await this.repo.getById(dto.id_padre);
            if (!padre) {
                throw new NotFoundError("La categoría padre no existe");
            }
        }

        const categoria = new Categoria();
        categoria.nombre = dto.nombre;
        categoria.tipo = dto.tipo;
        categoria.id_padre = dto.id_padre ?? 0;

        await this.repo.add(categoria);
        return toCategoriaDTO(categoria);
    }

    async updateCategoria(id: number, dto: CreateCategoriaDTO): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste && nombreExiste.id !== id) throw new ConflictError("Ya existe una categoría con este nombre");

        Object.assign(categoria, dto);
        await this.repo.update(categoria);
        return true;
    }

    async removeCategoria(id: number): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");

        const productos = await this.repo.countProductosByCategoria(id);
        if (productos > 0) {
            throw new ConflictError("No se puede eliminar una categoría con productos asociados");
        }

        const hijas = await this.repo.findSubcategorias(id);
        if (hijas.length > 0) {
            throw new ConflictError("No se puede eliminar una categoría que tiene subcategorías");
        }

        await this.repo.delete(categoria);
        return true;
    }


    async getCategoriaConProductosById(id: number): Promise<CategoriaConProductosDTO> {
        const categoria = await this.repo.getCategoriaConProductosById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");
        return toCategoriaConProductosDTO(categoria);
    }

    async getCategoriasConProductos(): Promise<CategoriaConProductosDTO[]> {
        const categorias = await this.repo.getCategoriasConProductos();
        return toCategoriaConProductosDTOs(categorias);
    }
}
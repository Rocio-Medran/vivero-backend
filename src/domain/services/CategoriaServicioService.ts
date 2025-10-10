import { ConflictError, NotFoundError, ValidationError } from "../../app/errors/CustomErrors";
import { toCategoriaServicioConServiciosDTO, toCategoriaServicioConServiciosDTOs, toCategoriaServicioDTO, toCategoriaServicioDTOs } from "../../app/mappings/categoriaServicio.mapping";
import { CategoriaServicioConServiciosDTO, CategoriaServicioDTO, CreateCategoriaServicioDTO } from "../../app/schemas/categoriaServicio.schema";
import { CategoriaServicio } from "../entities/CategoriaServicio";
import { ICategoriaServicioRepository } from '../repositories/interfaces/ICategoriaServicioRepository';
import { ICategoriaServicioService } from "./interfaces/ICategoriaServicioService";

export class CategoriaServicioService implements ICategoriaServicioService {
    constructor(private readonly repo: ICategoriaServicioRepository) { }

    async getAllCategorias(): Promise<CategoriaServicioDTO[]> {
        const categorias = await this.repo.getAll();
        return toCategoriaServicioDTOs(categorias);
    }

    async getCategoriaById(id: number): Promise<CategoriaServicioDTO> {
        const categoria = await this.repo.getById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");
        return toCategoriaServicioDTO(categoria);
    }

    async createCategoria(dto: CreateCategoriaServicioDTO): Promise<CategoriaServicioDTO> {
        if (!dto.nombre?.trim()) {
            throw new ValidationError("El nombre de la categoría es obligatorio");
        }

        if (!dto.tipo) {
            throw new ValidationError("El tipo de categoría es obligatorio");
        }

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste) throw new ConflictError("Ya existe una categoria de servicio con este nombre");

        if (dto.id_padre) {
            const padre = await this.repo.getById(dto.id_padre);
            if (!padre) {
                throw new NotFoundError("La categoría padre no existe");
            }
        }

        const categoria = new CategoriaServicio();
        categoria.nombre = dto.nombre;
        categoria.tipo = dto.tipo;
        categoria.id_padre = dto.id_padre ?? 0;
        categoria.imagen_url = dto.imagen_url ?? '';
        categoria.imagen2_url = dto.imagen2_url ?? '';

        await this.repo.add(categoria);
        return toCategoriaServicioDTO(categoria);
    }

    async updateCategoria(id: number, dto: CreateCategoriaServicioDTO): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste && nombreExiste.id !== id) throw new ConflictError("Ya existe una categoría de servicio con este nombre");

        Object.assign(categoria, dto);
        await this.repo.update(categoria);
        return true;
    }

    async removeCategoria(id: number): Promise<boolean> {
        const categoria = await this.repo.getById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");

        const servicios = await this.repo.countServiciosByCategoria(id);
        if (servicios > 0) {
            throw new ConflictError("No se puede eliminar una categoría con servicios asociados");
        }

        const hijas = await this.repo.findSubcategorias(id);
        if (hijas.length > 0) {
            throw new ConflictError("No se puede eliminar una categoría que tiene subcategorías");
        }

        await this.repo.delete(categoria);
        return true;
    }

    async getCategoriaServicioConServiciosById(id: number): Promise<CategoriaServicioConServiciosDTO> {
        const categoria = await this.repo.getCategoriaServicioConServiciosById(id);
        if (!categoria) throw new NotFoundError("Categoría no encontrada");
        return toCategoriaServicioConServiciosDTO(categoria);
    }

    async getCategoriasServicioConServicios(): Promise<CategoriaServicioConServiciosDTO[]> {
        const categorias = await this.repo.getCategoriasServicioConServicios();
        return toCategoriaServicioConServiciosDTOs(categorias);
    }
}
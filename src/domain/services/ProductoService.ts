
import { toProductoConDetallesDTO, toProductoConDetallesDTOs, toProductoDTO, toProductoDTOs } from "../../app/mappings/producto.mapping";
import { CreateProductoDTO, UpdateProductoDTO } from "../../app/schemas/producto.schema";
import { Categoria } from "../entities/Categoria";
import { Producto } from '../entities/Producto';
import { Temporada } from "../entities/Temporada";
import { BaseRepository } from "../repositories/BaseRepository";
import { IProductoRepository } from "../repositories/interfaces/IProductoRepository";
import { IProductoService } from "./interfaces/IProductoService";

export class ProductoService implements IProductoService {
    categoriaRepo = new BaseRepository(Categoria);
    temporadaRepo = new BaseRepository(Temporada);

    constructor(private readonly repo: IProductoRepository) { }

    async getAllProductos() {
        const productos = await this.repo.getAll(['categoria', 'temporada']);
        return toProductoDTOs(productos);
    }

    async getProductoById(id: number) {
        const producto = await this.repo.getById(id, ['categoria', 'temporada']);
        return producto ? toProductoDTO(producto) : null;
    }

    async createProductoAsync(dto: CreateProductoDTO) {
        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste) {
            throw new Error("Ya existe un producto con este nombre");
        }

        const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
        if (!categoria) throw new Error("Categoría no existente");

        const temporada = await this.temporadaRepo.findOneBy({ id: dto.temporada_id });
        if (!temporada) throw new Error("Temporada no existente");

        const producto = new Producto();
        producto.nombre = dto.nombre;
        producto.descripcion = dto.descripcion;
        producto.categoria = categoria;
        producto.temporada = temporada;

        const saved = await this.repo.add(producto);

        const dtoDetalles = await this.repo.getById(saved.id, ["categoria", "temporada"]);
        if (!dtoDetalles) throw new Error("Error al obtener producto");

        return toProductoConDetallesDTO(dtoDetalles);
    }

    async updateProductoCompletoAsync(id: number, dto: CreateProductoDTO) {
        const producto = await this.repo.getById(id, ["categoria", "temporada"]);
        if (!producto) throw new Error("Producto no existente");

        const nombreExiste = await this.repo.findByNombre(dto.nombre);
        if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe un producto con este nombre");

        const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
        if (!categoria) throw new Error("Categoría no existente");

        const temporada = await this.temporadaRepo.findOneBy({ id: dto.temporada_id });
        if (!temporada) throw new Error("Temporada no existente");

        producto.nombre = dto.nombre;
        producto.descripcion = dto.descripcion;
        producto.categoria = categoria;
        producto.temporada = temporada;

        await this.repo.update(producto);
        return true;
    }

    async updateProductoAsync(id: number, dto: UpdateProductoDTO) {
        const producto = await this.repo.getById(id, ['categoria', 'temporada']);
        if (!producto) throw new Error("Producto no existente");

        if (dto.nombre !== undefined) {
            const nombreExiste = await this.repo.findByNombre(dto.nombre);
            if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe un producto con este nombre");
            producto.nombre = dto.nombre;
        }

        if (dto.categoria_id !== undefined) {
            const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
            if (!categoria) throw new Error("Categoria no existente");
            producto.categoria = categoria;
        }

        if (dto.temporada_id !== undefined) {
            const temporada = await this.temporadaRepo.findOneBy({ id: dto.temporada_id });
            if (!temporada) throw new Error("Temporada no existente");
            producto.temporada = temporada;
        }

        if (dto.descripcion !== undefined) producto.descripcion = dto.descripcion;
        if (dto.esta_activo !== undefined) producto.esta_activo = dto.esta_activo;

        await this.repo.update(producto);
        return toProductoDTO(producto);
    }

    async removeProductoAsync(id: number) {
        const producto = await this.repo.getById(id);
        if (!producto) return false;

        await this.repo.delete(producto);
        return true;
    }

    async getAllProductosConDetalles() {
        const productos = await this.repo.getProductosConDetalles();
        return toProductoConDetallesDTOs(productos);
    }

    async getProductoConDetallesById(id: number) {
        const producto = await this.repo.getProductoConDetallesById(id);
        return producto ? toProductoConDetallesDTO(producto) : null;
    }
}
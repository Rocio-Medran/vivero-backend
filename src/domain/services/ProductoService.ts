import { ConflictError, NotFoundError } from "../../app/errors/CustomErrors";
import { In } from "typeorm";
import { toProductoCompletoDTO, toProductoCompletoDTOs, toProductoConDetallesDTO, toProductoConDetallesDTOs, toProductoDTO, toProductoDTOs } from "../../app/mappings/producto.mapping";
import { CreateProductoDTO, ProductoCompletoDTO, ProductoConDetallesDTO, ProductoDTO, UpdateProductoDTO } from "../../app/schemas/producto.schema";
import { Categoria } from "../entities/Categoria";
import { Producto } from '../entities/Producto';
import { Temporada } from "../entities/Temporada";
import { BaseRepository } from "../repositories/BaseRepository";
import { IProductoRepository } from "../repositories/interfaces/IProductoRepository";
import { IProductoService } from "./interfaces/IProductoService";
import { IImagenProductoService } from './interfaces/IImageneProductoService';

export class ProductoService implements IProductoService {
    categoriaRepo = new BaseRepository(Categoria);
    temporadaRepo = new BaseRepository(Temporada);
    imagenProductoService: IImagenProductoService;

    constructor(private readonly repo: IProductoRepository, imagenProductoService: IImagenProductoService) {
        this.imagenProductoService = imagenProductoService;
    }

    async getAllProductos(): Promise<ProductoDTO[]> {
        const productos = await this.repo.getAll(['categoria', 'temporada', 'imagenes']);
        return toProductoDTOs(productos);
    }

    async getProductoById(id: number): Promise<ProductoDTO> {
        const producto = await this.repo.getById(id, ['categoria', 'temporada']);
        if (!producto) throw new NotFoundError("Producto no existente");
        return toProductoDTO(producto);
    }

    async createProductoAsync(dto: CreateProductoDTO): Promise<ProductoDTO> {

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste) {
            throw new ConflictError("Ya existe un producto con este nombre");
        }

        const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
        if (!categoria) throw new NotFoundError("Categoría no existente");

        const temporada = await this.temporadaRepo.findOneBy({ id: dto.temporada_id });
        if (!temporada) throw new NotFoundError("Temporada no existente");

        const producto = new Producto();
        producto.nombre = dto.nombre;
        producto.descripcion = dto.descripcion;
        producto.informacion_extra = dto.informacion_extra;
        producto.categoria = categoria;
        producto.temporada = temporada;

        const saved = await this.repo.add(producto);

        const dtoProducto = await this.repo.getById(saved.id, ["categoria", "temporada"]);
        if (!dtoProducto) throw new ConflictError("Error al obtener producto");

        return toProductoDTO(dtoProducto);
    }

    async updateProductoCompletoAsync(id: number, dto: CreateProductoDTO): Promise<boolean> {
        const producto = await this.repo.getById(id, ["categoria", "temporada"]);
        if (!producto) throw new NotFoundError("Producto no existente");

        const nombreNormalizado = dto.nombre.trim().toLowerCase();
        const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
        if (nombreExiste && nombreExiste.id !== id) throw new ConflictError("Ya existe un producto con este nombre");

        const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
        if (!categoria) throw new NotFoundError("Categoría no existente");

        const temporada = await this.temporadaRepo.findOneBy({ id: dto.temporada_id });
        if (!temporada) throw new NotFoundError("Temporada no existente");

        producto.nombre = dto.nombre;
        producto.descripcion = dto.descripcion;
        producto.informacion_extra = dto.informacion_extra;
        producto.categoria = categoria;
        producto.temporada = temporada;

        await this.repo.update(producto);
        return true;
    }

    async updateProductoAsync(id: number, dto: UpdateProductoDTO): Promise<ProductoDTO> {
        const producto = await this.repo.getById(id, ['categoria', 'temporada']);
        if (!producto) throw new NotFoundError("Producto no existente");

        if (dto.nombre !== undefined) {
            const nombreNormalizado = dto.nombre.trim().toLowerCase();
            const nombreExiste = await this.repo.findByNombre(nombreNormalizado);
            if (nombreExiste && nombreExiste.id !== id) throw new ConflictError("Ya existe un producto con este nombre");
            producto.nombre = dto.nombre;
        }

        if (dto.categoria_id !== undefined) {
            const categoria = await this.categoriaRepo.findOneBy({ id: dto.categoria_id });
            if (!categoria) throw new NotFoundError("Categoria no existente");
            producto.categoria = categoria;
        }

        if (dto.temporada_id !== undefined) {
            const temporada = await this.temporadaRepo.findOneBy({ id: dto.temporada_id });
            if (!temporada) throw new NotFoundError("Temporada no existente");
            producto.temporada = temporada;
        }

        if (dto.descripcion !== undefined) producto.descripcion = dto.descripcion;
        if (dto.informacion_extra !== undefined) producto.informacion_extra = dto.informacion_extra;
        if (dto.esta_activo !== undefined) producto.esta_activo = dto.esta_activo;

        await this.repo.update(producto);
        return toProductoDTO(producto);
    }

    async removeProductoAsync(id: number): Promise<boolean> {
        const producto = await this.repo.getById(id, ['imagenes']);
        if (!producto) throw new NotFoundError("Producto no existente");

        // Eliminar imágenes (Cloudinary)
        for (const img of producto.imagenes ?? []) {
            await this.imagenProductoService.removeImagenProducto(img.id);
        }

        await this.repo.delete(producto);
        return true;
    }

    async getAllProductosConDetalles(): Promise<ProductoConDetallesDTO[]> {
        const productos = await this.repo.getProductosConDetalles();
        return toProductoConDetallesDTOs(productos);
    }

    async getProductoConDetallesById(id: number): Promise<ProductoConDetallesDTO> {
        const producto = await this.repo.getProductoConDetallesById(id);
        if (!producto) throw new NotFoundError("Producto no existente");
        return toProductoConDetallesDTO(producto);
    }

    async getProductosByCategoria(nombre: string): Promise<ProductoConDetallesDTO[]> {
        const categoria = await this.categoriaRepo.findByNombre(nombre);
        if (!categoria) throw new NotFoundError("Categoría no existente");

        let productos: Producto[] = [];

        // Incluir productos de la categoría consultada
        const productosCategoria = await this.repo.find({ categoria: { id: categoria.id } }, ['categoria', 'temporada', 'imagenes']);
        productos = productos.concat(productosCategoria);

        // Si es principal, incluir productos de subcategorías
        if (categoria.id_padre === 0) {
            const subcategorias = await this.categoriaRepo.find({ id_padre: categoria.id });
            if (subcategorias.length > 0) {
                const productosSubcats = await this.repo.find({ categoria: { id: In(subcategorias.map(c => c.id)) } }, ['categoria', 'temporada', 'imagenes']);
                productos = productos.concat(productosSubcats);
            }
        }

        return toProductoConDetallesDTOs(productos);
    }

    async getProductoCompletoById(id: number): Promise<ProductoCompletoDTO> {
        const producto = await this.repo.getProductoConDetallesById(id);
        if (!producto) throw new NotFoundError("Producto no existente");
        return toProductoCompletoDTO(producto);
    }

    async getProductosCompletos(): Promise<ProductoCompletoDTO[]> {
        const productos = await this.repo.getProductosConDetalles();
        return toProductoCompletoDTOs(productos);
    }
}
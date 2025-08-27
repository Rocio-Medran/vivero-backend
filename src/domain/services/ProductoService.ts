import { CreateProductoDTO, UpProductoDTO } from "../../app/dtos/producto.dto";
import { toProductoDTO, toProductoDTOs } from "../../app/mappings/producto.mapping";
import { Producto } from "../entities/Producto";
import { IProductoRepository } from "../repositories/interfaces/IProductoRepository";
import { IProductoService } from "./interfaces/IProductoService";

export class ProductoService implements IProductoService {
    constructor(private readonly repo: IProductoRepository) {}

    async getAllProductos() {
        const productos = await this.repo.getAll();
        return toProductoDTOs(productos);
    }

    async getProductoById(id: number) {
        const producto = await this.repo.getById(id);
        return producto ? toProductoDTO(producto) : null;
    }

    async createProductoAsync(dto: CreateProductoDTO) {
        const producto = Object.assign(new Producto(), dto);
        await this.repo.add(producto);
        return toProductoDTO(producto);
    }

    async updateProductoAsync(id: number, dto: UpProductoDTO) {
        const producto = await this.repo.getById(id);
        if(!producto) return false;

        Object.assign(producto, dto);
        await this.repo.update(producto);
        return true;
    }

    async removeProductoAsync(id: number) {
        const producto = await this.repo.getById(id);
        if(!producto) return false;

        await this.repo.delete(producto);
        return true;
    }

    
}
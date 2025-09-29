import { Producto } from "../entities/Producto";
import { BaseRepository } from "./BaseRepository";
import { IProductoRepository } from "./interfaces/IProductoRepository";

export class ProductoRepository extends BaseRepository<Producto> implements IProductoRepository {
    constructor() { super(Producto) }

    getProductoConDetallesById(id: number) {
        return this.getById(id, ['categoria', 'temporada', 'imagenes']);
    }

    getProductosConDetalles() {
        return this.getAll(['categoria', 'temporada', 'imagenes']);
    }
}
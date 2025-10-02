import { Categoria } from "../entities/Categoria";
import { BaseRepository } from "./BaseRepository";
import { ICategoriaRepository } from "./interfaces/ICategoriaRepository";


export class CategoriaRepository extends BaseRepository<Categoria> implements ICategoriaRepository {
    constructor() { super(Categoria) }

    async getCategoriaConProductosById(id: number): Promise<Categoria | null> {
        return this.getById(id, ['productos', 'productos.categoria', 'productos.temporada']);
    }

    async getCategoriasConProductos(): Promise<Categoria[]> {
        return this.getAll(['productos', 'productos.categoria', 'productos.temporada']);
    }
}
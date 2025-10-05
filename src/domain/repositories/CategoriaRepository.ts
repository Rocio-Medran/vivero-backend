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

    async countProductosByCategoria(id: number): Promise<number> {
        const categoria = await this.getById(id, ['productos']);
        return categoria && categoria.productos ? categoria.productos.length : 0;
    }

    async findSubcategorias(id: number): Promise<Categoria[]> {

        return this.find({ id_padre: id });
    }
}
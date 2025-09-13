import { CategoriaConProductosDTO } from "../../app/dtos/categoria.dto";
import { Categoria } from "../entities/Categoria";
import { BaseRepository } from "./BaseRepository";
import { ICategoriaRepository } from "./interfaces/ICategoriaRepository";


export class CategoriaRepository extends BaseRepository<Categoria> implements ICategoriaRepository {
    constructor() { super(Categoria) }

    async getCategoriaConProductosById(id: number): Promise<Categoria | null> {
        return this.getById(id, ['productos']);
    }

    async getCategoriasConProductos(): Promise<Categoria[]> {
        return this.getAll(['productos']);
    }
}
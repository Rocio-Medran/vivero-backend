import { CategoriaServicio } from "../entities/CategoriaServicio";
import { BaseRepository } from "./BaseRepository";
import { ICategoriaServicioRepository } from "./interfaces/ICategoriaServicioRepository";


export class CategoriaServicioRepository extends BaseRepository<CategoriaServicio> implements ICategoriaServicioRepository {
    constructor() { super(CategoriaServicio) }

    async getCategoriaServicioConServiciosById(id: number): Promise<CategoriaServicio | null> {
        return this.getById(id, ['servicios', 'servicios.categoria']);
    }

    async getCategoriasServicioConServicios(): Promise<CategoriaServicio[]> {
        return this.getAll(['servicios', 'servicios.categoria']);
    }

    async countServiciosByCategoria(id: number): Promise<number> {
        const categoria = await this.getById(id, ['servicios']);
        return categoria && categoria.servicios ? categoria.servicios.length : 0;
    }

    async findSubcategorias(id: number): Promise<CategoriaServicio[]> {
        return this.find({ id_padre: id });
    }
}
import { Categoria } from "../entities/Categoria";
import { BaseRepository } from "./BaseRepository";
import { ICategoriaServicioRepository } from "./interfaces/ICategoriaServicioRepository";


export class CategoriaServicioRepository extends BaseRepository<Categoria> implements ICategoriaServicioRepository {
    constructor() { super(Categoria) }
}
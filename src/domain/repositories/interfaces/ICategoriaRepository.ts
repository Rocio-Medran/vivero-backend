import { Categoria } from "../../entities/Categoria";
import { IRepository } from "./IRepository";

export interface ICategoriaRepository extends IRepository<Categoria> {
    getCategoriaConProductosById(id: number): Promise<Categoria | null>;
    getCategoriasConProductos(): Promise<Categoria[]>;
    countProductosByCategoria(id: number): Promise<number>;
    findSubcategorias(id: number): Promise<Categoria[]>;
}
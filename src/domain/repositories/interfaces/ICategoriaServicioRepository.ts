import { CategoriaServicio } from "../../entities/CategoriaServicio";
import { IRepository } from "./IRepository";


export interface ICategoriaServicioRepository extends IRepository<CategoriaServicio> {
	getCategoriaServicioConServiciosById(id: number): Promise<CategoriaServicio | null>;
	getCategoriasServicioConServicios(): Promise<CategoriaServicio[]>;
	countServiciosByCategoria(id: number): Promise<number>;
	findSubcategorias(id: number): Promise<CategoriaServicio[]>;
}
import { CategoriaServicioDTO, CreateCategoriaServicioDTO } from "../../../app/schemas/categoriaServicio.schema";


export interface ICategoriaServicioService {
    getAllCategorias(): Promise<CategoriaServicioDTO[]>;
    getCategoriaById(id: number): Promise<CategoriaServicioDTO | null>;
    createCategoria(dto: CreateCategoriaServicioDTO): Promise<CategoriaServicioDTO>;
    updateCategoria(id: number, dto: CreateCategoriaServicioDTO): Promise<boolean>;
    removeCategoria(id: number): Promise<boolean>;
    getCategoriaServicioConServiciosById(id: number): Promise<any>;
    getCategoriasServicioConServicios(): Promise<any>;
}
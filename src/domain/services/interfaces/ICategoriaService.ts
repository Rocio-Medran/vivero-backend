import { CategoriaConProductosDTO, CategoriaDTO, CreateCategoriaDTO } from '../../../app/schemas/categoria.schema';

export interface IcategoriaService {
    getAllCategorias(): Promise< CategoriaDTO[] >;
    getCategoriaById(id: number): Promise< CategoriaDTO>;
    createCategoria(dto: CreateCategoriaDTO): Promise< CategoriaDTO >;
    updateCategoria(id: number, dto: CreateCategoriaDTO): Promise< boolean >;
    removeCategoria(id: number): Promise< boolean >;
    getCategoriaConProductosById(id: number, baseUrl?: string): Promise< CategoriaConProductosDTO >;
    getCategoriasConProductos(baseUrl?: string): Promise< CategoriaConProductosDTO[] >;
    getSubcategorias(id: number): Promise<CategoriaDTO[]>;
    getAllSubcategorias(): Promise<CategoriaDTO[]>;
    getCategoriasByTipo(tipo: string): Promise<CategoriaDTO[]>;
    getCategoriaByNombre(nombre: string): Promise<CategoriaDTO>;
}
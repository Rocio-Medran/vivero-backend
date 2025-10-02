import { CategoriaConProductosDTO, CategoriaDTO, CreateCategoriaDTO } from '../../../app/schemas/categoria.schema';

export interface IcategoriaService {
    getAllCategorias(): Promise< CategoriaDTO[] >;
    getCategoriaById(id: number): Promise< CategoriaDTO | null>;
    createCategoria(dto: CreateCategoriaDTO): Promise< CategoriaDTO >;
    updateCategoria(id: number, dto: CreateCategoriaDTO): Promise< boolean >;
    removeCategoria(id: number): Promise< boolean >;
    getCategoriaConProductosById(id: number): Promise< CategoriaConProductosDTO | null>;
    getCategoriasConProductos(): Promise< CategoriaConProductosDTO[] >;
}
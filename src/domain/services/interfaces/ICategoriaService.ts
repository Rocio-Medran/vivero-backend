import { CategoriaDTO, CreateCategoriaDTO } from '../../../app/dtos/categoria.dto';
import { Categoria } from "../../entities/Categoria";

export interface IcategoriaService {
    getAllCategorias(): Promise< CategoriaDTO[] >;
    getCategoriaById(id: number): Promise< CategoriaDTO | null>;
    createCategoria(dto: CreateCategoriaDTO): Promise< CategoriaDTO >;
    updateCategoria(id: number, dto: CreateCategoriaDTO): Promise< boolean >;
    removeCategoria(id: number): Promise< boolean >;
}
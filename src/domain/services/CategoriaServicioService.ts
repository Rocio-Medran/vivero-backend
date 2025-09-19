import { CategoriaDTO, CreateCategoriaDTO } from "../../app/dtos/categoria.dto";
import { toCategoriaDTOs, toCategoriaDTO } from '../../app/mappings/categoria.mapping';
import { Categoria } from "../entities/Categoria";
import { CategoriaServicio } from "../entities/CategoriaServicio";
import { IRepository } from "../repositories/interfaces/IRepository";
import { ICategoriaServicioService } from "./interfaces/ICategoriaServicioService";

export class CategoriaServicioService implements ICategoriaServicioService {
    constructor(private readonly repo: IRepository<CategoriaServicio> ) {}

    async getAllCategorias(): Promise<CategoriaDTO[]> {
            const categorias = await this.repo.getAll();
            return toCategoriaDTOs(categorias);
        }
    
        async getCategoriaById(id: number): Promise<CategoriaDTO | null> {
            const categoria = await this.repo.getById(id);
            return categoria ? toCategoriaDTO(categoria) : null;
        }
    
        async createCategoria(dto: CreateCategoriaDTO): Promise<CategoriaDTO> {
            const nombreExiste = await this.repo.findByNombre(dto.nombre);
            if (nombreExiste) throw new Error("Ya existe una categoria con este nombre");
    
            const categoria = Object.assign(new Categoria(), dto);
            await this.repo.add(categoria);
            return toCategoriaDTO(categoria);
        }
    
        async updateCategoria(id: number, dto: CreateCategoriaDTO): Promise<boolean> {
            const categoria = await this.repo.getById(id);
            if (!categoria) return false;
    
            const nombreExiste = await this.repo.findByNombre(dto.nombre);
            if (nombreExiste && nombreExiste.id !== id) throw new Error("Ya existe una categoria con este nombre");
    
            Object.assign(categoria, dto);
            await this.repo.update(categoria);
            return true;
        }
    
        async removeCategoria(id: number): Promise<boolean> {
            const categoria = await this.repo.getById(id);
            if (!categoria) return false;
    
            await this.repo.delete(categoria);
            return true;
        }
}
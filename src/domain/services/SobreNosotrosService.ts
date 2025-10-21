import { SobreNosotros } from "../entities/SobreNosotros";
import { ISobreNosotrosService } from "./interfaces/ISobreNosotrosService";
import { CreateSobreNosotrosDTO, SobreNosotrosDetallesDTO, SobreNosotrosDTO, UpSobreNosotrosDTO } from '../../app/schemas/sobreNosotros.schema';
import { IRepository } from "../repositories/interfaces/IRepository";
import { toSobreNosotrosDetallesDTO, toSobreNosotrosDTO } from "../../app/mappings/sobreNosotros.mapping";
import { NotFoundError } from "../../app/errors/CustomErrors";


export class SobreNosotrosService implements ISobreNosotrosService {
    constructor(private readonly repo: IRepository<SobreNosotros>) { }

    async createSobreNosotros(dto: CreateSobreNosotrosDTO): Promise<SobreNosotrosDTO> {
        const sobreNosotros = new SobreNosotros();
        sobreNosotros.titulo = dto.titulo;
        sobreNosotros.contenido = dto.contenido;
        if (dto.mision !== undefined) sobreNosotros.mision = dto.mision;
        if (dto.vision !== undefined) sobreNosotros.vision = dto.vision;
        if (dto.valores !== undefined) sobreNosotros.valores = dto.valores;
        if (dto.imagen_url !== undefined) sobreNosotros.imagen_url = dto.imagen_url ?? '';
        if (dto.imagen2_url !== undefined) sobreNosotros.imagen2_url = dto.imagen2_url ?? '';

        await this.repo.add(sobreNosotros);
        return toSobreNosotrosDTO(sobreNosotros);
    }

    async getSobreNosotros(id: number): Promise<SobreNosotrosDetallesDTO> {
        const sobreNosotros = await this.repo.getById(id);
        if (!sobreNosotros) throw new NotFoundError("Sobre Nosotros no existente");
        return toSobreNosotrosDetallesDTO(sobreNosotros);
    }

    async updateSobreNosotros(id: number, dto: UpSobreNosotrosDTO): Promise<SobreNosotrosDTO> {
        const sobreNosotros = await this.repo.getById(id);
        if (!sobreNosotros) throw new NotFoundError("Sobre Nosotros no existente");

        if (dto.titulo !== undefined) sobreNosotros.titulo = dto.titulo;
        if (dto.contenido !== undefined) sobreNosotros.contenido = dto.contenido;
        if (dto.mision !== undefined) sobreNosotros.mision = dto.mision;
        if (dto.vision !== undefined) sobreNosotros.vision = dto.vision;
        if (dto.valores !== undefined) sobreNosotros.valores = dto.valores;
        if (dto.imagen_url !== undefined) sobreNosotros.imagen_url = dto.imagen_url;
        if (dto.imagen2_url !== undefined) sobreNosotros.imagen2_url = dto.imagen2_url;
        await this.repo.update(sobreNosotros);
        return toSobreNosotrosDTO(sobreNosotros);
    }

}
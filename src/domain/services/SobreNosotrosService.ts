import { SobreNosotros } from "../entities/SobreNosotros";
import { ISobreNosotrosService } from "./interfaces/ISobreNosotrosService";
import { SobreNosotrosDetallesDTO, SobreNosotrosDTO, UpSobreNosotrosDTO } from '../../app/schemas/sobreNosotros.schema';
import { IRepository } from "../repositories/interfaces/IRepository";
import { toSobreNosotrosDetallesDTO, toSobreNosotrosDTO } from "../../app/mappings/sobreNosotros.mapping";
import { NotFoundError } from "../../app/errors/CustomErrors";


export class SobreNosotrosService implements ISobreNosotrosService {
    constructor(private readonly repo: IRepository<SobreNosotros>) { }

    async getSobreNosotros(id: number): Promise<SobreNosotrosDetallesDTO> {
        const sobreNosotros = await this.repo.getById(id);
        if (!sobreNosotros) throw new NotFoundError("Sobre Nosotros no existente");
        return toSobreNosotrosDetallesDTO(sobreNosotros);
    }

    async updateSobreNosotros(id: number, dto: UpSobreNosotrosDTO): Promise<SobreNosotrosDTO> {
        const sobreNosotros = await this.repo.getById(id);
        if (!sobreNosotros) throw new NotFoundError("Sobre Nosotros no existente");

        if (dto.nuestro_origen !== undefined) sobreNosotros.nuestro_origen = dto.nuestro_origen;
        if (dto.produccion_historica !== undefined) sobreNosotros.produccion_historica = dto.produccion_historica;
        if (dto.nuevas_producciones !== undefined) sobreNosotros.nuevas_producciones = dto.nuevas_producciones;
        if (dto.imagen_url !== undefined) sobreNosotros.imagen_url = dto.imagen_url;
        if (dto.imagen2_url !== undefined) sobreNosotros.imagen2_url = dto.imagen2_url;
        if (dto.imagen3_url !== undefined) sobreNosotros.imagen3_url = dto.imagen3_url;
        if (dto.imagen4_url !== undefined) sobreNosotros.imagen4_url = dto.imagen4_url;
        if (dto.imagen5_url !== undefined) sobreNosotros.imagen5_url = dto.imagen5_url;

        await this.repo.update(sobreNosotros);
        return toSobreNosotrosDTO(sobreNosotros);
    }

}
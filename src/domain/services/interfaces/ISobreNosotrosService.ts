import { CreateSobreNosotrosDTO, SobreNosotrosDetallesDTO, SobreNosotrosDTO, UpSobreNosotrosDTO } from "../../../app/schemas/sobreNosotros.schema";

export interface ISobreNosotrosService {
    createSobreNosotros(dto: CreateSobreNosotrosDTO): Promise<SobreNosotrosDTO>;
    getSobreNosotros(id: number): Promise<SobreNosotrosDetallesDTO>;
    updateSobreNosotros(id: number, dto: UpSobreNosotrosDTO): Promise<SobreNosotrosDTO>;
}

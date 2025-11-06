import { SobreNosotrosDetallesDTO, SobreNosotrosDTO, UpSobreNosotrosDTO } from "../../../app/schemas/sobreNosotros.schema";

export interface ISobreNosotrosService {
    getSobreNosotros(id: number): Promise<SobreNosotrosDetallesDTO>;
    updateSobreNosotros(id: number, dto: UpSobreNosotrosDTO): Promise<SobreNosotrosDTO>;
}

import { EncargadoDTO, UpEncargadoDTO } from "../../../app/schemas/encargado.schema";

export interface IEncargadoService {
  getEncargadoById(id: number): Promise<EncargadoDTO>;
  updateEncargadoAsync(id: number, dto: UpEncargadoDTO): Promise<boolean>;
}

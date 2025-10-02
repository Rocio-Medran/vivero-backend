import { CreateServicioDTO, ServicioDTO, UpServicioDTO } from "../../../app/schemas/servicio.schema";

export interface IServicioService {
  getAllServicios(): Promise<ServicioDTO[]>;
  getServicioById(id: number): Promise<ServicioDTO | null>;
  createServicioAsync(dto: CreateServicioDTO): Promise<ServicioDTO>;
  updateServicioAsync(id: number, dto: UpServicioDTO): Promise<boolean>;
  removeServicioAsync(id: number): Promise<boolean>;
}
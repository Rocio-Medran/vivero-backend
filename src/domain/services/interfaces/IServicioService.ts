import { CreateServicioDTO, ServicioConDetallesDTO, ServicioDTO, ServicioCompletoDTO, UpServicioDTO } from "../../../app/schemas/servicio.schema";

export interface IServicioService {
  getAllServicios(): Promise<ServicioDTO[]>;
  getServicioById(id: number): Promise<ServicioDTO >;
  createServicioAsync(dto: CreateServicioDTO): Promise<ServicioDTO>;
  updateServicioAsync(id: number, dto: UpServicioDTO): Promise<boolean>;
  removeServicioAsync(id: number): Promise<boolean>;
  getAllServiciosConDetalles(): Promise<ServicioConDetallesDTO[]>;
  getServicioConDetallesById(id: number): Promise<ServicioConDetallesDTO>;
  getServiciosCompletos(): Promise<ServicioCompletoDTO[]>;
  getServicioCompletoById(id: number): Promise<ServicioCompletoDTO>;
}
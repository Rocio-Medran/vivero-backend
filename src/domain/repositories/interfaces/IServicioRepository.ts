import { Servicio } from "../../entities/Servicio";
import { IRepository } from "./IRepository";

export interface IServicioRepository extends IRepository<Servicio> {
  getServicioConDetallesById(id: number): Promise<Servicio | null>;
  getServiciosConDetalles(): Promise<Servicio[]>;
}
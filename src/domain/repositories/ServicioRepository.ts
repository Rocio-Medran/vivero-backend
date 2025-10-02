import { Servicio } from "../entities/Servicio";
import { BaseRepository } from "./BaseRepository";
import { IServicioRepository } from "./interfaces/IServicioRepository";

export class ServicioRepository
  extends BaseRepository<Servicio>
  implements IServicioRepository {

  constructor() { super(Servicio); }

  getServicioConDetallesById(id: number) {
    return this.getById(id, ['categoria', 'imagenes']);
  }

  getServiciosConDetalles() {
    return this.getAll(['categoria', 'imagenes']);
  }
}
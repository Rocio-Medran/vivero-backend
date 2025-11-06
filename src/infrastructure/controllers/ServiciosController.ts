import { Request, Response } from "express";
import { CreateServicioSchema, UpServicioSchema } from "../../app/schemas/servicio.schema";
import { IServicioService } from "../../domain/services/interfaces/IServicioService";
import { successResponse } from "../../utils/response";
import { ValidationError } from "../../app/errors/CustomErrors";

export class ServiciosController {
  constructor(private readonly service: IServicioService) { }

  getAll = async (_req: Request, res: Response, next: Function) => {
    try {
      const servicios = await this.service.getAllServicios();
      successResponse(res, "SERVICIOS_OBTENIDOS", "Servicios obtenidos correctamente", servicios);
    } catch (error) {
      next(error);
    }
  }

  getById = async (req: Request, res: Response, next: Function) => {
    try {
      const servicio = await this.service.getServicioById(Number(req.params.id));
      if (!servicio) return next(new ValidationError("Servicio no encontrado"));
      successResponse(res, "SERVICIO_OBTENIDO", "Servicio obtenido correctamente", servicio);
    } catch (error) {
      next(error);
    }
  }

  create = async (req: Request, res: Response, next: Function) => {
    try {
      const dto = CreateServicioSchema.parse(req.body);
      const servicio = await this.service.createServicioAsync(dto);
      successResponse(res, "SERVICIO_CREADO", "Servicio creado correctamente", servicio);
    } catch (error) {
      next(error);
    }
  }

  update = async (req: Request, res: Response, next: Function) => {
    try {
      const dto = UpServicioSchema.parse(req.body);
      const ok = await this.service.updateServicioAsync(Number(req.params.id), dto);
      if (!ok) return next(new ValidationError("Servicio no encontrado"));
      successResponse(res, "SERVICIO_ACTUALIZADO", "Servicio actualizado correctamente");
    } catch (error) {
      next(error);
    }
  }

  remove = async (req: Request, res: Response, next: Function) => {
    try {
      const ok = await this.service.removeServicioAsync(Number(req.params.id));
      if (!ok) return next(new ValidationError("Servicio no encontrado"));
      successResponse(res, "SERVICIO_ELIMINADO", "Servicio eliminado correctamente");
    } catch (error) {
      next(error);
    }
  }

  getAllDetalles = async (req: Request, res: Response, next: Function) => {
    try {
      const servicios = await this.service.getAllServiciosConDetalles();
      successResponse(res, "SERVICIOS_OBTENIDOS", "Servicios obtenidos correctamente", servicios);
    } catch (error) {
      next(error);
    }
  }

  getDetallesById = async (req: Request, res: Response, next: Function) => {
    try {
      const servicio = await this.service.getServicioConDetallesById(Number(req.params.id));
      if (!servicio) return next(new ValidationError("Servicio no encontrado"));
      successResponse(res, "SERVICIO_OBTENIDO", "Servicio obtenido correctamente", servicio);
    } catch (error) {
      next(error);
    }
  }

  getAllCompletos = async (_req: Request, res: Response, next: Function) => {
    try {
      const servicios = await this.service.getServiciosCompletos();
      successResponse(res, "SERVICIOS_OBTENIDOS", "Servicios obtenidos correctamente", servicios);
    } catch (error) {
      next(error);
    }
  }

  getCompletoById = async (req: Request, res: Response, next: Function) => {
    try {
      const servicio = await this.service.getServicioCompletoById(Number(req.params.id));
      if (!servicio) return next(new ValidationError("Servicio no encontrado"));
      successResponse(res, "SERVICIO_OBTENIDO", "Servicio obtenido correctamente", servicio);
    } catch (error) {
      next(error);
    }
  }
}
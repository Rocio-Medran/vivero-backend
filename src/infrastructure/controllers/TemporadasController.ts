import { ITemporadaService } from "../../domain/services/interfaces/ITemporadaService";
import { Request, Response } from "express";
import { CreateTemporadaSchema, UpdateTemporadaSchema } from "../../app/schemas/temporada.schema";
import { successResponse } from "../../utils/response";
import { ValidationError } from "../../app/errors/CustomErrors";

export class TemporadasController {
    constructor(private readonly service: ITemporadaService) {}

    getAll = async (_req: Request, res: Response, next: Function) => {
        try {
            const temporadas = await this.service.getAllTemporadas();
            successResponse(res, "TEMPORADAS_OBTENIDAS", "Temporadas obtenidas correctamente", temporadas);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: Function) => {
        try {
            const temporada = await this.service.getTemporadaById(Number(req.params.id));
            if (!temporada) return next(new ValidationError("Temporada no encontrada"));
            successResponse(res, "TEMPORADA_OBTENIDA", "Temporada obtenida correctamente", temporada);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateTemporadaSchema.parse(req.body);
            const temporada = await this.service.createTemporada(dto);
            successResponse(res, "TEMPORADA_CREADA", "Temporada creada correctamente", temporada);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = UpdateTemporadaSchema.parse(req.body);
            const ok = await this.service.updateTemporada(Number(req.params.id), dto);
            if (!ok) return next(new ValidationError("Temporada no encontrada"));

           successResponse(res, "TEMPORADA_ACTUALIZADA", "Temporada actualizada correctamente");
        } catch (error) {
            next(error);
        }
    }

    remove = async (req: Request, res: Response, next: Function) => {
        try {
            const ok = await this.service.removeTemporada(Number(req.params.id));
            if (!ok) return next(new ValidationError("Temporada no encontrada"));

            successResponse(res, "TEMPORADA_ELIMINADA", "Temporada eliminada correctamente");
        } catch (error) {
            next(error);
        }
    }
}
import { Request, Response } from "express";
import { IEncargadoService } from "../../domain/services/interfaces/IEncargadoService";
import { successResponse } from "../../utils/response";
import { UpEncargadoSchema } from "../../app/schemas/encargado.schema";
import { ValidationError } from "../../app/errors/CustomErrors";

export class EncargadoController {
  constructor(private readonly service: IEncargadoService) {}

  getById = async (req: Request, res: Response, next: Function) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return next(new ValidationError("ID inválido"));
      const encargado = await this.service.getEncargadoById(id);
      if (!encargado) return next(new ValidationError("Encargado no encontrado"));
      return successResponse(res, "ENCARGADO_OBTENIDO", "Encargado obtenido correctamente", encargado);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: Function) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return next(new ValidationError("ID inválido"));
      const dto = UpEncargadoSchema.parse(req.body);
      const ok = await this.service.updateEncargadoAsync(id, dto);
      if (!ok) return next(new ValidationError("Encargado no encontrado"));
      return successResponse(res, "ENCARGADO_ACTUALIZADO", "Encargado actualizado correctamente");
    } catch (err) {
      next(err);
    }
  };
}

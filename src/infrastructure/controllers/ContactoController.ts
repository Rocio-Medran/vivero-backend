import { Request, Response } from "express";
import { IContactoService } from "../../domain/services/interfaces/IContactoService";
import { successResponse } from "../../utils/response";
import { UpContactoSchema } from "../../app/schemas/contacto.schema";
import { ValidationError } from "../../app/errors/CustomErrors";

export class ContactoController {
  constructor(private readonly service: IContactoService) {}

  getById = async (req: Request, res: Response, next: Function) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return next(new ValidationError("ID inválido"));
      const contacto = await this.service.getContactoById(id);
      if (!contacto) return next(new ValidationError("Contacto no encontrado"));
      return successResponse(res, "CONTACTO_OBTENIDO", "Contacto obtenido correctamente", contacto);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: Function) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) return next(new ValidationError("ID inválido"));
      const dto = UpContactoSchema.parse(req.body);
      const ok = await this.service.updateContactoAsync(id, dto);
      if (!ok) return next(new ValidationError("Contacto no encontrado"));
      return successResponse(res, "CONTACTO_ACTUALIZADO", "Contacto actualizado correctamente");
    } catch (err) {
      next(err);
    }
  };
}

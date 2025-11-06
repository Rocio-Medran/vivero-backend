import { UpSobreNosotrosSchema } from "../../app/schemas/sobreNosotros.schema";
import { ISobreNosotrosService } from "../../domain/services/interfaces/ISobreNosotrosService";
import { Request, Response } from "express";
import { successResponse } from "../../utils/response";

export class SobreNosotrosController {
    constructor(private readonly service: ISobreNosotrosService) {}

    getDetalles = async (req: Request, res: Response, next: Function) => {
        try {
            const detalles = await this.service.getSobreNosotros(Number(req.params.id));
            successResponse(res, "SOBRE_NOSOTROS_DETALLES_OBTENIDOS", "Detalles de Sobre Nosotros obtenidos correctamente", detalles);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = UpSobreNosotrosSchema.parse(req.body);
            const sobreNosotros = await this.service.updateSobreNosotros(Number(req.params.id), dto);
            successResponse(res, "SOBRE_NOSOTROS_ACTUALIZADO", "Sobre Nosotros actualizado correctamente", sobreNosotros);
        } catch (error) {
            next(error);
        }
    }
}
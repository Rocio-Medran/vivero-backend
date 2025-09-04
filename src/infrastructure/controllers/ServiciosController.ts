import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { CreateServicioDTO, UpServicioDTO } from "../../app/dtos/servicio.dto";
import { IServicioService } from "../../domain/services/interfaces/IServicioService";

export class ServiciosController {
  constructor(private readonly service: IServicioService) {}

  getAll = async (_req: Request, res: Response) => {
    const items = await this.service.getAllServicios();
    res.json(items);
  }

  getById = async (req: Request, res: Response) => {
    const item = await this.service.getServicioById(Number(req.params.id));
    if (!item) return res.sendStatus(StatusCodes.NOT_FOUND);
    res.json(item);
  }

  create = async (req: Request, res: Response) => {
    const dto = req.body as CreateServicioDTO;
    const created = await this.service.createServicioAsync(dto);
    res.status(StatusCodes.CREATED).json(created);
  }

  update = async (req: Request, res: Response) => {
    const ok = await this.service.updateServicioAsync(Number(req.params.id), req.body as UpServicioDTO);
    if (!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
    res.sendStatus(StatusCodes.NO_CONTENT);
  }

  remove = async (req: Request, res: Response) => {
    const ok = await this.service.removeServicioAsync(Number(req.params.id));
    if (!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
}
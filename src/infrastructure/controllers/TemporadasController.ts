import { StatusCodes } from "http-status-codes";
import { ITemporadaService } from "../../domain/services/interfaces/ITemporadaService";
import { Request, Response } from "express";
import { CreateTemporadaDTO, UpTemporadaDTO } from "../../app/dtos/temporada.dto";

export class TemporadasController {
    constructor(private readonly service: ITemporadaService) {}

    getAll = async (_req: Request, res: Response) => {
        const temporadas = await this.service.getAllTemporadas();
        res.json(temporadas);
    }

    getById = async (req: Request, res: Response) => {
        const temporada = await this.service.getTemporadaById(Number(req.params.id));
        if(!temporada) res.sendStatus(StatusCodes.NOT_FOUND);

        res.json(temporada);
    }

    create = async (req: Request, res: Response) => {
        const dto = req.body as CreateTemporadaDTO;
        const temporada = await this.service.createTemporada(dto);
        res.sendStatus(StatusCodes.CREATED).json(temporada);
    }

    update = async (req: Request, res: Response) => {
        const ok = await this.service.updateTemporada(Number(req.params.id), req.body as UpTemporadaDTO);
        if(!ok) return res.sendStatus(StatusCodes.NOT_FOUND);

        res.sendStatus(StatusCodes.NO_CONTENT);
    }

    remove = async (req: Request, res: Response) => {
        const ok = await this.service.removeTemporada(Number(req.params.id));
        if(!ok) return res.sendStatus(StatusCodes.NOT_FOUND);

        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
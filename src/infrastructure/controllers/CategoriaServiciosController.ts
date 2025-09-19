import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateCategoriaDTO } from "../../app/dtos/categoria.dto";
import { ICategoriaServicioService } from '../../domain/services/interfaces/ICategoriaServicioService';

export class CategoriaServiciosController {
    constructor(private readonly service: ICategoriaServicioService) {}

    getAll = async (_req: Request, res: Response) => {
        const categorias = await this.service.getAllCategorias();
        res.json(categorias);
    }

    getById = async (req: Request, res: Response) => {
        const categoria = await this.service.getCategoriaById(Number(req.params.id))
        if(!categoria) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.json(categoria);
    }

    create = async (req: Request, res: Response) => {
        const dto = req.body as CreateCategoriaDTO;
        const categoria = await this.service.createCategoria(dto);
        res.status(StatusCodes.CREATED).json(categoria);
    }

    update = async (req: Request, res: Response) => {
        const ok = await this.service.updateCategoria(Number(req.params.id), req.body as CreateCategoriaDTO);
        if(!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.sendStatus(StatusCodes.NO_CONTENT);
    }

    remove = async (req: Request, res: Response) => {
        const ok = await this.service.removeCategoria(Number(req.params.id));
        if(!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
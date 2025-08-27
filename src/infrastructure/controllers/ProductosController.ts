import { StatusCodes } from "http-status-codes";
import { IProductoService } from "../../domain/services/interfaces/IProductoService";
import { Request, Response } from "express";
import { CreateProductoDTO, UpProductoDTO } from "../../app/dtos/producto.dto";

export class ProductoController {
    constructor(private readonly service: IProductoService) {}

    getAll = async (_req: Request, res:Response) => {
        const productos = await this.service.getAllProductos();
        res.json(productos);
    }

    getById = async (req: Request, res: Response) => {
        const producto = await this.service.getProductoById(Number(req.params.id));
        if(!producto) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.json(producto);
    }

    create = async (req: Request, res: Response) => {
        const dto = req.body as CreateProductoDTO;
        const producto = await this.service.createProductoAsync(dto);
        res.status(StatusCodes.CREATED).json(producto);
    }

    update = async (req: Request, res: Response) => {
        const ok = await this.service.updateProductoAsync(Number(req.params.id), req.body as UpProductoDTO);
        if(!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.sendStatus(StatusCodes.NO_CONTENT);
    }

    remove = async (req: Request, res: Response) => {
        const ok = await this.service.removeProductoAsync(Number(req.params.id));
        if(!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
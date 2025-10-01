import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IImagenProductoService } from "../../domain/services/interfaces/IImageneProductoService";

export class ImagenesProductoController {
    constructor(private readonly service: IImagenProductoService) { }

    // GET /productos/:productoId/imagenes
    getByProductoId = async (req: Request, res: Response) => {
        const productoId = Number(req.params.productoId);
        if (isNaN(productoId)) return res.sendStatus(StatusCodes.BAD_REQUEST);

        const imagenes = await this.service.getImagenesByProductoId(productoId);
        res.json(imagenes);
    };


    // POST /productos/:productoId/imagenes (una sola imagen)
    create = async (req: Request, res: Response) => {
        const productoId = Number(req.params.productoId);
        if (isNaN(productoId)) return res.sendStatus(StatusCodes.BAD_REQUEST);

        if (!req.file) return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });

        try {
            const imagen = await this.service.createImagenProducto(req.file, productoId);
            res.status(StatusCodes.CREATED).json(imagen);
        } catch (err: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    };

    // POST /productos/:productoId/imagenes/multiples (varias imágenes)
    createMany = async (req: Request, res: Response) => {
        const productoId = Number(req.params.productoId);
        if (isNaN(productoId)) return res.sendStatus(StatusCodes.BAD_REQUEST);

        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No files uploaded" });
        }

        try {
            const imagenes = await this.service.createImagenesProducto(req.files as Express.Multer.File[], productoId);
            res.status(StatusCodes.CREATED).json(imagenes);
        } catch (err: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    };

    // DELETE /imagenes/:id
    remove = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.sendStatus(StatusCodes.BAD_REQUEST);

        const ok = await this.service.removeImagenProducto(id);
        if (!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.sendStatus(StatusCodes.NO_CONTENT);
    };
}
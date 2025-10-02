import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IImagenServicioService } from "../../domain/services/interfaces/IImagenServicioService";

export class ImagenesServicioController {
    constructor(private readonly service: IImagenServicioService) {}

    // GET /servicios/:servicioId/imagenes
    getByServicioId = async (req: Request, res: Response) => {
        const servicioId = Number(req.params.servicioId);
        if (isNaN(servicioId)) return res.sendStatus(StatusCodes.BAD_REQUEST);
        const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
        const imagenes = await this.service.getImagenesByServicioId(servicioId);
        const result = imagenes.map(img => ({
            id: img.id,
            url: encodeURI(`${baseUrl}${img.url}`),
            es_principal: img.es_principal,
            orden: img.orden
        }));
        res.json(result);
    };

    // POST /servicios/:servicioId/imagenes (una sola imagen)
    create = async (req: Request, res: Response) => {
        const servicioId = Number(req.params.servicioId);
        if (isNaN(servicioId)) return res.sendStatus(StatusCodes.BAD_REQUEST);
        if (!req.file) return res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        try {
            const imagen = await this.service.createImagenServicio(req.file, servicioId);
            res.status(StatusCodes.CREATED).json(imagen);
        } catch (err: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    };

    // POST /servicios/:servicioId/imagenes/multiples (varias imágenes)
    createMany = async (req: Request, res: Response) => {
        const servicioId = Number(req.params.servicioId);
        if (isNaN(servicioId)) return res.sendStatus(StatusCodes.BAD_REQUEST);
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "No files uploaded" });
        }
        try {
            const imagenes = await this.service.createImagenesServicio(req.files as Express.Multer.File[], servicioId);
            res.status(StatusCodes.CREATED).json(imagenes);
        } catch (err: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    };

    // DELETE /imagenes-servicio/:id
    remove = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.sendStatus(StatusCodes.BAD_REQUEST);
        const ok = await this.service.removeImagenServicio(id);
        if (!ok) return res.sendStatus(StatusCodes.NOT_FOUND);
        res.sendStatus(StatusCodes.NO_CONTENT);
    };
}

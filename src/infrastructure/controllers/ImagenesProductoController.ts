import { Request, Response } from "express";
import { IImagenProductoService } from "../../domain/services/interfaces/IImageneProductoService";
import { ValidationError } from "../../app/errors/CustomErrors";
import { successResponse } from "../../utils/response";

export class ImagenesProductoController {
    constructor(private readonly service: IImagenProductoService) { }

    // GET /productos/:productoId/imagenes
    getByProductoId = async (req: Request, res: Response, next: Function) => {
        try {
            const productoId = Number(req.params.productoId);
            if (isNaN(productoId)) return next(new ValidationError("ID de producto inválido"));

            const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
            const imagenes = await this.service.getImagenesByProductoId(productoId);
            const result = imagenes.map(img => ({
                id: img.id,
                url: encodeURI(`${baseUrl}${img.url}`),
                es_principal: img.es_principal,
                orden: img.orden
            }));
            return successResponse(res, "IMAGENES_OBTENIDAS", "Imágenes obtenidas correctamente", result);
        } catch (err) {
            next(err);
        }
    };

    // POST /productos/:productoId/imagenes/multiples (varias imágenes)
    createMany = async (req: Request, res: Response, next: Function) => {
        try {
            const productoId = Number(req.params.productoId);
            if (isNaN(productoId)) return next(new ValidationError("ID de producto inválido"));

            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                return next(new ValidationError("No se subieron archivos"));
            }
            const imagenes = await this.service.createImagenesProducto(req.files as Express.Multer.File[], productoId);
            return successResponse(res, "IMAGENES_CREADAS", "Imágenes subidas correctamente", imagenes);
        } catch (err) {
            next(err);
        }
    };

    // DELETE /imagenes/:id
    remove = async (req: Request, res: Response, next: Function) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return next(new ValidationError("ID de imagen inválido"));

            const ok = await this.service.removeImagenProducto(id);
            if (!ok) return next(new ValidationError("Imagen no encontrada"));
            return successResponse(res, "IMAGEN_ELIMINADA", "Imagen eliminada correctamente");
        } catch (err) {
            next(err);
        }
    };
}
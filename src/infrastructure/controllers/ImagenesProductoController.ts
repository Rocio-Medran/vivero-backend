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

            const imagenes = await this.service.getImagenesByProductoId(productoId);
            const result = imagenes.map(img => ({
                id: img.id,
                url: img.url,
                es_principal: img.es_principal,
                es_ilustrativa: img.es_ilustrativa,
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

    // PUT /imagenes/:id
    update = async (req: Request, res: Response, next: Function) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return next(new ValidationError("ID de imagen inválido"));
            const { es_principal, orden } = req.body;

            const updated = await this.service.updateImagenProducto(id, es_principal, orden);
            return successResponse(res, "IMAGEN_ACTUALIZADA", "Imagen actualizada correctamente", updated);
        } catch (err) {
            next(err);
        }
    };

    // PUT /productos/:productoId/imagenes/orden
    updateOrden = async (req: Request, res: Response, next: Function) => {
        try {
            const productoId = Number(req.params.productoId);
            if (isNaN(productoId)) return next(new ValidationError("ID de producto inválido"));

            const { orden } = req.body;

            if (!Array.isArray(orden) || orden.length === 0) {
                return next(new ValidationError("Debe enviar un arreglo de IDs de imágenes"));
            }

            const updated = await this.service.reordenarImagenes(productoId, orden);

            return successResponse(res, "ORDEN_ACTUALIZADO", "Imágenes reordenadas correctamente", updated);
        } catch (error) {
            next(error);
        }
    };

}
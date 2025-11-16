import { Request, Response } from "express";
import { IImagenServicioService } from "../../domain/services/interfaces/IImagenServicioService";
import { NotFoundError, ValidationError } from "../../app/errors/CustomErrors";
import { successResponse } from "../../utils/response";

export class ImagenesServicioController {
    constructor(private readonly service: IImagenServicioService) { }

    // GET /servicios/:servicioId/imagenes
    getByServicioId = async (req: Request, res: Response, next: Function) => {
        try {
            const servicioId = Number(req.params.servicioId);
            if (isNaN(servicioId)) return next(new ValidationError("ID de servicio inválido"));
            const imagenes = await this.service.getImagenesByServicioId(servicioId);
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

    // POST /servicios/:servicioId/imagenes/multiples (varias imágenes)
    createMany = async (req: Request, res: Response, next: Function) => {
        try {
            const servicioId = Number(req.params.servicioId);
            if (isNaN(servicioId)) return next(new ValidationError("ID de servicio inválido"));
            
            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                return next(new ValidationError("No se subieron archivos"));
            }
            const imagenes = await this.service.createImagenesServicio(req.files as Express.Multer.File[], servicioId);
            return successResponse(res, "IMAGENES_CREADAS", "Imágenes subidas correctamente", imagenes);
        } catch (err) {
            next(err);
        }
    };

    // DELETE /imagenes-servicio/:id
    remove = async (req: Request, res: Response, next: Function) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return next(new ValidationError("ID de imagen inválido"));
            const ok = await this.service.removeImagenServicio(id);
            if (!ok) return next(new NotFoundError("Imagen no encontrada"));
            return successResponse(res, "IMAGEN_ELIMINADA", "Imagen eliminada correctamente");
        } catch (err) {
            next(err);
        }
    };

    // PUT /imagenes-servicio/:id
    update = async (req: Request, res: Response, next: Function) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) return next(new ValidationError("ID de imagen inválido"));
            const { es_principal, orden } = req.body;

            const updated = await this.service.updateImagenServicio(id, es_principal, orden);
            return successResponse(res, "IMAGEN_ACTUALIZADA", "Imagen actualizada correctamente", updated);
        } catch (err) {
            next(err);
        }
    };

    // PUT /servicios/:servicioId/imagenes/orden
    updateOrden = async (req: Request, res: Response, next: Function) => {
        try {
            const servicioId = Number(req.params.servicioId);
            if (isNaN(servicioId)) return next(new ValidationError("ID de servicio inválido"));
            const { orden } = req.body;

            if (!Array.isArray(orden) || orden.length === 0) {
                return next(new ValidationError("Debe enviar un arreglo de IDs de imágenes"));
            }

            const updated = await this.service.reordenarImagenes(servicioId, orden);

            return successResponse(res, "ORDEN_ACTUALIZADO", "Imágenes reordenadas correctamente", updated);
        } catch (error) {
            next(error);
        }
    };
}

import { Request, Response } from "express";
import { ICategoriaServicioService } from '../../domain/services/interfaces/ICategoriaServicioService';
import { CreateCategoriaServicioSchema } from "../../app/schemas/categoriaServicio.schema";
import { successResponse } from "../../utils/response";
import { ValidationError } from "../../app/errors/CustomErrors";


export class CategoriaServiciosController {
    constructor(private readonly service: ICategoriaServicioService) {}

    getAll = async (_req: Request, res: Response, next: Function) => {
        try {
            const categorias = await this.service.getAllCategorias();
            successResponse(res, "CATEGORIAS_OBTENIDAS", "Categorías obtenidas correctamente", categorias);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: Function) => {
        try {
            const categoria = await this.service.getCategoriaById(Number(req.params.id));
            if (!categoria) return next(new ValidationError("Categoría no encontrada"));
            successResponse(res, "CATEGORIA_OBTENIDA", "Categoría obtenida correctamente", categoria);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateCategoriaServicioSchema.parse(req.body);
            const categoria = await this.service.createCategoria(dto);
            successResponse(res, "CATEGORIA_CREADA", "Categoría creada correctamente", categoria);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateCategoriaServicioSchema.parse(req.body);
            const ok = await this.service.updateCategoria(Number(req.params.id), dto);
            if (!ok) return next(new ValidationError("Categoría no encontrada"));
            successResponse(res, "CATEGORIA_ACTUALIZADA", "Categoría actualizada correctamente");
        } catch (error) {
            next(error);
        }
    }

    remove = async (req: Request, res: Response, next: Function) => {
        try {
            const ok = await this.service.removeCategoria(Number(req.params.id));
            if (!ok) return next(new ValidationError("Categoría no encontrada"));
            successResponse(res, "CATEGORIA_ELIMINADA", "Categoría eliminada correctamente");
        } catch (error) {
            next(error);
        }
    }
    getAllConServicios = async (_req: Request, res: Response, next: Function) => {
        try {
            const categorias = await this.service.getCategoriasServicioConServicios();
            successResponse(res, "CATEGORIAS_OBTENIDAS", "Categorías obtenidas correctamente", categorias);
        } catch (error) {
            next(error);
        }
    };

    getConServiciosById = async (req: Request, res: Response, next: Function) => {
        try {
            const categoria = await this.service.getCategoriaServicioConServiciosById(Number(req.params.id));
            if (!categoria) return next(new ValidationError("Categoría no encontrada"));
            successResponse(res, "CATEGORIA_OBTENIDA", "Categoría obtenida correctamente", categoria);
        } catch (error) {
            next(error);
        }
    }
}
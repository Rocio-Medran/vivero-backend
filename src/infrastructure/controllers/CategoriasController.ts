import { Request, Response } from "express";
import { IcategoriaService } from "../../domain/services/interfaces/ICategoriaService";
import { CreateCategoriaSchema } from "../../app/schemas/categoria.schema";
import { successResponse } from "../../utils/response";
import { ValidationError } from "../../app/errors/CustomErrors";


export class CategoriasController {
    constructor(private readonly service: IcategoriaService) { }

    getAll = async (_req: Request, res: Response, next: Function) => {
        try {
            const categorias = await this.service.getAllCategorias();
            return successResponse(res, "CATEGORIAS_OBTENIDAS", "Categorías obtenidas correctamente", categorias);
        } catch (err) {
            next(err);
        }
    }

    getById = async (req: Request, res: Response, next: Function) => {
        try {
            const categoria = await this.service.getCategoriaById(Number(req.params.id));
            if (!categoria) return next(new ValidationError("Categoría no encontrada"));
            return successResponse(res, "CATEGORIA_OBTENIDA", "Categoría obtenida correctamente", categoria);
        } catch (err) {
            next(err);
        }
    }

    create = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateCategoriaSchema.parse(req.body);
            const categoria = await this.service.createCategoria(dto);
            return successResponse(res, "CATEGORIA_CREADA", "Categoría creada correctamente", categoria);
        } catch (err) {
            next(err);
        }
    }

    update = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateCategoriaSchema.parse(req.body);
            const ok = await this.service.updateCategoria(Number(req.params.id), dto);
            if (!ok) return next(new ValidationError("Categoría no encontrada"));
            return successResponse(res, "CATEGORIA_ACTUALIZADA", "Categoría actualizada correctamente");
        } catch (err) {
            next(err);
        }
    }

    remove = async (req: Request, res: Response, next: Function) => {
        try {
            const ok = await this.service.removeCategoria(Number(req.params.id));
            if (!ok) return next(new ValidationError("Categoría no encontrada"));
            return successResponse(res, "CATEGORIA_ELIMINADA", "Categoría eliminada correctamente");
        } catch (err) {
            next(err);
        }
    }

    getAllConProductos = async (_req: Request, res: Response, next: Function) => {
        try {
            const categorias = await this.service.getCategoriasConProductos();
            return successResponse(res, "CATEGORIAS_CON_PRODUCTOS_OBTENIDAS", "Categorías con productos obtenidas correctamente", categorias);
        } catch (err) {
            next(err);
        }
    };

    getConProductosById = async (req: Request, res: Response, next: Function) => {
        try {
            const categoria = await this.service.getCategoriaConProductosById(Number(req.params.id));
            if (!categoria) return next(new ValidationError("Categoría no encontrada"));
            return successResponse(res, "CATEGORIA_CON_PRODUCTOS_OBTENIDA", "Categoría con productos obtenida correctamente", categoria);
        } catch (err) {
            next(err);
        }
    }

    getSubcategorias = async (req: Request, res: Response, next: Function) => {
        try {
            const subcategorias = await this.service.getSubcategorias(Number(req.params.id));
            return successResponse(res, "SUBCATEGORIAS_OBTENIDAS", "Subcategorías obtenidas correctamente", subcategorias);
        } catch (err) {
            next(err);
        }       
    }

    getAllSubcategorias = async (_req: Request, res: Response, next: Function) => {
        try {
            const subcategorias = await this.service.getAllSubcategorias();
            return successResponse(res, "SUBCATEGORIAS_OBTENIDAS", "Subcategorías obtenidas correctamente", subcategorias);
        } catch (err) {
            next(err);
        }   
    }

    getCategoriasByTipo = async (req: Request, res: Response, next: Function) => {
        try {
            const tipo = req.params.tipo;
            if (typeof tipo !== "string") {
                return next(new ValidationError("El parámetro 'tipo' es requerido"));
            }
            const categorias = await this.service.getCategoriasByTipo(tipo);
            return successResponse(res, "CATEGORIAS_POR_TIPO_OBTENIDAS", `Categorías del tipo '${tipo}' obtenidas correctamente`, categorias);
        } catch (err) {
            next(err);
        }   
    }

    getCategoriaByNombre = async (req: Request, res: Response, next: Function) => {
        try {
            const nombre = req.params.nombre;
            if (typeof nombre !== "string" || !nombre.trim()) {
                return next(new ValidationError("El parámetro 'nombre' es requerido"));
            }
            const categoria = await this.service.getCategoriaByNombre(nombre);
            return successResponse(res, "CATEGORIA_POR_NOMBRE_OBTENIDA", `Categoría con nombre '${nombre}' obtenida correctamente`, categoria);
        } catch (err) {
            next(err);
        }   
    }
}
import { IProductoService } from "../../domain/services/interfaces/IProductoService";
import { Request, Response } from "express";
import { CreateProductoSchema, UpdateProductoSchema } from "../../app/schemas/producto.schema";
import { successResponse } from "../../utils/response";
import { ValidationError } from "../../app/errors/CustomErrors";

export class ProductosController {
    constructor(private readonly service: IProductoService) {}

    getAll = async (_req: Request, res:Response, next: Function) => {
        try {
            const productos = await this.service.getAllProductos();
            successResponse(res, "PRODUCTOS_OBTENIDOS", "Productos obtenidos correctamente", productos);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req: Request, res: Response, next: Function) => {
        try {
            const producto = await this.service.getProductoById(Number(req.params.id));
            if (!producto) return next(new ValidationError("Producto no encontrado"));
            successResponse(res, "PRODUCTO_OBTENIDO", "Producto obtenido correctamente", producto);
        } catch (error) {
            next(error);
        }
    }

    create = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateProductoSchema.parse(req.body);
            const producto = await this.service.createProductoAsync(dto);
            successResponse(res, "PRODUCTO_CREADO", "Producto creado correctamente", producto);
        } catch (error) {
            next(error);
        }
    }

    updateCompleto = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = CreateProductoSchema.parse(req.body);
            const ok = await this.service.updateProductoCompletoAsync(Number(req.params.id), dto);
            if (!ok) return next(new ValidationError("Producto no encontrado"));
            successResponse(res, "PRODUCTO_ACTUALIZADO", "Producto actualizado correctamente");
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: Function) => {
        try {
            const dto = UpdateProductoSchema.parse(req.body);
            const ok = await this.service.updateProductoAsync(Number(req.params.id), dto);
            if (!ok) return next(new ValidationError("Producto no encontrado"));
            successResponse(res, "PRODUCTO_ACTUALIZADO", "Producto actualizado correctamente");
        } catch (error) {
            next(error);
        }
    }

    remove = async (req: Request, res: Response, next: Function) => {
        try {
            const ok = await this.service.removeProductoAsync(Number(req.params.id));
            if (!ok) return next(new ValidationError("Producto no encontrado"));
            successResponse(res, "PRODUCTO_ELIMINADO", "Producto eliminado correctamente");
        } catch (error) {
            next(error);
        }
    }

    getAllDetalles = async (req: Request, res:Response, next: Function) => {
        try {
            const productos = await this.service.getAllProductosConDetalles();
            successResponse(res, "PRODUCTOS_OBTENIDOS", "Productos obtenidos correctamente", productos);
        } catch (error) {
            next(error);
        }
    }

    getDetallesById = async (req: Request, res: Response, next: Function) => {
        try {
            const producto = await this.service.getProductoConDetallesById(Number(req.params.id));
            if (!producto) return next(new ValidationError("Producto no encontrado"));
            successResponse(res, "PRODUCTO_OBTENIDO", "Producto obtenido correctamente", producto);
        } catch (error) {
            next(error);
        }
    }

    getByCategoria = async (req: Request, res: Response, next: Function) => {
        try {
            const nombre = req.query.categoria as string;
            if (!nombre) return next(new ValidationError("El parámetro de consulta 'categoria' es requerido."));
            const productos = await this.service.getProductosByCategoria(nombre);
            successResponse(res, "PRODUCTOS_OBTENIDOS", "Productos obtenidos correctamente", productos);
        } catch (error) {
            next(error);
        }
    }

    getCompletoById = async (req: Request, res: Response, next: Function) => {
        try {
            const producto = await this.service.getProductoCompletoById(Number(req.params.id));
            if (!producto) return next(new ValidationError("Producto no encontrado"));
            successResponse(res, "PRODUCTO_OBTENIDO", "Producto obtenido correctamente", producto);
        } catch (error) {
            next(error);
        }
    }

    getCompletos = async (req: Request, res: Response, next: Function) => {
        try {
            const productos = await this.service.getProductosCompletos();
            successResponse(res, "PRODUCTOS_OBTENIDOS", "Productos obtenidos correctamente", productos);
        } catch (error) {
            next(error);
        }
    }
}
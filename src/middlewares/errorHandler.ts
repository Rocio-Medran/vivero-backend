// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../app/errors/CustomErrors";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    console.error(err);

    // Errores de Zod
    if (err instanceof ZodError) {
        const details = err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
        }));

        return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Error de validación en los datos enviados",
            errors: details,
        });
    }

    // Errores custom
    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            code: err.code,
            message: err.message,
            errors: err.details,
        });
    }

    // Error inesperado
    return res.status(500).json({
        success: false,
        code: "INTERNAL_ERROR",
        message: "Error interno del servidor",
    });
}

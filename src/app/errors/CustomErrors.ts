// src/app/errors/CustomErrors.ts
export class AppError extends Error {
    status: number;
    code: string;
    details?: any;

    constructor(status: number, code: string, message: string, details?: any) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.code = code;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Recurso no encontrado", details?: any) {
        super(404, "NOT_FOUND", message, details);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Error de validación", details?: any) {
        super(400, "VALIDATION_ERROR", message, details);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflicto de datos", details?: any) {
        super(409, "CONFLICT", message, details);
    }
}

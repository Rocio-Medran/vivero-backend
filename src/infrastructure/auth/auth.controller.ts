import { loginSchema } from "../../app/schemas/login.schema";
import { AuthService } from "./auth.service";
import { ValidationError } from "../../app/errors/CustomErrors";
import { successResponse } from "../../utils/response";
import { Request, Response } from "express";


export class AuthController {
    constructor(private readonly authService: AuthService) {}

    async login(req: Request, res: Response, next: Function) {
        try {
            const dto = loginSchema.parse(req.body);
            const result = await this.authService.login(dto);
            return successResponse(res, "LOGIN_OK", "Login exitoso", result);
        } catch (error) {
            next(new ValidationError("Credenciales inválidas"));
        }
    }
}
import { loginSchema } from "../../app/schemas/login.schema";
import { AuthService } from "./auth.service";
import { ValidationError } from "../../app/errors/CustomErrors";
import { successResponse } from '../../utils/response';
import { Request, Response } from "express";
import { RefreshTokenService } from "../../domain/services/RefreshTokenService";
import { signJwt } from "./jwt";
import { refreshSchema } from "../../app/schemas/refresh.schema";


export class AuthController {
    private readonly isProd = process.env.NODE_ENV === 'production';

    constructor(private readonly authService: AuthService) {}

    async login(req: Request, res: Response, next: Function) {
        try {
            const dto = loginSchema.parse(req.body);
            const { message, token, refreshToken } = await this.authService.login(dto);
            // Seteamos refresh token en cookie HttpOnly
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: this.isProd ? 'none' : 'lax',
                secure: this.isProd,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
            });
            return successResponse(res, "LOGIN_OK", message, { token });
        } catch (error) {
            next(new ValidationError("Credenciales inválidas"));
        }
    }

    async refresh(req: Request, res: Response, next: Function) {
        try {
            // Primero intentamos leer de cookie; fallback al body para compatibilidad
            const tokenFromCookie = req.cookies?.refreshToken;
            const { refreshToken: tokenFromBody } = req.body || {};
            const { refreshToken } = refreshSchema.parse({ refreshToken: tokenFromCookie || tokenFromBody });
            const refreshService = new RefreshTokenService();
            const storedToken = await refreshService.findByToken(refreshToken);
            if (!storedToken || storedToken.expiresAt < new Date()) {
                return res.status(401).json({ message: "Refresh token inválido o expirado" });
            }
            const admin = storedToken.admin;
            // Generar nuevo access token
            const newAccessToken = signJwt({ id: admin.id, email: admin.email });
            return successResponse(res, "REFRESH_OK", "Token de acceso renovado", { accessToken: newAccessToken });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: Function) {
        try {
            const tokenFromCookie = req.cookies?.refreshToken;
            const { refreshToken: tokenFromBody } = req.body || {};
            const { refreshToken } = refreshSchema.parse({ refreshToken: tokenFromCookie || tokenFromBody });
            const refreshService = new RefreshTokenService();
            await refreshService.deleteByToken(refreshToken);
            // Limpiamos cookie
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: this.isProd ? 'none' : 'lax',
                secure: this.isProd
            });
            return successResponse(res, "LOGOUT_OK", "Logout exitoso", null);
        } catch (error) {
            next(error);
        }
    }
}
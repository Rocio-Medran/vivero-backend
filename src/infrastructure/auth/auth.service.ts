import { AppDataSource } from "../../config/data-source";
import bcrypt from "bcryptjs";
import { Admin } from "../../domain/entities/Admin";
import { signJwt } from "./jwt";
import { randomBytes } from "crypto";
import { RefreshTokenService } from "../../domain/services/RefreshTokenService";
import { LoginDTO } from "../../app/schemas/login.schema";


export class AuthService {
    private adminRepo = AppDataSource.getRepository(Admin);

    async login(dto: LoginDTO): Promise<{ message: string; token: string; refreshToken: string }> {
        const existeAdmin = await this.adminRepo.findOne({ where: { email: dto.email } });
        if (!existeAdmin) {
            console.log('No se encontró el admin con ese email');
            throw new Error('Credenciales inválidas');
        }

        const esValido = await bcrypt.compare(dto.password, existeAdmin.passwordHash);
        if (!esValido) {
            throw new Error('Credenciales inválidas');
        }

        // Access token (2h)
        const token = signJwt({ id: existeAdmin.id, email: existeAdmin.email });

        // Refresh token (7 días)
        const refreshToken = randomBytes(32).toString('hex');
        const expiraEn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
        const refreshService = new RefreshTokenService();
        await refreshService.create(existeAdmin, refreshToken, expiraEn);

        return { message: 'Login exitoso', token, refreshToken };
    }
}
import { AppDataSource } from "../../config/data-source";
import bcrypt from "bcryptjs";
import { Admin } from "../../domain/entities/Admin";
import { signJwt } from "./jwt";
import { randomBytes } from "crypto";
import { RefreshTokenService } from "../../domain/services/RefreshTokenService";
import { LoginDTO } from "../../app/schemas/login.schema";
import { PasswordResetToken } from "../../domain/entities/PasswordResetToken";
import { mailer } from "../../utils/mailer";


export class AuthService {
    private adminRepo = AppDataSource.getRepository(Admin);
    private resetRepo = AppDataSource.getRepository(PasswordResetToken);

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

    async forgotPassword(email: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) return;

    const token = randomBytes(40).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

    const reset = this.resetRepo.create({ token, admin, expiresAt });
    await this.resetRepo.save(reset);

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await mailer.sendMail({
      to: admin.email,
      subject: "Restablecer contraseña",
      html: `
        <h2>Restablecer contraseña</h2>
        <p>Hacé clic en el siguiente enlace:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `
    });
  }

  async resetPassword(token: string, password: string) {
    const reset = await this.resetRepo.findOne({
      where: { token },
      relations: ["admin"]
    });

    if (!reset) throw new Error("Token inválido");
    if (reset.expiresAt < new Date()) throw new Error("Token expirado");

    const admin = reset.admin;

    admin.passwordHash = await bcrypt.hash(password, 10);
    await this.adminRepo.save(admin);

    await this.resetRepo.remove(reset);
  }
}
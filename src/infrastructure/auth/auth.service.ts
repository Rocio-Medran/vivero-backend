import { AppDataSource } from "../../config/data-source";
import bcrypt from "bcryptjs";
import { Admin } from "../../domain/entities/Admin";
import { signJwt } from "./jwt";
import { LoginDTO } from "../../app/schemas/login.schema";


export class AuthService {
    private adminRepo = AppDataSource.getRepository(Admin);

    async login(dto: LoginDTO): Promise<{ message: string; token: string }> {
        const existeAdmin = await this.adminRepo.findOne({ where: { email: dto.email } });
        if (!existeAdmin) {
            console.log('No se encontró el admin con ese email');
            throw new Error('Credenciales inválidas');
        }

        const esValido = await bcrypt.compare(dto.password, existeAdmin.passwordHash);
        
        if (!esValido) {
            throw new Error('Credenciales inválidas');
        }

        const token = signJwt({ id: existeAdmin.id, email: existeAdmin.email });

        return { message: 'Login exitoso', token };
    }
}
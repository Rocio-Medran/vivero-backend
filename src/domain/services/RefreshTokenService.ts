import { RefreshToken } from "../entities/RefreshToken";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { Admin } from "../entities/Admin";

export class RefreshTokenService {
    private repo = new RefreshTokenRepository();

    async create(admin: Admin, token: string, expiresAt: Date): Promise<RefreshToken> {
        const refresh = new RefreshToken();
        refresh.token = token;
        refresh.expiresAt = expiresAt;
        refresh.admin = admin;
        return await this.repo.add(refresh);
    }

    async findByToken(token: string): Promise<RefreshToken | null> {
        return await this.repo.findByToken(token);
    }

    async deleteByToken(token: string): Promise<void> {
        await this.repo.deleteByToken(token);
    }
}

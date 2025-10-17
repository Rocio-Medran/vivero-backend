import { RefreshToken } from "../entities/RefreshToken";
import { BaseRepository } from "./BaseRepository";

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
    constructor() { super(RefreshToken); }

    async findByToken(token: string): Promise<RefreshToken | null> {
        // siempre cargar la entidad admin relacionada
        return this.findOneBy({ token }, ["admin"]);
    }

    // Eliminar un token de refresh por su valor
    async deleteByToken(token: string): Promise<void> {
        const refresh = await this.findByToken(token);
        if (refresh) await this.delete(refresh);
    }
}

import { verifyJwt } from "./jwt";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            admin?: JwtPayload;
        }
    }
}


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    const payload = verifyJwt(token);

    if (!payload) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    req.admin = payload;
    next();
}
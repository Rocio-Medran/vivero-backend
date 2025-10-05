// src/utils/response.ts
import { Response } from "express";

export function successResponse(res: Response, code: string, message: string, data?: any) {
    return res.json({
        success: true,
        code,
        message,
        data,
    });
}

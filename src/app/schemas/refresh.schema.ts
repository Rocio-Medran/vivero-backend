import { z } from "zod";

export const refreshSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token requerido"),
});

export type RefreshDTO = z.infer<typeof refreshSchema>;

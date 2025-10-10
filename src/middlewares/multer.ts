// src/middlewares/multer.ts
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB por archivo, máx 5 archivos
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(null, false);
  },
});

// Middleware para manejar el error de límite de archivos
import { Request, Response, NextFunction } from 'express';
export function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
  upload.array('files', 5)(req, res, function (err) {
    if (err && (err.code === 'LIMIT_UNEXPECTED_FILE' || err.code === 'LIMIT_FILE_COUNT')) {
      return res.status(400).json({ message: 'No puedes subir más de 5 imágenes por vez.' });
    }
    if (err) {
      return res.status(400).json({ message: 'Error al subir archivos.', error: err.message });
    }
    next();
  });
}

export { upload };



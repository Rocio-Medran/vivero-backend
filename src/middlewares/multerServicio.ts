import multer from "multer";
import path from "path";
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve(process.cwd(), "uploads/servicios"));
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-\.]/g, '');
    const unique = `${Date.now()}-${safeName}`;
    cb(null, unique);
  },
});


const uploadServicio = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5MB por archivo, máx 5 archivos
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(null, false);
  },
});

// Middleware para manejar el error de límite de archivos
export function uploadServicioMiddleware(req: Request, res: Response, next: NextFunction) {
  uploadServicio.array('files', 5)(req, res, function (err) {
    if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'No puedes subir más de 5 imágenes por vez.' });
    }
    if (err && err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'No puedes subir más de 5 imágenes por vez.' });
    }
    if (err) {
      return res.status(400).json({ message: 'Error al subir archivos.', error: err.message });
    }
    next();
  });
}

export { uploadServicio };

import multer from 'multer';

// Usamos memoryStorage para obtener el buffer y luego subir manualmente a Cloudinary
const memoryStorage = multer.memoryStorage();

export const uploadProductos = multer({ storage: memoryStorage });
export const uploadServicios = multer({ storage: memoryStorage });
import { Router } from 'express';
import { ImagenServicio } from '../../domain/entities/ImagenServicio';
import { ImagenServicioService } from '../../domain/services/ImagenServicioService';
import { ImagenesServicioController } from '../controllers/ImagenesServicioController';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { uploadMiddleware } from '../../middlewares/multer';

const router = Router();
const imagenRepo = new BaseRepository(ImagenServicio);
const imagenService = new ImagenServicioService(imagenRepo);
const imagenCtrl = new ImagenesServicioController(imagenService);

// GET /servicios/:servicioId/imagenes
router.get('/servicios/:servicioId/imagenes', imagenCtrl.getByServicioId);
// POST /servicios/:servicioId/imagenes/multiples (varias imágenes)
router.post('/servicios/:servicioId/imagenes/multiples', uploadMiddleware, imagenCtrl.createMany);
// DELETE /imagenes-servicio/:id
router.delete('/imagenes-servicio/:id', imagenCtrl.remove);

export default router;

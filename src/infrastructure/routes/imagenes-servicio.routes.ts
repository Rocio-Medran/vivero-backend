import { Router } from 'express';
import { ImagenServicio } from '../../domain/entities/ImagenServicio';
import { ImagenServicioService } from '../../domain/services/ImagenServicioService';
import { ImagenesServicioController } from '../controllers/ImagenesServicioController';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { uploadMiddleware } from '../../middlewares/multer';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const imagenRepo = new BaseRepository(ImagenServicio);
const imagenService = new ImagenServicioService(imagenRepo);
const imagenCtrl = new ImagenesServicioController(imagenService);

// GET /servicios/:servicioId/imagenes
router.get('/servicios/:servicioId/imagenes', imagenCtrl.getByServicioId);
// PUT /servicios/:servicioId/imagenes/orden
router.put('/servicios/:servicioId/imagenes/orden', authMiddleware, imagenCtrl.updateOrden);
// POST /servicios/:servicioId/imagenes/multiples (varias imágenes)
router.post('/servicios/:servicioId/imagenes/multiples', authMiddleware, uploadMiddleware, imagenCtrl.createMany);
// DELETE /imagenes-servicio/:id
router.delete('/imagenes-servicio/:id', authMiddleware, imagenCtrl.remove);
// PUT /imagenes-servicio/:id
router.put('/imagenes-servicio/:id', authMiddleware, imagenCtrl.update);

export default router;

import { Router } from 'express';
import { ImagenProductoService } from '../../domain/services/ImagenProductoService';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { ImagenProducto } from '../../domain/entities/ImagenProducto';
import { ImagenesProductoController } from '../controllers/ImagenesProductoController';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const imagenRepo = new BaseRepository(ImagenProducto);
const imagenService = new ImagenProductoService(imagenRepo);
const imagenCtrl = new ImagenesProductoController(imagenService);

// DELETE /imagenes/:id
router.delete('/:id', authMiddleware, imagenCtrl.remove);
// PUT /imagenes/:id
router.put('/:id', authMiddleware, imagenCtrl.update);

export default router;
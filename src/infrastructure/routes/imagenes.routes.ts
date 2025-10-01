import { Router } from 'express';
import { ImagenProductoService } from '../../domain/services/ImagenProductoService';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { ImagenProducto } from '../../domain/entities/ImagenProducto';
import { ImagenesProductoController } from '../controllers/ImagenesProductoController';

const router = Router();
const imagenRepo = new BaseRepository(ImagenProducto);
const imagenService = new ImagenProductoService(imagenRepo);
const imagenCtrl = new ImagenesProductoController(imagenService);

// DELETE /imagenes/:id
router.delete('/:id', imagenCtrl.remove);

export default router;
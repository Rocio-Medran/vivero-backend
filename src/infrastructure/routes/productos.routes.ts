import { Router } from 'express';
import { ProductosController } from '../controllers/ProductosController';
import { ProductoService } from '../../domain/services/ProductoService';
import { ProductoRepository } from '../../domain/repositories/ProductoRepository';
import { ImagenProductoService } from '../../domain/services/ImagenProductoService';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { ImagenProducto } from '../../domain/entities/ImagenProducto';
import { ImagenesProductoController } from '../controllers/ImagenesProductoController';
import { uploadMiddleware } from '../../middlewares/multer';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const repo = new ProductoRepository();

const imagenRepo = new BaseRepository(ImagenProducto);
const imagenService = new ImagenProductoService(imagenRepo);
const imagenCtrl = new ImagenesProductoController(imagenService);

const service = new ProductoService(repo, imagenService);
const ctrl = new ProductosController(service);

const { getById, create, updateCompleto, update, remove } = ctrl;

// Rutas de imágenes de producto
router.get('/:productoId/imagenes', imagenCtrl.getByProductoId);
router.post('/:productoId/imagenes/multiples', authMiddleware, uploadMiddleware, imagenCtrl.createMany);
router.put('/:productoId/imagenes/orden', authMiddleware, imagenCtrl.updateOrden);

router.get('/detalles', ctrl.getAllDetalles);
router.get('/detalles/:id', ctrl.getDetallesById);
router.get('/completos/:id', ctrl.getCompletoById);
router.get('/completos', ctrl.getCompletos);

router.get('/', (req, res, next) => {
	if (req.query.categoria) {
		return ctrl.getByCategoria(req, res, next);
	}
	return ctrl.getAll(req, res, next);
});

router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, updateCompleto);
router.delete('/:id', authMiddleware, remove);
router.patch('/:id', authMiddleware, update);

export default router;
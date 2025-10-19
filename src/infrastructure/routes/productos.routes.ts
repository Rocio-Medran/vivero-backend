import { Router } from 'express';
import { ProductosController } from '../controllers/ProductosController';
import { ProductoService } from '../../domain/services/ProductoService';
import { ProductoRepository } from '../../domain/repositories/ProductoRepository';
import { ImagenProductoService } from '../../domain/services/ImagenProductoService';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { ImagenProducto } from '../../domain/entities/ImagenProducto';
import { ImagenesProductoController } from '../controllers/ImagenesProductoController';
import { uploadMiddleware } from '../../middlewares/multer';

const router = Router();
const repo = new ProductoRepository();
const service = new ProductoService(repo);
const ctrl = new ProductosController(service);


const imagenRepo = new BaseRepository(ImagenProducto);
const imagenService = new ImagenProductoService(imagenRepo);
const imagenCtrl = new ImagenesProductoController(imagenService);

const { getById, create, updateCompleto, update, remove } = ctrl;

// Rutas de imágenes de producto
router.get('/:productoId/imagenes', imagenCtrl.getByProductoId);
router.post('/:productoId/imagenes/multiples', uploadMiddleware, imagenCtrl.createMany);

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
router.post('/', create);
router.put('/:id', updateCompleto);
router.delete('/:id', remove);
router.patch('/:id', update);

export default router;
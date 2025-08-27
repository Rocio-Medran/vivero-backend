import { Router } from 'express';
import { ProductoController } from '../controllers/ProductosController';
import { ProductoService } from '../../domain/services/ProductoService';
import { ProductoRepository } from '../../domain/repositories/ProductoRepository';

const router = Router();
const repo = new ProductoRepository();
const service = new ProductoService(repo);
const ctrl = new ProductoController(service);

const { getAll, getById, create, update, remove} = ctrl;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
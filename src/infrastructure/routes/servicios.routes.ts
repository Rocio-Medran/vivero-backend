import { Router } from 'express';
import { ServiciosController } from '../controllers/ServiciosController';
import { ServicioService } from '../../domain/services/ServicioService';
import { ServicioRepository } from '../../domain/repositories/ServicioRepository';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const repo = new ServicioRepository();
const service = new ServicioService(repo);
const ctrl = new ServiciosController(service);

const { getAll, getById, create, update, remove } = ctrl;

router.get('/detalles', ctrl.getAllDetalles);
router.get('/detalles/:id', ctrl.getDetallesById);
router.get('/completos', ctrl.getAllCompletos);
router.get('/completos/:id', ctrl.getCompletoById);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.patch('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
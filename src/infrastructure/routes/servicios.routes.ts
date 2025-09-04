import { Router } from 'express';
import { ServiciosController } from '../controllers/ServiciosController';
import { ServicioService } from '../../domain/services/ServicioService';
import { ServicioRepository } from '../../domain/repositories/ServicioRepository';

const router = Router();
const repo = new ServicioRepository();
const service = new ServicioService(repo);
const ctrl = new ServiciosController(service);

const { getAll, getById, create, update, remove } = ctrl;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

export default router;
import { Router } from 'express';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { Encargado } from '../../domain/entities/Encargado';
import { EncargadoService } from '../../domain/services/EncargadoService';
import { EncargadoController } from '../controllers/EncargadoController';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const repo = new BaseRepository(Encargado);
const service = new EncargadoService(repo);
const ctrl = new EncargadoController(service);

router.get('/:id', ctrl.getById);
router.put('/:id', authMiddleware, ctrl.update);

export default router;

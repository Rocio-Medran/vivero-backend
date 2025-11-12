import { Router } from 'express';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { SobreNosotros } from '../../domain/entities/SobreNosotros';
import { SobreNosotrosController } from '../controllers/SobreNosotrosController';
import { SobreNosotrosService } from '../../domain/services/SobreNosotrosService';
import { authMiddleware } from '../auth/auth.middleware';

const router = Router();
const repo = new BaseRepository(SobreNosotros);
const service = new SobreNosotrosService(repo);
const ctrl = new SobreNosotrosController(service);

router.get('/:id', ctrl.getDetalles);
router.put('/:id', authMiddleware, ctrl.update);

export default router;
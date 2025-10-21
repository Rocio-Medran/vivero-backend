import { Router } from 'express';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { SobreNosotros } from '../../domain/entities/SobreNosotros';
import { SobreNosotrosController } from '../controllers/SobreNosotrosController';
import { SobreNosotrosService } from '../../domain/services/SobreNosotrosService';

const router = Router();
const repo = new BaseRepository(SobreNosotros);
const service = new SobreNosotrosService(repo);
const ctrl = new SobreNosotrosController(service);

router.get('/:id', ctrl.getDetalles);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);

export default router;
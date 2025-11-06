import { Router } from 'express';
import { BaseRepository } from '../../domain/repositories/BaseRepository';
import { Contacto } from '../../domain/entities/Contacto';
import { ContactoService } from '../../domain/services/ContactoService';
import { ContactoController } from '../controllers/ContactoController';

const router = Router();
const repo = new BaseRepository(Contacto);
const service = new ContactoService(repo);
const ctrl = new ContactoController(service);

router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);

export default router;

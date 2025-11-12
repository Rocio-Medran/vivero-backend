import { Router } from "express";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { Temporada } from "../../domain/entities/Temporada";
import { TemporadaService } from "../../domain/services/TemporadaService";
import { TemporadasController } from "../controllers/TemporadasController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const repo = new BaseRepository(Temporada);
const service = new TemporadaService(repo);
const ctrl = new TemporadasController(service);

const { getAll, getById, create, update, remove } = ctrl;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
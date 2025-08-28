import { Router } from "express";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { Temporada } from "../../domain/entities/Temporada";
import { TemporadaService } from "../../domain/services/TemporadaService";
import { TemporadasController } from "../controllers/TemporadasController";

const router = Router();
const repo = new BaseRepository(Temporada);
const service = new TemporadaService(repo);
const ctrl = new TemporadasController(service);

const { getAll, getById, create, update, remove } = ctrl;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
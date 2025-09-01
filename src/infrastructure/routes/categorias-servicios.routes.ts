import { Router } from "express";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { CategoriaServicio } from "../../domain/entities/CategoriaServicio";
import { CategoriaService } from "../../domain/services/CategoriaService";
import { CategoriasController } from "../controllers/CategoriasController";

const router = Router();
const repo = new BaseRepository(CategoriaServicio);
const service = new CategoriaService(repo);
const ctrl = new CategoriasController(service);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
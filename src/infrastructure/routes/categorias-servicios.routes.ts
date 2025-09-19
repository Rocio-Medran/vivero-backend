import { Router } from "express";
import { CategoriaServicioService } from "../../domain/services/CategoriaServicioService";
import { CategoriaServicioRepository } from "../../domain/repositories/CategoriaServicioRepository";
import { CategoriaServiciosController } from "../controllers/CategoriaServiciosController";

const router = Router();
const repo = new CategoriaServicioRepository();
const service = new CategoriaServicioService(repo);
const ctrl = new CategoriaServiciosController(service);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
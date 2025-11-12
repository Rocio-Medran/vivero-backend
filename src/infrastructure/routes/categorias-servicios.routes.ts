import { Router } from "express";
import { CategoriaServicioService } from "../../domain/services/CategoriaServicioService";
import { CategoriaServicioRepository } from "../../domain/repositories/CategoriaServicioRepository";
import { CategoriaServiciosController } from "../controllers/CategoriaServiciosController";
import { authMiddleware } from "../auth/auth.middleware";

const router = Router();
const repo = new CategoriaServicioRepository();
const service = new CategoriaServicioService(repo);
const ctrl = new CategoriaServiciosController(service);

router.get('/', ctrl.getAll);
router.get('/con-servicios', ctrl.getAllConServicios);
router.get('/con-servicios/:id', ctrl.getConServiciosById);
router.get('/:id', ctrl.getById);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
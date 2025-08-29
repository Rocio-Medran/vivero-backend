import { Router } from "express";
import { BaseRepository } from "../../domain/repositories/BaseRepository";
import { Categoria } from "../../domain/entities/Categoria";
import { CategoriaService } from "../../domain/services/CategoriaService";
import { CategoriasController } from "../controllers/CategoriasController";

const router = Router();
const repo = new BaseRepository(Categoria);
const service = new CategoriaService(repo);
const ctrl = new CategoriasController(service);

const { getAll, getById, create, update, remove } = ctrl;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
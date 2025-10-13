import { Router } from "express";
import { CategoriaService } from "../../domain/services/CategoriaService";
import { CategoriasController } from "../controllers/CategoriasController";
import { CategoriaRepository } from "../../domain/repositories/CategoriaRepository";

const router = Router();
const repo = new CategoriaRepository();
const service = new CategoriaService(repo);
const ctrl = new CategoriasController(service);

const { getAll, getById, create, update, remove, getAllConProductos, getConProductosById } = ctrl;

router.get('/productos', getAllConProductos);
router.get('/subcategorias', ctrl.getAllSubcategorias);
router.get('/tipo/:tipo', ctrl.getCategoriasByTipo);
router.get('/nombre/:nombre', ctrl.getCategoriaByNombre);
router.get('/:id/productos', getConProductosById);
router.get('/:id/subcategorias', ctrl.getSubcategorias);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
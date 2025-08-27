import { Router } from "express";
import productos from './productos.routes';
import categorias from './categorias.routes';

const router = Router();

router.use('/productos', productos);
router.use('/categorias', categorias);

export default router;
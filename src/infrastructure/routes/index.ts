import { Router } from "express";
import productos from './productos.routes';
import categorias from './categorias.routes';
import temporadas from './temporadas.routes';

const router = Router();

router.use('/productos', productos);
router.use('/categorias', categorias);
router.use('/temporadas', temporadas);

export default router;
import { Router } from "express";
import productos from './productos.routes';
import categorias from './categorias.routes';
import servicios from './servicios.routers';

const router = Router();

router.use('/productos', productos);
router.use('/categorias', categorias);
router.use('/servicios',servicios);

export default router;
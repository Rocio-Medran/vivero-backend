import { Router } from "express";
import productos from './productos.routes';
import categorias from './categorias.routes';
import temporadas from './temporadas.routes';
import servicios from './servicios.routes';
import categoriasServicios from './categorias-servicios.routes';

const router = Router();

router.use('/productos', productos);
router.use('/categorias', categorias);
router.use('/temporadas', temporadas);
router.use('/servicios', servicios);
router.use('/categorias-servicios', categoriasServicios);

export default router;
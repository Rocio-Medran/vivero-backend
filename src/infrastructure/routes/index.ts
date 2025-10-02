import { Router } from "express";

import productos from './productos.routes';
import categorias from './categorias.routes';
import temporadas from './temporadas.routes';
import servicios from './servicios.routes';
import categoriasServicios from './categorias-servicios.routes';
import imagenes from './imagenes.routes';
import imagenesServicio from './imagenes-servicio.routes';

const router = Router();


router.use('/productos', productos);
router.use('/categorias', categorias);
router.use('/temporadas', temporadas);
router.use('/servicios', servicios);
router.use('/categorias-servicios', categoriasServicios);
router.use('/imagenes', imagenes);
router.use('/', imagenesServicio);

export default router;
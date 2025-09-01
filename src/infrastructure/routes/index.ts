import { Router } from "express";
import productos from './productos.routes';
import categorias from './categorias.routes';
<<<<<<< HEAD
import temporadas from './temporadas.routes';
=======
import servicios from './servicios.routers';
>>>>>>> 47f245cadefe9740fac1ca7cc9bdcaeab5141a91

const router = Router();

router.use('/productos', productos);
router.use('/categorias', categorias);
<<<<<<< HEAD
router.use('/temporadas', temporadas);
=======
router.use('/servicios',servicios);
>>>>>>> 47f245cadefe9740fac1ca7cc9bdcaeab5141a91

export default router;
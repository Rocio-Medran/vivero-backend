import { Router } from "express";
import productos from './productos.routes';

const router = Router();

router.use('/productos', productos);


export default router;
import { Router } from 'express';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';


const router = Router();
const service = new AuthService();
const ctrl = new AuthController(service);

// POST /admin/login
router.post('/login', ctrl.login.bind(ctrl));

export default router;
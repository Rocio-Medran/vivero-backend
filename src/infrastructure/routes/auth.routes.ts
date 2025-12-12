import { Router } from "express";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";

const router = Router();
const authController = new AuthController(new AuthService());

router.post("/login", (req, res, next) => authController.login(req, res, next));
router.post("/refresh", (req, res, next) => authController.refresh(req, res, next));
router.post("/logout", (req, res, next) => authController.logout(req, res, next));
router.post("/forgot-password", (req, res, next) => authController.forgotPassword(req, res, next));
router.post("/reset-password", (req, res, next) => authController.resetPassword(req, res, next));

export default router;

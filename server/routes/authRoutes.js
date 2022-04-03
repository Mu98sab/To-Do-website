import { Router } from "express";
import { registerController, loginController, logoutController, isAuthenticatedController } from "../controller/authController.js";

const router = Router();

// Auth REST routes
router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/is-authenticated", isAuthenticatedController);

export default router;
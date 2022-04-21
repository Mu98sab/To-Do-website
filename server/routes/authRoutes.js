import { Router } from "express";
import { registerController, loginController, logoutController, isAuthenticatedController } from "../controller/authController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = Router();

// Auth REST routes
router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", checkAuth, logoutController);

// add the middleware check auth to check whether the user is auth or not
router.get("/is-authenticated", checkAuth, isAuthenticatedController);

export default router;
import { Router } from "express";
import { registerController, loginController, logoutController, isAuthenticatedController, deleteTestUser } from "../controller/authController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = Router();

// Auth REST routes
router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", checkAuth, logoutController);

// add the middleware check auth to check whether the user is auth or not
router.get("/is-authenticated", checkAuth, isAuthenticatedController);

// delete the user only the test email can be deleted
router.delete( "/user", checkAuth, deleteTestUser );

export default router;
import { Router } from "express";
import { UserController } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", UserController.login);
router.post("/logout", authMiddleware, UserController.logout);
router.post("/register", UserController.register);
router.patch("/account", UserController.account);
router.patch("/password", UserController.changePassword);

export default router;
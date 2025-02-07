import { Router } from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, UserController.getAllUsers);
router.post("/", authMiddleware, UserController.createUser);
router.post("/login", UserController.login);

export default router;
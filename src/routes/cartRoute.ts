import { Router } from "express";
import { CartController } from "../controllers/cartController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/:id", CartController.getCart);
router.post("/", authMiddleware, CartController.insertCart);
router.delete("/", authMiddleware, CartController.removeCart);
router.delete("/remove", authMiddleware, CartController.removeAllCart);

export default router;
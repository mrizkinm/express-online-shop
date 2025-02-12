import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, OrderController.createOrder);
router.get("/:id", authMiddleware, OrderController.getOrder);
router.post("/callback", authMiddleware, OrderController.orderCallback);
router.post("/snap", authMiddleware, OrderController.orderSnap);
router.post("/status", authMiddleware, OrderController.orderStatus);

export default router;
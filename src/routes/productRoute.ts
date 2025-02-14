import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();

router.get("/", ProductController.getProduct);
router.get("/search", ProductController.searchProduct);
router.get("/:id", ProductController.getDetailProduct);

export default router;
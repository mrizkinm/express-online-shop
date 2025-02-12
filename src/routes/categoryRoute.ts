import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router();

router.get("/", CategoryController.getCategory);

export default router;
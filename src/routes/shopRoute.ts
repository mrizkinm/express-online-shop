import { Router } from "express";
import { ShopController } from "../controllers/shopController";

const router = Router();

router.get("/", ShopController.getData);
export default router;
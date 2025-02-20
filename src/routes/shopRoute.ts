import { Router } from "express";
import { ShopController } from "../controllers/shopController";

const router = Router();

/**
 * @swagger
 * /api/shop:
 *   get:
 *     summary: Get shop information
 *     description: Get shop data information
 *     tags:
 *       - Shop
 *     responses:
 *       200:
 *         description: Shop information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "example shop"
 *                 address:
 *                   type: string
 *                   example: "example address"
 *                 phone:
 *                   type: string
 *                   example: "example phone"
 *                 email:
 *                   type: string
 *                   example: "example email"
 *                 description:
 *                   type: string
 *                   example: "example description"
 *                 image:
 *                   type: string
 *                   example: "http://test.io/test.png"
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Unauthorized: Invalid token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Something went wrong"
 */
router.get("/", ShopController.getData);
export default router;
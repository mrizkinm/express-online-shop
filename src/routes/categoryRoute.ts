import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router();

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: "Get categories with products"
 *     description: "Fetch a list of categories with products, limited by a query parameter"
 *     tags:
 *       - Category
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: "Limit the number of categories to return"
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: "A list of categories with their products"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 18
 *                   name:
 *                     type: string
 *                     example: "Perfect Grade (PG)"
 *                   image:
 *                     type: string
 *                     example: "https://picsum.photos/seed/7L0oT/821/363"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-11T10:01:48.963Z"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 71
 *                         categoryId:
 *                           type: integer
 *                           example: 18
 *                         name:
 *                           type: string
 *                           example: "PG Unicorn Gundam"
 *                         price:
 *                           type: integer
 *                           example: 2880497
 *                         isFeatured:
 *                           type: boolean
 *                           example: true
 *                         isArchived:
 *                           type: boolean
 *                           example: false
 *                         description:
 *                           type: string
 *                           example: "Model kit dari PG Unicorn Gundam, sangat detail dan kolektibel."
 *                         quantity:
 *                           type: integer
 *                           example: 10
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-02-11T10:01:49.099Z"
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
router.get("/", CategoryController.getCategory);

export default router;
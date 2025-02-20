import { Router } from "express";
import { ProductController } from "../controllers/productController";

const router = Router();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: "Get list of products"
 *     description: "Fetches a list of products with their details"
 *     tags:
 *       - Product
 *     parameters:
 *       - name: page
 *         in: query
 *         description: "Page number"
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: "Limit the number of products returned"
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *       - name: search
 *         in: query
 *         description: "Search for products by name"
 *         required: false
 *         schema:
 *           type: string
 *           example: "gundam"
 *       - name: categoryId
 *         in: query
 *         description: "Filter by category ID"
 *         required: false
 *         schema:
 *           type: integer
 *           example: 21
 *       - name: isFeatured
 *         in: query
 *         description: "Filter by featured status"
 *         required: false
 *         schema:
 *           type: boolean
 *           example: false
 *     responses:
 *       200:
 *         description: "A list of products"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 time:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-02-18T07:37:54.010Z'
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 76
 *                       categoryId:
 *                         type: integer
 *                         example: 21
 *                       name:
 *                         type: string
 *                         example: "RG Destiny Gundam"
 *                       price:
 *                         type: integer
 *                         example: 2784718
 *                       isFeatured:
 *                         type: boolean
 *                         example: false
 *                       isArchived:
 *                         type: boolean
 *                         example: false
 *                       description:
 *                         type: string
 *                         example: "Model kit dari RG Destiny Gundam, sangat detail dan kolektibel."
 *                       quantity:
 *                         type: integer
 *                         example: 45
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T10:01:49.112Z"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 52
 *                             productId:
 *                               type: integer
 *                               example: 76
 *                             url:
 *                               type: string
 *                               example: "https://picsum.photos/seed/8O2B8YGM2/640/480?blur=9"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-02-11T10:01:49.113Z"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 21
 *                           name:
 *                             type: string
 *                             example: "Real Grade (RG)"
 *                           image:
 *                             type: string
 *                             example: "https://loremflickr.com/354/2316?lock=5573494559329634"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-11T10:01:48.963Z"
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 offset:
 *                   type: integer
 *                   example: 0
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
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
router.get("/", ProductController.getProduct);

/**
 * @swagger
 * /api/product/search:
 *   get:
 *     summary: "Search for products"
 *     description: "Search for products by name"
 *     tags:
 *       - Product
 *     parameters:
 *       - name: query
 *         in: query
 *         description: "Search query for product names"
 *         required: true
 *         schema:
 *           type: string
 *           example: "Gundam"
 *     responses:
 *       200:
 *         description: "A list of products matching the search"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 80
 *                       categoryId:
 *                         type: integer
 *                         example: 21
 *                       name:
 *                         type: string
 *                         example: "RG God Gundam"
 *                       price:
 *                         type: integer
 *                         example: 3150532
 *                       isFeatured:
 *                         type: boolean
 *                         example: false
 *                       isArchived:
 *                         type: boolean
 *                         example: false
 *                       description:
 *                         type: string
 *                         example: "Model kit dari RG God Gundam, sangat detail dan kolektibel."
 *                       quantity:
 *                         type: integer
 *                         example: 7
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T10:01:49.122Z"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 67
 *                             productId:
 *                               type: integer
 *                               example: 80
 *                             url:
 *                               type: string
 *                               example: "https://picsum.photos/seed/alaIiO/640/480?grayscale&blur=6"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-02-11T10:01:49.124Z"
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 21
 *                           name:
 *                             type: string
 *                             example: "Real Grade (RG)"
 *                           image:
 *                             type: string
 *                             example: "https://loremflickr.com/354/2316?lock=5573494559329634"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-11T10:01:48.963Z"
 *       400:
 *         description: "Query cannot be empty"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Query cannot be empty"
 *       401:
 *         description: "Invalid token"
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
router.get("/search", ProductController.searchProduct);

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     summary: "Get product by ID"
 *     description: "Fetch a single product's details by its ID"
 *     tags:
 *       - Product
 *     parameters:
 *       - name: productId
 *         in: path
 *         description: "ID of the product to fetch"
 *         required: true
 *         schema:
 *           type: integer
 *           example: 80
 *     responses:
 *       200:
 *         description: "The product details"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 80
 *                 categoryId:
 *                   type: integer
 *                   example: 21
 *                 name:
 *                   type: string
 *                   example: "RG God Gundam"
 *                 price:
 *                   type: integer
 *                   example: 3150532
 *                 isFeatured:
 *                   type: boolean
 *                   example: false
 *                 isArchived:
 *                   type: boolean
 *                   example: false
 *                 description:
 *                   type: string
 *                   example: "Model kit dari RG God Gundam, sangat detail dan kolektibel."
 *                 quantity:
 *                   type: integer
 *                   example: 7
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-11T10:01:49.122Z"
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 67
 *                       productId:
 *                         type: integer
 *                         example: 80
 *                       url:
 *                         type: string
 *                         example: "https://picsum.photos/seed/alaIiO/640/480?grayscale&blur=6"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T10:01:49.124Z"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 21
 *                     name:
 *                       type: string
 *                       example: "Real Grade (RG)"
 *                     image:
 *                       type: string
 *                       example: "https://loremflickr.com/354/2316?lock=5573494559329634"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-11T10:01:48.963Z"
 *       400:
 *         description: "Id cannot be empty"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Invalid input"
 *       401:
 *         description: "Invalid token"
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
router.get("/:id", ProductController.getDetailProduct);

export default router;
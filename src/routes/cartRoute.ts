import { Router } from "express";
import { CartController } from "../controllers/cartController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/cart/{customerId}:
 *   get:
 *     summary: "Get customer cart"
 *     description: "Retrieve the shopping cart items for a specific customer"
 *     tags:
 *       - Cart
 *     parameters:
 *       - name: customerId
 *         in: path
 *         description: "Customer ID"
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: "List of items in the customer's cart"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   customerId:
 *                     type: integer
 *                     example: 2
 *                   productId:
 *                     type: integer
 *                     example: 84
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-17T08:49:01.366Z"
 *                   product:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 84
 *                       categoryId:
 *                         type: integer
 *                         example: 22
 *                       name:
 *                         type: string
 *                         example: "SD Barbatos Lupus Rex"
 *                       price:
 *                         type: integer
 *                         example: 1775900
 *                       isFeatured:
 *                         type: boolean
 *                         example: false
 *                       isArchived:
 *                         type: boolean
 *                         example: false
 *                       description:
 *                         type: string
 *                         example: "Model kit dari SD Barbatos Lupus Rex, sangat detail dan kolektibel."
 *                       quantity:
 *                         type: integer
 *                         example: 14
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-11T10:01:49.138Z"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 85
 *                             productId:
 *                               type: integer
 *                               example: 84
 *                             url:
 *                               type: string
 *                               example: "https://picsum.photos/seed/Xr9iMTih/640/480?blur=5"
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-02-11T10:01:49.139Z"
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
router.get("/:id", CartController.getCustomerCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: "Insert item to cart"
 *     description: "Add a product to the customer's shopping cart"
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *                 example: 2
 *               productId:
 *                 type: integer
 *                 example: 84
 *               quantity:
 *                 type: integer
 *                 example: 1
 *     responses:
  *       200:
 *         description: "Product successfully added to cart"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 customerId:
 *                   type: integer
 *                   example: 2
 *                 productId:
 *                   type: integer
 *                   example: 84
 *                 quantity:
 *                   type: integer
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-17T08:49:01.366Z"
 *       400:
 *         description: "Invalid request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Invalid input"
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
router.post("/", authMiddleware, CartController.insertCart);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Remove an item from the cart
 *     description: Deletes a cart item based on `customerId` and `productId`.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - productId
 *             properties:
 *               customerId:
 *                 type: integer
 *                 example: 2
 *               productId:
 *                 type: integer
 *                 example: 80
 *     responses:
 *       200:
 *         description: Item successfully removed from the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item removed from cart"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Invalid input"
 *       404:
 *         description: Item not found in the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Item not found in cart"
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
router.delete("/", authMiddleware, CartController.removeCart);

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Remove all item from the cart
 *     description: Deletes all cart item based on `customerId`.
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - productId
 *             properties:
 *               customerId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item successfully removed from the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item removed from cart"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Invalid input"
 *       404:
 *         description: Item not found in the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Item not found in cart"
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
router.delete("/remove", authMiddleware, CartController.removeAllCart);

export default router;
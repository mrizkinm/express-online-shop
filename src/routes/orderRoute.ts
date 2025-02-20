import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: "Create a new order"
 *     description: "Creates a new order with the specified customer details and items."
 *     tags:
 *       - Order
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
 *               - items
 *               - totalAmount
 *               - info
 *             properties:
 *               customerId:
 *                 type: integer
 *                 example: 2
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - price
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 81
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: integer
 *                       example: 2608927
 *               totalAmount:
 *                 type: integer
 *                 example: 9929861
 *               info:
 *                 type: object
 *                 required:
 *                   - name
 *                   - email
 *                   - address
 *                   - phone
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Paula Bartoletti-Stroman"
 *                   email:
 *                     type: string
 *                     example: "Sallie.Nolan@yahoo.com"
 *                   address:
 *                     type: string
 *                     example: "2612 Justina Tunnel"
 *                   phone:
 *                     type: string
 *                     example: "(262) 488-9544 x196"
 *     responses:
 *       200:
 *         description: "Order created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     orderTrxId:
 *                       type: string
 *                       example: "TRX-1739850521194"
 *                     customerId:
 *                       type: integer
 *                       example: 2
 *                     info:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Paula Bartoletti-Stroman"
 *                         email:
 *                           type: string
 *                           example: "Sallie.Nolan@yahoo.com"
 *                         phone:
 *                           type: string
 *                           example: "(262) 488-9544 x196"
 *                         address:
 *                           type: string
 *                           example: "2612 Justina Tunnel"
 *                     totalAmount:
 *                       type: integer
 *                       example: 9929861
 *                     status:
 *                       type: string
 *                       example: "Pending"
 *                     snapToken:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-18T03:48:41.195Z"
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 9
 *                           orderId:
 *                             type: integer
 *                             example: 5
 *                           productId:
 *                             type: integer
 *                             example: 81
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: integer
 *                             example: 2608927
 *       400:
 *         description: Bad request
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
router.post("/", authMiddleware, OrderController.createOrder);

/**
 * @swagger
 * /api/order/{customerId}:
 *   get:
 *     summary: Get orders by customer ID
 *     description: Retrieves all orders associated with a specific customer.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the customer whose orders need to be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
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
 *                         example: 5
 *                       orderTrxId:
 *                         type: string
 *                         example: "TRX-1739850521194"
 *                       customerId:
 *                         type: integer
 *                         example: 2
 *                       info:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Paula Bartoletti-Stroman"
 *                           email:
 *                             type: string
 *                             example: "Sallie.Nolan@yahoo.com"
 *                           phone:
 *                             type: string
 *                             example: "(262) 488-9544 x196"
 *                           address:
 *                             type: string
 *                             example: "2612 Justina Tunnel"
 *                       totalAmount:
 *                         type: integer
 *                         example: 9929861
 *                       status:
 *                         type: string
 *                         example: "Pending"
 *                       snapToken:
 *                         type: string
 *                         example: "51a44af3-095f-424b-a1fd-5291de3559af"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-18T03:48:41.195Z"
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 9
 *                             orderId:
 *                               type: integer
 *                               example: 5
 *                             productId:
 *                               type: integer
 *                               example: 81
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             price:
 *                               type: integer
 *                               example: 2608927
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2025-02-18T03:48:41.195Z"
 *                             product:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 81
 *                                 categoryId:
 *                                   type: integer
 *                                   example: 22
 *                                 name:
 *                                   type: string
 *                                   example: "SD BB Senshi RX-78-2"
 *                                 price:
 *                                   type: integer
 *                                   example: 2608927
 *                                 isFeatured:
 *                                   type: boolean
 *                                   example: true
 *                                 isArchived:
 *                                   type: boolean
 *                                   example: false
 *                                 description:
 *                                   type: string
 *                                   example: "Model kit dari SD BB Senshi RX-78-2, sangat detail dan kolektibel."
 *                                 quantity:
 *                                   type: integer
 *                                   example: 12
 *                                 createdAt:
 *                                   type: string
 *                                   format: date-time
 *                                   example: "2025-02-11T10:01:49.125Z"
 *                 total:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid request - Customer ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Customer ID is required"
 *       404:
 *         description: No orders found for the given customer ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No orders found for this customer"
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
router.get("/:id", authMiddleware, OrderController.getOrder);
router.post("/callback", authMiddleware, OrderController.orderCallback);
router.post("/snap", authMiddleware, OrderController.orderSnap);

/**
 * @swagger
 * /api/order/status:
 *   post:
 *     summary: Get order status
 *     description: Retrieves the snapToken for a given order ID.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The order ID.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Order status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 snapToken:
 *                   type: string
 *                   description: The payment snap token.
 *                   example: "51a44af3-095f-424b-a1fd-5291de3559af"
 *       400:
 *         description: Bad request - Missing or invalid order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Order ID is required"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Order not found"
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
router.post("/status", authMiddleware, OrderController.orderStatus);

export default router;
import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/cartService";

export class CartController {

  static async getCustomerCart(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      if (!customerId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      const carts = await CartService.getCustomerCart(customerId);
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }

  static async removeCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, productId } = await req.body;
      if (!customerId || !productId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      await CartService.removeCart(req.body);
      res.json({
        message: "Item removed from cart"
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeAllCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = await req.body;
      if (!customerId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      await CartService.removeAllCart(req.body);
      res.json({
        message: "Item removed from cart"
      });
    } catch (error) {
      next(error);
    }
  }

  static async insertCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, productId } = await req.body;
      if (!customerId || !productId) {
        res.status(400).json({ errors: "Invalid input" });
      }
      const carts = await CartService.insertCart(req.body);
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }
}
import { NextFunction, Request, Response } from "express";
import cartService from "../services/cartService";

class CartController {

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = await req.body;
      if (!customerId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      const carts = await cartService.getCart(req.body);
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }

  async removeCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = await req.body;
      if (!customerId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      await cartService.removeCart(req.body);
      res.status(200).json({
        message: "Item removed from cart"
      });
    } catch (error) {
      next(error);
    }
  }

  async insertCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, productId } = await req.body;
      if (!customerId || !productId) {
        res.status(400).json({ errors: "Invalid input" });
      }
      const carts = await cartService.insertCart(req.body);
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }

  async removeAllCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, productId } = await req.body;
      if (!customerId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      await cartService.removeAllCart(req.body);
      res.status(200).json({
        message: "Item removed from cart"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController()
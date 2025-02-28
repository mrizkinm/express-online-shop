import { NextFunction, Request, Response } from "express";
import { CartService } from "../services/cartService";
import { ResponseError } from "../errors/responseError";

export class CartController {

  static async getCustomerCart(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      if (!customerId) {
        throw new ResponseError(400, "Invalid input");
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
        throw new ResponseError(400, "Invalid input");
      }

      await CartService.removeCart(req.body);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      next(error);
    }
  }

  static async removeAllCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId } = await req.body;
      if (!customerId) {
        throw new ResponseError(400, "Invalid input");
      }

      await CartService.removeAllCart(req.body);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      next(error);
    }
  }

  static async insertCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { customerId, productId } = await req.body;
      if (!customerId || !productId) {
        throw new ResponseError(400, "Invalid input");
      }
      const carts = await CartService.insertCart(req.body);
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }
}
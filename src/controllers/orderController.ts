import { NextFunction, Request, Response } from "express";
import { OrderService } from "../services/orderService";

export class OrderController {

  static async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      if (!customerId) {
        res.status(400).json({ errors: "Invalid input" });
      }

      const carts = await OrderService.getOrder(customerId);
      res.json(carts);
    } catch (error) {
      next(error);
    }
  }

  static async orderCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const callback = await OrderService.orderCallback(req.body);
      res.json(callback);
    } catch (error) {
      next(error);
    }
  }

  static async orderSnap(req: Request, res: Response, next: NextFunction) {
    try {
      const callback = await OrderService.orderSnap(req.body);
      res.json(callback);
    } catch (error) {
      next(error);
    }
  }

  static async orderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status = await OrderService.orderStatus(req.body);
      res.json(status);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const callback = await OrderService.createOrder(req.body);
      res.json(callback);
    } catch (error) {
      next(error);
    }
  }
}
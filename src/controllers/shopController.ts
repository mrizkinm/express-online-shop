import { NextFunction, Request, Response } from "express";
import { ShopService } from "../services/shopService";

export class ShopController {
  static async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const shop = await ShopService.getData();
      res.json(shop);
    } catch (error) {
      next(error);
    }
  }
}
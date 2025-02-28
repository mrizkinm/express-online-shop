import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/productService";
import { ResponseError } from "../errors/responseError";

export class ProductController {
  static async getDetailProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      if (!productId) {
        throw new ResponseError(400, "Invalid input");
      }

      const product = await ProductService.getDetailProduct(productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getProduct(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  static async searchProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.searchProduct(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
}
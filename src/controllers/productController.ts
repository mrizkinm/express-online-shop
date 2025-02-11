import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/productService";

export class ProductController {
  static async getDetailProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      if (!productId) {
        res.status(400).json({ errors: "Invalid input" });
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
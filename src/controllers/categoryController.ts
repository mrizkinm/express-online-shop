import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategory(req.query);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}
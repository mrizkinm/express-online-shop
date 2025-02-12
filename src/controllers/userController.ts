import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserValidation } from "../validations/userValidation";

export class UserController {

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = UserValidation.login.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
  
        // Ubah format menjadi { fieldName: "Error message" }
        const simplifiedErrors = Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0] || 'Invalid value'])
        );
  
        res.status(400).json({ errors: simplifiedErrors });
      }

      const token = await UserService.login(req.body);
      if (!token) {
        res.status(401).json({ errors: "Email atau password salah" });
      }
      
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const result = UserValidation.logout.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
  
        // Ubah format menjadi { fieldName: "Error message" }
        const simplifiedErrors = Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0] || 'Invalid value'])
        );
  
        res.status(400).json({ errors: simplifiedErrors });
      }

      const response = await UserService.logout(req.body);
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = UserValidation.register.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
  
        // Ubah format menjadi { fieldName: "Error message" }
        const simplifiedErrors = Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0] || 'Invalid value'])
        );
  
        res.status(400).json({ errors: simplifiedErrors });
      }

      const newUser = await UserService.register(req.body);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async account(req: Request, res: Response, next: NextFunction) {
    try {
      const result = UserValidation.updateAccount.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
  
        // Ubah format menjadi { fieldName: "Error message" }
        const simplifiedErrors = Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0] || 'Invalid value'])
        );
  
        res.status(400).json({ errors: simplifiedErrors });
      }

      const newUser = await UserService.account(req.body);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = UserValidation.password.safeParse(req.body);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
  
        // Ubah format menjadi { fieldName: "Error message" }
        const simplifiedErrors = Object.fromEntries(
          Object.entries(errors).map(([key, value]) => [key, value?.[0] || 'Invalid value'])
        );
  
        res.status(400).json({ errors: simplifiedErrors });
      }

      const newUser = await UserService.changePassword(req.body);
      res.json(newUser);
    } catch (error) {
      next(error);
    }
  }
}
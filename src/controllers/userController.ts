import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import userValidation from "../validations/userValidation";

class UserController {

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = userValidation.login.safeParse(req.body);

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

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  }
}

export default new UserController();
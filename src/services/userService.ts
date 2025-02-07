import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResponseError } from "../errors/responseError";

class UserService {

  async login(req: { email: string; password: string }) {
    const user = await prisma.customer.findUnique({
      where: { email: req.email },
    });

    if (!user || !(await bcrypt.compare(req.password, user.password))) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return token;
  }

  async register(data: any) {
    
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async createUser(name: string, email: string, password: string) {
    return prisma.user.create({ data: { name, email, password } });
  }
}

export default new UserService();